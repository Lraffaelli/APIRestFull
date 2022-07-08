const express = require("express");
const { Router } = require("express");
const app = express();
const {Contenedor}=require("./contenedor")
const contenedor = new Contenedor("productos.txt");

const routerApi = Router();

app.use("/api/productos", routerApi);
routerApi.use(express.json());
routerApi.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

/* ----------------------------------------------------- */

routerApi.get("/", async (req,res) =>{
    let listar = await contenedor.getAll();
    res.send(listar)
})

routerApi.get('/:id', async (req,res) =>{
    let id = Number(req.params.id)
    let item = await contenedor.getById(id);
    console.log(item)
    res.send(item)
})
routerApi.post("/", async (req, res) => {
    let item = req.body
     await contenedor.addItem(item)
    res.json(item);
  });

routerApi.put("/:id", async (req, res)=>{
    let id = Number(req.params.id)
    let newItem = req.body
    
    let replace = await contenedor.putItem(id,newItem)
    res.send(replace)
})

  routerApi.delete('/:id', async (req,res) =>{
    let id = Number(req.params.id)
     await contenedor.deleteById(id);
    console.log(`Producto con id ${id} ELIMINADO`)
    res.send(`Producto con id ${id} fue ELIMINADO EXITOSAMENTE`)
})






const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server listen in PORT ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error server ${error}`));
