# Go Read

Go read is a library application for viewing and borrowing books.


## Installation

```bash
git clone https://github.com/prioarief/Library-App-API-ExpressJS-MYSQL.git
cd your repository
npm / yarn install
```

## Setup .env

```javascript
USER_EMAIL=
PASS_EMAIL=
APP_PORT=
APP_URL=
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

## License
[MIT](https://choosealicense.com/licenses/mit/)
