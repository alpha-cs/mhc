// Variables
let counter = 1; // Counter for the price history entry IDs
let priceHistory = []; // Array to store the price history entries
let lastEntry = null; // Store the last entry in the price history

// Price Calculator Form Submit Event Listener
document.getElementById('price-calculator').addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent form submission in the traditional way

  // Get the form values
  const sqft = parseFloat(document.getElementById('sqft').value);
  const pets = document.getElementById('pets').value;
  const stairs = getSelectedStairs();
  const laundry = document.getElementById('laundry').value;
  const extra = parseFloat(document.getElementById('extra').value);
  const deepClean = document.getElementById('deep-clean').value;

  // Calculate the price
  let rate = 0.11;
  if (pets === 'yes') {
    rate += 0.01;
  }
  rate += 0.01 * stairs;
  if (laundry === 'yes') {
    rate += 0.01;
  }
  if (extra > 0) {
    rate += 0.01 * extra;
  }
  if (deepClean === 'yes') {
    rate += 0.11;
  }
  let price = rate * sqft;
  if (price < 140) {
    price = 140;
  }

  // Display the price with limited decimal points
  document.getElementById('price-display').textContent = 'Price: $' + price.toFixed(2);

  // Check if the current form inputs are the same as the last entry
  if (
    lastEntry &&
    lastEntry.sqft === sqft &&
    lastEntry.pets === pets &&
    lastEntry.stairs === stairs &&
    lastEntry.laundry === laundry &&
    lastEntry.extra === extra &&
    lastEntry.deepClean === deepClean
  ) {
    return; // Skip adding the entry to the price history
  }

  // Update the last entry with the current form inputs
  lastEntry = {
    sqft: sqft,
    pets: pets,
    stairs: stairs,
    laundry: laundry,
    extra: extra,
    deepClean: deepClean,
  };

  // Update the price history (maximum of 6 entries)
  if (priceHistory.length >= 6) {
    priceHistory.shift(); // Remove the oldest entry if we have 6 already
  }

  // Add the new entry to the history
  priceHistory.push({
    id: counter++,
    price: price.toFixed(2),
    sqft: sqft,
    pets: pets,
    stairs: stairs,
    laundry: laundry,
    extra: extra,
    deepClean: deepClean,
  });

  // Clear the price history display and add all entries from the array
  let historyDisplay = document.getElementById('price-history');
  historyDisplay.innerHTML = '';
  for (let i = 0; i < priceHistory.length; i++) {
    let item = document.createElement('p');
    item.textContent =
      `ID: ${priceHistory[i].id}, Price: $${priceHistory[i].price}, SqFt: ${priceHistory[i].sqft}` +
      `${priceHistory[i].pets === 'yes' ? ', Pets: ✔️' : ''}` +
      `${priceHistory[i].stairs > 0 ? ', Stairs: ' + priceHistory[i].stairs : ''}` +
      `${priceHistory[i].laundry === 'yes' ? ', Laundry: ✔️' : ''}` +
      `${priceHistory[i].extra > 0 ? ', Extra: ' + priceHistory[i].extra : ''}` +
      `${priceHistory[i].deepClean === 'yes' ? ', Deep Clean: ✔️' : ''}`;
    historyDisplay.insertAdjacentElement('afterbegin', item);
  }
});

// Price Calculator Form Input Event Listeners
document.getElementById('sqft').addEventListener('input', updatePrice);
document.getElementById('pets').addEventListener('input', updatePrice);
document.getElementById('laundry').addEventListener('input', updatePrice);
document.getElementById('extra').addEventListener('input', updatePrice);
document.getElementById('deep-clean').addEventListener('input', updatePrice);

// Function to get the selected stairs value
function getSelectedStairs() {
  const stairsButtons = document.querySelectorAll('.stairs-button');
  for (let i = 0; i < stairsButtons.length; i++) {
    if (stairsButtons[i].classList.contains('selected')) {
      return parseInt(stairsButtons[i].value);
    }
  }
  return 0; // Default to 0 if no button is selected
}

// Function to handle the click event on stairs buttons
function handleStairsButtonClick(event) {
  event.preventDefault(); // Prevent form submission

  // Remove the 'selected' class from all buttons
  document.querySelectorAll('.stairs-button').forEach((btn) => {
    btn.classList.remove('selected');
  });
  // Add the 'selected' class to the clicked button
  this.classList.add('selected');

  // Update the price when stairs button is clicked
  updatePrice();
}

// Get all stairs buttons
const stairsButtons = document.querySelectorAll('.stairs-button');

// Set the default selected button as "0"
stairsButtons.forEach((button) => {
  if (button.value === '0') {
    button.classList.add('selected');
  }
  // Add event listener to each button
  button.addEventListener('click', handleStairsButtonClick);
});

// Function to update the price when input fields change
function updatePrice() {
  // Get the form values
  const sqft = parseFloat(document.getElementById('sqft').value);
  const pets = document.getElementById('pets').value;
  const stairs = getSelectedStairs();
  const laundry = document.getElementById('laundry').value;
  const extra = parseFloat(document.getElementById('extra').value);
  const deepClean = document.getElementById('deep-clean').value;

  // Calculate the price
  let rate = 0.11;
  if (pets === 'yes') {
    rate += 0.01;
  }
  rate += 0.01 * stairs;
  if (laundry === 'yes') {
    rate += 0.01;
  }
  if (extra > 0) {
    rate += 0.01 * extra;
  }
  if (deepClean === 'yes') {
    rate += 0.11;
  }
  let price = rate * sqft;
  if (price < 140) {
    price = 140;
  }

  // Display the price with limited decimal points
  document.getElementById('price-display').textContent = 'Price: $' + price.toFixed(2);
}

// Clear History Button Click Event Listener
document.getElementById('clear-history').addEventListener('click', function () {
  // Clear the price history array, reset the counter, and clear the last entry
  priceHistory = [];
  counter = 1;
  lastEntry = null;

  // Clear the price history display
  let historyDisplay = document.getElementById('price-history');
  historyDisplay.innerHTML = '';
});

// Language Switch Functionality
document.getElementById('english').addEventListener('click', function() {
    document.getElementById('label-sqft').textContent = 'Square Footage:';
    document.getElementById('label-pets').textContent = 'Pets:';
    document.getElementById('label-laundry').textContent = 'Laundry: (1 max)';
    document.getElementById('label-stairs').textContent = 'Stairs (stories):';
    document.getElementById('label-extra').textContent = 'Extras:';
    document.getElementById('calculate-button').value = 'Calculate';
    document.getElementById('clear-history').textContent = 'Clear History';
    document.getElementById('option-no').textContent = 'No';
    document.getElementById('option-yes').textContent = 'Yes';
    document.getElementById('option-no2').textContent = 'No';
    document.getElementById('option-yes2').textContent = 'Yes';
});

document.getElementById('spanish').addEventListener('click', function() {
    document.getElementById('label-sqft').textContent = 'Metros Cuadrados:';
    document.getElementById('label-pets').textContent = 'Mascotas:';
    document.getElementById('label-laundry').textContent = 'Lavar Ropa: (1 max)';
    document.getElementById('label-stairs').textContent = 'Escaleras (Pisos):';
    document.getElementById('label-extra').textContent = 'Extra:';
    document.getElementById('calculate-button').value = 'Calcular';
    document.getElementById('clear-history').textContent = 'Borrar Historial';
    document.getElementById('option-no').textContent = 'No';
    document.getElementById('option-yes').textContent = 'Sí';
    document.getElementById('option-no2').textContent = 'No';
    document.getElementById('option-yes2').textContent = 'Sí';
});
