const userRouter = require('./userRouter')
const productRouter = require('./productRouter')
const typeProductRouter = require('./typeProductRouter')
const cartRouter = require('./cartRouter')
function route(app){
  
    app.use('/user',userRouter)
    app.use('/cart',cartRouter)
      
    app.use('/product',productRouter)
    app.use('/typeproduct',typeProductRouter)
}
module.exports= route;