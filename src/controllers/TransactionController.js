const Book = require("../models/Book")
const Transaction = require("../models/Transaction")
const helper = require("../helpers/message")
const moment = require("moment-timezone")
module.exports = {
    getTransaction : async (req, res) => {
        try {
            const data = await Transaction.getAll()
            if(data.length != 0){
                return helper.response(res, 'success' , data, 200)
            }
            return helper.response(res, 'success' , 'empty', 200)
        } catch (error) {
            console.log(error)
        }
    },
    
    detailTransaction : async (req, res) => {
        const id = req.params.id
        try {
            const data = await Transaction.getDetailTransaction(id)
            if(data.length != 0){
                // delete data[0].returned_at
                delete data[0].book_id
                return helper.response(res, 'success' , data, 200)
            }
            return helper.response(res, 'success' , 'Not found', 404)
        } catch (error) {
            console.log(error)
        }
    },
    
    history : async (req, res) => {
        const id = req.decoded.result[0].id
        try {
            const data = await Transaction.getHistoryTransaction(id)
            if(data.length != 0){
                // delete data[0].returned_at
                // delete data[0].book_id
                return helper.response(res, 'success' , data, 200)
            }
            return helper.response(res, 'success' , 'Not found', 404)
        } catch (error) {
            console.log(error)
        }
    },
    borrowed : async (req, res) => {
        // const date = moment.tz(new Date().toISOString(), "Asia/Jakarta");
        const book_id = parseInt(req.params.id)
        const user_id = req.decoded.result[0].id
        try {
            const data = await Book.getDetail(book_id)
            const status = (data[0].status.toLowerCase() == 'available') ? true : false
            if(status){
                const setData = {
                    book_id : book_id,
                    user_id : user_id,
                }
                const borrowed = await Transaction.insertTransaction(setData)
                if(borrowed){
                    const result = await Transaction.getDetailTransaction(borrowed.id)
                    const data = {
                        status : 'Borrowed'
                    }
                    await Book.editBook(data, book_id)
                    delete result[0].book_id
                    return helper.response(res, 'success' , result, 200)
                }
            }else{
                return helper.response(res, 'failed' , 'The book is not available', 401)
            }
        } catch (error) {
            console.log(error)
        }
    },
    
    returned : async (req, res) => {
        const date = moment.tz(new Date().toISOString(), "Asia/Jakarta");
        const id = parseInt(req.params.id)
        const user_id = req.decoded.result[0].id
        try {
            const data = await Transaction.getDetailTransaction(id)
            const status = (data[0].returned_at == null) ? true : false
            if(status){
                const setData = {
                    returned_at : date.format(),
                }
                console.log(setData)
                const returned = await Transaction.returnBook(setData, data[0].book_id, user_id)
                if(returned){
                    const bookdata = {
                        status : 'Available'
                    }
                    await Book.editBook(bookdata, data[0].book_id)
                    setData.message = 'The book has been returned'
                    return helper.response(res, 'success' , setData, 200)
                }
            }else{
                return helper.response(res, 'failed' , 'The book is not borrowed', 401)
            }
        } catch (error) {
            console.log(error)
        }
    },
}