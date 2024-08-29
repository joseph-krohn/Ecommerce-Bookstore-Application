document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.querySelector('header input[type="text"]');
    const searchButton = document.querySelector('header button');

    searchButton.addEventListener('click', () => {
        const searchTerm = searchBar.value;
        window.location.href = `search.html?query=${searchTerm}`;
    });
});
