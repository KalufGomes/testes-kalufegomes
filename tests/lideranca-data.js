const STYLE_META = {
  E1: {
    label: "Diretivo", color: "#BE7148", printColor: "#9C5A34",
    description: "Define o que fazer e como fazer, com supervisão próxima. Fundamental quando a pessoa liderada ainda não domina a tarefa.",
    overuse: "Usado em excesso, mesmo com pessoas já competentes, pode ser percebido como microgerenciamento e travar a autonomia da equipe.",
  },
  E2: {
    label: "Persuasivo (Coaching)", color: "#C8A465", printColor: "#95751F",
    description: "Explica as decisões e busca engajamento, mantendo direção clara mas abrindo espaço para diálogo. Ideal quando a pessoa já entende a tarefa, mas ainda precisa de segurança e motivação.",
    overuse: "Usado sempre, pode gerar dependência de validação constante do líder.",
  },
  E3: {
    label: "Apoiador", color: "#5B8C82", printColor: "#3A6F65",
    description: "Compartilha ideias e facilita a decisão, dando suporte emocional sem impor o caminho. Ideal quando a pessoa é capaz, mas está insegura ou pouco confiante.",
    overuse: "Usado com quem ainda não domina a tarefa, pode deixar a pessoa sem direção clara.",
  },
  E4: {
    label: "Delegador", color: "#5C7DA0", printColor: "#3E5E82",
    description: "Transfere a responsabilidade e a decisão para a pessoa, atuando apenas como referência disponível. Ideal com quem já é competente e comprometido.",
    overuse: "Usado cedo demais, pode sobrecarregar a pessoa com decisões para as quais ela ainda não está pronta.",
  },
};

const OPTIONS_TEMPLATE = [
  { style: "E1", text: "Explico com clareza o que fazer e como fazer, e acompanho de perto até a tarefa ser dominada." },
  { style: "E2", text: "Explico minha decisão, mas abro espaço para dúvidas e sugestões, mantendo a direção comigo." },
  { style: "E3", text: "Pergunto como a pessoa prefere agir e ofereço apoio, sem impor o caminho." },
  { style: "E4", text: "Deixo que a pessoa conduza sozinha e só intervenho se for chamado(a)." },
];

const SCENARIOS = [
  { id: 1, correct: "E1", text: "Um novo colaborador começou há duas semanas e ainda não sabe executar sozinho as principais tarefas do time. Ele parece motivado, mas inseguro sobre como proceder." },
  { id: 2, correct: "E1", text: "Um membro da equipe está atuando pela primeira vez em um projeto totalmente novo para ele, e comete erros básicos por falta de conhecimento do processo." },
  { id: 3, correct: "E1", text: "Uma pessoa foi promovida recentemente para uma função de maior responsabilidade e ainda não domina as rotinas do novo cargo, mas está entusiasmada com o desafio." },
  { id: 4, correct: "E2", text: "Um colaborador já entende bem como fazer suas tarefas, mas ultimamente está desmotivado e questionando se vale a pena se esforçar tanto." },
  { id: 5, correct: "E2", text: "Alguém do time aprendeu a executar uma nova ferramenta, mas ainda hesita em tomar decisões sozinho e às vezes evita assumir responsabilidade." },
  { id: 6, correct: "E2", text: "Um profissional já apresenta bons resultados técnicos, mas oscila entre dias de muito engajamento e dias de desânimo com o trabalho." },
  { id: 7, correct: "E3", text: "Uma pessoa extremamente competente na função está insegura para assumir um projeto mais desafiador, mesmo tendo capacidade técnica de sobra." },
  { id: 8, correct: "E3", text: "Um colaborador experiente executa bem suas tarefas, mas evita se posicionar em reuniões importantes por medo de errar." },
  { id: 9, correct: "E3", text: "Alguém com ótimo histórico de entregas está hesitante em liderar uma iniciativa nova, embora tenha total capacidade para isso." },
  { id: 10, correct: "E4", text: "Um membro sênior da equipe domina completamente suas atribuições, é proativo e sempre entrega além do esperado sem precisar de supervisão." },
  { id: 11, correct: "E4", text: "Uma pessoa experiente e motivada assume responsabilidades extras por conta própria e resolve problemas sem precisar ser acionada." },
  { id: 12, correct: "E4", text: "Um profissional de alta performance pede autonomia para conduzir um projeto do início ao fim, com histórico consistente de bons resultados." },
];

function buildLiderancaBlocks() {
  return SCENARIOS.map((sc) => ({
    context: sc.text,
    options: OPTIONS_TEMPLATE.map((opt) => ({ type: opt.style, text: opt.text })),
  }));
}

function scoreLideranca(blocks, answers) {
  const net = { E1: 0, E2: 0, E3: 0, E4: 0 };
  let correctCount = 0;
  answers.forEach((a, i) => {
    const opts = blocks[i].options;
    net[opts[a.mais].type] += 1;
    net[opts[a.menos].type] -= 1;
    if (opts[a.mais].type === SCENARIOS[i].correct) correctCount += 1;
  });
  const total = answers.length;
  const stylePct = {};
  Object.keys(net).forEach((k) => { stylePct[k] = Math.round(((net[k] + total) / (total * 2)) * 100); });
  const adequacy = Math.round((correctCount / total) * 100);
  const dominant = Object.entries(net).sort((a, b) => b[1] - a[1])[0][0];
  return { net, pct: stylePct, adequacy, dominant };
}

function adequacyTier(pct) {
  if (pct >= 75) return { label: "Alta flexibilidade situacional", text: "Você adapta bem o estilo de liderança ao nível de maturidade de cada pessoa da equipe." };
  if (pct >= 50) return { label: "Flexibilidade moderada", text: "Em parte das situações você ajusta o estilo, mas ainda tende a repetir um padrão em contextos que pediam outra abordagem." };
  return { label: "Baixa flexibilidade situacional", text: "Há uma tendência a aplicar o mesmo estilo independentemente da maturidade da pessoa liderada, o que pode gerar desalinhamento com as necessidades da equipe." };
}

function generateLiderancaReport(candidate) {
  const tier = adequacyTier(candidate.adequacy);
  const summary = `${candidate.name} tem como estilo predominante o ${STYLE_META[candidate.dominant].label}, com ${candidate.adequacy}% de respostas alinhadas ao estilo mais adequado para cada situação (${tier.label.toLowerCase()}).`;
  return { summary, tier };
}

function buildLiderancaReportSections(candidate) {
  const report = generateLiderancaReport(candidate);
  const adequacyBox = `
    <div style="background:#FBF3E3;border:1px solid #E7D3A3;border-radius:8px;padding:14px 18px;margin-bottom:26px;">
      <p style="font-weight:700;font-size:13px;margin:0 0 4px;">${report.tier.label} — ${candidate.adequacy}%</p>
      <p style="font-size:12px;line-height:1.6;margin:0;color:#4A4A4A;">${report.tier.text}</p>
    </div>`;
  const dimBlocks = ["E1", "E2", "E3", "E4"].map((k) => {
    const m = STYLE_META[k];
    return `
      <div style="margin-bottom:20px;border-left:3px solid ${m.printColor};padding-left:16px;break-inside:avoid;">
        <p style="font-size:14px;font-weight:700;color:${m.printColor};margin:0 0 6px;">
          ${m.label} <span style="font-weight:400;color:#6B6B6B;font-size:12px;">(${candidate.pct[k]}% das respostas)</span>
        </p>
        <p style="font-size:12.5px;line-height:1.7;margin:0 0 6px;color:#222;">${m.description}</p>
        <p style="font-size:11.5px;line-height:1.6;margin:0;color:#8A6A3A;"><strong>Se usado em excesso:</strong> ${m.overuse}</p>
      </div>`;
  }).join("");
  return [adequacyBox, dimBlocks];
}

const LIDERANCA_CONFIG = Object.assign({}, KG_CONFIG, {
  testType: "Lideranca-Situacional",
  title: "Liderança Situacional",
  introText: "12 situações do dia a dia de gestão. Em cada uma, marque a ação que você mais tomaria e a que menos tomaria. Não existe resposta certa — responda com o que é mais natural para você.",
  questionPrompt: "Qual ação você mais tomaria e qual menos tomaria?",
  logoSrc: "../assets/logo.png",
  buildBlocks: buildLiderancaBlocks,
  scoreAnswers: scoreLideranca,
  generateReport: generateLiderancaReport,
  buildReportSections: buildLiderancaReportSections,
  buildRadarData: (candidate) => ["E1", "E2", "E3", "E4"].map((k) => ({
    label: STYLE_META[k].label,
    pct: candidate.pct[k],
    color: STYLE_META[k].printColor,
  })),
});
