import { Router } from 'express';
import ProductManager from '../dao/productManagerDao.js';
import { rutaProductos } from '../utils.js';
import { modeloProductos } from '../dao/models/producto.modelo.js';
import { modeloCarrito } from '../dao/models/carrito.modelo.js';



export const router=Router()

let productsManager=new ProductManager(rutaProductos)

router.get('/',(req,res)=>{
    let {nombre}=req.query
    res.status(200).render('inicio', {nombre})
})

router.get('/productos',async(req,res)=>{

    let {pagina}=req.query
    if(!pagina){
        pagina=1
    }

    let {
        docs:productos,
        totalPages, 
        prevPage, nextPage, 
        hasPrevPage, hasNextPage
    } = await modeloProductos.paginate({},{limit:3, page:pagina, lean:true})

    console.log(JSON.stringify(productos, null, 5 ))

    res.setHeader('Content-Type','text/html')
    res.status(200).render("productos",{
        productos,
        totalPages, 
        prevPage, nextPage, 
        hasPrevPage, hasNextPage
    })
})

router.get('/carts', async (req, res) => {
    try {
        const carts = await modeloCarrito.find();
        res.status(200).render('carts',{carts});
    } catch (error) {
        console.error('Error al obtener los carritos:', error);
        res.status(500).send('Error al obtener los carritos');
    }
});

export default router;