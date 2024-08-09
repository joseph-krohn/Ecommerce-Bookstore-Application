document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = loginForm.username.value;
        const password = loginForm.password.value;

        // Mock login validation
        if (username === 'admin' && password === 'password') {
            loginMessage.style.color = 'green';
            loginMessage.textContent = 'Login successful! Redirecting...';
            setTimeout(() => {
                window.location.href = 'account.html';
            }, 2000);
        } else {
            loginMessage.textContent = 'Invalid username or password.';
        }
    });
});
