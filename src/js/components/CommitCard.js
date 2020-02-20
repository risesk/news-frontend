class CommitCard {
  // constructor() {

  // }
  static createCard(data) {
    const stringHTML = `
      <div class="commit-card">
        <time class="commit-card__date"></time>
        <div class="commit-card__author">
            <img alt="AuthorPhoto" class="commit-card__avatar">
            <h3 class="commit-card__name"></h3>
            <a href="mailto:ingaiva@yandex.ru" class="commit-card__mail"></a>
        </div>
        <p class="commit-card__text"></p>
      </div>
    `;

    const card = document.createElement('div');
    card.insertAdjacentHTML('afterbegin', stringHTML);
    card.classList.add('swiper-slide');

    const time = card.querySelector('.commit-card__date');
    const avatar = card.querySelector('.commit-card__avatar');
    const name = card.querySelector('.commit-card__name');
    const email = card.querySelector('.commit-card__mail');
    const text = card.querySelector('.commit-card__text');

    time.textContent = data.commit.committer.date;
    avatar.src = data.committer.avatar_url;
    name.textContent = data.commit.committer.name;
    email.textContent = data.commit.committer.email;
    text.textContent = data.commit.message;

    return card;
  }
}

export default CommitCard;
