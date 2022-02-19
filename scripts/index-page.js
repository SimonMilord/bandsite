// API KEY:
// full get request API comments: https://project-1-api.herokuapp.com/comments?api_key=0ce694ad-dd06-4c73-a317-283414a7c453
const ApiKey = {"api_key":"0ce694ad-dd06-4c73-a317-283414a7c453"};

// gather DOM elements and variables
const commentsForm = document.querySelector('.comments__form');
const commentsName = document.querySelector('.comments__name');
const commentsComment = document.querySelector('.comments__comment');
const commentsList = document.querySelector('.list');
const arr = [];

// AXIOS GET request for comments
function getComment() {
  const commentsObject = axios.get(`https://project-1-api.herokuapp.com/comments?api_key=${ApiKey}`)
  commentsObject.then(result => {
    const commentsArray = result.data;
    renderComments(commentsArray);
  }).catch(error => {
    console.log(error);
  });
}
getComment();

// form event listener : submit
commentsForm.addEventListener('submit', event => {
  event.preventDefault();
  postComment(event.target.userName.value, event.target.userComment.value);
  event.target.reset();
});

// AXIOS POST request for comments
function postComment(name, comment) {
  axios.post(`https://project-1-api.herokuapp.com/comments?api_key=${ApiKey}`, {
    name: name,
    comment: comment,
  }).then(response => {
    getComment();
  }).catch(error => {
    console.log(error);
  })
}

// creates html element, add class and innertext to be appended if the case / passes null by default
function create(element, className, text = null) {
  const domLm = document.createElement(element);
  domLm.classList.add(className);
  if (text !== null) domLm.innerText = text;
  return domLm;
}

function renderComments(arr) {
  sortCommentsByDate(arr);
  commentsList.innerText = '';

  arr.forEach((comment) => {
    const commentsLi = create('li', 'list__item');
    const avatarBox = create('div', 'list__avatar-box');
    const avatar = create('div', 'list__avatar');
    const infoBox = create('div', 'list__info-box');
    const head = create('div', 'list__head');
    const name = create('p', 'list__name', comment.name);
    const date = create('p', 'list__date', new Date(comment.timestamp).toLocaleDateString());
    const commentP = create('p', 'list__comment', comment.comment);

    // append all elements to their respective parents
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

function sortCommentsByDate(arr) {
  arr.sort((objectA, objectB) => {
    return objectB.timestamp - objectA.timestamp;
  });
};

renderComments(arr);
