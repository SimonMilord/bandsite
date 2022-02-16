// default comments array of objects
const commentsArray = [
  {
    name: 'Connor Walton',
    date: 1613538000000,
    commentText: 'This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains.',
  },
  {
    name: 'Emilie Beach',
    date: 1610168400000,
    commentText: 'I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day.',
  },
  {
    name: 'Miles Acosta',
    date: 1607749200000,
    commentText: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough.",
  },
];

// gather DOM elements
const commentsForm = document.querySelector('.comments__form');
const commentsName = document.querySelector('.comments__name');
const commentsComment = document.querySelector('.comments__comment');
const commentsList = document.querySelector('.list');


// form event listener : submit
commentsForm.addEventListener('submit', event => {
  event.preventDefault();
  displayComment({
    name: event.target.userName.value,
    date: Date.now(),
    commentText: event.target.userComment.value,
  });
  event.target.reset();
});

// display comments
function displayComment(commentObject) {
  commentsArray.push(commentObject);
  renderComments();
}

// function that creates html element, add class and innertext to be appended
function create(element, className, text = null) {
  const domLm = document.createElement(element);
  domLm.classList.add(className);
  if (text !== null) domLm.innerText = text;
  return domLm;
}

function renderComments() {
  sortCommentsByDate();
  commentsList.innerHTML = '';

  commentsArray.forEach((comment) => {
    // create li with class list__item
    const commentsLi = create('li', 'list__item');

    // create div with class list__avatar-box
    const avatarBox = create('div', 'list__avatar-box');

    // create div with class list__avatar
    const avatar = create('div', 'list__avatar');

    // create div with class list__info-box
    const infoBox = create('div', 'list__info-box');

    // create div with class list__head
    const head = create('div', 'list__head');

    // create div with class list__name
    const name = create('p', 'list__name', comment.name);

    // create div with class list__date
    const date = create('p', 'list__date', new Date(comment.date).toLocaleDateString());

    // create div with class list__comment
    const commentP = create('p', 'list__comment', comment.commentText);

    // append all elements to their respective parents (in order of nesting)
    head.appendChild(name);
    head.appendChild(date);

    avatarBox.appendChild(avatar);
    infoBox.appendChild(head);
    infoBox.appendChild(commentP);

    commentsLi.appendChild(avatarBox);
    commentsLi.appendChild(infoBox);

    commentsList.appendChild(commentsLi);
  });
};

// sorts the array by newest comments to older comments
function sortCommentsByDate() {
  commentsArray.sort((objectA, objectB) => {
    return objectB.date - objectA.date;
  });
};

renderComments();