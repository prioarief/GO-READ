const connection = require("../config/database");
module.exports = {
    getAll : () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT tr.id, us.name as borrower, b.title, b.description, g.genre, a.author, tr.borrowed_at FROM transaction tr JOIN books b ON b.id = tr.book_id JOIN genres g ON g.id = b.genre_id JOIN authors a ON a.id = b.author_id JOIN users us ON us.id = tr.user_id`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    getDetailTransaction :  (id) => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT tr.id, us.name as borrower, b.id as book_id, b.title, b.image, b.description, g.genre, a.author, tr.borrowed_at, tr.returned_at FROM transaction tr JOIN books b ON b.id = tr.book_id JOIN genres g ON g.id = b.genre_id JOIN authors a ON a.id = b.author_id JOIN users us ON us.id = tr.user_id WHERE tr.id = ?', id,
                (error, result) => {
                    if(error){
                        reject(error)
                    }

                    resolve(result)
                })
            }) 
    },
    
    getHistoryTransaction :  (id) => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT tr.id, us.name as borrower, b.id as book_id, b.title, b.image, b.description, g.genre, a.author, tr.borrowed_at, tr.returned_at FROM transaction tr JOIN books b ON b.id = tr.book_id JOIN genres g ON g.id = b.genre_id JOIN authors a ON a.id = b.author_id JOIN users us ON us.id = tr.user_id WHERE us.id = ?', id,
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
