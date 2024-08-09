document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const productId = searchParams.get('id');
    const productDetails = document.getElementById('productDetails');
    const productImage = document.getElementById('productImage');
    const productCode = document.getElementById('productCode');
    const productName = document.getElementById('productName');
    const productRating = document.getElementById('productRating');
    const productPrice = document.getElementById('productPrice');
    const productDescription = document.getElementById('productDescription');
    const addToCartButton = document.getElementById('addToCartButton');
    const similarList = document.getElementById('similarList');

    fetch('data/books.csv')
        .then(response => response.text())
        .then(data => {
            const books = Papa.parse(data, {
                header: true,
                dynamicTyping: true
            }).data;

            const book = books.find(b => b.id == productId);
            if (book) {
                productImage.src = `images/book${book.id}.jpg`;
                productCode.textContent = `Product Code/SKU Number: ${book.id}`;
                productName.textContent = book.title;
                productRating.textContent = `Product Rating/Reviews: ${book.rating || 'N/A'}`;
                productPrice.textContent = `Price: $${parseFloat(book.price).toFixed(2)}`;
                productDescription.textContent = book.description;
                productDescription.classList.add('italic');

                const similarBooks = books.filter(b => b.genre && b.genre.toLowerCase() === book.genre.toLowerCase() && b.id !== book.id);
                displaySimilarTitles(similarBooks);

                addToCartButton.addEventListener('click', () => {
                    addToCart(book.id);
                });
            } else {
                productDetails.innerHTML = '<p>Product not found.</p>';
            }
        });

    function displaySimilarTitles(books) {
        similarList.innerHTML = '';
        books.forEach(book => {
            const similarItem = document.createElement('div');
            similarItem.classList.add('similar-item');
            similarItem.innerHTML = `
                <img src="images/book${book.id}.jpg" alt="${book.title}">
                <p><strong>${book.title}</strong></p>
                <a href="product.html?id=${book.id}">View Details</a>
            `;
            similarList.appendChild(similarItem);
        });
    }

    function addToCart(bookId) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(bookId);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert('Book added to cart!');
    }
});
