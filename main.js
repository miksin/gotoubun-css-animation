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

createDemoImgLink();
