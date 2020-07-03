const { getAll, getDetail, insertBook, editBook, deleteBook, searchBook, getImage } = require("../models/Book")
const helper = require("../helpers/message")
const validate = require("../helpers/validate")
const fs = require("fs")

module.exports = {

	getImage: async (req, res) => {
		try {
            const result = await getImage()
            const totals = result.length
            if(totals > 0){
                // result.link = page
                // console.log(result)
                // const data = {
                //     data : result,
                //     page : page
                // }
                return helper.response(res, 'success' , result, 200)
            }
            return helper.response(res, 'failed' , 'Data not found', 200)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},

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
            const totals = result.length
            if(totals > 0){
                result.total = await getImage()
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
        let image = req.file ? req.file.filename : null
        try {
            if(image != null){
                setData.image = image
                const validation = validate.bookValidation(setData)
                if(validation.error == null){
                    const result =  await insertBook(setData)
                    const data = await getDetail(result.id)
                    return helper.response(res, 'success' , data, 201)
                }
                fs.unlinkSync(`./src/images/${setData.image}`)
                let errorMessage = validation.error.details[0].message
                errorMessage = errorMessage.replace(/"/g, "")
                return helper.response(res, 'failed' , errorMessage, 400)
            }
            return helper.response(res, 'failed' , 'Image extention is not supported', 401)
            
        } catch (error) {
            console.log(error.MulterError)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    editBook : async (req, res) => {
        const setData = req.body
        const id = req.params.id
        let data = await getDetail(id)
        
        try {
            if(data.length != 0){
                let oldImage = null
                if(req.file){
                    const newImage = req.file.filename
                    setData.image = newImage
                    const OldData = await getDetail(id)
                    oldImage = OldData[0].image
                }
                const result = await editBook(setData, id)
                if(result.affectedRows == 1){
                    if(oldImage != null) fs.unlinkSync(`./src/images/${oldImage}`)
                    data = await getDetail(id)
                    return helper.response(res, 'success' , data, 200)
                }
            }else {
                return helper.response(res, 'failed' , `Data id ${id} not found`, 404)
            }
            
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    deleteBook : async (req, res) => {
        const id = req.params.id
        try {
            const data = await getDetail(id)
            const result = await deleteBook(id)
            if(result.affectedRows == 1){
                const image = data[0].image
                fs.unlinkSync(`./src/images/${image}`)
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
    },
};
