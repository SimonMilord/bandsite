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

// let para = ['commentsLi'];

// function create(para, element, className) {
//   para = document.createElement(element);
//   para.classList.add(className);
//   // console.log(para);
// }
// console.log(create(para[0], 'li', 'list__item'));

function renderComments() {
  sortCommentsByDate();
  commentsList.innerHTML = '';

  commentsArray.forEach((comment) => {
    // create li with class list__item
    const commentsLi = document.createElement('li');
    commentsLi.classList.add('list__item');

    // create div with class list__avatar-box
    const avatarBox = document.createElement('div');
    avatarBox.classList.add('list__avatar-box');

    // create div with class list__avatar
    const avatar = document.createElement('div');
    avatar.classList.add('list__avatar');

    // create div with class list__info-box
    const infoBox = document.createElement('div');
    infoBox.classList.add('list__info-box');

    // create div with class list__head
    const head = document.createElement('div');
    head.classList.add('list__head');

    // create div with class list__name
    const name = document.createElement('p');
    name.classList.add('list__name');
    name.innerText = comment.name;

    // create div with class list__date
    const date = document.createElement('p');
    date.classList.add('list__date');
    date.innerText = new Date(comment.date).toLocaleDateString();

    // create div with class list__comment
    const commentP = document.createElement('p');
    commentP.classList.add('list__comment');
    commentP.innerText = comment.commentText;

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
}

renderComments();