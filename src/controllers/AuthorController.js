const { getAll, getDetail, insertAuthor, editAuthor, deleteAuthor, searchAuthor } = require("../models/Author")
const helper = require("../helpers/message")

module.exports = {
	getAllAuthor: async (req, res) => {
		try {
            const result = await getAll()
            if(result.length > 0){
                return helper.response(res, 'success' , result, 200)
            }
            return helper.response(res, 'failed' , 'Data not found', 200)
        } catch (error) {
                console.log(error)
                return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},

	detailAuthor: async (req, res) => {
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


	createAuthor: async (req, res) => {
		const setData = req.body
        try {
            const result =  await insertAuthor(setData)
            return helper.response(res, 'success' , result, 201)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    editAuthor : async (req, res) => {
        const setData = req.body
        const id = req.params.id
        try {
            const result = await editAuthor(setData, id)
            const newData = {
                id,
                ...setData
            }
            if(result.affectedRows == 1){
                return helper.response(res, 'success' , newData, 200)
            }
            return helper.response(res, 'failed' , `Data id ${id} not found`, 404)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    deleteAuthor : async (req, res) => {
        const id = req.params.id
        try {
            const result = await deleteAuthor(id)
            if(result.affectedRows == 1){
                return helper.response(res, 'success' , `Data id ${id} berhasil di hapus`, 200)
            }
            return helper.response(res, 'failed' , `Data id ${id} not found`, 404)
            
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},
	
	searchAuthor : async (req, res) => {
        const keyword = req.query.keyword
        try {
            const result = await searchAuthor(keyword)
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
