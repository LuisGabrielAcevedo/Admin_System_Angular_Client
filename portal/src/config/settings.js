(function(window) {
  'use strict';

  var page = 'extras/' + btoa('bXZwMjAxOQ==');

  window.appSettings = {
    env: 'DSV',
    baseHref: '/',
    endpoint: 'https://sanrio.viverebrasil.com.br/sanrioapigwdsv',
    loginMap: {
      VENDEDOR_CON: page + '.html?portal_autoge',
      VENDEDOR_SUC: page + '.html?portal_racf',
      OFICIAL_PREN: page + '.html?portal',
      DEFAULT: page + '.html?default'
    }
  };
})(window);
