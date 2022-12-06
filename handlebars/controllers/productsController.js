const fs = require('fs')

let productos = [];

try {
  productos = JSON.parse(fs.readFileSync(`./productsList.txt`, "utf-8"))
} catch (e) {
  fs.writeFileSync(`./productsList.txt`, JSON.stringify([]));
  productos = [];
}

exports.getAll = (req, res, next) => {
  res.render("productos", { productos });
};
exports.add = (req, res, next) => {
  const { nombre, precio, img } = req.body;
  let id = productos.length> 0 ? productos[productos.length-1].id + 1 : 1;
  const newProduct = { id, nombre, precio, img };
  productos.push(newProduct);
  fs.writeFileSync(`./productsList.txt`, JSON.stringify(productos));

  res.render("form");
};

exports.form = (req, res, next) => {
  try {
    res.render("form");
  } catch (e) {
    next(e);
  }
};

