<template>
  <div>
    <!-- Cabeçalho padrão do governo -->
    <header class="br-header" id="header">
      <div class="container-lg">
        <div class="header-top">
          <div class="header-logo">
            <img src="https://gov.br/assets/img/logo-govbr.png" alt="Governo Federal" />
          </div>
        </div>
      </div>
    </header>

    <!-- Conteúdo principal -->
    <main class="container-lg">
      <h1 class="mt-4">Hello World!</h1>
      <p>Bem-vindo ao seu primeiro projeto Vue.js com o Design System do Governo Brasileiro!</p>
    </main>

    <!-- Rodapé padrão do governo -->
    <footer class="br-footer" id="footer">
      <div class="container-lg">
        <div class="footer-bottom">
          <div class="logo">
            <img src="https://gov.br/assets/img/logo-govbr.png" alt="Governo Federal" />
          </div>
          <div class="footer-info">
            <p>Exemplo usando Vue.js com o DSGov.</p>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  mounted() {
    if (window.DSGov) {
      window.DSGov.init(); // Inicializa os componentes do DSGov
    }
  },
};
</script>
