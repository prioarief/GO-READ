# Go Read

Go read is a library application for viewing and borrowing books.

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
- #### Authentication with verify email
- #### Book Management
- #### Borrowing and return Book
- #### Genre Management
- #### Role Management

## Routing
- #### Auth
    - Login (post) : /api/auth/login
    - Register (post) : /api/auth/register
    - Activation (post) : /api/auth/activation
- #### Authors
    - Create Book (post) : /api/authors
    - Edit Book (put) : /api/authors/id
    - Delete Book (delete) : /api/authors/id
    - Detail Book (get) : /api/authors/id
    - Get All Book (get) : /api/authors/
- #### Books
    - Create Book (post) : /api/books
    - Edit Book (put) : /api/books/id
    - Delete Book (delete) : /api/books/id
    - Detail Book (get) : /api/books/id
    - Search Book (get) : /api/books/search?keyword=keyword
    - Get All Book (get) : /api/books/
    - Get All Book (get) with sort, pagination and search : /api/books/?sort=title&show=2&page=1&search=keyword
- #### Genres
    - Create Book (post) : /api/genres
    - Edit Book (put) : /api/genres/id
    - Delete Book (delete) : /api/genres/id
    - Detail Book (get) : /api/genres/id
    - Get All Book (get) : /api/genres/
- #### Transaction
    - Borrowing a Book (get) : /api/books/borrowed/book_id
    - Return a book (get) : /api/books/returned/book_id

## Author
- [Prio Arief Gunawan](https://www.linkedin.com/in/priooarief/)

## License
[MIT](https://choosealicense.com/licenses/mit/)