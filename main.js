let counter = 1;
let priceHistory = [];

document.getElementById('price-calculator').addEventListener('submit', function(event) {
    event.preventDefault();

    const sqft = document.getElementById('sqft').value;
    const pets = document.getElementById('pets').value;
    const stairs = document.getElementById('stairs').value;
    const laundry = document.getElementById('laundry').value;
    const extra = document.getElementById('extra').value;

    let rate = 0.11;
    if (pets === 'yes') {
        rate += 0.01;
    }
    if (stairs > 0) {
        rate += 0.01 * stairs;
    }
    if (laundry === 'yes') {
        rate += 0.01;
    }
    if (extra > 0) {
        rate += 0.01 * extra;
    }

    let price = rate * sqft;
    if (price < 140) {
        price = 140;
    }

    document.getElementById('price-display').textContent = 'Price: $' + price;

    // Update the price history (maximum of 6 entries)
    if (priceHistory.length >= 6) {
        priceHistory.shift();  // remove the oldest entry if we have 6 already
    }

    // Add the new entry to the history
    let newEntry = {id: counter++, price: price, sqft: sqft};
    if (pets === 'yes') newEntry.pets = '✅';
    if (stairs > 0) newEntry.stairs = stairs;
    if (laundry === 'yes') newEntry.laundry = '✅';
    if (extra > 0) newEntry.extra = extra;
    priceHistory.push(newEntry);

    // Clear the price history display and add all entries from the array
    let historyDisplay = document.getElementById('price-history');
    historyDisplay.innerHTML = '';
    for (let i = 0; i < priceHistory.length; i++) {
        let itemText = 'ID: ' + priceHistory[i].id + ',  Price: $' + priceHistory[i].price + ',  SqFt: ' + priceHistory[i].sqft;
        if (priceHistory[i].pets) itemText += ',  Pets: ' + priceHistory[i].pets;
        if (priceHistory[i].stairs) itemText += ',  Stairs: ' + priceHistory[i].stairs;
        if (priceHistory[i].laundry) itemText += ',  Laundry: ' + priceHistory[i].laundry;
        if (priceHistory[i].extra) itemText += ',  Extra: ' + priceHistory[i].extra;
        let item = document.createElement('p');
        item.textContent = itemText;
        historyDisplay.appendChild(item);
    }
});

document.getElementById('clear-history').addEventListener('click', function() {
    // Clear the price history array and reset the counter
    priceHistory = [];
    counter = 1;

    // Clear the price history display
    let historyDisplay = document.getElementById('price-history');
    historyDisplay.innerHTML = '';
});

// Language switch functionality
document.getElementById('english').addEventListener('click', function() {
    document.getElementById('label-sqft').textContent = 'Square Footage:';
    document.getElementById('label-pets').textContent = 'Pets:';
    document.getElementById('label-laundry').textContent = 'Laundry:';
    document.getElementById('label-stairs').textContent = 'Stairs (stories):';
    document.getElementById('label-extra').textContent = 'Extras:';
    document.getElementById('calculate-button').value = 'Calculate';
    document.getElementById('clear-history').textContent = 'Clear History'; // Added this line
    document.getElementById('option-no').textContent = 'No';
    document.getElementById('option-yes').textContent = 'Yes';
    document.getElementById('option-no2').textContent = 'No';
    document.getElementById('option-yes2').textContent = 'Yes';
});

document.getElementById('spanish').addEventListener('click', function() {
    document.getElementById('label-sqft').textContent = 'Metros Cuadrados:';
    document.getElementById('label-pets').textContent = 'Mascotas:';
    document.getElementById('label-laundry').textContent = 'Lavar Ropa:';
    document.getElementById('label-stairs').textContent = 'Escaleras (Pisos):';
    document.getElementById('label-extra').textContent = 'Extra:';
    document.getElementById('calculate-button').value = 'Calcular';
    document.getElementById('clear-history').textContent = 'Borrar Historial'; // Added this line
    document.getElementById('option-no').textContent = 'No';
    document.getElementById('option-yes').textContent = 'Sí';
    document.getElementById('option-no2').textContent = 'No';
    document.getElementById('option-yes2').textContent = 'Sí';
});

