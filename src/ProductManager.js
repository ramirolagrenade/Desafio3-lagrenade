import fs from 'fs'

export default class ProductManager {

    constructor() {
        this.path = './file/products.json'
    }


    getProducts = async () => {

        if (fs.existsSync(this.path)) {
            const data = await fs.promises.readFile(this.path, 'utf-8')
            const products = JSON.parse(data)
            return products
        }
        else {
            return []
        }
    }

    validarDatos(productos) {
        let verificacion = Object.values(productos)
        if (!verificacion.includes(undefined)) {
            return true
        }
        else {
            return false
        }
    }

    addProduct = async (title, description, price, thumbnail, code, stock) => {

        let products = await this.getProducts()

        let idProducto = products.length

        let productos = {
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock,
            id: idProducto + 1
        }

        if (this.validarDatos(productos)) {

            let producto_code = productos.code

            let producto = products.find(producto => producto.code === producto_code)

            if (!producto) {

                products.push(productos)

                await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

            } else {
                return console.log('Este code ya se a registrado.')
            }

        }
        else {
            return console.log('Error, Unos de los campos esta vacio.')
        }


    }

    getProductById = async (IdProducto) => {
        let products = await this.getProducts()

        let proId = products.find(product => product.id === IdProducto)

        if (proId) {
            return proId
        } else {
            return console.log('Id no Encontrado')
        }
    }

    deleteProduct = async (id) => {
        try {
            let products = await this.getProducts()
            let productIndex = products.findIndex(p => p.id === id)
            if (productIndex === -1) return `Product with id: ${id} not found`
            let productDeleted = products.splice(productIndex, 1)
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))
            return productDeleted[0];
        } catch (error) {
            return error;
        }
    }

    deleteAllProduct = async () => {
        await fs.promises.unlink(this.path)
    }

    updateProduct = async (IdProducto, data) => {
        try {
            let products = await this.getProducts()

            let productIndex = products.findIndex(producto => producto.id === IdProducto)

            if (productIndex === -1) return `Product with id: ${IdProducto} not found`

            products.splice(productIndex, 1, { id: IdProducto, ...data })
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'))

            return products[productIndex]

        } catch (error) {
            return error;
        }
    }
}
