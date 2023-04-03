import ProductManager from '../src/ProductManager.js'
import express from 'express'

const PORT = 8080
const app = express()

app.use(express.urlencoded({extended:true}))

const productManager = new ProductManager('file/products.json')

app.listen(PORT, () =>{
    console.log(PORT)
})

const products = await productManager.getProducts()

app.get('/products/:pid',(req,res) =>{

    const pid = req.params.pid

    let producto = products.find(produ => {
        return produ.id == pid
    })

    if(!producto){
        return res.send({
            error: 'Usuario no encontrado'
        })
    }

    res.send({producto})

})

app.get('/products',(req,res)=>{

    const limit = req.query.limit
    
    if(!limit){
        res.send({
            products
        })
    }else if(limit == 0){
        res.send({
            error: 'Debe ingresar un numero mayor a 0'
        })
    }
    else{
        let productos = []

        for(let i=0 ; i < limit ; i++){
            productos.push(products[i])
        }

        res.send({
            
            productos
            
        }) 
    }

})




const test = async () => {

    // await productManager.addProduct('Play 2', 'Vamo a jugar', 300, '-----', 258, 10)

}

test()