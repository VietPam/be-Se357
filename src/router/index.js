const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const typeProductRouter = require('./typeProductRouter')
function route(app){
    app.use('/user',userRouter)
    app.use('/product',productRouter)
    app.use('/typeproduct',typeProductRouter)
}
module.exports= route;