document.addEventListener('DOMContentLoaded', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get('query');
    const searchResultsContainer = document.getElementById('search-results');
    const filterOptionsContainer = document.getElementById('filter-options');

    if (!query) {
        searchResultsContainer.innerHTML = '<p>Please enter a search term</p>';
        return;
    }

    fetch('data/books.csv')
        .then(response => response.text())
        .then(data => {
            const books = Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true
            }).data;

            // Filter books based on the search query
            const results = books.filter(book => 
                (typeof book.title === 'string' && book.title.toLowerCase().includes(query.toLowerCase())) ||
                (typeof book.author === 'string' && book.author.toLowerCase().includes(query.toLowerCase()))
            );

            // Display filter options
            const genres = [...new Set(books.map(book => book.genre).filter(Boolean))];
            filterOptionsContainer.innerHTML = genres.map(genre => `
                <button onclick="filterResults('${genre}')">${genre}</button>
            `).join(' ');

            // Display search results
            if (results.length > 0) {
                searchResultsContainer.innerHTML = results.map(book => `
                    <div class="book-item">
                        <img src="images/book${book.id}.jpg" alt="${book.title}">
                        <div class="book-info">
                            <h4>${book.title}</h4>
                            <p>Author: ${book.author}</p>
                            <p>Price: $${parseFloat(book.price).toFixed(2)}</p>
                            <a href="product.html?id=${book.id}" class="view-details">View Details</a>
                        </div>
                    </div>
                `).join('<hr>');
            } else {
                searchResultsContainer.innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the books data:', error);
            searchResultsContainer.innerHTML = '<p>There was an error processing your request. Please try again later.</p>';
        });
});

// Function to filter results based on genre
function filterResults(genre) {
    fetch('data/books.csv')
        .then(response => response.text())
        .then(data => {
            const books = Papa.parse(data, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true
            }).data;

            const filteredBooks = books.filter(book => book.genre === genre);

            const searchResultsContainer = document.getElementById('search-results');
            if (filteredBooks.length > 0) {
                searchResultsContainer.innerHTML = filteredBooks.map(book => `
                    <div class="book-item">
                        <img src="images/book${book.id}.jpg" alt="${book.title}">
                        <div class="book-info">
                            <h4>${book.title}</h4>
                            <p>Author: ${book.author}</p>
                            <p>Price: $${parseFloat(book.price).toFixed(2)}</p>
                            <a href="product.html?id=${book.id}" class="view-details">View Details</a>
                        </div>
                    </div>
                `).join('<hr>');
            } else {
                searchResultsContainer.innerHTML = '<p>No results found</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the books data:', error);
            searchResultsContainer.innerHTML = '<p>There was an error processing your request. Please try again later.</p>';
        });
}
