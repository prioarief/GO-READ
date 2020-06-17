# Go Read

Go read is a library application for viewing and borrowing books.
![downloads](https://img.shields.io/github/downloads/atom/atom/total.svg)
![build](https://img.shields.io/appveyor/ci/:user/:repo.svg)
![chat](https://img.shields.io/discord/:serverId.svg)

## Stack
 - Node js (Express)
 - Mysql
 - NPM / Yarn


## Installation

```bash
git clone https://github.com/prioarief/GO-READ.git
cd your repository
npm / yarn install
```

## Setup .env

```javascript
USER_EMAIL=
PASS_EMAIL=
APP_PORT=
JWT_KEY=
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASSWORD=
MYSQL_DATABASE=
```

## Run Serve
```bash
npm / yarn start 
```

## Fiture
- #### Author Management
- #### Book Management
- #### Genre Management
- #### Role Management
- #### Borrowing and return Book
- #### Authentication with token and verify email

## Routing
- #### Auth
    - Login (post) : /api/auth/login
    - Register (post) : /api/auth/register
- #### Books
    - Create Book (post) : /api/books
    - Edit Book (put) : /api/books/id
    - Delete Book (delete) : /api/books/id
    - Detail Book (get) : /api/books/id
    - Get All Book (get) : /api/books/
- #### Genres
    - Create Book (post) : /api/genres
    - Edit Book (put) : /api/genres/id
    - Delete Book (delete) : /api/genres/id
    - Detail Book (get) : /api/genres/id
    - Get All Book (get) : /api/genres/

## Author
- [Prio Arief Gunawan](https://choosealicense.com/licenses/mit/)

## License
[MIT](https://choosealicense.com/licenses/mit/)