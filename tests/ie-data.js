const IE_DIM_META = {
  autoconsciencia: {
    label: "Autoconsciência", color: "#BE7148", printColor: "#9C5A34",
    description: "Capacidade de reconhecer as próprias emoções e como elas influenciam pensamentos e comportamentos.",
    highTip: "Continue usando essa clareza emocional para embasar decisões e dar exemplos de autenticidade para o time.",
    lowTip: "Praticar pausas para nomear o que está sentindo antes de reagir pode ajudar a fortalecer essa competência.",
  },
  autorregulacao: {
    label: "Autorregulação", color: "#C8A465", printColor: "#95751F",
    description: "Capacidade de administrar emoções e impulsos, mantendo o equilíbrio mesmo sob pressão.",
    highTip: "Sua estabilidade emocional é um ponto de referência para a equipe em momentos de tensão — vale reconhecer isso.",
    lowTip: "Técnicas simples de pausa antes de reagir (respirar, contar até dez, adiar a resposta) podem reduzir reações por impulso.",
  },
  automotivacao: {
    label: "Automotivação", color: "#5B8C82", printColor: "#3A6F65",
    description: "Capacidade de manter o foco e a persistência em direção a objetivos, mesmo diante de obstáculos.",
    highTip: "Use essa energia para inspirar a equipe diante de metas desafiadoras, sem transformar isso em pressão excessiva sobre os outros.",
    lowTip: "Definir metas menores e celebrar progressos parciais pode ajudar a sustentar o engajamento em tarefas longas.",
  },
  empatia: {
    label: "Empatia", color: "#5C7DA0", printColor: "#3E5E82",
    description: "Capacidade de perceber e considerar os sentimentos e perspectivas de outras pessoas.",
    highTip: "Sua sensibilidade às pessoas é um diferencial — vale usá-la também para dar feedbacks difíceis com cuidado, sem evitá-los.",
    lowTip: "Praticar escuta ativa (perguntar mais, interromper menos) ajuda a captar melhor o que a outra pessoa está sentindo.",
  },
  habilidadesSociais: {
    label: "Habilidades sociais", color: "#8C6BA8", printColor: "#6B4F87",
    description: "Capacidade de construir relações, comunicar-se com clareza e influenciar positivamente outras pessoas.",
    highTip: "Aproveite essa facilidade de conexão para mediar conflitos e articular pessoas de perfis diferentes dentro do time.",
    lowTip: "Buscar mais conversas individuais e treinar mediação de conflitos são bons pontos de partida para desenvolver essa área.",
  },
};

const IE_DIM_ORDER = ["autoconsciencia", "autorregulacao", "automotivacao", "empatia", "habilidadesSociais"];

const IE_STATEMENTS_BY_DIM = {
  autoconsciencia: [
    "Percebo com facilidade quando minhas emoções estão influenciando minhas decisões.",
    "Consigo identificar quais situações mais me tiram do equilíbrio.",
    "Sei nomear com clareza as emoções que sinto ao longo do dia.",
    "Reconheço rapidamente quando meu humor muda ao longo do dia.",
    "Tenho clareza sobre quais são meus pontos fortes e minhas limitações.",
  ],
  autorregulacao: [
    "Mesmo sob pressão, consigo manter a calma antes de reagir.",
    "Consigo adiar uma reação impulsiva até pensar com mais clareza.",
    "Recupero o equilíbrio emocional rapidamente depois de uma situação estressante.",
    "Mantenho o controle mesmo em situações de conflito direto.",
    "Penso antes de agir, mesmo quando estou emocionalmente envolvido(a).",
  ],
  automotivacao: [
    "Mantenho o foco em meus objetivos mesmo diante de contratempos.",
    "Encontro motivação interna mesmo quando não há reconhecimento externo imediato.",
    "Persisto em tarefas difíceis até concluí-las, mesmo sem supervisão.",
    "Consigo me reerguer rapidamente depois de um fracasso.",
    "Tenho disciplina para seguir com um plano mesmo quando a empolgação inicial passa.",
  ],
  empatia: [
    "Percebo com facilidade como as outras pessoas estão se sentindo, mesmo sem que digam.",
    "Ajusto minha forma de me comunicar conforme percebo o estado emocional do outro.",
    "Presto atenção genuína quando alguém está compartilhando um problema comigo.",
    "Consigo compreender pontos de vista bem diferentes do meu, mesmo discordando.",
    "Noto quando alguém próximo está desconfortável, mesmo que tente disfarçar.",
  ],
  habilidadesSociais: [
    "Consigo mediar conflitos entre outras pessoas com tranquilidade.",
    "Tenho facilidade para construir relações de confiança com pessoas diferentes de mim.",
    "Consigo influenciar positivamente um grupo mesmo sem ter autoridade formal sobre ele.",
    "Sei adaptar minha comunicação para diferentes públicos e situações.",
    "Tenho facilidade para iniciar e manter conversas com pessoas que não conheço.",
  ],
};

function buildIeBlocks() {
  const blocks = [];
  for (let round = 0; round < 5; round++) {
    blocks.push({
      options: IE_DIM_ORDER.map((dim) => ({ type: dim, text: IE_STATEMENTS_BY_DIM[dim][round] })),
    });
  }
  return blocks;
}

function scoreIe(blocks, answers) {
  const net = {};
  IE_DIM_ORDER.forEach((d) => { net[d] = 0; });
  answers.forEach((a, i) => {
    const opts = blocks[i].options;
    net[opts[a.mais].type] += 1;
    net[opts[a.menos].type] -= 1;
  });
  const pct = {};
  IE_DIM_ORDER.forEach((d) => { pct[d] = Math.round(((net[d] + 5) / 10) * 100); });
  const overall = Math.round(IE_DIM_ORDER.reduce((acc, d) => acc + pct[d], 0) / IE_DIM_ORDER.length);
  const ordered = IE_DIM_ORDER.slice().sort((a, b) => pct[b] - pct[a]);
  return { net, pct, overall, ordered };
}

function generateIeReport(candidate) {
  const top = candidate.ordered[0];
  const low = candidate.ordered[candidate.ordered.length - 1];
  const summary = `${candidate.name} tem uma pontuação geral de ${candidate.overall}% em inteligência emocional, com ${IE_DIM_META[top].label} como ponto mais forte e ${IE_DIM_META[low].label} como principal área de desenvolvimento. Pontuação geral: ${candidate.overall}%.`;
  return { summary };
}

function tierLabel(pct) {
  if (pct >= 75) return "Alto";
  if (pct >= 50) return "Moderado";
  return "A desenvolver";
}

function buildIeReportSections(candidate) {
  return candidate.ordered.map((d) => {
    const m = IE_DIM_META[d];
    const tier = tierLabel(candidate.pct[d]);
    const tip = candidate.pct[d] >= 50 ? m.highTip : m.lowTip;
    return `
      <div style="margin-bottom:20px;border-left:3px solid ${m.printColor};padding-left:16px;break-inside:avoid;">
        <p style="font-size:14px;font-weight:700;color:${m.printColor};margin:0 0 6px;">
          ${m.label} <span style="font-weight:400;color:#6B6B6B;font-size:12px;">(${candidate.pct[d]}% — ${tier})</span>
        </p>
        <p style="font-size:12.5px;line-height:1.7;margin:0 0 6px;color:#222;">${m.description}</p>
        <p style="font-size:11.5px;line-height:1.6;margin:0;color:#4A4A4A;"><strong style="color:#222;">Recomendação:</strong> ${tip}</p>
      </div>`;
  });
}

const IE_CONFIG = Object.assign({}, KG_CONFIG, {
  testType: "Inteligencia-Emocional",
  title: "Inteligência Emocional",
  introText: "5 blocos rápidos. Em cada um, escolha a afirmação que mais combina e a que menos combina com você. Não existe resposta certa — responda com o que é mais natural para você.",
  logoSrc: "../assets/logo.png",
  logoDataUri: LOGO_DATA_URI,
  buildBlocks: buildIeBlocks,
  scoreAnswers: scoreIe,
  generateReport: generateIeReport,
  buildReportSections: buildIeReportSections,
});
