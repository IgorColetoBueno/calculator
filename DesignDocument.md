# Calculator Design Document

## Introduction

The Calculator Application is an intuitive and user-friendly tool designed to perform basic arithmetic calculations, memory functions, history and user session. The application will be developed using React.js with Next.js in the frontend and Node.js with Express to develop a web API. The application will store the data in a PostgreSQL database hosted on Docker.

## Requirements and Features

- **User Interface**: The application will feature a clean and visually appealing user interface. It will include buttons for digits (0-9), operators (+, -, *, /), square root and exponential (√, ^) and a history functionality that can be saved on the backend if the user is logged in.

- **Input Handling**: User input will be captured through button clicks on the tiles. The input will be displayed in a Display. The display contais the current calc and below the result. The user can interact with the display by cleaning (C) and typing new numbers/operators.

- **Calculation Logic**: The calculator will interpret user input and execute calculations accordingly. For that the **"math-expression-evaluator"** will be used. The library receives math expressions and returns the result. However, some operations as square root, percentage and division will need a mapping between the display input and the payload, because the symbols used in the library are different than the symbols used on display.

- **Error Handling**: The application will treat API errors and calculation errors in the following way: The real exceptions will be caught and handled in a way that they can be displayed to the user, without complex terms that make it difficult for the user to understand

## Technical Architecture

### Backend

- **Node.js**: The most famous Javascript runtime. It will be used as a base for all other technologies

- **Express**: A Node.js framework to create web APIs. It will be used to manage routes, middlewares, authentication and control requests and responses 

- **Docker**: Docker will be used to create the necessary infrastructure for the database deploy 

- **Prisma**: Famous Node.js ORM to manage database collections thought the API 

- **Joi**: Library used to create validation schemas to serve as middleware in API endpoint to assure the data integrity 

- **Passport**: Library to manage authentication and provide a middleware for authenticate users and assure secure routes 

### Frontend

- **JSX**: The frontend components wil be creating re-usable components to improve the performance and code quality.

- **Tailwind CSS**: Utilitary very useful to create design systems from 0 and help to define patterns and speed up the coding

- **Typescript**: The application logic will be implemented using Typescript. All frontend logic and state management will be created from this language

- **React**: The library that join all technologies above to create a modern, fast to develop, and easy to maintain web applications

- **Next.js**: This framework helps to create faster robust React applications with the Server Side Rendering option included. This application will use some server components to improve the performance and SEO

- **Jotai**: State manament tool used to manage state atoms and simplify. The tool will be used to control the calculator and auth state.

### Error Handling

- **Input Validation**: The backend and frontend applications will have a robust input validation to assure the fields types, sizes and contents, specially in string and number fields

- **Calculator error handling**: All operations that can trigger errors will dispatch a generic error on the calculator display. It is useful for novice users understand that the last operation caused an error.

## Development Timeline

1. **API Development** (4 hours):
   - Create the base API structure
   - Docker and Docker Compose configurations
   - Create database entitites
   - Create services
   - Create controllers
   - Implement authentication

2. **Frontend Development** (4 hours):
   - Create the base frontend structure
   - Implement the calculator UI
   - Implemement the calculator management state
   - Implement the calculator logic
   - Implement the history
   - Implement the authentication flow

## Conclusion

The Calculator Application is designed to provide users with an intuitive and efficient tool for basic arithmetic calculations, memory functions, history and user session. By delivering a user-friendly interface, reliable calculation logic, and effective error handling, the application has a good user experience and good design.
