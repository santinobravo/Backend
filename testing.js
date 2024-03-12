const Productmanager = require("./productManager");

const producto = new Productmanager()

// console.log(producto.getProductsById(1));
console.log(producto.addProduct('Camiseta fútbol','Belgrano Titular 2024', 45000,'www.google.com','98344', 5));
console.log(producto.addProduct('Camiseta fútbol','Belgrano Suplente 2024', 45000,'www.google.com','98345', 3));

console.log(producto.getProducts());
console.log(producto.getProductsById(3));