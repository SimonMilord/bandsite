// API KEY:
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
    console.log(response);
    getComment();
  }).catch(error => {
    console.log(error);
  })
}


// function displayComment(commentObject) {
//   // arr.push(commentObject);
//   getComment();
//   renderComments(arr);
// }
console.log(arr);
// creates html element, add class and innertext to be appended
function create(element, className, text = null) {
  const domLm = document.createElement(element);
  domLm.classList.add(className);
  if (text !== null) domLm.innerText = text;
  return domLm;
}

function renderComments(arr) {
  sortCommentsByDate(arr);
  commentsList.innerHTML = '';

  arr.forEach((comment) => {
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
    const date = create('p', 'list__date', new Date(comment.timestamp).toLocaleDateString());

    // create div with class list__comment
    const commentP = create('p', 'list__comment', comment.comment);

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

function sortCommentsByDate(arr) {
  arr.sort((objectA, objectB) => {
    return objectB.timestamp - objectA.timestamp;
  });
};

renderComments(arr);
