# Task-Management
A task management system implementing Clean Architecture principles by Bob Martin.

## Overview
This task management system, based on Bob Martin's Clean Architecture, utilizes the Nest.js framework and MongoDB as the database. It provides a structured and testable approach to managing tasks and their statuses.

## Features

1. signup , login user authentication
2. Create, update, and delete tasks.
3. Manage task statuses - 'To-Do', 'In-Progress', and 'Completed'.
4. Validates status changes for accuracy.

## Architecture

The project follows Bob Martin's Clean Architecture principles, ensuring separation of concerns and a clear boundary between different layers:

- **Entities:** Contain business logic, representing core business objects like tasks and users.
- **Use Cases:** Or Interactors/Services encapsulate business rules and orchestrate data flow.
- **Controllers & Gateways:** Interface adapters that interact with external systems like databases and expose API endpoints.
- **Frameworks & Drivers:** External frameworks and tools such as Nest.js and MongoDB.

## API Documentation with Swagger
Swagger is integrated to document the API endpoints. After starting the application:
1. Navigate to [http://localhost:3000/api](http://localhost:3000/api) to access the Swagger UI.
2. Explore and interact with the documented endpoints to understand their functionality.

## How to Set Up

1. Clone the project repository:
    ```
      git clone https://github.com/Amriita/Task-Management.git
    ```

2. Install dependencies:
    ```
    npm install
    ```

3. Run the application:
    ```
    npm run start
    ```

4. Open your browser and navigate to [http://localhost:3000/tasks](http://localhost:3000/tasks) to view the list of tasks.

## Contributing

Interested in contributing to the project? Check out the contribution guidelines for more details.

---

