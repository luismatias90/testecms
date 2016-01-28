var ambiente = "prod"

// ---------------------------
// Desenvolvimento
// ---------------------------
if (ambiente == "des") {
  var baseCadastro = "http://localhost:9090";
  var baseApp = "http://localhost:9999";
  var baseUrl = "http://localhost:8080";
}

// ---------------------------
// Homologação
// ---------------------------
if (ambiente == "hom") {
  var baseCadastro = "https://contabilizei-precadastro-teste.appspot.com";
  var baseApp = "https://contabilizei-teste.appspot.com";
  var baseUrl = "https://www.contabilizei.com.br";
}

// ---------------------------
// Produção
// ---------------------------
if (ambiente == "prod") {
  var baseCadastro = "https://cadastro.contabilizei.com.br";
  // var baseCadastro = "https://contabilizei-precadastro.appspot.com";
  var baseApp = "https://appservices.contabilizei.com.br";
  // var baseApp = "https://contabilizeiapp.appspot.com";
  var baseUrl = "https://www.contabilizei.com.br";
}