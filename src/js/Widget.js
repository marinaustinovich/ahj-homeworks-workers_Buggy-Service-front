const dayjs = require('dayjs');

export default class Widget {
  constructor(container, url) {
    if (!container) {
      throw new Error('Container element must not be null');
    }

    this.url = url;
    this.container = container;
    this.sectionEl = null;
    this.drawUi();
  }

  drawUi() {
    this.container.innerHTML = `
      <header class="header">
        <h2>Movie world news</h2>
        <div class="update">Update</div>
      </header>
      <main class="main">
        <section class="section"></section>
      </main>
      <div class="module hidden">
        <span>It's impossible to dowloand data. <br> Check your connection to the internet and update the page</span>
      </div>
    `;
  }

  async start() {
    this.addBlock();
    try {
      const newsArray = await this.api();
      this.hiddenModal();
      if (this.sectionEl && newsArray) {
        this.sectionEl.innerHTML = '';
      }
      newsArray.forEach((el) => this.addNews(el));
    } catch (error) {
      console.log('error', error);
      this.showModal();
    }
  }

  addNews(data) {
    const article = document.createElement('article');
    article.classList.add('article');
    article.setAttribute('data-id', `${data.id}`);
    article.innerHTML = `
      <header class="article__header">${Widget.formatTime(data.date)}</header>
      <div class="summary">
        <div class="avatar"><img src="${data.avatar}"></div>
        <div class="text">${data.text}</div>
      </div>
    `;
    this.container.querySelector('.section').appendChild(article);
  }

  addBlock() {
    const article = document.createElement('article');
    article.classList.add('article');
    const string = `
        <article class="article">
          <header class="article__header cover"></header>
          <div class="summary">
            <div class="avatar cover"></div>
            <div class="text cover"></div>
          </div>
        </article>`.repeat(5);

    this.sectionEl = document.querySelector('.section');
    if (this.sectionEl) {
      this.sectionEl.innerHTML = string;
    }
  }

  /* eslint-disable */
  showModal() {
    document.querySelector('.module')?.classList.remove('hidden');
  }

  hiddenModal() {
    document.querySelector('.module')?.classList.add('hidden');
  }

  async api() {
    try {
      const data = await fetch(this.url);
      const result = await data.json();
      return result;
    } catch (e) {
      console.error(e);
    }
  }

  static formatTime(timestamp) {
    return dayjs(timestamp).format('HH:mm DD.MM.YY');
  }
}