const connection = require("../config/database");
module.exports = {
    getAll : (show, page) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM authors`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    login :  (email) => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT email, password, name, role FROM users WHERE email = ?', email, (error, result) => {
                    if(error){
                        reject(error)
                    }
                    resolve(result)
                })
            }) 
    },

    register : (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO users SET ?', setData, (error, result) => {
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

    editAuthor: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE authors SET ? WHERE id=?', [setData, id], (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    deleteAuthor : (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM authors WHERE id=?', id, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    searchAuthor : (keyword) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM authors WHERE author like ?', `%${keyword}%`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}
