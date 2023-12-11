import { BotMenu, Menu } from '../../types';

export const business: Record<string, BotMenu<Menu>> = {
  portfolio: {
    type: 'option',
    header: '¡Automatiza tu negocio!',
    body: [
      {
        type: 'image',
        image: `${process.env.SERVER_URL}/files/static/img/whatsapp-offer.png`,
        caption:
          '<h3 class="font-semibold">Asistente virtual WhatsApp</h3><br/>' +
          '<p class="font-semibold">Incluye</p><br/>' +
          '1) Proveedor oficial <span class="font-semibold">META</span><br/>' +
          '2) Atención 24/7 <span class="font-semibold">automatizada</span><br/>' +
          '3) <span class="font-semibold">Sin límite</span> de clientes simultáneos<br/>' +
          '4) Integrable con <span class="font-semibold">cualquier sistema</span><br/><br/>' +
          '¡Pruebalo ahora!<br/>' +
          '<a class="text-c5" href="https://wa.me/message/KZ7674WVE4CGP1" target="_blank">Click aqui 👈</a>',
      },
      {
        type: 'text',
        text: 'Puedes seguir navegando a través del menú de opciones 👇',
      },
    ],
    data: {
      option: [
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
  },

  services: {
    type: 'option',
    header: 'Servicios dentro de mi área de expertís',
    body: [
      {
        type: 'text',
        text:
          'Desarrollo web  👨🏻‍💻 <br/><br/>' +
          '¡Haz realidad tus sueños en línea! Transformo tus visiones en poderosas herramientas digitales.',
      },
      {
        type: 'text',
        text:
          'Diseño UI / UX  🎨 <br/><br/>' +
          'Cautiva a tu audiencia desde el primer vistazo. Asegura que tus usuarios se enamoren de tu plataforma.',
      },
      {
        type: 'text',
        text:
          'Mantenimiento Web  👷🏼 <br/><br/>' +
          'La tranquilidad de un sitio web sin interrupciones. No te preocupes por problemas técnicos ni actualizaciones tediosas. Deja que yo me encargue.',
      },
      {
        type: 'text',
        text: 'Puedes seguir navegando a través del menú de opciones 👇',
      },
    ],
    data: {
      option: [
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
  },
};
