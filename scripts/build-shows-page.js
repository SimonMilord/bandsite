// date converter:
const newDate = Date.parse('Wed Dec 15 2021');
console.log(newDate);

// shows array of objects
const showsArray = [
  {
    date: 1630900800000,
    venue: 'Ronald Lane',
    location: 'San Francisco, CA',
  },
  {
    date: 1632196800000,
    venue: 'Pier 3 East',
    location: 'San Francisco, CA',
  },
  {
    date: 1634270400000,
    venue: 'View Lounge',
    location: 'San Francisco, CA',
  },
  {
    date: 1636171200000,
    venue: 'Hyatt Agency',
    location: 'San Francisco, CA',
  },
  {
    date: 1637902800000,
    venue: 'Moscow Center',
    location: 'San Francisco, CA',
  },
  {
    date: 1639544400000,
    venue: 'Press Club',
    location: 'San Francisco, CA',
  },
];

// gather DOM elements
const showsList = document.querySelector('.list');
renderShows();

// render shows
function renderShows() {
  sortShowsByDate();
  showsList.innerHTML = '';
  const date = 'Date';
  const venue = 'Venue';
  const location = 'Location';
  const button = 'Buy Tickets';

  showsArray.forEach((show) => {
    // create li with class list__item
    const showsLi = document.createElement('li');
    showsLi.classList.add('list__item');
    showsLi.setAttribute('tabindex', '1');

    // create label with class list__label (date)
    const showsLabelDate = document.createElement('label');
    showsLabelDate.classList.add('list__label');
    showsLabelDate.innerText = date;

    // create p with class list__info
    const showsPDate = document.createElement('p');
    showsPDate.classList.add('list__info', 'list__info--date');
    // showsPDate.innerText = new Date(show.date).toLocaleDateString();
    showsPDate.innerText = new Date(show.date).toDateString();

    // create label with class list__label (venue)
    const showsLabelVenue = document.createElement('label');
    showsLabelVenue.classList.add('list__label');
    showsLabelVenue.innerText = venue;

    // create p with class list__info
    const showsPVenue = document.createElement('p');
    showsPVenue.classList.add('list__info');
    showsPVenue.innerText = show.venue;

    // create label with class list__label (location)
    const showsLabelLocation = document.createElement('label');
    showsLabelLocation.classList.add('list__label');
    showsLabelLocation.innerText = location;

    // create p with class list__info
    const showsPLocation = document.createElement('p');
    showsPLocation.classList.add('list__info');
    showsPLocation.innerText = show.location;

    // create button with class list__btn
    const showsButton = document.createElement('button');
    showsButton.classList.add('list__btn');
    showsButton.innerText = button;

    // append all elements to their parents
    showsLabelDate.appendChild(showsPDate);
    showsLabelVenue.appendChild(showsPVenue);
    showsLabelLocation.appendChild(showsPLocation);

    showsLi.appendChild(showsLabelDate);
    showsLi.appendChild(showsLabelVenue);
    showsLi.appendChild(showsLabelLocation);
    showsLi.appendChild(showsButton);

    showsList.appendChild(showsLi);
  });
};


// sorts the array by oldest date to newest
function sortShowsByDate() {
  showsArray.sort((objectA, objectB) => {
    return objectA.date - objectB.date;
  });
};

