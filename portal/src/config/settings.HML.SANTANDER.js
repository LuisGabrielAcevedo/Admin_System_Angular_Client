(function(window) {
  'use strict';

  window.appSettings = {
    env: 'HML',
    baseHref: '/',
    endpoint: 'https://sanrio.viverebrasil.com.br/sanrioapigwhml',
    loginMap: {
      VENDEDOR_CON:
        'https://180.250.41.135:9088/auth/Login?Aplicacion=viverehomo_portal_autoge',
      VENDEDOR_SUC:
        'https://180.250.41.135:9088/auth/Login?Aplicacion=viverehomo_portal_racf',
      OFICIAL_PREN:
        'https://180.250.41.135:9088/auth/Login?Aplicacion=viverehomo_portal',
      DEFAULT:
        'https://180.250.41.135:9088/auth/Login?Aplicacion=viverehomo_portal'
    }
  };
})(window);
