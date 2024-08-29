document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cartItemsContainer');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutButton = document.getElementById('checkoutButton');

    fetch('data/books.csv')
        .then(response => response.text())
        .then(data => {
            const books = Papa.parse(data, {
                header: true,
                dynamicTyping: true
            }).data;

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            displayCartItems(cart, books);
        });

    function displayCartItems(cart, books) {
        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
            cartSubtotal.textContent = '$0.00';
            cartTotal.textContent = '$0.00';
            return;
        }

        let subtotal = 0;
        const itemCount = {};
        cart.forEach(itemId => {
            itemCount[itemId] = (itemCount[itemId] || 0) + 1;
        });

        Object.keys(itemCount).forEach(itemId => {
            const book = books.find(b => b.id == itemId);
            if (book) {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <img src="images/book${book.id}.jpg" alt="${book.title}">
                    <p><strong>${book.title}</strong></p>
                    <p>Author: ${book.author}</p>
                    <div class="quantity-container">
                        <button class="quantity-button" data-id="${book.id}" data-action="decrease">-</button>
                        <div class="quantity-display" id="quantity-${book.id}">${itemCount[itemId]}</div>
                        <button class="quantity-button" data-id="${book.id}" data-action="increase">+</button>
                    </div>
                    <p>Price: $${(book.price * itemCount[itemId]).toFixed(2)}</p>
                    <button class="remove-button" data-id="${book.id}">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
                subtotal += book.price * itemCount[itemId];
            }
        });

        cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
        cartTotal.textContent = `$${(subtotal * 1.1).toFixed(2)}`; // Assuming 10% tax for example

        const removeButtons = document.querySelectorAll('.remove-button');
        const quantityButtons = document.querySelectorAll('.quantity-button');
        removeButtons.forEach(button => {
            button.addEventListener('click', event => removeCartItem(event, books));
        });
        quantityButtons.forEach(button => {
            button.addEventListener('click', event => updateQuantity(event, books));
        });
    }

    function removeCartItem(event, books) {
        const bookId = event.target.getAttribute('data-id');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart = cart.filter(id => id != bookId);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(cart, books);
    }

    function updateQuantity(event, books) {
        const bookId = event.target.getAttribute('data-id');
        const action = event.target.getAttribute('data-action');
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        if (action === 'increase') {
            cart.push(bookId);
        } else if (action === 'decrease') {
            const index = cart.indexOf(bookId);
            if (index > -1) {
                cart.splice(index, 1);
            }
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems(cart, books);
    }

    checkoutButton.addEventListener('click', () => {
        alert('Proceeding to checkout!');
    });
});
