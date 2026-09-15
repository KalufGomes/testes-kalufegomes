// ---------------------------------------------------------------------------
// Kaluf & Gomes — Motor compartilhado dos testes.
// Cada teste (disc.html, lideranca.html, ie.html, eneagrama.html) define um
// objeto de configuração e chama KGTest.run(config). Este arquivo cuida da
// navegação entre telas, dos blocos de "mais/menos", da geração do relatório
// em HTML e do envio para a planilha/e-mail via Google Apps Script.
// ---------------------------------------------------------------------------

const KGTest = (() => {
  function slugify(s) {
    return s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  function el(html) {
    const t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  function run(config) {
    const root = document.getElementById("app");
    const blocks = config.buildBlocks();
    let candidateMeta = { name: "", empresa: "" };

    function renderIntro() {
      root.innerHTML = "";
      root.appendChild(el(`
        <div class="kg-screen">
          <div class="kg-wrap">
            <div class="kg-center"><img src="${config.logoSrc}" alt="Kaluf & Gomes" class="kg-logo" /></div>
            <h1 class="kg-h1">${config.title}</h1>
            <p class="kg-lede">${config.introText}</p>
            <div class="kg-field">
              <label class="kg-label">Nome completo</label>
              <input class="kg-input" id="kg-name" placeholder="Seu nome" />
            </div>
            <div class="kg-field">
              <label class="kg-label">Empresa (opcional)</label>
              <input class="kg-input" id="kg-empresa" placeholder="Ex: Kaluf & Gomes" />
            </div>
            <button class="kg-btn kg-btn-primary" id="kg-start" disabled>Começar teste</button>
          </div>
          <button class="kg-link-quiet" id="kg-admin-link" style="margin-top:3.5rem;">Ver planilha de resultados</button>
        </div>
      `));
      const nameInput = document.getElementById("kg-name");
      const empresaInput = document.getElementById("kg-empresa");
      const startBtn = document.getElementById("kg-start");
      nameInput.addEventListener("input", () => {
        startBtn.disabled = !nameInput.value.trim();
      });
      startBtn.addEventListener("click", () => {
        candidateMeta = { name: nameInput.value.trim(), empresa: empresaInput.value.trim() };
        renderQuiz();
      });
      document.getElementById("kg-admin-link").addEventListener("click", () => {
        if (config.sheetUrl) window.open(config.sheetUrl, "_blank");
        else alert("Link da planilha ainda não configurado.");
      });
    }

    function renderQuiz() {
      let idx = 0;
      const answers = [];
      let mais = null;
      let menos = null;

      function draw() {
        const block = blocks[idx];
        const opts = block.options;
        root.innerHTML = "";
        const progress = blocks.map((_, i) => `<div class="kg-progress-seg ${i <= idx ? "is-done" : ""}"></div>`).join("");
        const contextHtml = block.context
          ? `<div class="kg-word-row" style="background:transparent;border-style:dashed;"><span class="kg-word-text" style="line-height:1.6;">${block.context}</span></div>`
          : "";
        const options = opts.map((opt, i) => `
          <div class="kg-word-row" data-idx="${i}">
            <span class="kg-word-text">${opt.text}</span>
            <div style="display:flex;gap:.5rem;flex-shrink:0;">
              <button class="kg-pill" data-idx="${i}" data-type="mais">Mais</button>
              <button class="kg-pill" data-idx="${i}" data-type="menos">Menos</button>
            </div>
          </div>
        `).join("");

        root.appendChild(el(`
          <div class="kg-screen-top">
            <div class="kg-wrap-wide">
              <div class="kg-progress">${progress}</div>
              <p class="kg-step-count">Bloco ${idx + 1} de ${blocks.length}</p>
              <h2 class="kg-h2" style="margin-bottom:1.25rem;font-size:1.2rem;">${config.questionPrompt || "Qual combina mais e qual combina menos com você?"}</h2>
              ${contextHtml}
              <div id="kg-options">${options}</div>
              <button class="kg-btn kg-btn-primary" id="kg-next" disabled style="margin-top:1rem;">
                ${idx + 1 === blocks.length ? "Finalizar" : "Próximo"}
              </button>
            </div>
          </div>
        `));

        function refreshUI() {
          document.querySelectorAll(".kg-word-row").forEach((row) => {
            const i = Number(row.dataset.idx);
            row.classList.toggle("is-more", mais === i);
            row.classList.toggle("is-less", menos === i);
          });
          document.querySelectorAll(".kg-pill").forEach((btn) => {
            const i = Number(btn.dataset.idx);
            const type = btn.dataset.type;
            btn.classList.toggle("is-active-more", type === "mais" && mais === i);
            btn.classList.toggle("is-active-less", type === "menos" && menos === i);
          });
          document.getElementById("kg-next").disabled = !(mais !== null && menos !== null && mais !== menos);
        }

        document.querySelectorAll(".kg-pill").forEach((btn) => {
          btn.addEventListener("click", () => {
            const i = Number(btn.dataset.idx);
            const type = btn.dataset.type;
            if (type === "mais") {
              mais = i;
              if (menos === i) menos = null;
            } else {
              menos = i;
              if (mais === i) mais = null;
            }
            refreshUI();
          });
        });

        document.getElementById("kg-next").addEventListener("click", () => {
          answers.push({ mais, menos });
          if (idx + 1 < blocks.length) {
            idx += 1;
            mais = null;
            menos = null;
            draw();
          } else {
            finish(answers);
          }
        });

        refreshUI();
      }

      draw();
    }

    async function finish(answers) {
      const scores = config.scoreAnswers(blocks, answers);
      const candidate = {
        id: `${slugify(candidateMeta.name)}-${Date.now()}`,
        name: candidateMeta.name,
        empresa: candidateMeta.empresa,
        submittedAt: Date.now(),
        ...scores,
      };
      const report = config.generateReport(candidate);
      const reportHtml = buildReportHTML(config, candidate, report);

      renderDone(config, candidate, report, reportHtml);

      if (config.appsScriptUrl) {
        try {
          await fetch(config.appsScriptUrl, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify({
              testType: config.testType,
              name: candidate.name,
              empresa: candidate.empresa,
              summary: report.summary,
              reportHtml,
            }),
          });
        } catch (err) {
          console.error("Falha ao enviar para o Apps Script:", err);
        }
      }
    }

    function renderDone(config, candidate, report, reportHtml) {
      root.innerHTML = "";
      root.appendChild(el(`
        <div class="kg-screen" style="text-align:center;">
          <img src="${config.logoSrc}" alt="Kaluf & Gomes" class="kg-logo-sm" style="margin:0 auto .5rem;" />
          <h1 class="kg-h2" style="margin-top:1.25rem;margin-bottom:.5rem;">Obrigado por responder!</h1>
          <p style="color:var(--text-dim);font-size:.9rem;max-width:24rem;">
            Suas respostas foram enviadas. A equipe de RH vai analisar o seu perfil em breve.
          </p>
        </div>
      `));
    }

    renderIntro();
  }

  function buildRadarSVG(points) {
    const n = points.length;
    const maxLabelLen = Math.max(...points.map((p) => `${p.label} (100%)`.length));
    const R = 130;
    const textWidth = maxLabelLen * 6.4;
    const W = Math.round(2 * (R + 20 + textWidth) + 20);
    const H = W;
    const cx = W / 2;
    const cy = H / 2;
    const angleFor = (i) => (Math.PI * 2 * i) / n - Math.PI / 2;
    const rings = [20, 40, 60, 80, 100];

    let svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">`;
    rings.forEach((level) => {
      const pts = points.map((_, i) => {
        const a = angleFor(i);
        const r = (R * level) / 100;
        return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
      }).join(" ");
      svg += `<polygon points="${pts}" fill="none" stroke="#DCD5C2" stroke-width="1" />`;
    });
    points.forEach((p, i) => {
      const a = angleFor(i);
      const x2 = cx + R * Math.cos(a);
      const y2 = cy + R * Math.sin(a);
      svg += `<line x1="${cx}" y1="${cy}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#DCD5C2" stroke-width="1" />`;
      const lx = cx + (R + 20) * Math.cos(a);
      const ly = cy + (R + 20) * Math.sin(a);
      const cosA = Math.cos(a);
      const anchor = Math.abs(cosA) < 0.15 ? "middle" : cosA > 0 ? "start" : "end";
      svg += `<text x="${lx.toFixed(1)}" y="${ly.toFixed(1)}" font-size="10" font-family="Arial, sans-serif" fill="${p.color}" font-weight="600" text-anchor="${anchor}" dominant-baseline="middle">${p.label} (${p.pct}%)</text>`;
    });
    const dataPts = points.map((p, i) => {
      const a = angleFor(i);
      const r = (R * p.pct) / 100;
      return `${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`;
    }).join(" ");
    svg += `<polygon points="${dataPts}" fill="#C8A46555" stroke="#8A7A5E" stroke-width="1.5" />`;
    points.forEach((p, i) => {
      const a = angleFor(i);
      const r = (R * p.pct) / 100;
      svg += `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="3.5" fill="${p.color}" />`;
    });
    svg += `</svg>`;
    return svg;
  }

  function buildReportHTML(config, candidate, report) {
    const dimBlocks = config.buildReportSections(candidate).join("");
    const radarHtml = config.buildRadarData
      ? `<div style="text-align:center;margin-bottom:24px;">${buildRadarSVG(config.buildRadarData(candidate))}</div>`
      : "";
    return `<!DOCTYPE html>
<html lang="pt-BR"><head><meta charset="UTF-8" />
<title>Relatório ${config.title} — ${candidate.name}</title>
<style>
  @page { margin: 24mm 18mm; }
  * { box-sizing: border-box; }
  body { font-family: -apple-system, 'Segoe UI', Arial, sans-serif; color: #1A1A1A; background: #FFFFFF; margin: 0; padding: 40px; max-width: 780px; margin: 0 auto; }
  .header { text-align: center; border-bottom: 2px solid #C8A465; padding-bottom: 20px; margin-bottom: 28px; }
  .header img { height: 110px; width: auto; margin-bottom: 10px; }
  .header .title { font-family: Georgia, serif; font-size: 16px; margin: 0; }
  .header .date { font-size: 11px; color: #6B6B6B; margin: 3px 0 0; }
  .company { font-size: 11px; color: #6B6B6B; margin: 0 0 3px; }
  .name { font-family: Georgia, serif; font-size: 23px; margin: 0 0 4px; }
  .submitted { font-size: 11px; color: #6B6B6B; margin: 0 0 22px; }
  .eyebrow { font-family: Georgia, serif; font-size: 13px; color: #9C5A34; margin: 0 0 6px; }
  .hr { height: 1px; background: #E2DACB; margin: 0 0 14px; }
  .summary { font-size: 13px; line-height: 1.6; margin: 0 0 22px; }
  .footer { font-size: 10px; color: #8A8A8A; margin-top: 26px; line-height: 1.5; }
  .print-hint { background: #FBF3E3; border: 1px solid #E7D3A3; color: #6B5327; font-size: 12px; padding: 10px 14px; border-radius: 6px; margin-bottom: 22px; }
  @media print { body { padding: 0; } .print-hint { display: none; } }
</style></head>
<body>
  <p class="print-hint">Para salvar este relatório como PDF: com o e-mail aberto, pressione <strong>Ctrl+P</strong> (Windows) ou <strong>Cmd+P</strong> (Mac) e escolha "Salvar como PDF".</p>
  <div class="header">
    <img src="${config.logoDataUri}" alt="Kaluf & Gomes" />
    <p class="title">Relatório de ${config.title}</p>
    <p class="date">${new Date().toLocaleDateString("pt-BR")}</p>
  </div>
  <p class="company">${candidate.empresa || "Empresa não informada"}</p>
  <p class="name">${candidate.name}</p>
  <p class="submitted">Respondido em ${new Date(candidate.submittedAt).toLocaleString("pt-BR")}</p>
  ${radarHtml}
  <p class="eyebrow" style="margin-top:24px;">Relatório do perfil</p>
  <div class="hr"></div>
  <p class="summary">${report.summary}</p>
  ${dimBlocks}
  <p class="footer">Relatório gerado automaticamente com base nas respostas do teste — Kaluf &amp; Gomes Soluções Empresariais.</p>
</body></html>`;
  }

  function downloadHTML(html, filename) {
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return { run, slugify };
})();
