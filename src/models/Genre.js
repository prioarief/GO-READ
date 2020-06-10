const connection = require("../config/database");
module.exports = {
    getAll : () => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM genres`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    getDetail :  (id) => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM genres WHERE id = ?', id, (error, result) => {
                    if(error){
                        reject(error)
                    }

                    resolve(result)
                })
            }) 
    },

    insertGenre : (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO genres SET ?', setData, (error, result) => {
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

    editGenre: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE genres SET ? WHERE id=?', [setData, id], (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    deleteGenre : (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM genres WHERE id=?', id, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    searchGenre : (keyword) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM genres WHERE genre like ?', `%${keyword}%`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}
