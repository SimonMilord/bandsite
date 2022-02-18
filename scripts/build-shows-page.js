// API KEY:
const ApiKey = {"api_key":"0ce694ad-dd06-4c73-a317-283414a7c453"};
// full get request API comments: https://project-1-api.herokuapp.com/comments?api_key=0ce694ad-dd06-4c73-a317-283414a7c453

// gather DOM elements and variables
const showsList = document.querySelector('.list');
const arr = [];

// AXIOS GET request for shows
const showsObject = axios.get(`https://project-1-api.herokuapp.com/showdates?api_key=${ApiKey}`)
showsObject.then(result => {
  showsArray = result.data;
  renderShows(showsArray);
}).catch(error => {
  console.log(error);
});

// creates html element, add class and innertext to be appended
function create(element, className, text = null) {
  const domLm = document.createElement(element);
  domLm.classList.add(className);
  if (text !== null) domLm.innerText = text;
  return domLm;
}

function renderShows(arr) {
  sortShowsByDate(arr);
  showsList.innerHTML = '';
  const date = 'Date';
  const venue = 'Venue';
  const location = 'Location';
  const button = 'Buy Tickets';

  arr.forEach((show) => {
    // create li with class list__item
    const showsLi = create('li', 'list__item');
    showsLi.setAttribute('tabindex', '1');

    // create label with class list__label (date)       --- DATE ---
    const showsLabelDate = create('label', 'list__label');
    // create span to remove the said labe when tablet +
    const showsSpanDate = create('span', 'list__span', date);
    // create p with class list__info
    let numDate = parseInt(show.date, 10);
    console.log(numDate);
    const showsPDate = create('p', 'list__info', new Date(numDate).toDateString());
    showsPDate.classList.add('list__info--date');


    // create label with class list__label (venue)      --- VENUE ---
    const showsLabelVenue = create('label', 'list__label');
    // create span to remove the said label when tablet +
    const showsSpanVenue = create('span', 'list__span', venue);
    // create p with class list__info
    const showsPVenue = create('p', 'list__info', show.place);


    // create label with class list__label (location)    --- LOCATION ---
    const showsLabelLocation = create('label', 'list__label');
    // create span to remove label
    const showsSpanLocation = create('span', 'list__span', location);
    // create p with class list__info
    const showsPLocation = create('p', 'list__info', show.location);


    // create button with class list__btn                 --- COMMENT BUTTON ---
    const showsButton = create('button', 'list__btn', button);
    showsButton.setAttribute('tabindex', '1');

    // append all elements to their parents
    showsLabelDate.appendChild(showsSpanDate);
    showsLabelDate.appendChild(showsPDate);

    showsLabelVenue.appendChild(showsSpanVenue);
    showsLabelVenue.appendChild(showsPVenue);

    showsLabelLocation.appendChild(showsSpanLocation);
    showsLabelLocation.appendChild(showsPLocation);

    showsLi.appendChild(showsLabelDate);
    showsLi.appendChild(showsLabelVenue);
    showsLi.appendChild(showsLabelLocation);
    showsLi.appendChild(showsButton);

    showsList.appendChild(showsLi);
  });
};

function sortShowsByDate(arr) {
  arr.sort((objectA, objectB) => {
    return objectA.date - objectB.date;
  });
};
