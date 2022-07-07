const express = require("express");
const { Router } = require("express");
const app = express();
const {Contenedor}=require("./contenedor")
const contenedor = new Contenedor("productos.txt");

const routerApi = Router();

app.use("/api", routerApi);
routerApi.use(express.json());
app.use(express.static("public"));

/* ----------------------------------------------------- */
const productos=[]
routerApi.get("/productos", async (req,res) =>{
    let listar = await contenedor.getAll();
    res.send(listar)
})

routerApi.get('/productos/:id', async (req,res) =>{
    let id = Number(req.params.id)
    let item = await contenedor.getById(id);
    console.log(item)
    res.send(item)
})
routerApi.post("/productos", async (req, res) => {
    let item = req.body
    let productos = await contenedor.addItem(item)
    res.json(productos);
  });






const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Server listen in PORT ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error server ${error}`));
