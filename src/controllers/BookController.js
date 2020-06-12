const { getAll, getDetail, insertBook, editBook, deleteBook, searchBook } = require("../models/Book")
const helper = require("../helpers/message")
const validate = require("../helpers/validate")
const fs = require("fs")


module.exports = {
	getAllBook: async (req, res) => {
        const show = req.query.show || 6
        const page = req.query.page || 1
        let sort = req.query.sort || 'title'
        if(sort == 'latest'){
            sort = 'created_at'
        }
        const sorting = (sort == 'created_at') ? 'DESC' : 'ASC'
        const search = req.query.search || ''
        let thisPage = (show * page) - show
		try {
            const result = await getAll(show, thisPage, sort, sorting, search)
            if(result.length > 0){
                return helper.response(res, 'success' , result, 200)
            }
            return helper.response(res, 'failed' , 'Data not found', 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},

	detailBook: async (req, res) => {
        const id = req.params.id
		try {
            const result = await getDetail(id)
            if(result.length > 0){
                return helper.response(res, 'success' , result, 200)
            }
            return helper.response(res, 'failed' , 'Data not found', 200)
        } catch (error) {
            console.log(error)
                return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},


	createBook: async (req, res) => {
        const setData = req.body
        setData.image = req.file ? req.file.filename : ''
        try {
            const validation = validate.bookValidation(setData)
            if(validation.error == null){
                const result =  await insertBook(setData)
                const data = await getDetail(result.id)
                return helper.response(res, 'success' , data, 201)
            }
            fs.unlinkSync(`public/images/${setData.image}`)
            let errorMessage = validation.error.details[0].message
            errorMessage = errorMessage.replace(/"/g, "")
            return helper.response(res, 'failed' , errorMessage, 400)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    editBook : async (req, res) => {
        const setData = req.body
        const id = req.params.id
        let oldImage = null
        if(req.file){
            const newImage = req.file.filename
            setData.image = newImage
            const OldData = await getDetail(id)
            oldImage = OldData[0].image
        }
        try {
            const result = await editBook(setData, id)
            if(result.affectedRows == 1){
                if(oldImage != null) fs.unlinkSync(`public/images/${oldImage}`)
                const data = await getDetail(id)
                return helper.response(res, 'success' , data, 200)
            }
            return helper.response(res, 'failed' , `Data id ${id} not found`, 404)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    deleteBook : async (req, res) => {
        const id = req.params.id
        try {
            const data = await getDetail(id)
            const image = data[0].image
            const result = await deleteBook(id)
            if(result.affectedRows == 1){
                fs.unlinkSync(`public/images/${image}`)
                return helper.response(res, 'success' , `Data id ${id} berhasil di hapus`, 200)
            }
            return helper.response(res, 'failed' , `Data id ${id} not found`, 404)
            
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},
	
	searchBook : async (req, res) => {
        const keyword = req.query.keyword
        try {
            const result = await searchBook(keyword)
            if(result.length  > 0){
                return helper.response(res, 'success', result, 200)
            }
            return helper.response(res, 'failed', 'Data not found', 404)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	}
};
