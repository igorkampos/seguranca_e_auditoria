function normalizarTexto(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
  }
  
  function obterOrdemColunas(chave) {
    if (!chave || chave.length === 0) throw new Error('Chave vazia');
    const chaveNormalizada = normalizarTexto(chave);
    const arr = chaveNormalizada.split('').map((c, i) => ({ c, i }));
    const ordenado = [...arr].sort((a, b) => a.c.localeCompare(b.c) || a.i - b.i);
    return ordenado.map(x => x.i);
  }
  
  function cifrarTransposicaoColunar(textoPlano, chave, opcoes = {}) {
    const caracterePreenchimento = opcoes.caracterePreenchimento || 'X';
    const apenasAlfaNum = opcoes.apenasAlfaNum !== undefined ? opcoes.apenasAlfaNum : true;
  
    if (!chave || chave.length === 0) throw new Error('Chave vazia');
  
    let texto = normalizarTexto(String(textoPlano));
    if (apenasAlfaNum) texto = texto.replace(/[^A-Z0-9]/g, '');
  
    const colunas = chave.length;
    const linhas = Math.ceil(texto.length / colunas) || 1;
    const tamPreenchimento = linhas * colunas - texto.length;
    texto = texto + caracterePreenchimento.repeat(tamPreenchimento);
  
    // matriz linha por linha
    const matriz = [];
    for (let r = 0; r < linhas; r++) {
      matriz[r] = texto.slice(r * colunas, (r + 1) * colunas).split('');
    }
  
    // ler colunas na ordem da chave
    const ordemColunas = obterOrdemColunas(chave);
    let cifrado = '';
    for (const ci of ordemColunas) {
      for (let r = 0; r < linhas; r++) {
        cifrado += matriz[r][ci];
      }
    }
    return cifrado;
  }
  
  function decifrarTransposicaoColunar(textoCifrado, chave, opcoes = {}) {
    const caracterePreenchimento = opcoes.caracterePreenchimento || 'X';
    if (!chave || chave.length === 0) throw new Error('Chave vazia');
  
    const colunas = chave.length;
    const linhas = Math.ceil(textoCifrado.length / colunas) || 1;
  
    // matriz vazia
    const matriz = Array.from({ length: linhas }, () => Array(colunas).fill(''));
    const ordemColunas = obterOrdemColunas(chave);
  
    let pos = 0;
    for (const ci of ordemColunas) {
      for (let r = 0; r < linhas; r++) {
        matriz[r][ci] = textoCifrado[pos++] || caracterePreenchimento;
      }
    }
  
    let texto = '';
    for (let r = 0; r < linhas; r++) {
      for (let c = 0; c < colunas; c++) texto += matriz[r][c];
    }
  
    // remover caracteres de preenchimento finais
    if (caracterePreenchimento) {
      const re = new RegExp(`${caracterePreenchimento}+$`);
      texto = texto.replace(re, '');
    }
    return texto;
  }
  
//Teste teste teste dessa desgraça

  const textoDescriptografado = "SEGURANCA E AUDITORIA";
  const chave = "nilson";
  const textoCriptografado = cifrarTransposicaoColunar(textoDescriptografado, chave);
  const DEScriptografado = decifrarTransposicaoColunar(textoCriptografado, chave);
  console.log({ textoDescriptografado, chave, textoCriptografado})//, DEScriptografado });
  