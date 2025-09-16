function prepararTexto(texto) {
    return texto.toUpperCase().replace(/ /g, "X"); //Substituir espaço pelo "X"
  }
  
  function expandirChave(texto, chave) {
    let chaveExpandida = "";
    let indice = 0;
  
    for (let i = 0; i < texto.length; i++) {
      chaveExpandida += chave[indice % chave.length];
      indice++;
    }
  
    return chaveExpandida.toUpperCase();
  }
  
  function criptografarVigenere(texto, chave) {
    texto = prepararTexto(texto);
    chave = prepararTexto(chave);
    let chaveExpandida = expandirChave(texto, chave);
  
    let resultado = "";
  
    for (let i = 0; i < texto.length; i++) {
      let letraTexto = texto[i];
      let letraChave = chaveExpandida[i];
  
      let posicao = (letraTexto.charCodeAt(0) - 65 + letraChave.charCodeAt(0) - 65) % 26;
      resultado += String.fromCharCode(posicao + 65);
    }
  
    return resultado;
  }
  
  // descriptografia
  function descriptografarVigenere(texto, chave) {
    texto = prepararTexto(texto);
    chave = prepararTexto(chave);
    let chaveExpandida = expandirChave(texto, chave);
  
    let resultado = "";
  
    for (let i = 0; i < texto.length; i++) {
      let letraTexto = texto[i];
      let letraChave = chaveExpandida[i];
  
      let posicao = (letraTexto.charCodeAt(0) - 65 - (letraChave.charCodeAt(0) - 65) + 26) % 26;
      resultado += String.fromCharCode(posicao + 65);
    }
  
    return resultado;
  }
  
// TESTE TESTE TESTE

  let texto = "SEGURANCA E AUDITORIA";
  let chave = "NILSON";
  
  let criptografado = criptografarVigenere(texto, chave);
  let descriptografado = descriptografarVigenere(criptografado, chave);
  
  //console.log("Texto original:", prepararTexto(texto));
  console.log("Texto Criptografado:", criptografado);
  console.log("Texto Descriptografado:", descriptografado);