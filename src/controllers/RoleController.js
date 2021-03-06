const { getAll, getDetail, insertRole, editRole, deleteRole, searchRole } = require("../models/Role")
const helper = require("../helpers/message")
const validate = require("../helpers/validate")

module.exports = {
	getAllRole: async (req, res) => {
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

	detailRole: async (req, res) => {
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


	createRole: async (req, res) => {
		const setData = req.body
        try {
            const validation = validate.roleValidation(setData)
            if(validation.error == null){
                const result =  await insertRole(setData)
                return helper.response(res, 'success' , result, 201)
            }
            let errorMessage = validation.error.details[0].message
            errorMessage = errorMessage.replace(/"/g, "")
            return helper.response(res, 'failed' , errorMessage, 400)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    editRole : async (req, res) => {
        const setData = req.body
        const id = req.params.id
        try {
            const validation = validate.roleValidation(setData)
            if(validation.error == null){
                const result = await editRole(setData, id)
                const newData = {
                    id,
                    ...setData
                }
                if(result.affectedRows == 1){
                    return helper.response(res, 'success' , newData, 200)
                }
            return helper.response(res, 'failed' , `Data id ${id} not found`, 404)
            }
            let errorMessage = validation.error.details[0].message
            errorMessage = errorMessage.replace(/"/g, "")
            return helper.response(res, 'failed' , errorMessage, 500)
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
    },
    
    deleteRole : async (req, res) => {
        const id = req.params.id
        try {
            const result = await deleteRole(id)
            if(result.affectedRows == 1){
                return helper.response(res, 'success' , `Data id ${id} berhasil di hapus`, 200)
            }
            return helper.response(res, 'failed' , `Data id ${id} not found`, 404)
            
        } catch (error) {
            console.log(error)
            return helper.response(res, 'failed', 'Internal Server Error', 500)
        }
	},
	
	searchRole : async (req, res) => {
        const keyword = req.query.keyword
        try {
            const result = await searchRole(keyword)
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
