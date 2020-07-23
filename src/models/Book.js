const connection = require("../config/database");
module.exports = {
    getImage : () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * from books`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    getAll : (show, page, sorting, sort, search) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT b.id, b.title, b.description, b.image, g.genre, b.genre_id, a.author, b.author_id, b.status, b.created_at, b.updated_at FROM books b JOIN genres g ON g.id = b.genre_id JOIN authors a ON a.id = b.author_id 
            WHERE b.title LIKE '%${search}%' 
                OR b.status LIKE '%${search}%' 
                OR g.genre LIKE '%${search}%' 
                OR a.author LIKE '%${search}%' 
            ORDER BY ${sorting} ${sort} LIMIT ${show} OFFSET ${page}`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    getDetail :  (id) => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT b.id, b.title, b.description, b.image, g.id as idGenre, g.genre, a.id as idAuthor, a.author, b.status, b.created_at, b.updated_at FROM books b JOIN genres g ON g.id = b.genre_id JOIN authors a ON a.id = b.author_id WHERE b.id = ?', id, (error, result) => {
                    if(error){
                        reject(error)
                    }

                    resolve(result)
                })
            }) 
    },

    insertBook : (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO books SET ?', setData, (error, result) => {
                if(error){
                    reject(error)
                }
                
                console.log(setData)
                const newData ={
                    id : result.insertId,
                    ...setData
                }
                resolve(newData)
            })
        })
    },

    editBook: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE books SET ? WHERE id=?', [setData, id], (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    deleteBook : (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM books WHERE id=?', id, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    searchBook : (keyword) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT b.id, b.title, b.description, b.image, g.genre, a.author, b.status, b.created_at, b.updated_at FROM books b JOIN genres g ON g.id = b.genre_id JOIN authors a ON a.id = b.author_id 
            WHERE b.title LIKE '%${keyword}%' 
                OR b.status LIKE '%${keyword}%' 
                OR g.genre LIKE '%${keyword}%' 
                OR a.author LIKE '%${keyword}%'`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}
