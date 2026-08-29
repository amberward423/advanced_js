import {restaurantRow, restaurantModal} from './components.js';

import {fetchData} from './utils.js';

import {baseUrl} from './variables.js';
// your code here

try {
  const restaurants = await fetchData(baseUrl);
  console.log(restaurants);

  const table = document.querySelector('table');
  restaurants.sort((a, b) => a.name.localeCompare(b.name));

  console.log('table', table);

  for (const restaurant of restaurants) {
    const row = restaurantRow(restaurant);
    table.appendChild(row);
    row.addEventListener('click', async () => {
      const url = `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${restaurant._id}/en`;

      const data = await fetchData(url);

      console.log(data);
      document
        .querySelectorAll('.highlight')
        .forEach((element) => element.classList.remove('highlight'));

      row.classList.add('highlight');
      const dialog = document.querySelector('dialog');
      dialog.innerHTML = restaurantModal(restaurant, data);
      dialog.show();
    });
  }
} catch (error) {
  alert('An error occurred:', error);
  console.error('An error occurred:', error);
}
