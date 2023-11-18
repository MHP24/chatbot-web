export const home = {
  start: {
    type: 'options',
    header: '¡Hola! Soy el asistente virtual de Miguel',
    body: [{ type: 'text', text: '¿En qué puedo ayudarte hoy?' }],
    options: [
      {
        label: 'Automatiza tu negocio',
        redirect: 'business:portfolio',
      },
      {
        label: 'Servicios',
        redirect: 'business:services',
      },
      {
        label: 'Proyectos',
        redirect: 'home:projects',
      },
      {
        label: 'Acerca de',
        redirect: 'home:about',
      },
      {
        label: 'Contactar con Miguel',
        redirect: 'contact:start',
      },
    ],
  },

  projects: {
    type: 'options',
    header: 'Te invito a explorar algunos de mis proyectos',
    body: [
      {
        type: 'image',
        image: 'https://mg-hp.com/msc/logo.jpg',
        caption: 'Proyecto 1 caption',
      },
      {
        type: 'image',
        image: 'https://mg-hp.com/msc/logo.jpg',
        caption: 'Proyecto 2 caption',
      },
      {
        type: 'image',
        image: 'https://mg-hp.com/msc/logo.jpg',
        caption: 'Proyecto 3 caption',
      },
      {
        type: 'text',
        text: 'Para seguir navegando selecciona alguna de las opciones:',
      },
    ],
    options: [
      {
        label: 'Automatiza tu negocio',
        redirect: 'business:portfolio',
      },
      {
        label: 'Servicios',
        redirect: 'business:services',
      },
      {
        label: 'Acerca de',
        redirect: 'home:about',
      },
      {
        label: 'Contactar con Miguel',
        redirect: 'contact:start',
      },
      {
        label: 'Salir',
        redirect: 'home:exit',
      },
    ],
  },

  about: {
    type: 'options',
    header: '¡Hola Soy Miguel! Desarrollador full stack',
    body: [
      {
        type: 'text',
        text: 'Me especializo en:\n• Desarrollo frontend y backend  👨🏻‍💻\n• Mantenimiento y mejora de productos desarrollados a medida  📈\n• Análisis y modelado de soluciones a gran escala  🚀',
      },
      {
        type: 'text',
        text: 'Para seguir navegando selecciona alguna de las opciones:',
      },
    ],
    options: [
      {
        label: 'Automatiza tu negocio',
        redirect: 'business:portfolio',
      },
      {
        label: 'Servicios',
        redirect: 'business:services',
      },
      {
        label: 'Contactar con Miguel',
        redirect: 'contact:start',
      },
      {
        label: 'Salir',
        redirect: 'home:exit',
      },
    ],
  },

  exit: {
    type: 'close',
    header: '¡Gracias por tu tiempo!',
    body: 'Si tienes más preguntas, no dudes en volver. ¡Que tengas un gran día!',
  },
};
