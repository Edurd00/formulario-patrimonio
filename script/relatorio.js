/* =========================================
   GOOGLE APPS SCRIPT URL
========================================= */
const URL = "https://script.google.com/macros/s/AKfycbxUK5XcWW_BiUu5EBOMCuqaKgbIo7TSMhz4cH-lPo0i0D6G9Zwrd8v4ZpSLNQmmp4jYtw/exec";

/* =========================================
   REGIÕES DO PROJETO (espelhando script.js)
========================================= */
const REGIOES = {
  "Grande Sao Paulo - SP": [
    "Sede Mundial", "Franco da Rocha - SP (T 16245)", "Guarulhos - SP (T 15937)",
    "Itaquaquecetuba - SP (T 15937)", "Maua - SP (T 9289)", "Mogi das Cruzes - SP (T 15968)",
    "Santo Andre - SP (T 9318)", "Sao Bernardo do Campo - SP (T 9325)", "Sao Mateus - SP (T 16037)",
    "Campo Limpo - SP (T 16588)", "Santo Amaro - SP (T 16883)", "Osasco - SP (T 16501)"
  ],
  "Interior - SP": [
    "Bauru - SP (T 13753)", "Campinas - SP (T 13901)", "Itapeva - SP (T 14339)",
    "Ribeirao Preto - SP (T 14463)", "Jundiai - SP (T 14661)", "Marilia - SP (T 14756)",
    "Piracicaba - SP (T 15104)", "Presidente Prudente - SP (T 15213)", "Registro - SP (T 15252)",
    "Sao Jose do Rio Preto - SP (T 15449)", "Sao Jose dos Campos - SP (T 15463)", "Sorocaba - SP (T 15551)"
  ],
  "Litoral - SP": ["Santos - SP (T 15392)"],
  "Espirito Santo": ["Estadual Vitoria - ES (T 17250)", "Estadual Linhares - ES (T 9740)"],
  "Rio de Janeiro": [
    "Estadual Sao Goncalo - RJ (T 12528)", "Estadual Campos dos Goytacazes - RJ (T 12720)",
    "Estadual Duque de Caxias - RJ (T 12765)", "Estadual Niteroi - RJ (T 13061)",
    "Estadual Nova Iguacu - RJ (T 13103)", "Estadual Petropolis - RJ (T 13166)",
    "Estadual Senador Pompeu - RJ (T 17263)", "Estadual Campo Grande - RJ (T 12704)"
  ],
  "Minas Gerais": [
    "Estadual Gameleira - Cabana - MG (T 10248)", "Estadual Belo Horizonte - Guaicurus - MG (T 10848)",
    "Estadual Governador Valadares - MG (T 10808)", "Estadual Juiz de Fora - MG (T 11074)",
    "Estadual Muriae - MG (T 11548)", "Estadual Uberlandia - MG (T 12374)",
    "Estadual Montes Claros - MG (T 11502)"
  ],
  "Norte": [
    "AC - Cruzeiro do Sul (T 7468)", "AC - Rio Branco (T 17290)", "AM - Manaus (T 17290)",
    "AM - Tabatinga (T 7874)", "AM - Tefe (T 7881)", "AM - Tonantins (T 7897)",
    "PA - Breves (T 8141)", "PA - Itaituba (T 8339)", "PA - Maraba (T 8431)",
    "PA - Belem (T 17268)", "PA - Santarem (T 8706)", "RO - Ji Parana (T 8901)",
    "RO - Porto Velho (T 8933)", "TO - Palmas (T 9162)", "AP - Macapa (T 7932)",
    "RR - Boa Vista (T 17226)"
  ],
  "Nordeste": [
    "Maceio (T 4760)", "Salvador (T 5624)", "Teixeira de Freitas (T 5786)",
    "Vitoria da Conquista (T 5851)", "Juazeiro do Norte (T 6047)", "Fortaleza (T 6082)",
    "Sobral (T 6388)", "Balsas (T 6430)", "Imperatriz (T 6456)", "Sao Luis (T 6547)",
    "Campina Grande (T 6595)", "Joao Pessoa (T 6642)", "Petrolina (T 6895)",
    "Natal (T 7167)", "Aracaju (T 17229)", "Recife (T 17273)", "Teresina (T 17274)"
  ],
  "Centro-Oeste": [
    "Estadual Brasilia - DF (T 3408)", "Estadual Goiania - GO (T 3575)",
    "Estadual Campo Grande - MS (T 4232)", "Estadual Confresa - MT (T 4533)",
    "Estadual Cuiaba - MT (T 4554)"
  ],
  "Regiao Sul": [
    "Estadual Cascavel - PR (T 241)", "Estadual Curitiba - PR (T 363)",
    "Estadual Guarapuava - PR (T 509)", "Estadual Londrina - PR (T 748)",
    "Estadual Ponta Grossa - PR (T 988)", "Estadual Caxias do Sul - RS (T 1554)",
    "Estadual Passo Fundo - RS (T 1944)", "Estadual Pelotas - RS (T 1976)",
    "Estadual Santana do Livramento - RS (T 2093)", "Estadual Porto Alegre - RS (T 17262)",
    "Estadual Santa Maria - RS (T 17591)", "Estadual Chapeco - SC (T 2584)",
    "Estadual Florianopolis - SC (T 2933)", "Estadual Lages - SC (T 3033)",
    "Estadual Joinville - SC (T 3122)"
  ]
};

/* =========================================
   ELEMENTOS DO PAINEL PRINCIPAL
========================================= */
const btnGerarRelatorio = document.getElementById("btn-gerar-relatorio");
const btnExportarPdf = document.getElementById("btn-exportar-pdf");
const totvsRelatorio = document.getElementById("totvsRelatorio");
const mensagemRelatorio = document.getElementById("mensagem-relatorio");

function exibirMensagemRelatorio(texto, tipo) {
  if (!mensagemRelatorio) return;
  mensagemRelatorio.innerText = texto;
  mensagemRelatorio.className = `mensagem-status ${tipo}`;
  mensagemRelatorio.style.display = "block";
}

function exibirMensagemRelatorioComLink(texto, tipo, textoLink, url) {
  if (!mensagemRelatorio) return;
  mensagemRelatorio.innerText = "";
  mensagemRelatorio.className = `mensagem-status ${tipo}`;
  mensagemRelatorio.style.display = "block";
  mensagemRelatorio.appendChild(document.createTextNode(texto + " "));
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.innerText = textoLink;
  mensagemRelatorio.appendChild(link);
}

if (totvsRelatorio) {
  totvsRelatorio.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "").slice(0, 5);
  });
}

async function executarAcaoRelatorio(acao, botao, textoProcessando) {
  const codigo = totvsRelatorio.value.trim();
  if (codigo.length < 1 || codigo.length > 5) {
    exibirMensagemRelatorio("Informe um código TOTVS válido com até 5 dígitos.", "erro");
    totvsRelatorio.focus();
    return;
  }
  const textoOriginal = botao.innerText;
  botao.disabled = true;
  botao.innerText = textoProcessando;
  exibirMensagemRelatorio("Consultando o banco de dados...", "aviso");
  try {
    const resposta = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ acao, totvs: codigo })
    });
    const textoResposta = await resposta.text();
    let resultado;
    try { resultado = JSON.parse(textoResposta); }
    catch (parseError) {
      console.error("Resposta inválida:", textoResposta);
      throw new Error("O servidor retornou dados inválidos. Verifique se o Apps Script foi autorizado.");
    }
    if (!resultado.sucesso) throw new Error(resultado.mensagem || "Não foi possível concluir a solicitação.");
    exibirMensagemRelatorio(resultado.mensagem || "Operação concluída com sucesso.", "sucesso");
    if (resultado.dados && resultado.dados.url) window.open(resultado.dados.url, "_blank");
    if (resultado.dados && resultado.dados.pastaUrl) {
      exibirMensagemRelatorioComLink(
        "PDF salvo na pasta " + resultado.dados.pasta + ".",
        "sucesso", "Abrir pasta no Drive", resultado.dados.pastaUrl
      );
    }
  } catch (erro) {
    exibirMensagemRelatorio(erro.message || "Erro ao conectar com o Apps Script.", "erro");
  } finally {
    botao.disabled = false;
    botao.innerText = textoOriginal;
  }
}

if (btnGerarRelatorio) {
  btnGerarRelatorio.addEventListener("click", function () {
    executarAcaoRelatorio("gerarRelatorio", btnGerarRelatorio, "Gerando...");
  });
}
if (btnExportarPdf) {
  btnExportarPdf.addEventListener("click", function () {
    executarAcaoRelatorio("exportarPdf", btnExportarPdf, "Exportando...");
  });
}

/* =========================================
   LISTAGEM E FILTROS DE IGREJAS
========================================= */
const listaIgrejasContainer = document.getElementById("lista-igrejas-container");
let todasIgrejas = [];
let igrejasFiltradas = [];
let paginaAtual = 1;
const itensPorPagina = 50;
let dadosFiltrados = [];

/** Normaliza string removendo acentos e maiúsculas para comparação */
function normalizar(str) {
  return String(str || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/** Converte string de data brasileira em objeto Date do JS */
function converterDataBr(dataStr) {
  if (!dataStr) return null;

  const strLimpa = String(dataStr).trim();

  // Se for formato ISO (contém hífen, ex: 2026-07-15...)
  if (strLimpa.includes("-")) {
    const apenasDataIso = strLimpa.split("T")[0];
    const partesIso = apenasDataIso.split("-");
    if (partesIso.length === 3) {
      return new Date(
        parseInt(partesIso[0], 10),
        parseInt(partesIso[1], 10) - 1,
        parseInt(partesIso[2], 10),
        0, 0, 0
      );
    }
  }

  // Se for formato Brasileiro (contém barra, ex: 15/07/2026...)
  const apenasDataBr = strLimpa.split(" ")[0];
  const partesBr = apenasDataBr.split("/");
  if (partesBr.length === 3) {
    return new Date(
      parseInt(partesBr[2], 10),
      parseInt(partesBr[1], 10) - 1,
      parseInt(partesBr[0], 10),
      0, 0, 0
    );
  }

  return null;
}

/** Popula o select de regiões no filtro de igrejas com todas as regiões do projeto */
function popularFiltroRegioes() {
  const selectRegiao = document.getElementById("filtro-regiao-igrejas");
  if (!selectRegiao) return;
  selectRegiao.innerHTML = '<option value="">Todas as Regiões</option>';
  Object.keys(REGIOES).forEach(regiao => {
    const opt = document.createElement("option");
    opt.value = regiao;
    opt.textContent = regiao;
    selectRegiao.appendChild(opt);
  });
}

/** Atualiza o select de estaduais no filtro de igrejas com base na região selecionada */
function atualizarFiltroEstaduais() {
  const selectRegiao = document.getElementById("filtro-regiao-igrejas");
  const selectEstadual = document.getElementById("filtro-estadual-igrejas");
  if (!selectEstadual) return;

  const regiaoSelecionada = selectRegiao ? selectRegiao.value : "";
  const valorAnterior = selectEstadual.value;

  selectEstadual.innerHTML = '<option value="">Todas as Estaduais</option>';

  let estaduaisParaMostrar = [];
  if (regiaoSelecionada && REGIOES[regiaoSelecionada]) {
    estaduaisParaMostrar = REGIOES[regiaoSelecionada];
  } else {
    // Se não há região selecionada, mostra todas as estaduais de todas as regiões
    Object.keys(REGIOES).forEach(reg => {
      estaduaisParaMostrar = estaduaisParaMostrar.concat(REGIOES[reg]);
    });
  }

  // Remove duplicados e ordena em ordem alfabética
  const estaduaisUnicos = [...new Set(estaduaisParaMostrar)].sort();

  estaduaisUnicos.forEach(est => {
    const opt = document.createElement("option");
    opt.value = est;
    opt.textContent = est;
    selectEstadual.appendChild(opt);
  });

  // Tenta restaurar a seleção anterior se ela ainda existir na lista
  if (valorAnterior && estaduaisUnicos.includes(valorAnterior)) {
    selectEstadual.value = valorAnterior;
  } else {
    selectEstadual.value = "";
  }
}

/** Exporta as igrejas filtradas atuais para um arquivo CSV formatado para Excel */
function exportarParaCSV() {
  if (igrejasFiltradas.length === 0) {
    alert("Não há dados filtrados para exportar.");
    return;
  }

  // Cabeçalhos das colunas
  const colunas = ["TOTVS", "Regiao", "Estadual", "Dirigente", "Telefone", "Endereco", "Data Cadastro"];

  // Linhas do CSV
  const linhas = [];

  // Adiciona os cabeçalhos
  linhas.push(colunas.join(";"));

  // Adiciona cada igreja filtrada
  igrejasFiltradas.forEach(igreja => {
    const dados = [
      igreja.totvs || "",
      igreja.regiao || "",
      igreja.estadual || "",
      igreja.dirigente || "",
      igreja.telefone || "",
      igreja.endereco || "",
      igreja.dataCadastro || ""
    ];

    // Trata aspas duplas e quebras de linha para evitar quebrar o CSV
    const dadosTratados = dados.map(valor => {
      let texto = String(valor).replace(/"/g, '""');
      if (texto.includes(";") || texto.includes("\n") || texto.includes("\r")) {
        texto = `"${texto}"`;
      }
      return texto;
    });

    linhas.push(dadosTratados.join(";"));
  });

  // Une todas as linhas com quebra de linha do Windows (\r\n) para máxima compatibilidade com o Excel
  const conteudoCSV = "\ufeff" + linhas.join("\r\n"); // \ufeff é o UTF-8 BOM

  // Cria o blob e faz o download do arquivo
  const blob = new Blob([conteudoCSV], { type: "text/csv;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");

  // Nome do arquivo com timestamp para evitar substituição
  const dataFormatada = new Date().toISOString().slice(0, 10);
  link.setAttribute("href", url);
  link.setAttribute("download", `relatorio_igrejas_${dataFormatada}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/** Atualiza o dashboard de KPIs dinamicamente com base nos dados filtrados */
function atualizarKpis(dadosFiltrados) {
  const container = document.getElementById("kpi-dashboard");
  if (!container) return;

  // Métrica 1: Total de Igrejas
  const totalIgrejas = dadosFiltrados.length;

  // Métrica 2: Estaduais Únicas
  const estaduaisUnicas = new Set();
  dadosFiltrados.forEach(igreja => {
    if (igreja.estadual) {
      estaduaisUnicas.add(igreja.estadual.trim());
    }
  });
  const totalEstaduais = estaduaisUnicas.size;

  // Métrica 3: Cadastros Recentes (Últimos 7 dias)
  const hoje = new Date();
  hoje.setHours(23, 59, 59, 999);

  const limiteSeteDias = new Date(hoje);
  limiteSeteDias.setDate(hoje.getDate() - 7);
  limiteSeteDias.setHours(0, 0, 0, 0);

  console.log("Debug KPI - Período de busca:", limiteSeteDias.toLocaleDateString('pt-BR'), "até", hoje.toLocaleDateString('pt-BR'));

  const recentes = dadosFiltrados.filter((item, index) => {
    const dataCrua = item.dataCadastro;

    if (index === 0) {
      console.log("Debug KPI - Exemplo de dado bruto recebido da planilha:", item);
      console.log("Debug KPI - Campo de data detectado:", dataCrua);
    }

    const dataItem = converterDataBr(dataCrua);
    if (!dataItem) return false;

    const estaNoPeriodo = dataItem >= limiteSeteDias && dataItem <= hoje;
    return estaNoPeriodo;
  });

  console.log("Debug KPI - Quantidade de cadastros recentes encontrados:", recentes.length);

  const cadastrosRecentes = recentes.length;

  // Métrica 4: Região com Mais Templos
  const contagemRegiao = {};
  dadosFiltrados.forEach(igreja => {
    if (igreja.regiao) {
      const reg = igreja.regiao.trim();
      contagemRegiao[reg] = (contagemRegiao[reg] || 0) + 1;
    }
  });

  let regiaoMaisTemplos = "-";
  let maxTemplos = 0;
  for (const [reg, qtd] of Object.entries(contagemRegiao)) {
    if (qtd > maxTemplos) {
      maxTemplos = qtd;
      regiaoMaisTemplos = reg;
    }
  }

  const regiaoExibicao = maxTemplos > 0 ? regiaoMaisTemplos : "Nenhuma";

  container.innerHTML = `
    <div class="kpi-card">
      <div class="kpi-info">
        <span class="kpi-value">${totalIgrejas}</span>
        <span class="kpi-label">Total de Igrejas</span>
      </div>
      <i class="fa-solid fa-church kpi-icon"></i>
    </div>
    <div class="kpi-card">
      <div class="kpi-info">
        <span class="kpi-value">${totalEstaduais}</span>
        <span class="kpi-label">Estaduais Únicas</span>
      </div>
      <i class="fa-solid fa-map-location-dot kpi-icon"></i>
    </div>
    <div class="kpi-card">
      <div class="kpi-info">
        <span class="kpi-value">${cadastrosRecentes}</span>
        <span class="kpi-label">Cadastros Recentes</span>
      </div>
      <i class="fa-solid fa-calendar-days kpi-icon"></i>
    </div>
    <div class="kpi-card">
      <div class="kpi-info">
        <span class="kpi-value" style="font-size: ${regiaoExibicao.length > 20 ? '16px' : regiaoExibicao.length > 15 ? '18px' : '22px'};">${regiaoExibicao}</span>
        <span class="kpi-label">Região Líder</span>
      </div>
      <i class="fa-solid fa-trophy kpi-icon"></i>
    </div>
  `;
}

/* =========================================
   GESTÃO DE PATRIMÔNIO - ABAS E CONSOLIDAÇÃO
========================================= */
let todosPatrimonios = [];

const MAPA_CATEGORIAS = {
  // Mobiliário e Estrutura
  "banco": "Mobiliário e Estrutura", "cadeira": "Mobiliário e Estrutura", "bebedourofiltro": "Mobiliário e Estrutura",
  "armario": "Mobiliário e Estrutura", "mesa": "Mobiliário e Estrutura", "cofrebocalobo": "Mobiliário e Estrutura",
  "pulpito": "Mobiliário e Estrutura", "bancos": "Mobiliário e Estrutura", "cadeiras": "Mobiliário e Estrutura",
  "bebedouro ou filtro": "Mobiliário e Estrutura", "armário": "Mobiliário e Estrutura", "cofre boca de lobo": "Mobiliário e Estrutura",
  "púlpito": "Mobiliário e Estrutura",

  // Eletrônicos e Climatização
  "ar": "Eletrônicos e Climatização", "ventilador": "Eletrônicos e Climatização", "computador": "Eletrônicos e Climatização",
  "impressora": "Eletrônicos e Climatização", "projetor": "Eletrônicos e Climatização", "telaprojetor": "Eletrônicos e Climatização",
  "telefonepatrimonio": "Eletrônicos e Climatização", "celular": "Eletrônicos e Climatização", "cameraseguranca": "Eletrônicos e Climatização",
  "ar condicionado": "Eletrônicos e Climatização", "ventiladores": "Eletrônicos e Climatização", "tela de projetor": "Eletrônicos e Climatização",
  "telefone": "Eletrônicos e Climatização", "câmera de segurança": "Eletrônicos e Climatização",

  // Som e Instrumentos
  "microfone": "Som e Instrumentos", "caixasom": "Som e Instrumentos", "mesasom": "Som e Instrumentos",
  "violao": "Som e Instrumentos", "guitarra": "Som e Instrumentos", "bateria": "Som e Instrumentos",
  "contrabaixo": "Som e Instrumentos", "teclado": "Som e Instrumentos", "caixas de som": "Som e Instrumentos",
  "mesa de som": "Som e Instrumentos", "violão": "Som e Instrumentos",

  // Cozinha e Segurança
  "freezer": "Cozinha e Segurança", "geladeira": "Cozinha e Segurança", "fogao": "Cozinha e Segurança",
  "botijao": "Cozinha e Segurança", "microondas": "Cozinha e Segurança", "extintor": "Cozinha e Segurança",
  "fogão": "Cozinha e Segurança", "botijão": "Cozinha e Segurança", "micro-ondas": "Cozinha e Segurança"
};

/** Atualiza a nova interface consolidada de Gestão de Patrimônio */
function atualizarGestaoPatrimonio(dadosFiltrados) {
  const totvsFiltradosMap = {};

  // Proteção contra dados vazios passados para a função
  if (!Array.isArray(dadosFiltrados)) return;

  dadosFiltrados.forEach(igreja => {
    if (igreja && igreja.totvs) {
      totvsFiltradosMap[igreja.totvs] = igreja;
    }
  });

  // GARGALO CORRIGIDO: Garante que tratamos todosPatrimonios como array válido
  const arrayPatrimonios = Array.isArray(todosPatrimonios) ? todosPatrimonios : [];

  const patrimoniosFiltrados = arrayPatrimonios.filter(p => {
    return p && p.totvs && totvsFiltradosMap[p.totvs] !== undefined;
  });

  // KPIs de Ativos
  let totalItens = 0;
  let estadoCritico = 0;

  patrimoniosFiltrados.forEach(p => {
    const qtd = parseInt(p.quantidade, 10) || 0;
    totalItens += qtd;

    const conservacao = String(p.conservacao || "").toLowerCase().trim();
    if (conservacao === "ruim") {
      estadoCritico += qtd;
    }
  });

  const totalTemplos = dadosFiltrados.length;
  const mediaPorTemplo = totalTemplos > 0 ? (totalItens / totalTemplos).toFixed(1) : "0.0";

  const containerKpis = document.getElementById("kpi-patrimonio-dashboard");
  if (containerKpis) {
    containerKpis.innerHTML = `
      <div class="kpi-card" style="border-left-color: #10b981;">
        <div class="kpi-info">
          <span class="kpi-value">${totalItens}</span>
          <span class="kpi-label">Total de Itens</span>
        </div>
        <i class="fa-solid fa-boxes-stacked kpi-icon" style="color: #10b981;"></i>
      </div>
      <div class="kpi-card" style="border-left-color: #ef4444;">
        <div class="kpi-info">
          <span class="kpi-value">${estadoCritico}</span>
          <span class="kpi-label">Estado Crítico (Ruim)</span>
        </div>
        <i class="fa-solid fa-triangle-exclamation kpi-icon" style="color: #ef4444;"></i>
      </div>
      <div class="kpi-card" style="border-left-color: #f59e0b;">
        <div class="kpi-info">
          <span class="kpi-value">${mediaPorTemplo}</span>
          <span class="kpi-label">Média p/ Templo</span>
        </div>
        <i class="fa-solid fa-calculator kpi-icon" style="color: #f59e0b;"></i>
      </div>
    `;
  }

  // Tabela de Consolidação
  const selectRegiao = document.getElementById("filtro-regiao-igrejas");
  const regiaoFiltro = selectRegiao ? selectRegiao.value : "";

  const tbody = document.getElementById("tbody-consolidado-patrimonio");
  const thead = document.querySelector("#tabela-consolidada-patrimonio thead");
  if (!tbody || !thead) return;

  const rowLabel = regiaoFiltro ? "Igreja congregação" : "Região";
  thead.innerHTML = `
    <tr>
      <th>${rowLabel}</th>
      <th><i class="fa-solid fa-chair"></i> Mobiliário</th>
      <th><i class="fa-solid fa-bolt"></i> Eletrônicos</th>
      <th><i class="fa-solid fa-guitar"></i> Som & Instrumentos</th>
      <th><i class="fa-solid fa-kitchen-set"></i> Cozinha & Seg.</th>
      <th><i class="fa-solid fa-plus"></i> Adicionais</th>
      <th>Total Geral</th>
    </tr>
  `;

  const agregados = {};

  patrimoniosFiltrados.forEach(p => {
    const igreja = totvsFiltradosMap[p.totvs];
    if (!igreja) return;

    const rowKey = regiaoFiltro ? `${igreja.totvs} - ${igreja.dirigente || 'Igreja'}` : (igreja.regiao || "Outros");
    const qtd = parseInt(p.quantidade, 10) || 0;

    const nomeNormalizado = normalizar(p.patrimonio);
    let cat = MAPA_CATEGORIAS[nomeNormalizado] || "Itens adicionais";

    if (!agregados[rowKey]) {
      agregados[rowKey] = {
        "Mobiliário e Estrutura": 0,
        "Eletrônicos e Climatização": 0,
        "Som e Instrumentos": 0,
        "Cozinha e Segurança": 0,
        "Itens adicionais": 0,
        "total": 0
      };
    }

    agregados[rowKey][cat] += qtd;
    agregados[rowKey]["total"] += qtd;
  });

  if (Object.keys(agregados).length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: #777; padding: 25px;">
          Nenhum patrimônio cadastrado encontrado para os filtros aplicados.
        </td>
      </tr>
    `;
    return;
  }

  if (!regiaoFiltro) {
    Object.keys(REGIOES).forEach(reg => {
      if (!agregados[reg]) {
        agregados[reg] = {
          "Mobiliário e Estrutura": 0,
          "Eletrônicos e Climatização": 0,
          "Som e Instrumentos": 0,
          "Cozinha e Segurança": 0,
          "Itens adicionais": 0,
          "total": 0
        };
      }
    });
  }

  const chavesOrdenadas = Object.keys(agregados).sort();

  let htmlRows = "";
  chavesOrdenadas.forEach(key => {
    const data = agregados[key];
    htmlRows += `
      <tr>
        <td><strong>${key}</strong></td>
        <td>${data["Mobiliário e Estrutura"]}</td>
        <td>${data["Eletrônicos e Climatização"]}</td>
        <td>${data["Som e Instrumentos"]}</td>
        <td>${data["Cozinha e Segurança"]}</td>
        <td>${data["Itens adicionais"]}</td>
        <td style="color:#24348c; font-weight:700;">${data["total"]}</td>
      </tr>
    `;
  });

  tbody.innerHTML = htmlRows;
}

/** Renderiza a tabela de igrejas (filtrada ou completa) de forma paginada */
function renderizarTabela(igrejas) {
  if (!listaIgrejasContainer) return;

  // Atualiza os KPIs dinamicamente
  atualizarKpis(igrejas);

  // Atualiza a gestão de patrimônio dinamicamente
  atualizarGestaoPatrimonio(igrejas);

  const contagem = document.getElementById("contagem-igrejas");
  if (contagem) {
    contagem.textContent = `${igrejas.length} ${igrejas.length === 1 ? "igreja cadastrada" : "igrejas cadastradas"}`;
  }

  if (igrejas.length === 0) {
    listaIgrejasContainer.innerHTML = `
      <p style="text-align:center; color:#999; padding:30px 0; font-size:15px;">
        🔍 Nenhuma igreja encontrada para os filtros aplicados.
      </p>`;
    const pagContainer = document.getElementById("paginacao-container");
    if (pagContainer) pagContainer.innerHTML = "";
    return;
  }

  // Paginação: calcula os limites de exibição
  const inicio = (paginaAtual - 1) * itensPorPagina;
  const fim = inicio + itensPorPagina;
  const dadosExibidos = igrejas.slice(inicio, fim);

  let html = `
    <table class="tabela-dinamica">
      <thead>
        <tr>
          <th>TOTVS</th>
          <th>Região</th>
          <th>Estadual</th>
          <th>Dirigente</th>
          <th style="text-align:center;">Ações</th>
        </tr>
      </thead>
      <tbody>
  `;

  dadosExibidos.forEach(igreja => {
    html += `
      <tr>
        <td><strong>${igreja.totvs || '-'}</strong></td>
        <td>${igreja.regiao || '-'}</td>
        <td>${igreja.estadual || '-'}</td>
        <td>${igreja.dirigente || '-'}</td>
        <td style="text-align:center;">
          <div style="display:flex; gap:6px; justify-content:center; flex-wrap:wrap;">
            <button class="btn-tabela"
              onclick="exibirDetalhesIgreja('${igreja.totvs}', this)"
              style="background-color:#24348c; color:white; padding:6px 12px; font-size:12px; border-radius:6px; width:auto;">
              🔍 Ver Detalhes
            </button>
            <button class="btn-tabela"
              onclick="gerarPdfTabela('${igreja.totvs}', this)"
              style="background-color:#0f766e; color:white; padding:6px 12px; font-size:12px; border-radius:6px; width:auto;">
              📄 PDF
            </button>
          </div>
        </td>
      </tr>
    `;
  });

  html += '</tbody></table>';
  listaIgrejasContainer.innerHTML = html;

  // Desenha os botões de paginação abaixo da tabela
  renderizarControlesPaginacao(igrejas.length);
}

/** Desenha os botões de controle de paginação abaixo da tabela */
function renderizarControlesPaginacao(totalItens) {
  const pagContainer = document.getElementById("paginacao-container");
  if (!pagContainer) return;

  pagContainer.innerHTML = "";
  const totalPaginas = Math.ceil(totalItens / itensPorPagina);

  // Se houver apenas 1 página ou nenhuma, não precisa exibir os botões
  if (totalPaginas <= 1) return;

  // Botão "Anterior"
  const btnAnterior = document.createElement("button");
  btnAnterior.className = "pag-btn";
  btnAnterior.innerText = "« Anterior";
  btnAnterior.disabled = paginaAtual === 1;
  btnAnterior.addEventListener("click", () => {
    if (paginaAtual > 1) {
      paginaAtual--;
      renderizarTabela(dadosFiltrados);
      rolarParaTabela();
    }
  });
  pagContainer.appendChild(btnAnterior);

  // Números das páginas (com limite inteligente para telas de celular)
  const maxBotoesVisiveis = 5;
  let pagInicio = Math.max(1, paginaAtual - Math.floor(maxBotoesVisiveis / 2));
  let pagFim = Math.min(totalPaginas, pagInicio + maxBotoesVisiveis - 1);

  if (pagFim - pagInicio + 1 < maxBotoesVisiveis) {
    pagInicio = Math.max(1, pagFim - maxBotoesVisiveis + 1);
  }

  if (pagInicio > 1) {
    const btnPrimeira = document.createElement("button");
    btnPrimeira.className = "pag-btn";
    btnPrimeira.innerText = "1";
    btnPrimeira.addEventListener("click", () => {
      paginaAtual = 1;
      renderizarTabela(dadosFiltrados);
      rolarParaTabela();
    });
    pagContainer.appendChild(btnPrimeira);

    if (pagInicio > 2) {
      const reticencias = document.createElement("span");
      reticencias.innerText = "...";
      reticencias.style.color = "#777";
      reticencias.style.margin = "0 4px";
      pagContainer.appendChild(reticencias);
    }
  }

  for (let i = pagInicio; i <= pagFim; i++) {
    const btnPag = document.createElement("button");
    btnPag.className = `pag-btn ${i === paginaAtual ? "ativo" : ""}`;
    btnPag.innerText = i;
    btnPag.addEventListener("click", () => {
      paginaAtual = i;
      renderizarTabela(dadosFiltrados);
      rolarParaTabela();
    });
    pagContainer.appendChild(btnPag);
  }

  if (pagFim < totalPaginas) {
    if (pagFim < totalPaginas - 1) {
      const reticencias = document.createElement("span");
      reticencias.innerText = "...";
      reticencias.style.color = "#777";
      reticencias.style.margin = "0 4px";
      pagContainer.appendChild(reticencias);
    }

    const btnUltima = document.createElement("button");
    btnUltima.className = "pag-btn";
    btnUltima.innerText = totalPaginas;
    btnUltima.addEventListener("click", () => {
      paginaAtual = totalPaginas;
      renderizarTabela(dadosFiltrados);
      rolarParaTabela();
    });
    pagContainer.appendChild(btnUltima);
  }

  // Botão "Próximo"
  const btnProximo = document.createElement("button");
  btnProximo.className = "pag-btn";
  btnProximo.innerText = "Próximo »";
  btnProximo.disabled = paginaAtual === totalPaginas;
  btnProximo.addEventListener("click", () => {
    if (paginaAtual < totalPaginas) {
      paginaAtual++;
      renderizarTabela(dadosFiltrados);
      rolarParaTabela();
    }
  });
  pagContainer.appendChild(btnProximo);
}

/** Faz scroll suave até o topo da tabela de igrejas */
function rolarParaTabela() {
  const containerTabela = document.getElementById("lista-igrejas-container");
  if (containerTabela) {
    containerTabela.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

/** Aplica os filtros de busca, região e estadual sobre todasIgrejas */
function aplicarFiltros() {
  const termoBusca = normalizar(
    (document.getElementById("filtro-igrejas") || {}).value || ""
  );
  const regiaoSelecionada = normalizar(
    (document.getElementById("filtro-regiao-igrejas") || {}).value || ""
  );
  const estadualSelecionada = normalizar(
    (document.getElementById("filtro-estadual-igrejas") || {}).value || ""
  );

  paginaAtual = 1; // Reseta para a página 1 ao filtrar

  const filtradas = todasIgrejas.filter(igreja => {
    // Evita crash se o registro estiver vazio ou nulo na planilha
    if (!igreja) return false;

    const matchBusca = !termoBusca || [
      igreja.totvs, igreja.regiao, igreja.estadual, igreja.dirigente, igreja.endereco
    ].some(campo => campo && normalizar(campo).includes(termoBusca));

    const matchRegiao = !regiaoSelecionada || normalizar(igreja.regiao) === regiaoSelecionada;

    const matchEstadual = !estadualSelecionada || normalizar(igreja.estadual) === estadualSelecionada;

    return matchBusca && matchRegiao && matchEstadual;
  });

  dadosFiltrados = filtradas;
  igrejasFiltradas = filtradas;
  renderizarTabela(dadosFiltrados);
}

/** Carrega as igrejas da API e inicializa os filtros */
async function listarIgrejas() {
  if (!listaIgrejasContainer) return;

  listaIgrejasContainer.innerHTML = `
    <p style="text-align:center; color:#666; font-size:14px; padding:30px 0;">
      ⏳ Carregando dados do Google Planilhas...
    </p>`;

  try {
    const resposta = await fetch(`${URL}?acao=listar_igrejas&_t=${new Date().getTime()}`);
    const textoResposta = await resposta.text();
    let resultado;
    try { resultado = JSON.parse(textoResposta); }
    catch (parseError) {
      console.error("Resposta inválida na listagem:", textoResposta);
      listaIgrejasContainer.innerHTML = `
        <p class="erro" style="text-align:center; padding:30px 0;">
          ❌ O servidor retornou dados inválidos. Verifique se o Apps Script foi autorizado.
        </p>`;
      return;
    }

    if (!resultado.sucesso) {
      listaIgrejasContainer.innerHTML = `
        <p class="erro" style="text-align:center; padding:30px 0;">
          ❌ Erro no Apps Script: ${resultado.mensagem}
        </p>`;
      return;
    }

    // Suporte a múltiplos formatos de resposta
    let igrejas = [];
    if (resultado.dados) {
      if (Array.isArray(resultado.dados)) {
        igrejas = resultado.dados;
      } else if (resultado.dados.dados && Array.isArray(resultado.dados.dados)) {
        igrejas = resultado.dados.dados;
      }
    }

    todasIgrejas = igrejas;
    dadosFiltrados = igrejas;
    igrejasFiltradas = igrejas;
    paginaAtual = 1;

    if (igrejas.length === 0) {
      listaIgrejasContainer.innerHTML = `
        <p style="text-align:center; color:#999; padding:30px 0;">
          Nenhum registro encontrado nas Planilhas Regionais.
        </p>`;
      const contagem = document.getElementById("contagem-igrejas");
      if (contagem) contagem.textContent = "0 igrejas cadastradas";
      return;
    }

    // Carrega também a lista consolidada de patrimônios com tratamento de dados robusto
    try {
      const respPatrimonio = await fetch(`${URL}?acao=listar_patrimonios&_t=${new Date().getTime()}`);
      const textPatrimonio = await respPatrimonio.text();
      const resPatrimonio = JSON.parse(textPatrimonio);

      if (resPatrimonio.sucesso && resPatrimonio.dados) {
        // Garante a extração do array mesmo em múltiplos formatos de retorno do Apps Script
        if (Array.isArray(resPatrimonio.dados)) {
          todosPatrimonios = resPatrimonio.dados;
        } else if (resPatrimonio.dados.dados && Array.isArray(resPatrimonio.dados.dados)) {
          todosPatrimonios = resPatrimonio.dados.dados;
        } else {
          todosPatrimonios = [];
        }
      } else {
        todosPatrimonios = [];
      }
    } catch (errPatrimonio) {
      console.error("Erro ao carregar lista de patrimônios:", errPatrimonio);
      todosPatrimonios = []; // Fallback seguro para evitar que fique undefined
    }

    // Popula o filtro de regiões e de estaduais e renderiza a tabela
    popularFiltroRegioes();
    atualizarFiltroEstaduais();
    renderizarTabela(dadosFiltrados);

    // Ativa os listeners dos filtros
    const inputBusca = document.getElementById("filtro-igrejas");
    const selectRegiao = document.getElementById("filtro-regiao-igrejas");
    const selectEstadual = document.getElementById("filtro-estadual-igrejas");

    if (inputBusca) {
      inputBusca.addEventListener("input", aplicarFiltros);
    }
    if (selectRegiao) {
      selectRegiao.addEventListener("change", () => {
        atualizarFiltroEstaduais();
        aplicarFiltros();
      });
    }
    if (selectEstadual) {
      selectEstadual.addEventListener("change", aplicarFiltros);
    }

  } catch (erro) {
    listaIgrejasContainer.innerHTML = `
      <p class="erro" style="text-align:center; padding:30px 0;">
        ❌ Erro de conexão ao buscar igrejas.
      </p>`;
    console.error(erro);
  }
}

/* =========================================
   DETALHES DA IGREJA
========================================= */
async function exibirDetalhesIgreja(totvs, botao) {
  const painelDetalhes = document.getElementById("painel-detalhes-igreja");
  if (!painelDetalhes) return;

  const textoOriginal = botao ? botao.innerHTML : "";
  if (botao) { botao.disabled = true; botao.innerHTML = "⏳ Buscando..."; }

  try {
    const resposta = await fetch(`${URL}?acao=obter_detalhes&totvs=${totvs}&_t=${new Date().getTime()}`);
    const textoResposta = await resposta.text();
    let resultado;
    try { resultado = JSON.parse(textoResposta); }
    catch (parseError) {
      throw new Error("O servidor retornou dados inválidos. Verifique se o Apps Script foi autorizado.");
    }

    if (!resultado.sucesso || !resultado.dados) {
      alert(resultado.mensagem || "Erro ao carregar detalhes da igreja.");
      return;
    }

    const dados = resultado.dados;

    document.getElementById("detalhe-totvs-titulo").innerText = dados.totvs || "";
    document.getElementById("detalhe-totvs").innerText = dados.totvs || "-";
    document.getElementById("detalhe-regiao").innerText = dados.regiao || "-";
    document.getElementById("detalhe-estadual").innerText = dados.estadual || "-";
    document.getElementById("detalhe-dirigente").innerText = dados.dirigente || "-";
    document.getElementById("detalhe-telefone").innerText = dados.telefone || "-";
    document.getElementById("detalhe-data").innerText = dados.dataCadastro || "-";
    document.getElementById("detalhe-endereco").innerText = dados.endereco || "-";

    const tbody = document.getElementById("lista-detalhes-patrimonios-tbody");
    tbody.innerHTML = "";
    const patrimonios = dados.patrimonios || [];

    if (patrimonios.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="4" style="text-align:center; color:#999; padding:20px;">
            Nenhum patrimônio cadastrado para esta igreja.
          </td>
        </tr>`;
    } else {
      patrimonios.forEach(p => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><strong>${p.patrimonio || "-"}</strong></td>
          <td style="text-align:center;">${p.quantidade || "-"}</td>
          <td style="text-align:center;">
            <span class="status-estado estado-${(p.conservacao || "").toLowerCase()}">
              ${p.conservacao || "-"}
            </span>
          </td>
          <td>${p.observacao || "-"}</td>
        `;
        tbody.appendChild(row);
      });
    }

    const btnPdfDetalhe = document.getElementById("btn-detalhe-exportar-pdf");
    if (btnPdfDetalhe) {
      btnPdfDetalhe.onclick = function () { gerarPdfTabela(dados.totvs, btnPdfDetalhe); };
    }

    painelDetalhes.style.display = "block";
    painelDetalhes.scrollIntoView({ behavior: "smooth", block: "start" });

  } catch (error) {
    console.error("Erro ao buscar detalhes:", error);
    alert("Erro de conexão ao buscar detalhes da igreja.");
  } finally {
    if (botao) { botao.disabled = false; botao.innerHTML = textoOriginal; }
  }
}

/* =========================================
   GERAÇÃO DE PDF VIA APPS SCRIPT
========================================= */
async function gerarPdfTabela(totvs, botao) {
  const textoOriginal = botao.innerHTML;
  botao.disabled = true;
  botao.innerText = "⏳ Gerando...";
  try {
    const resposta = await fetch(URL, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ acao: "exportarPdf", totvs })
    });
    const resultado = JSON.parse(await resposta.text());
    if (resultado.sucesso && resultado.dados && resultado.dados.url) {
      window.open(resultado.dados.url, "_blank");
    } else {
      alert(resultado.mensagem || "Erro ao exportar PDF.");
    }
  } catch (erro) {
    console.error("Erro ao gerar PDF:", erro);
    alert("Erro de conexão ao gerar PDF.");
  } finally {
    botao.disabled = false;
    botao.innerHTML = textoOriginal;
  }
}

/* =========================================
   INICIALIZAÇÃO
========================================= */
document.addEventListener("DOMContentLoaded", () => {
  // Fecha painel de detalhes
  const btnFechar = document.getElementById("btn-fechar-detalhes");
  if (btnFechar) {
    btnFechar.addEventListener("click", () => {
      const painelDetalhes = document.getElementById("painel-detalhes-igreja");
      if (painelDetalhes) painelDetalhes.style.display = "none";
    });
  }

  // Sair do painel (Logout)
  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      sessionStorage.removeItem("usuarioLogado");
      window.location.href = "login.html";
    });
  }

  // Exportar dados para o Excel (CSV)
  const btnExportarCsv = document.getElementById("btn-exportar-csv");
  if (btnExportarCsv) {
    btnExportarCsv.addEventListener("click", exportarParaCSV);
  }

  // Alternância de Abas (Tabs)
  const tabIgrejas = document.getElementById("tab-igrejas");
  const tabPatrimonio = document.getElementById("tab-patrimonio");
  const conteudoTabIgrejas = document.getElementById("conteudo-tab-igrejas");
  const conteudoTabPatrimonio = document.getElementById("conteudo-tab-patrimonio");

  if (tabIgrejas && tabPatrimonio && conteudoTabIgrejas && conteudoTabPatrimonio) {
    tabIgrejas.addEventListener("click", () => {
      tabIgrejas.classList.add("active");
      tabPatrimonio.classList.remove("active");
      conteudoTabIgrejas.style.display = "block";
      conteudoTabPatrimonio.style.display = "none";
    });

    tabPatrimonio.addEventListener("click", () => {
      tabPatrimonio.classList.add("active");
      tabIgrejas.classList.remove("active");
      conteudoTabIgrejas.style.display = "none";
      conteudoTabPatrimonio.style.display = "block";
      atualizarGestaoPatrimonio(dadosFiltrados);
    });
  }

  // Carrega lista de igrejas
  listarIgrejas();
});