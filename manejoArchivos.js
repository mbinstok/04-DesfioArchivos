const fs = require("fs");
let productArray = [];
let productObject = {};

class Contenedor {

    constructor(fileName) {
        this.fileName = "./" + fileName;
    }

    // graba el archivo pasado por JSON.stringify
    async save(producto) {
        try {
            productObject = producto;
            productObject.id = productArray.length + 1;
            productArray.push(productObject);
            await fs.promises.writeFile(this.fileName, JSON.stringify(productArray, null, 2));
        }
        catch (err) {
            console.log("No se pudo guardar la data");
        }
    }

    // Lee producto por id
    async getById(id) {
        try {
            productArray = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            let productById = productArray.find((product) => product.id == id);
            productById === undefined ? console.log(null) : console.log(productById);
        }
        catch (err) {
            console.log("No se pudo leer por id");
        }
    }

    // Lee el archivo y lo carga en producArray parseado x JSON
    async getAll() {
        try {
            productArray = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8'));
            console.log(productArray);
        }
        catch (err) {
            console.log("No se pudo leer la data");
        }

    }

    // Borra producto x id
    async deleteById(id) {
        try {
            productArray = JSON.parse(await fs.promises.readFile(this.fileName, 'utf-8')).filter((product) => product.id != id);
            fs.writeFileSync(this.fileName, JSON.stringify(productArray, null, 2));
        }
        catch (err) {
            console.log("No se pudo borrar por id");
        }
    }

    // Borra todo
    async deleteAll() {
        try{
            productArray = [];
            await fs.promises.writeFile(this.fileName, productArray);
        }
        catch(err){
            console.log("No se pudo borrar");
        }

    }
}


// Creo archivo productos.txt
const Productos = new Contenedor('productos.txt');
Productos.save({
    title: "Escuadra",
    price: 123.45,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
});

/* Productos.save({
    title: "Calculadora",
    price: 234.56,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
});
Productos.save({
    title: "Globo Terraqueo",
    price: 345.67,
    thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
});

*/


// Prueba Leer los Objetos 
//Productos.getAll();

//Prueba Borrar todos los objetos
// Productos.deleteAll();

//Prueba Leer por Id
// Productos.getById(1);

//Prueba Borrar por Id
Productos.deleteById(1);

