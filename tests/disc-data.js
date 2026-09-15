const WORDS = {
  D: ["Decidido", "Competitivo", "Assertivo", "Audacioso", "Direto", "Determinado", "Ousado", "Enérgico", "Independente", "Exigente", "Firme", "Impaciente", "Ambicioso", "Pioneiro", "Corajoso", "Dinâmico", "Provocador", "Resoluto", "Persistente", "Autoconfiante", "Inovador", "Controlador", "Competidor", "Impetuoso"],
  I: ["Comunicativo", "Entusiasmado", "Persuasivo", "Sociável", "Otimista", "Expressivo", "Espontâneo", "Carismático", "Confiante", "Inspirador", "Extrovertido", "Animado", "Alegre", "Envolvente", "Empático", "Acolhedor", "Cativante", "Espirituoso", "Amigável", "Encantador", "Estimulante", "Vibrante", "Falante", "Descontraído"],
  S: ["Paciente", "Leal", "Calmo", "Consistente", "Colaborativo", "Ponderado", "Confiável", "Gentil", "Estável", "Bom ouvinte", "Cooperativo", "Sereno", "Modesto", "Atencioso", "Fiel", "Prestativo", "Reservado", "Complacente", "Harmonioso", "Compreensivo", "Devotado", "Equilibrado", "Amável", "Constante"],
  C: ["Analítico", "Preciso", "Cauteloso", "Organizado", "Sistemático", "Criterioso", "Meticuloso", "Objetivo", "Disciplinado", "Detalhista", "Prudente", "Metódico", "Rigoroso", "Perfeccionista", "Formal", "Ordeiro", "Exato", "Diplomático", "Conservador", "Minucioso", "Correto", "Cumpridor", "Escrupuloso", "Racional"],
};

const DIM_META = {
  D: {
    label: "Dominância", color: "#BE7148", printColor: "#9C5A34",
    description: "Pessoas com predominância em Dominância tendem a ser diretas, competitivas e orientadas para resultados. Gostam de assumir o controle de situações, tomam decisões com rapidez e se sentem confortáveis diante de desafios e mudanças.",
    motivators: "Autonomia, desafios, resultados visíveis e a possibilidade de assumir responsabilidade.",
    communicationStyle: "Direta e objetiva — vai direto ao ponto e prefere conversas focadas em ação.",
    underPressure: "Pode se tornar impaciente, mais autoritária ou pouco tolerante a processos lentos.",
    development: "Desenvolver escuta ativa e paciência com ritmos e opiniões diferentes dos seus.",
  },
  I: {
    label: "Influência", color: "#C8A465", printColor: "#95751F",
    description: "Pessoas com predominância em Influência são comunicativas, entusiasmadas e gostam de interagir com outras pessoas. Costumam inspirar e motivar quem está ao redor, e se destacam em ambientes sociais e colaborativos.",
    motivators: "Reconhecimento social, interação com pessoas e ambientes dinâmicos.",
    communicationStyle: "Expressiva e envolvente — gosta de contar histórias e criar conexão emocional.",
    underPressure: "Pode se dispersar, prometer mais do que consegue entregar ou evitar conflitos diretos.",
    development: "Fortalecer organização pessoal e acompanhamento de detalhes e prazos.",
  },
  S: {
    label: "Estabilidade", color: "#5B8C82", printColor: "#3A6F65",
    description: "Pessoas com predominância em Estabilidade valorizam constância, cooperação e segurança. São boas ouvintes, leais e trabalham bem em equipe, preferindo ambientes previsíveis e harmoniosos.",
    motivators: "Segurança, estabilidade, relacionamentos de confiança e cooperação.",
    communicationStyle: "Calma e ponderada — evita confrontos e busca consenso.",
    underPressure: "Pode ter dificuldade para se adaptar a mudanças bruscas e evitar se posicionar em conflitos.",
    development: "Praticar flexibilidade diante de mudanças e comunicar opiniões mesmo em situações de discordância.",
  },
  C: {
    label: "Conformidade", color: "#5C7DA0", printColor: "#3E5E82",
    description: "Pessoas com predominância em Conformidade são analíticas, organizadas e atentas a detalhes. Valorizam precisão, qualidade, e costumam seguir processos e padrões bem definidos.",
    motivators: "Precisão, qualidade, regras claras e dados concretos para embasar decisões.",
    communicationStyle: "Formal e técnica — baseada em fatos e dados.",
    underPressure: "Pode se tornar excessivamente crítica, perfeccionista ou lenta para decidir.",
    development: "Trabalhar agilidade na tomada de decisão e maior tolerância à ambiguidade.",
  },
};

const TOTAL_BLOCKS = 24;

function buildDiscBlocks() {
  const blocks = [];
  for (let i = 0; i < TOTAL_BLOCKS; i++) {
    blocks.push({
      options: [
        { type: "D", text: WORDS.D[i % 24] },
        { type: "I", text: WORDS.I[(i + 6) % 24] },
        { type: "S", text: WORDS.S[(i + 12) % 24] },
        { type: "C", text: WORDS.C[(i + 18) % 24] },
      ],
    });
  }
  return blocks;
}

function scoreDisc(blocks, answers) {
  const most = { D: 0, I: 0, S: 0, C: 0 };
  const least = { D: 0, I: 0, S: 0, C: 0 };
  answers.forEach((a, i) => {
    most[blocks[i].options[a.mais].type] += 1;
    least[blocks[i].options[a.menos].type] += 1;
  });
  const net = {};
  const pct = {};
  ["D", "I", "S", "C"].forEach((k) => {
    net[k] = most[k] - least[k];
    pct[k] = Math.round(((net[k] + TOTAL_BLOCKS) / (TOTAL_BLOCKS * 2)) * 100);
  });
  const top2 = Object.entries(net).sort((a, b) => b[1] - a[1]).slice(0, 2).map(([k]) => k).join("");
  return { net, pct, top2 };
}

function generateDiscReport(candidate) {
  const ordered = ["D", "I", "S", "C"].slice().sort((a, b) => candidate.pct[b] - candidate.pct[a]);
  const [p1, p2] = candidate.top2.split("");
  const m1 = DIM_META[p1];
  const m2 = DIM_META[p2];
  const summary = `O perfil de ${candidate.name} é predominantemente ${m1.label} (${candidate.pct[p1]}%), com traço secundário de ${m2.label} (${candidate.pct[p2]}%).`;
  return { summary, ordered };
}

function buildDiscReportSections(candidate) {
  const report = generateDiscReport(candidate);
  return report.ordered.map((d) => {
    const m = DIM_META[d];
    return `
      <div style="margin-bottom:20px;border-left:3px solid ${m.printColor};padding-left:16px;break-inside:avoid;">
        <p style="font-size:14px;font-weight:700;color:${m.printColor};margin:0 0 6px;">
          ${d} · ${m.label} <span style="font-weight:400;color:#6B6B6B;font-size:12px;">(${candidate.pct[d]}%)</span>
        </p>
        <p style="font-size:12.5px;line-height:1.7;margin:0 0 8px;color:#222;">${m.description}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 24px;font-size:11.5px;color:#4A4A4A;">
          <p style="margin:0;"><strong style="color:#222;">Motivadores:</strong> ${m.motivators}</p>
          <p style="margin:0;"><strong style="color:#222;">Comunicação:</strong> ${m.communicationStyle}</p>
          <p style="margin:0;"><strong style="color:#222;">Sob pressão:</strong> ${m.underPressure}</p>
          <p style="margin:0;"><strong style="color:#222;">Desenvolvimento:</strong> ${m.development}</p>
        </div>
      </div>`;
  });
}

const DISC_CONFIG = Object.assign({}, KG_CONFIG, {
  testType: "DISC",
  title: "Perfil Comportamental DISC",
  introText: "24 blocos rápidos. Em cada um, escolha a palavra que mais combina e a que menos combina com você. Não existe resposta certa — responda com o que é mais natural.",
  logoSrc: "../assets/logo.png",
  buildBlocks: buildDiscBlocks,
  scoreAnswers: scoreDisc,
  generateReport: generateDiscReport,
  buildReportSections: buildDiscReportSections,
  buildRadarData: (candidate) => ["D", "I", "S", "C"].map((d) => ({
    label: DIM_META[d].label,
    pct: candidate.pct[d],
    color: DIM_META[d].printColor,
  })),
});
