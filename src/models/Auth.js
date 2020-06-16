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
                connection.query('SELECT u.id, u.email, u.password, u.name, r.role FROM users u JOIN roles r ON r.id = u.role WHERE u.email = ? ', email, (error, result) => {
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

    editUsers: (setData, id) => {
        return new Promise((resolve, reject) => {
            connection.query('UPDATE users SET ? WHERE id=?', [setData, id], (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },

    deleteUser : (id) => {
        return new Promise((resolve, reject) => {
            connection.query('DELETE FROM users WHERE id=?', id, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    
    detailUser : (id) => {
        return new Promise((resolve, reject) => {
            connection.query('SELECT u.email, u.password, u.name, r.role FROM users u JOIN roles r ON r.id = u.role WHERE u.id = ? ', id, (error, result) => {
                if(error){
                    reject(error)
                }
                resolve(result)
            })
        })
    },
}
