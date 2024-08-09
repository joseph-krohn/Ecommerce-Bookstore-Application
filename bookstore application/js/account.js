document.addEventListener('DOMContentLoaded', () => {
    const changePasswordButton = document.querySelector('.account-settings button:nth-child(1)');
    const updateEmailButton = document.querySelector('.account-settings button:nth-child(2)');
    const deleteAccountButton = document.querySelector('.account-settings button:nth-child(3)');

    changePasswordButton.addEventListener('click', () => {
        alert('Change Password functionality will be implemented.');
    });

    updateEmailButton.addEventListener('click', () => {
        alert('Update Email functionality will be implemented.');
    });

    deleteAccountButton.addEventListener('click', () => {
        alert('Delete Account functionality will be implemented.');
    });
});
