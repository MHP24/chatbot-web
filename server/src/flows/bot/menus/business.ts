export const business = {
  portfolio: {
    type: 'options',
    header: '¡Automatiza tu negocio!',
    body: [],
    options: [
      {
        label: 'Dar el siguiente paso',
        redirect: 'contact:start',
      },
      {
        label: 'Servicios',
        redirect: 'business:services',
      },
      {
        label: 'Volver al inicio',
        redirect: 'home:start',
      },
      {
        label: 'Salir',
        redirect: 'home:exit',
      },
    ],
  },

  services: {
    type: 'options',
    header: 'Servicios dentro de mi área de expertís',
    body: [],
    options: [
      {
        label: 'Solicitar servicio',
        redirect: 'contact:start',
      },
      {
        label: 'Automatiza tu negocio',
        redirect: 'business:portfolio',
      },
      {
        label: 'Volver al inicio',
        redirect: 'home:start',
      },
      {
        label: 'Salir',
        redirect: 'home:exit',
      },
    ],
  },
};
