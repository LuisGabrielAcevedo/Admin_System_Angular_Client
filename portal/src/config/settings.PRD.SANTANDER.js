(function(window) {
  'use strict';

  window.appSettings = {
    env: 'PRD',
    baseHref: '/',
    endpoint: 'https://autoloans.santander.com.ar/sanrioapigw',
    loginMap: {
      VENDEDOR_CON:
        'https://www.authss.santander.com.ar/auth/Login?Aplicacion=vivere_portal_autoge',
      VENDEDOR_SUC:
        'https://www.authss.santander.com.ar/auth/Login?Aplicacion=vivere_portal_racf',
      OFICIAL_PREN:
        'https://www.authss.santander.com.ar/auth/Login?Aplicacion=vivere_portal',
      DEFAULT:
        'https://www.authss.santander.com.ar/auth/Login?Aplicacion=vivere_portal'
    }
  };
})(window);
