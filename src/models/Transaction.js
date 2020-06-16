const connection = require("../config/database");
module.exports = {
    getAll : (show, page, sorting, sort, search) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT b.id, b.title, b.description, b.image, g.genre, a.author, b.status, b.created_at, b.updated_at FROM books b JOIN genres g ON g.id = b.genre_id JOIN authors a ON a.id = b.author_id 
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

    getDetailTransaction :  (id) => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT b.title, b.description, g.genre, a.author, tr.borrowed_at FROM transaction tr JOIN books b ON b.id = tr.book_id JOIN genres g ON g.id = b.genre_id JOIN authors a ON a.id = b.author_id WHERE tr.id = ?', id,
                (error, result) => {
                    if(error){
                        reject(error)
                    }

                    resolve(result)
                })
            }) 
    },

    insertTransaction : (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO transaction SET ?', setData, (error, result) => {
                if(error){
                    reject(error)
                }
                
                const newData ={
                    id : result.insertId,
                    ...setData
                }
                resolve(newData)
            })
        })
    },

    returnBook: (setData, id, user_id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE transaction SET ? WHERE book_id= ? AND user_id', [setData, id, user_id], (error, result) => {
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
            connection.query('SELECT * FROM books WHERE title like ?', `%${keyword}%`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}
