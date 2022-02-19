// API KEY:
// full get request API comments: https://project-1-api.herokuapp.com/comments?api_key=0ce694ad-dd06-4c73-a317-283414a7c453
const ApiKey = {"api_key":"0ce694ad-dd06-4c73-a317-283414a7c453"};

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

// creates html element, add class and innertext to be appended if the case / passes null by default
function create(element, className, text = null) {
  const domLm = document.createElement(element);
  domLm.classList.add(className);
  if (text !== null) domLm.innerText = text;
  return domLm;
}

function renderShows(arr) {
  sortShowsByDate(arr);
  showsList.innerText = '';
  const date = 'Date';
  const venue = 'Venue';
  const location = 'Location';
  const button = 'Buy Tickets';

  arr.forEach((show) => {
    const showsLi = create('li', 'list__item');
    showsLi.setAttribute('tabindex', '1');

    // --- DATE ---
    const showsLabelDate = create('label', 'list__label');
    const showsSpanDate = create('span', 'list__span', date);
    let numDate = parseInt(show.date, 10);
    const showsPDate = create('p', 'list__info', new Date(numDate).toDateString());
    showsPDate.classList.add('list__info--date');

    // --- VENUE ---
    const showsLabelVenue = create('label', 'list__label');
    const showsSpanVenue = create('span', 'list__span', venue);
    const showsPVenue = create('p', 'list__info', show.place);

    // --- LOCATION ---
    const showsLabelLocation = create('label', 'list__label');
    const showsSpanLocation = create('span', 'list__span', location);
    const showsPLocation = create('p', 'list__info', show.location);

    // --- COMMENT BUTTON ---
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
