const  USER = require('./Controller/user')
const  VENDOR = require('./Controller/vendor')
const PRODUCT = require('./Controller/products')
const SETADMIN = require('./Controller/setAdmin')
module.exports = function(app){
    app.use('/users',USER)
    app.use('/vendors',VENDOR)
    app.use('/products',PRODUCT)
    app.use('/admin',SETADMIN)
}