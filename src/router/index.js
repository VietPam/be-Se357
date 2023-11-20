const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const typeProductRouter = require('./typeProductRouter')
const cartItemRouter = require('./cartItemRouter')
const addressRouter = require('./addressRouter')
const orderRouter = require('./orderRouter')

function route(app){
  
    app.use('/user',userRouter)
    app.use('/cartItem',cartItemRouter)
    app.use('/product',productRouter)
    app.use('/typeproduct',typeProductRouter)
    app.use('/address',addressRouter)
    app.use('/order',orderRouter)
}
module.exports= route;