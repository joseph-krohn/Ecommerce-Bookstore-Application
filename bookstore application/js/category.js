document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');
    const categoryTitle = document.getElementById('category-title');
    const categoryBooks = document.getElementById('category-books');

    categoryTitle.textContent = genre;

    fetch('data/books.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const books = Papa.parse(data, { header: true, dynamicTyping: true }).data;
            const filteredBooks = books.filter(book => book.genre === genre);

            categoryBooks.innerHTML = ''; // Clear existing content
            filteredBooks.forEach(book => {
                const price = parseFloat(book.price).toFixed(2); // Ensure price is a number and format it
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-item');
                bookItem.innerHTML = `
                    <a href="product.html?id=${book.id}">
                        <img src="images/book${book.id}.jpg" alt="${book.title}">
                        <h4>${book.title}</h4>
                        <p>${book.author}</p>
                        <p>$${price}</p>
                    </a>
                `;
                categoryBooks.appendChild(bookItem);
            });

            if (filteredBooks.length === 0) {
                categoryBooks.innerHTML = '<p>No books found in this category.</p>';
            }
        })
        .catch(error => console.error('Error fetching the books data:', error));
});
