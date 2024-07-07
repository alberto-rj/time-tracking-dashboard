const buttons = document.querySelectorAll('button[data-type]');
const cards = {
  'Work': document.querySelector('.work'),
  'Play': document.querySelector('.play'),
  'Study': document.querySelector('.study'),
  'Exercise': document.querySelector('.exercise'),
  'Social': document.querySelector('.social'),
  'Self Care': document.querySelector('.self-care'),
};

const fetchActivities = timeframe => {
  fetch('./data.json')
    .then(response => response.json())
    .then(data => handleActivities(timeframe, data))
    .catch(error => handleError(error));
};

const handleError = error => console.error(error);

const handleActivities = (timeframe, activities) => {
  activities.forEach(activity => {
    const { title, timeframes } = activity;
    const { current, previous } = timeframes[timeframe];
    
    const card = cards[title];
    card.querySelector('.card-title').textContent = title;
    card.querySelector('.current').textContent = `${current}hrs`;
    card.querySelector('.previous').textContent = `${lastTime(timeframe)} - ${previous}hrs`;
    card.classList.add('zoom');
  });
};

const lastTime = timeframe => {
  switch (timeframe) {
    case 'daily'  : return 'Yesterday';
    case 'weekly' : return 'Last Week';
    default       : return 'Last Month';
  }
};

const handleClick = event => {
  const className = 'active';
  const activedButton = document.querySelector(`button.${className}`);
  activedButton.classList.remove(className);

  const clickedButton = event.target;
  clickedButton.classList.add(className);
  fetchActivities(clickedButton.dataset.type);
};

const handleAnimation = event => event.target.classList.remove('zoom');

for (title in cards) {
  cards[title].addEventListener('animationend', handleAnimation);
}

for (btn of buttons) {
  btn.addEventListener('click', handleClick);
  if (btn.dataset.type === 'weekly') btn.click();
}