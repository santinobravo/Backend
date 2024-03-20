const fs = require('fs'); 
class Productmanager {
    #products;
    #path;
    static ids = 0
    constructor() {
        this.#path = `./data/products.json`;
        this.#products =this.#leerProductosInFile();
    }
    #asignarIdProducto(){
        let id = 1;
        if(this.#products.length != 0)
            id = this.#products [this.#products.length - $].id + 1;
        return id
    }
    #leerProductosInFile(){
        try{
            if(fs.existsSync(this.#path))
            return JSON.parse(fs.readFileSync(this.#path, 'utf-8'));
        return[];
        } catch (error){
            console.log(`ocurrio un error al momento de leer el archivo de productos, ${error}`); 
        }

    }
    #guardarArchivo(){
        try{
            fs.writeFileSync(this.#path, JSON.stringify(this.#products)); 
        } catch(error){
            console.log(`Ocurrio un error al momento de guardar,${error}`); 
        }
    }
    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock)
            return 'Todos los datos son necesarios (title, description, price, thumbnail, code, stock)'
        const codeRepeat = this.#products.some(p => p.code == code)
        if (codeRepeat)
            return `El código ${code} ya esta ocupado, intente nuevamente`

        Productmanager.ids = Productmanager.ids + 1
        const id = this.#asignarIdProducto();
        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        this.#products.push(newProduct),
        this.#guardarArchivo();

        return 'Producto agregado con éxito'
    }
    getProducts() {
        return this.#products
    }
    getProductsById(id) {
        const product = this.#products.find(p => p.id == id)
        if (product)
            return product
        else
            return `Not Found del producto con id ${id}`
    }
    updateProducts(id, objectUpdate){
        let msg = `El producto con id ${id} no existe`;
        const index = this.#products.findIndex(p => p.id === id);
        if(index !== -1){
            const{ id, ...rest } = objectUpdate;
            this.#products[index] = { ...this.#products[index], ...rest};
            this.#guardarArchivo();
            msg= `Producto actualizado`;

        }
        return msg

    }
    deleteProduct(id){
        let msg = `El producto con id ${id} no existe`;
        const index = this.#products.findIndex(p => p.id === id);
        if(index !== -1){
            this.#products = this.#products.filter(p => p.id !== id );
            this.#guardarArchivo();
            msg= `Producto eliminado`;

        }
        return msg
    }
}



module.exports = Productmanager