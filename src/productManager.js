import { existsSync, readFileSync, writeFileSync} from 'fs';

export class ProductManager {
    constructor () {
        this.path = './Productos.json'
        this.productos = this.getProducts();
    }
    // Metodos
    getProducts = () =>{
        if (existsSync(this.path)) {
            const data = readFileSync(this.path, 'utf-8');
            const productos = JSON.parse(data);
            return productos;
        }
        return [];
    }
    addProduct = (newProduct) => {
        if (this.validarCodigo(newProduct.code) && this.validarCampos(newProduct.title , newProduct.description , newProduct.price , newProduct.category , newProduct.code , newProduct.stock)) {
            const producto = {
                title : newProduct.title,
                description : newProduct.description,
                price : Number(newProduct.price),
                category : newProduct.category,
                status : true,
                thumbnails : [],
                code : newProduct.code,
                stock : Number(newProduct.stock),
            }
            if(this.productos.length === 0){
                producto.id = 1;
            }else{
                producto.id = this.productos[this.productos.length-1].id +1;
            }
            this.productos.push(producto);
            writeFileSync(this.path,JSON.stringify(this.productos,null,'\t'));
            return producto;
        }
        return
    }
    getProductLimit = (limit) => {
        const productoSlice = this.productos.slice(0 , limit)
        return productoSlice;
    }
    getProductById = (idProducto) =>{
        const productoFiltrado = this.productos.filter(e => e.id === idProducto);
        if(productoFiltrado.length === 0) {
            throw new Error("Producto no encontrado");
        }
        return productoFiltrado;
    }
    deleteProduct = (idProducto) =>{
        const productoIndex = this.productos.findIndex(e => e.id === idProducto);
        if(productoIndex === -1) {
            throw new Error("Producto no encontrado");
        }
        this.productos.splice(productoIndex , 1);
        writeFileSync(this.path,JSON.stringify(this.productos,null,'\t'));
    }
    updateProduct = (idProducto, dataToUpdate) =>{
        const validarDatos = Object.values(dataToUpdate).some(e => e === "");
        let productoFind = this.productos.find(e => e.id === idProducto);
        const productoIndex = this.productos.findIndex (e => e.id === idProducto)
        if (validarDatos) {
            throw new Error("No se pueden ingresar valores vacios");
        } else if(!productoFind) {
            throw new Error("Producto no encontrado");
        }
        productoFind = { ...productoFind, ...dataToUpdate};
        this.productos.splice(productoIndex , 1 , productoFind);
        writeFileSync(this.path,JSON.stringify(this.productos,null,'\t'));
    }
    // Validaciones
    validarCampos = (title , description , price , category , code , stock) => {
        if ((this.validarTitulo(title)) && (this.validarDescripcion(description)) && (this.validarPrecio(price)) && (this.validarCategoria(category)) && (this.validarIngresoCodigo(code)) && (this.validarStock(stock))) {
            return true;
        }
        return false;
    }
    validarTitulo = (title) => {
        if (!title) {
            throw new Error("Por favor inserte un titulo");
        }
        return true;
    }
    validarDescripcion = (description) => {
        if (!description)  {
            throw new Error("Por favor inserte una descripción");
        }
        return true;
    }
    validarPrecio = (price) => {
        if (!isNaN(price)) {
            return true;
        }
        throw new Error("Ingrese solo números en el precio")
    }
    validarCategoria = (category) => {
        if (!category) {
            throw new Error("Inserte una categoría");
        }
        return true;
    }
    validarIngresoCodigo = (code) => {
        if (!code) {
            throw new Error("Ingrese un código")
        }
        return true;
    }
    validarStock = (stock) => {
        if (!isNaN(stock)) {
            return true;
        }
        throw new Error("Ingrese solo números en el stock")
    }
    validarCodigo = (code) => {
        const productCode = this.productos.findIndex(e => e.code === code)
        if (productCode === -1) {
            return true
        }
        throw new Error("El código ingresado ya existe en nuestra base de datos")
    }
}





