module.exports = {
    check : async (req, res, next) => {
        if(req){
            next()
        }else{
            console.log('denied')
        }
    }
}