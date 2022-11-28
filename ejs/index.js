const express = require ('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const PORT = 8080

// no se configura se setea
app.set('views', './views')
app.set('view engine', 'ejs')

productos = [
    {name:"Remera",
    price: 1200,
    thumbnail:"https/",
    id:1},
    {name:"Pantalon",
    price: 2100,
    thumbnail:"https/",
    id:2}
]

app.get('/', (req, res)=>{
    res.render('views/layout', {productos})
})

app.post('/productos', (req, res)=>{
    let { name, price, thumbnail } = req.body 
    let id
    if (productos.length == 0) {
        id = 1
    }else{
        id = productos.length +1
    }
    let articulo ={ name : name, price : price, thumbnail : thumbnail} 
    const newProduct = {...articulo, id}
    productos.push(newProduct)
    res.redirect('/')
    })
    
    app.listen(PORT, ()=>{
        console.log('servidor con ejs');
    })