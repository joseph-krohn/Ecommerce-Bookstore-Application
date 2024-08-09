document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const searchButton = document.getElementById('searchButton');
    const newTitlesGrid = document.getElementById('new-titles-grid');

    fetch('data/books.csv')
        .then(response => response.text())
        .then(data => {
            const books = Papa.parse(data, {
                header: true,
                dynamicTyping: true
            }).data;

            // Set Moby Dick as the recommended book
            const recommendedBook = books.find(book => book.title === 'Moby Dick');
            if (recommendedBook) {
                document.getElementById('rec-img').src = `images/book${recommendedBook.id}.jpg`;
                document.getElementById('rec-title').textContent = recommendedBook.title;
                document.getElementById('rec-author').textContent = `Author: ${recommendedBook.author}`;
                document.getElementById('rec-summary').textContent = `Summary: ${recommendedBook.description}`;
                document.getElementById('rec-summary').classList.add('italic');
            }

            // Set newly available titles
            const newTitles = ['The Alchemist', 'Brave New World', 'To Kill a Mockingbird', '1984'];
            const newBooks = books.filter(book => newTitles.includes(book.title)).slice(0, 8); // Populate more books
            newBooks.forEach(book => {
                const price = parseFloat(book.price);
                const bookItem = document.createElement('div');
                bookItem.classList.add('book-item');
                bookItem.innerHTML = `
                    <img src="images/book${book.id}.jpg" alt="${book.title}">
                    <h4>${book.title}</h4>
                    <p>${book.author}</p>
                    <p>$${isNaN(price) ? 'N/A' : price.toFixed(2)}</p>
                    <a href="product.html?id=${book.id}">View Details</a>
                `;
                newTitlesGrid.appendChild(bookItem);
            });
        })
        .catch(error => console.error('Error fetching the books data:', error));

    searchButton.addEventListener('click', () => {
        const searchTerm = searchBar.value;
        window.location.href = `search.html?query=${searchTerm}`;
    });
});
