# Samantha Pinos MVP

Visit it live at https://midori-shop.herokuapp.com/

## Documents

- database schema:

[database schema](https://docs.google.com/document/d/1VQh12-cG4rDATIN0PKsQsS6vFVCMiY8w0l2clDOelPc/edit?usp=sharing)

- API routes

[api routes](https://docs.google.com/document/d/1b_ZiK5qq2oxR-ChWOJYxsoJoU3iXvJyI2W8ziEElWdY/edit?usp=sharing)

## Setup

### Dependencies

- Run `npm install` or in project directory. This will install server-related dependencies.
- `cd client` and run `npm install`. This will install client dependencies (React).

### Database Prep

- Access the MySQL interface in your terminal by running `mysql -u root -p`
- Create a new database called facebook: `create database shop`
- Add a `.env` file to the main folder of this repository containing the MySQL authentication information for MySQL user. For example:

```bash
  DB_HOST=localhost
  DB_USER=root
  DB_NAME=shop
  DB_PASS=YOURPASSWORD
```

- Run `npm run migrate` in the main folder of this repository, in a new terminal window. This will create three tables articles, colors and categories.

- Run `npm run seed` in the main folder as well, to fill the tables with content.

### JWT

JSON Web Tokens are used for user authorization. A secret string is used to sign the tokens.

Add your secret to the `.env` file:

```
SUPER_SECRET=YOUR_SECRET
```

### Development

- Run `npm start` in project directory to start the Express server on port 5000
- `cd client` and run `npm start` to start client server in development mode with hot reloading in port 3000.

_This is a student project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona._
