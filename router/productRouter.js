const express= require("express");
const router = express.Router();

const {Category} = require("../model/product");
const {Product} = require("../model/product")



// router.get("/listCategory", async (req,res) =>{
//     const name = req.query.name;
//     var categories = await Category.find({ name: RegExp("^" + name, "i")});
//     if(categories){
//         res.status(200).send(categories);
//     }else {
//         res.status(500).send("Bad server");
//     }
// })

router.get("/getAllCategories", async function (req, res) {
    var categories = await Category.find();
    if (categories) {
      res.status(200).send(categories);
    } else {
      res.status(500).send("Bad server");
    }
  });

router.get("/productByCategory", async (req,res) =>{
  const category = req.query.category;

  if(category =="Tất cả" || category =="all"){
    var products = await Product.find();
    if(products){
      res.status(200).send([{productList: products}]);
    } else {
      res.status(500).send("Bad server");
    }
  } else{
    await Category.aggregate(
      [
        {
          $match: {
            name: category,
          },
        },
        {
          $lookup:{
            from:"products",
            localField:"_id",
            foreignField:"categoryId",
            as:"productList",
          },
        },
      ],
      function(err,result) {
        if(err) return res.status(500).send(err);
        else return res.status(200).send(result);
      },
    );
  };
});

module.exports = router;