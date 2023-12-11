(() => {
  const targetElement = 'body';
  const chatHostUrl = 'http://localhost:3001';

  const createElement = (elemObj) => {
    const elem = document.createElement(elemObj.type);

    if (elemObj.attrs) {
      elemObj.attrs.forEach((attr) => {
        const completeVal = Array.isArray(attr.val)
          ? attr.val.join(' ')
          : attr.val;
        elem.setAttribute(attr.name, completeVal);
      });
    }

    return elem;
  };

  const appendToDOM = () => {
    const elemDictionary = {
      bundleScript: createElement({
        type: 'script',
        attrs: [
          {
            name: 'src',
            val: `${chatHostUrl}/files/scripts/chat/chat-bundle.js`,
          },
        ],
      }),
      chatWrap: createElement({
        type: 'div',
        attrs: [
          { name: 'id', val: 'chat_wrapper' },
          {
            name: 'style',
            val: 'width: 500px; position: absolute; bottom: 0; right: 0;',
          },
        ],
      }),
      styleSheetLink: createElement({
        type: 'link',
        attrs: [
          { name: 'rel', val: 'stylesheet' },
          { name: 'type', val: 'text/css' },
          {
            name: 'href',
            val: `${chatHostUrl}/files/scripts/chat/chat-styles.css`,
          },
        ],
      }),
    };

    document.body.appendChild(elemDictionary.bundleScript.cloneNode(true));

    if (targetElement === 'body') {
      document.body.appendChild(elemDictionary.chatWrap.cloneNode(true));
    } else {
      document
        .getElementById(targetElement)
        .appendChild(elemDictionary.chatWrap.cloneNode(true));
    }

    document.head.appendChild(elemDictionary.styleSheetLink.cloneNode(true));
  };

  document.addEventListener('DOMContentLoaded', () => {
    appendToDOM();
  });
})();
