import { BotMenu, Menu } from '../../types';

export const home: Record<string, BotMenu<Menu>> = {
  start: {
    type: 'option',
    header: '¡Hola! Soy el asistente virtual de Miguel  👾',
    body: [{ type: 'text', text: '¿En qué puedo ayudarte hoy?' }],
    data: {
      option: [
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
  },

  projects: {
    type: 'option',
    header: 'Te invito a explorar algunos de mis proyectos',
    body: [
      {
        type: 'image',
        image: `${process.env.SERVER_URL}/files/static/img/abstract-mh.jpg`,
        caption:
          '<h3 class="font-semibold">Abstract MH</h3><br/>' +
          'Experimenta una experiencia minimalista y abstracta con este increíble tema para Visual Studio Code (colores pasteles).<br/><br/>' +
          '<a class="text-c5 font-semibold" href="https://github.com/MHP24/vsc-abstract-theme" target="_blank">Repositorio GitHub</a><br/><br/>' +
          '<a class="text-c5 font-semibold" href="https://marketplace.visualstudio.com/items?itemName=MiguelHP.Abstract-MH" target="_blank">Accede aquí 👈</a>',
      },
      {
        type: 'image',
        image: `${process.env.SERVER_URL}/files/static/img/discord-bot.jpg`,
        caption:
          '<h3 class="font-semibold">DMiguelo</h3><br/>' +
          'Lleva tu servidor de Discord al siguiente nivel con DMiguelo un bot de entretenimiento y música<br/><br/>' +
          '<a class="text-c5 font-semibold" href="https://discord.com/oauth2/authorize?client_id=1121947695930691674&permissions=0&scope=bot%20applications.commands" target="_blank">Repositorio GitHub</a><br/><br/>' +
          '<a class="text-c5 font-semibold" href="https://github.com/MHP24/discord-bot" target="_blank">Accede aquí 👈</a>',
      },
      {
        type: 'image',
        image: `${process.env.SERVER_URL}/files/static/img/whatsapp-bot.jpg`,
        caption:
          "<h3 class='font-semibold'>Miguel's assistant</h3><br/>" +
          '¡Mi compañero de trabajo para asistir a Miguel! disponible en WhatsApp<br/><br/>' +
          '<a class="text-c5 font-semibold" href="https://github.com/MHP24/whatsapp-bot" target="_blank">Repositorio GitHub</a><br/><br/>' +
          '<a class="text-c5 font-semibold" href="https://api.whatsapp.com/message/KZ7674WVE4CGP" target="_blank">Accede aquí 👈</a>',
      },
      {
        type: 'text',
        text: 'Puedes seguir navegando a través del menú de opciones 👇',
      },
    ],
    data: {
      option: [
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
  },

  about: {
    type: 'option',
    header: '¡Hola Soy Miguel! Desarrollador full stack',
    body: [
      {
        type: 'text',
        text: 'Me especializo en:<br/><br/>• Desarrollo frontend y backend  👨🏻‍💻<br/>• Mantenimiento y mejora de productos desarrollados a medida  📈<br/>• Análisis y modelado de soluciones a gran escala  🚀',
      },
      {
        type: 'text',
        text: 'Puedes seguir navegando a través del menú de opciones 👇',
      },
    ],
    data: {
      option: [
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
  },

  exit: {
    type: 'close',
    header: '¡Gracias por tu tiempo!',
    body: [
      {
        type: 'text',
        text: 'Si tienes más preguntas, no dudes en volver. ¡Que tengas un gran día!',
      },
    ],
    data: {
      close: {
        detail:
          'El chat se ha cerrado, para volver a interactuar refresca la pestaña del navegador.',
      },
    },
  },
};
