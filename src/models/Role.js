const connection = require("../config/database");
module.exports = {
    getAll : (show, page) => {
        return new Promise((resolve, reject) => {
            connection.query(`SELECT * FROM roles`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    getDetail :  (id) => {
            return new Promise((resolve, reject) => {
                connection.query('SELECT * FROM roles WHERE id = ?', id, (error, result) => {
                    if(error){
                        reject(error)
                    }

                    resolve(result)
                })
            }) 
    },

    insertRole : (setData) => {
        return new Promise((resolve, reject) => {
            connection.query('INSERT INTO roles SET ?', setData, (error, result) => {
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

    editRole: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE roles SET ? WHERE id=?', [setData, id], (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    deleteRole : (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM roles WHERE id=?', id, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    searchRole : (keyword) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM roles WHERE role like ?', `%${keyword}%`, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    }
}
