document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartTotal = localStorage.getItem('cartTotal') || '0.00';
    const checkoutItemsElement = document.getElementById('checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total-value');

    // Populate checkout items
    cartItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('checkout-item');
        div.innerHTML = `
            <img src="${item.thumbnail}" alt="${item.name}">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.totalPrice.toFixed(2)}</p>
                <p class="item-quantity">Quantity: ${item.quantity}</p>
            </div>
        `;
        checkoutItemsElement.appendChild(div);
    });

    // Update total
    checkoutTotalElement.textContent = cartTotal;
});

document.addEventListener('DOMContentLoaded', () => {
    const autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        { types: ['geocode'] }
    );

    autocomplete.setFields(['address_component']);

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        const componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'long_name',
            postal_code: 'short_name'
        };

        for (const component in componentForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }

        place.address_components.forEach(component => {
            const addressType = component.types[0];
            if (componentForm[addressType]) {
                const val = component[componentForm[addressType]];
                document.getElementById(addressType).value = val;
            }
        });
    });

    // Handle form submission here if needed
});

