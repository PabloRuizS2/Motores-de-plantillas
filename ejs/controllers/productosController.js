const fs = require('fs')

let productos = []

try {
    productos = JSON.parse(fs.readFileSync(`./productsList.txt`, "utf-8"))
  } catch (e) {
    fs.writeFileSync(`./productsList.txt`, JSON.stringify([]));
    productos = [];
  }


exports.getAll=(req, res) => {
    res.render('productos',{productos})
}
exports.add= (req, res,next) => {
    const { nombre, precio, img } = req.body;
    try{
        if(!nombre || !precio||!img){
            res.render("backForm")
        }else{
            let id = productos.length> 0 ? productos[productos.length-1].id + 1 : 1;
            productos.push({ id, nombre, precio, img });
            fs.writeFileSync(`./productsList.txt`, JSON.stringify(productos));

            res.render('form');
        }
      
    }catch(err){
        next(err);
    }
}
exports.renderForm= (req, res) => {
    res.render('form');
}