const EN_DIM_META = {
  t1: {
    label: "O Reformador", color: "#A0785E", printColor: "#7A5A42",
    description: "Busca fazer as coisas da forma certa, com integridade e senso de responsabilidade. Tem um forte senso crítico, tanto consigo quanto com o mundo ao redor, e valoriza ordem, ética e melhoria contínua.",
    motivation: "Ser bom, correto e íntegro; evitar erros e ser criticado.",
    fear: "Medo central de ser imperfeito, corrupto ou defeituoso.",
    strengths: "Ética, senso de responsabilidade, atenção a detalhes e busca constante por melhoria e qualidade.",
    challenges: "Tendência ao perfeccionismo, dificuldade em relaxar diante de imperfeições e crítica excessiva a si mesmo(a) e aos outros.",
    stress: "Sob estresse, pode ficar mais rígido(a), controlador(a) e propenso(a) a explosões de frustração reprimida.",
    security: "Em momentos de segurança, torna-se mais espontâneo(a), tolerante e capaz de aceitar imperfeições com mais leveza.",
    communication: "Comunicação objetiva, estruturada e baseada em padrões claros de certo e errado.",
    growth: "Praticar mais flexibilidade e autocompaixão diante de erros — nem tudo precisa ser perfeito para ter valor.",
  },
  t2: {
    label: "O Prestativo", color: "#C97B7B", printColor: "#A85555",
    description: "Orientado para cuidar e ajudar outras pessoas, é generoso, atento às necessidades alheias e busca se conectar através do afeto e do apoio prático.",
    motivation: "Sentir-se amado e necessário; ser indispensável para os outros.",
    fear: "Medo central de não ser amado ou de ser indigno de amor se não ajudar.",
    strengths: "Generosidade, empatia, capacidade de perceber necessidades alheias e criar conexões genuínas.",
    challenges: "Dificuldade em dizer não, tendência a se anular em função dos outros e busca de validação através da ajuda prestada.",
    stress: "Sob estresse, pode se tornar possessivo(a), manipulador(a) emocionalmente ou ressentido(a) por não ser reconhecido(a).",
    security: "Em segurança, cuida também de si mesmo(a), reconhece as próprias necessidades e se permite receber, não só dar.",
    communication: "Comunicação calorosa, afetiva e voltada para o outro, muitas vezes antecipando necessidades antes mesmo de ouvir.",
    growth: "Aprender a reconhecer e comunicar as próprias necessidades, sem depender apenas de ajudar para se sentir valorizado(a).",
  },
  t3: {
    label: "O Realizador", color: "#C8A465", printColor: "#95751F",
    description: "Focado em resultados, eficiência e reconhecimento, adapta-se com facilidade para alcançar objetivos e projetar uma imagem de sucesso.",
    motivation: "Ser valioso(a) e admirado(a) através de conquistas e reconhecimento.",
    fear: "Medo central de ser sem valor caso não tenha sucesso ou reconhecimento.",
    strengths: "Eficiência, adaptabilidade, capacidade de motivar e liderar pelo exemplo, forte orientação a metas.",
    challenges: "Tendência a priorizar a imagem sobre a autenticidade, dificuldade em lidar com fracasso e risco de esgotamento pelo excesso de produtividade.",
    stress: "Sob estresse, pode se tornar competitivo(a) em excesso, desonesto(a) sobre resultados ou desconectado(a) das próprias emoções.",
    security: "Em segurança, valoriza mais a colaboração do que a competição, e se permite ser autêntico(a) mesmo sem estar \"performando\".",
    communication: "Comunicação persuasiva, direta e focada em resultados, com boa capacidade de adaptar o discurso à audiência.",
    growth: "Cultivar autenticidade além das conquistas — o valor pessoal não depende só de resultados visíveis.",
  },
  t4: {
    label: "O Individualista", color: "#8C6BA8", printColor: "#6B4F87",
    description: "Tem forte senso de identidade e originalidade, busca profundidade emocional e significado, e valoriza a expressão autêntica de quem é.",
    motivation: "Encontrar e expressar sua identidade única; ter significado.",
    fear: "Medo central de não ter identidade própria ou significância pessoal.",
    strengths: "Criatividade, profundidade emocional, autenticidade e capacidade de se conectar com o que é significativo.",
    challenges: "Oscilações de humor, tendência à comparação social e dificuldade em manter constância em rotinas e compromissos práticos.",
    stress: "Sob estresse, pode se isolar, intensificar a autocrítica ou se sentir incompreendido(a) e desconectado(a) dos outros.",
    security: "Em segurança, encontra equilíbrio emocional, se conecta com o presente e transforma a sensibilidade em criatividade produtiva.",
    communication: "Comunicação expressiva e emocionalmente rica, com forte desejo de ser compreendido(a) em sua individualidade.",
    growth: "Desenvolver constância emocional e conexão com o presente, sem depender de estados de ânimo intensos para se sentir vivo(a).",
  },
  t5: {
    label: "O Investigador", color: "#5C7DA0", printColor: "#3E5E82",
    description: "Observador, analítico e reservado, busca entender o mundo através do conhecimento, preferindo processar internamente antes de agir ou se expor.",
    motivation: "Ser competente e autossuficiente; entender o mundo ao redor.",
    fear: "Medo central de ser invadido(a), esvaziado(a) ou incapaz.",
    strengths: "Capacidade analítica, objetividade, independência e domínio profundo sobre temas de interesse.",
    challenges: "Tendência ao isolamento social, dificuldade em compartilhar emoções e resistência a se comprometer antes de sentir domínio total sobre o assunto.",
    stress: "Sob estresse, pode se afastar ainda mais das pessoas, tornar-se cínico(a) ou paralisar diante da necessidade de agir sem informação suficiente.",
    security: "Em segurança, participa mais ativamente, compartilha conhecimento com generosidade e se conecta emocionalmente com mais facilidade.",
    communication: "Comunicação concisa, factual e reservada, preferindo poucas palavras bem escolhidas a longas trocas emocionais.",
    growth: "Praticar maior presença e conexão emocional com outras pessoas, saindo do modo observação para o modo participação.",
  },
  t6: {
    label: "O Leal", color: "#4A7A8C", printColor: "#33596A",
    description: "Responsável, preparado e leal, busca segurança e apoio em estruturas, relações de confiança e planejamento cuidadoso diante de riscos.",
    motivation: "Ter segurança e apoio; sentir-se preparado(a) diante de ameaças.",
    fear: "Medo central de ficar sem apoio ou orientação diante do perigo.",
    strengths: "Responsabilidade, capacidade de antecipar riscos, lealdade e forte senso de equipe e cooperação.",
    challenges: "Tendência à ansiedade antecipatória, dificuldade em confiar plenamente e possível indecisão diante de escolhas importantes.",
    stress: "Sob estresse, pode se tornar mais ansioso(a), desconfiado(a) ou reativo(a) diante de qualquer sinal de instabilidade.",
    security: "Em segurança, desenvolve mais autoconfiança, toma decisões com mais tranquilidade e confia na própria capacidade de lidar com o imprevisto.",
    communication: "Comunicação cautelosa e engajada, frequentemente levantando perguntas e cenários antes de se posicionar.",
    growth: "Desenvolver mais confiança na própria capacidade de decisão, reduzindo a dependência excessiva de validação externa.",
  },
  t7: {
    label: "O Entusiasta", color: "#D9A44E", printColor: "#A87A2F",
    description: "Otimista, versátil e espontâneo, busca experiências novas e estimulantes, e tende a evitar o desconforto e a rotina.",
    motivation: "Manter-se feliz, livre e satisfeito(a); evitar a dor e o tédio.",
    fear: "Medo central de ficar preso(a) em limitações ou sofrimento.",
    strengths: "Otimismo, criatividade, energia contagiante e capacidade de encontrar soluções rápidas e inovadoras.",
    challenges: "Dificuldade em finalizar o que começa, tendência à dispersão e evitação de temas ou sentimentos desconfortáveis.",
    stress: "Sob estresse, pode ficar disperso(a) em excesso, impulsivo(a) ou fugir de responsabilidades e compromissos.",
    security: "Em segurança, desenvolve mais foco e profundidade, sustentando o entusiasmo também em tarefas de longo prazo.",
    communication: "Comunicação animada, rápida e cheia de ideias, às vezes mudando de assunto antes de esgotar o anterior.",
    growth: "Praticar permanecer com desconfortos e compromissos até o fim, em vez de buscar sempre a próxima novidade.",
  },
  t8: {
    label: "O Desafiador", color: "#BE7148", printColor: "#9C5A34",
    description: "Assertivo, direto e protetor, busca ter controle sobre a própria vida e proteger quem considera vulnerável, com forte senso de justiça.",
    motivation: "Ser autossuficiente e estar no controle da própria vida; proteger os seus.",
    fear: "Medo central de ser controlado(a) ou vulnerável a outros.",
    strengths: "Assertividade, coragem, capacidade de proteger e mobilizar pessoas, forte senso de justiça.",
    challenges: "Tendência ao confronto direto, dificuldade em mostrar vulnerabilidade e risco de intimidar pessoas ao seu redor sem perceber.",
    stress: "Sob estresse, pode se tornar mais controlador(a), confrontador(a) ou desconfiado(a) das intenções alheias.",
    security: "Em segurança, permite-se ser mais vulnerável, ouve mais antes de agir e usa a força a favor da colaboração, não do controle.",
    communication: "Comunicação direta, firme e sem rodeios, valorizando clareza e honestidade acima de diplomacia excessiva.",
    growth: "Praticar vulnerabilidade e escuta, reconhecendo que abrir espaço para os outros não é sinal de fraqueza.",
  },
  t9: {
    label: "O Pacificador", color: "#7C8C6B", printColor: "#5C6B4C",
    description: "Calmo, receptivo e conciliador, busca harmonia e evita conflitos, priorizando o bem-estar coletivo e a estabilidade nas relações.",
    motivation: "Manter a paz interna e externa; evitar conflitos.",
    fear: "Medo central de perda e separação; de gerar desarmonia.",
    strengths: "Capacidade de mediação, calma, aceitação e habilidade de unir pessoas e perspectivas diferentes.",
    challenges: "Tendência à procrastinação, dificuldade em se posicionar e priorizar as próprias necessidades diante das dos outros.",
    stress: "Sob estresse, pode se tornar mais passivo(a), teimoso(a) de forma silenciosa ou desconectado(a) das próprias prioridades.",
    security: "Em segurança, se torna mais assertivo(a), engajado(a) e capaz de agir com decisão sobre o que realmente importa para si.",
    communication: "Comunicação calma e conciliadora, buscando consenso e evitando posicionamentos que gerem atrito.",
    growth: "Praticar se posicionar ativamente diante de conflitos e prioridades próprias, em vez de se acomodar ao que os outros querem.",
  },
};

const EN_DIM_ORDER = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8", "t9"];

const EN_STATEMENTS = [
  { dim: "t1", text: "Presto muita atenção a detalhes e erros que outras pessoas costumam deixar passar." },
  { dim: "t1", text: "Sinto-me desconfortável quando as coisas não são feitas \"da forma certa\"." },
  { dim: "t1", text: "Sou bastante autocrítico(a) em relação ao meu próprio trabalho." },
  { dim: "t1", text: "Tenho um forte senso de certo e errado, e me incomodo quando vejo isso sendo ignorado." },
  { dim: "t2", text: "Costumo perceber rapidamente do que as outras pessoas precisam, mesmo antes de pedirem." },
  { dim: "t2", text: "Sinto satisfação genuína em ajudar alguém, mesmo sem nada em troca." },
  { dim: "t2", text: "Tenho dificuldade em pedir ajuda, mesmo quando preciso." },
  { dim: "t2", text: "Fico atento(a) aos sentimentos das pessoas ao meu redor, mesmo em conversas rápidas." },
  { dim: "t3", text: "Gosto de estabelecer metas claras e me esforço para alcançá-las com eficiência." },
  { dim: "t3", text: "Costumo pensar em como serei percebido(a) pelos outros diante de um resultado." },
  { dim: "t3", text: "Tenho facilidade em me adaptar para atingir o que preciso alcançar." },
  { dim: "t3", text: "Fico desconfortável quando não tenho uma meta clara para perseguir." },
  { dim: "t4", text: "Sinto que tenho uma forma única de ver e viver as coisas, diferente da maioria." },
  { dim: "t4", text: "Emoções intensas fazem parte do meu dia a dia, para o bem e para o mal." },
  { dim: "t4", text: "Busco significado profundo nas experiências, mais do que praticidade." },
  { dim: "t4", text: "Prefiro experiências autênticas a seguir o que é considerado convencional." },
  { dim: "t5", text: "Prefiro observar e entender uma situação antes de me envolver ativamente nela." },
  { dim: "t5", text: "Preciso de tempo sozinho(a) para recarregar as energias depois de muito contato social." },
  { dim: "t5", text: "Gosto de aprofundar meu conhecimento sobre temas que me interessam." },
  { dim: "t5", text: "Prefiro pensar bastante antes de compartilhar uma opinião publicamente." },
  { dim: "t6", text: "Costumo pensar em possíveis riscos antes de tomar uma decisão importante." },
  { dim: "t6", text: "Valorizo muito ter pessoas e estruturas de confiança ao meu redor." },
  { dim: "t6", text: "Tenho tendência a questionar intenções e buscar segurança antes de confiar totalmente." },
  { dim: "t6", text: "Gosto de ter um plano B para praticamente tudo." },
  { dim: "t7", text: "Gosto de manter várias opções e possibilidades em aberto." },
  { dim: "t7", text: "Evito me prender a rotinas ou situações que considero monótonas." },
  { dim: "t7", text: "Costumo ver o lado positivo das situações, mesmo nas mais difíceis." },
  { dim: "t7", text: "Fico entediado(a) com facilidade quando falta estímulo ou variedade." },
  { dim: "t8", text: "Gosto de ter controle sobre as decisões que afetam minha vida." },
  { dim: "t8", text: "Costumo ser direto(a) ao expressar minha opinião, mesmo que seja desconfortável." },
  { dim: "t8", text: "Sinto necessidade de proteger pessoas que considero mais vulneráveis." },
  { dim: "t8", text: "Não tenho medo de confrontar alguém quando acho que é necessário." },
  { dim: "t9", text: "Prefiro evitar conflitos e buscar um meio-termo entre as pessoas." },
  { dim: "t9", text: "Tenho facilidade em ver o ponto de vista de diferentes lados de uma discussão." },
  { dim: "t9", text: "Às vezes adio minhas próprias prioridades para manter a harmonia com os outros." },
  { dim: "t9", text: "Consigo me adaptar ao ritmo e às preferências das pessoas ao meu redor com facilidade." },
];

const EN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [1, 5, 6], [2, 3, 7],
  [0, 5, 7], [1, 3, 8], [2, 4, 6],
];

function buildEneagramaBlocks() {
  const statementsByType = {};
  EN_DIM_ORDER.forEach((d) => { statementsByType[d] = EN_STATEMENTS.filter((s) => s.dim === d); });
  const useCount = {};
  EN_DIM_ORDER.forEach((d) => { useCount[d] = 0; });

  return EN_LINES.map((line) => ({
    options: line.map((pointIdx) => {
      const type = EN_DIM_ORDER[pointIdx];
      const stmt = statementsByType[type][useCount[type]];
      useCount[type] += 1;
      return { type, text: stmt.text };
    }),
  }));
}

function scoreEneagrama(blocks, answers) {
  const net = {};
  EN_DIM_ORDER.forEach((d) => { net[d] = 0; });
  answers.forEach((a, i) => {
    const opts = blocks[i].options;
    net[opts[a.mais].type] += 1;
    net[opts[a.menos].type] -= 1;
  });
  const pct = {};
  EN_DIM_ORDER.forEach((d) => { pct[d] = Math.round(((net[d] + 4) / 8) * 100); });
  const ordered = EN_DIM_ORDER.slice().sort((a, b) => pct[b] - pct[a]);
  return { net, pct, ordered };
}

function generateEneagramaReport(candidate) {
  const [top1, top2] = candidate.ordered;
  const summary = `${candidate.name} apresenta maior identificação com o tipo ${EN_DIM_META[top1].label} (${candidate.pct[top1]}%), com tendência secundária ao tipo ${EN_DIM_META[top2].label} (${candidate.pct[top2]}%). A seguir, o detalhamento completo dos 9 tipos, ordenados do mais ao menos identificado.`;
  return { summary, all: candidate.ordered };
}

function buildEneagramaReportSections(candidate) {
  const report = generateEneagramaReport(candidate);
  return report.all.map((d, i) => {
    const m = EN_DIM_META[d];
    return `
      <div style="margin-bottom:24px;border-left:3px solid ${m.printColor};padding-left:16px;break-inside:avoid;">
        <p style="font-size:14.5px;font-weight:700;color:${m.printColor};margin:0 0 6px;">
          ${i + 1}º · ${m.label} <span style="font-weight:400;color:#6B6B6B;font-size:12px;">(${candidate.pct[d]}%)</span>
        </p>
        <p style="font-size:12.5px;line-height:1.7;margin:0 0 8px;color:#222;">${m.description}</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px 24px;font-size:11.5px;color:#4A4A4A;line-height:1.6;margin-bottom:8px;">
          <p style="margin:0;"><strong style="color:#222;">Motivação central:</strong> ${m.motivation}</p>
          <p style="margin:0;"><strong style="color:#222;">Medo central:</strong> ${m.fear}</p>
          <p style="margin:0;"><strong style="color:#222;">Pontos fortes:</strong> ${m.strengths}</p>
          <p style="margin:0;"><strong style="color:#222;">Desafios comuns:</strong> ${m.challenges}</p>
          <p style="margin:0;"><strong style="color:#222;">Sob estresse:</strong> ${m.stress}</p>
          <p style="margin:0;"><strong style="color:#222;">Em segurança:</strong> ${m.security}</p>
          <p style="margin:0;"><strong style="color:#222;">Comunicação:</strong> ${m.communication}</p>
          <p style="margin:0;"><strong style="color:#222;">Desenvolvimento:</strong> ${m.growth}</p>
        </div>
      </div>`;
  });
}

const ENEAGRAMA_CONFIG = Object.assign({}, KG_CONFIG, {
  testType: "Eneagrama",
  title: "Eneagrama",
  introText: "12 blocos rápidos. Em cada um, escolha a afirmação que mais combina e a que menos combina com você. Não existe resposta certa — responda com o que é mais natural para você.",
  logoSrc: "../assets/logo.png",
  logoDataUri: LOGO_DATA_URI,
  buildBlocks: buildEneagramaBlocks,
  scoreAnswers: scoreEneagrama,
  generateReport: generateEneagramaReport,
  buildReportSections: buildEneagramaReportSections,
  buildRadarData: (candidate) => EN_DIM_ORDER.map((d) => ({
    label: EN_DIM_META[d].label,
    pct: candidate.pct[d],
    color: EN_DIM_META[d].printColor,
  })),
});
