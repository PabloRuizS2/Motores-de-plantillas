const fs = require('fs')

let productos = []

try {
    productos = JSON.parse(fs.readFileSync(`./productsList.txt`, "utf-8"))
  } catch (e) {
    fs.writeFileSync(`./productsList.txt`, JSON.stringify([]));
    productos = [];
  }

exports.getAll=(req, res) => {
    res.render('productos.pug',{productos})
}
exports.add = (req, res) => {
    const { nombre, precio, img } = req.body;
    let id = productos.length> 0 ? productos[productos.length-1].id + 1 : 1;
    productos.push({ id,nombre, precio, img });
    fs.writeFileSync(`./productsList.txt`, JSON.stringify(productos));

    res.render('form');
}

exports.renderProducts = (req, res) => {
    res.render('productos');
}

exports.renderForm= (req, res) => {
    res.render('form');
}