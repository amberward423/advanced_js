const restaurantRow = (restaurant) => {
  const {name, address} = restaurant;

  const tr = document.createElement('tr');
  tr.innerHTML = `
  <td>${name}</td>
  <td>${address}</td>
`;
  return tr;
};

const restaurantModal = (restaurant, menu) => {
  const {name, address, postalCode, city, phone, company} = restaurant;

  const {courses} = menu;

  let menuHtml = '';

  for (let course of courses) {
    const diets = Array.isArray(course.diets)
      ? course.diets
      : course.diets.split(',').map((diet) => diet.trim());
    const filteredDiets = diets.filter((diet) => diet !== '*');
    const dietIcons = filteredDiets.map((diet) => {
      switch (diet) {
        case 'G':
          return '🌾&#xfeff;🚫';
        case 'L':
          return '🥛&#xfeff;🚫';
        default:
          return diet;
      }
    });

    menuHtml += `
        <tr>
          <td>${course.name}</td>
          <td>${course.price || 'Not provided'}</td>
          <td>${dietIcons}</td>
        
        </tr>
      `;
  }
  let modalhtml = `
 Name: ${name}<br>
  Address: ${address}<br>
  Phone: ${phone}<br>
  Company: ${company}<br>
  City: ${city}<br>
  Postal Code: ${postalCode}<br></br>
  
  <table>
    ${menuHtml}
  </table>

      `;
  return modalhtml;
};

export {restaurantRow, restaurantModal};
