const blockContents = {
  loaders: [
    {
      name: 'coin',
      container: 'small',
    },
    {
      name: 'roulette',
      container: 'small',
    },
    {
      name: 'eatsuki',
      container: 'wide',
    },
    {
      name: 'ellipsis',
      container: 'wide',
    },
  ],
};

function handleCloseModal() {
  const el = document.getElementById('detail-modal');
  el.classList.remove('show');
}

function handleOpenModal() {
  const el = document.getElementById('detail-modal');
  el.classList.add('show');
}

async function fetchFile(url) {
  return fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(res.status);
    }
    return res.text();
  });
}

async function handleFillModal(target) {
  try {
    const cssPromise = fetchFile(`${target}.css`);
    const htmlPromise = fetchFile(`${target}.html`);

    const cssText = await cssPromise;
    const htmlText = await htmlPromise;

    document.getElementById('css-board').value = cssText;
    document.getElementById('html-board').value = htmlText;

    handleOpenModal();
  } catch (error) {
    console.log(error);
  }
}

async function loadContents() {
  for (const block in blockContents) {
    const promiseList = [];
    const contentList = blockContents[block];
    
    const blockEl = document.getElementById(block);
    if (blockEl === null) { continue }

    for (let i = 0; i < contentList.length; i += 1) {
      const content = contentList[i];
      const containerEl = document.createElement('div');
      containerEl.classList.add('demo-item');
      containerEl.classList.add(content.container);

      const promise = fetchFile(`${content.name}.html`).then((text) => new Promise((resolve) => {
        containerEl.insertAdjacentHTML('afterbegin', text);
        containerEl.insertAdjacentHTML('beforeend',
          `<div class="demo-event-wrapper" onclick="handleFillModal('${content.name}')"></div>`);
        resolve(containerEl);
      }));

      promiseList.push(promise);
    }

    const containerEls = await Promise.all(promiseList);
    containerEls.forEach((el) => {
      blockEl.appendChild(el);
    });
  }
}

function createDemoImgLink() {
  const els = document.getElementsByClassName('demo-img');
  for (let i = 0; i < els.length; i++) {
    const el = els[i];
    const imgEl = el.getElementsByTagName('img')[0];
    const src = imgEl.getAttribute('src');
    el.setAttribute('href', src);
    el.setAttribute('download', src.replace(/.*\//g, ''));
  }
}

function init() {
  createDemoImgLink();
  loadContents();
}

init();
