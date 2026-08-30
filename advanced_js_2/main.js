import {restaurantRow, restaurantModal} from './components.js';

import {fetchData} from './utils.js';

import {baseUrl} from './variables.js';

// your code here

try {
  const restaurants = await fetchData(baseUrl);
  console.log(restaurants.map((restaurant) => restaurant.company));
  const table = document.querySelector('table');
  restaurants.sort((a, b) => a.name.localeCompare(b.name));
  const select = document.querySelector('select');
  console.log('table', table);

  for (const restaurant of restaurants) {
    const row = restaurantRow(restaurant);
    table.appendChild(row);
    row.addEventListener('click', async () => {
      const url = `${baseUrl}/daily/${restaurant._id}/en`;
      const data = await fetchData(url);
      const modalHtml = restaurantModal(restaurant, data);

      console.log(data);
      document
        .querySelectorAll('.highlight')
        .forEach((element) => element.classList.remove('highlight'));

      row.classList.add('highlight');
      const dialog = document.querySelector('dialog');
      dialog.innerHTML = modalHtml;
      dialog.show();
    });
  }
  select.addEventListener('change', async () => {
    const selected = select.value;
    const filtered = restaurants.filter(
      (restaurant) => restaurant.company === selected
    );
    table.querySelectorAll('tr:not(:first-child)').forEach((row) => {
      table.removeChild(row);
    });
    filtered.forEach((restaurant) => {
      const row = restaurantRow(restaurant);
      table.appendChild(row);
    });
  });
} catch (error) {
  alert(
    'An error occurred while loading the restaurant data. Please try again.',
    error
  );
  console.error('An error occurred:', error);
}
