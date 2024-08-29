E-commerce Bookstore

This repository contains the code for a full-stack e-commerce bookstore web application. The application allows users to browse, search for, and purchase books online.
Features

    User Authentication: Users can create an account, log in, and log out.
    Product Browsing: Browse books by category, search for specific titles or authors, and view detailed product pages.
    Shopping Cart: Add books to a shopping cart, update quantities, and proceed to checkout.
    Order Management: Users can view their order history and track current orders.
    Admin Panel: Admin users can manage inventory, add new books, and update product details.

Getting Started
Prerequisites

To run the application, you'll need:

    Node.js and npm installed on your system
    A database management system (e.g., MySQL, PostgreSQL)
    A code editor (e.g., VS Code)

Installation

    Clone the repository:

    bash

git clone https://github.com/joseph-krohn/web_dev-ecom_bookstore.git

Navigate to the project directory:

bash

cd web_dev-ecom_bookstore

Install the dependencies:

bash

npm install

Set up the database:

    Create a new database in your database management system.
    Update the database configuration in the .env file with your database credentials.

Run database migrations:

bash

npm run migrate

Start the development server:

bash

npm start

Open the application in your web browser:

bash

    http://localhost:3000

Project Structure

    src/: Contains the main source code for the application.
        controllers/: Handles the logic for different routes and actions.
        models/: Defines the database models for users, products, orders, etc.
        routes/: Contains the route definitions for the application.
        views/: Contains the HTML and template files for rendering the front end.
        public/: Static files like CSS, JavaScript, and images.
    .env: Configuration file for environment variables.
    package.json: Lists the project dependencies and scripts.

Contributing

If you'd like to contribute to the project, feel free to fork the repository and submit a pull request with your improvements or bug fixes.
License

This project is licensed under the MIT License. See the LICENSE file for more details.
Acknowledgements

This project was built as a learning exercise in full-stack web development.
