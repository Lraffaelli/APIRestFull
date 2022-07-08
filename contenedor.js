const fs = require("fs");
const internal = require("stream");

class Contenedor {
  constructor(nameFile) {
    this.nameFile = nameFile;
    
  }
  
  async getAll() {
    try {
      const contenido = await fs.promises.readFile(this.nameFile, "utf-8");
      let productos = JSON.parse(contenido);
      console.log(productos);
      return productos;
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id) {
    try {
      let data = await fs.promises.readFile('./productos.txt', "utf-8");      
      let productos = JSON.parse(data);
      
      let item = productos.find(item =>item.id==id)
      if(item){
        return item
      }else{
        console.log('El producto no existe')
      }
      
    } catch (error) {
      console.log(`Error al leer el archivo: ${error}`);
    }
  }

  async addItem(item){
    try {
      let data = await fs.promises.readFile('./productos.txt', "utf-8");      
      let productos = JSON.parse(data);
      let result= productos.map(item=>
        item.id
      );
      let id= Math.max(...result)+1;
      item.id= id;
      productos.push(item)
      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(productos, null, 2)        
      );
      return item

    } catch (error) {
      console.log(`Error al leer el archivo: ${error}`);
    }
  }


  async putItem(id,newItem){
    try {
      let data = await fs.promises.readFile('./productos.txt', "utf-8");      
      let productos = JSON.parse(data);      
      let index = productos.findIndex(item =>item.id==id)
      newItem.id=id      
      productos[index]=newItem
      await fs.promises.writeFile(
        this.nameFile,
        JSON.stringify(productos, null, 2)        
      );
      
      return productos
      
    } catch (error) {
      console.log(`Error al leer el archivo: ${error}`);
    }
  }

  async deleteById(id) {
    try {
      let data = await fs.promises.readFile('./productos.txt', "utf-8");

      let productos = JSON.parse(data);
      console.log(id)
        const newProducto = productos.filter(producto => producto.id !== id);
        console.log(newProducto)
        await fs.promises.writeFile(this.nameFile,
          JSON.stringify(newProducto, null, 2)
        ); 
           
    } catch (error) {
      console.log(`Error al leer el archivo: ${error}`);
    }
  }

  



}
module.exports = { Contenedor };
