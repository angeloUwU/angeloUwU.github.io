const productos = [
    {
        id: "figura-01",
        titulo: "Figura 01",
        imagen: "./img/Figuras/01.jpg",
        categoria: {
            nombre:"Figuras",
            id:"Figuras"
        },
        precio:89
    },
    {
        id: "figura-02",
        titulo: "Figura 02",
        imagen: "./img/Figuras/02.jpg",
        categoria: {
            nombre:"Figuras",
            id:"Figuras"
        },
        precio:120
    },
    {
        id: "figura-03",
        titulo: "Figura 03",
        imagen: "./img/Figuras/03.jpg",
        categoria: {
            nombre:"Figuras",
            id:"Figuras"
        },
        precio:90
    },
    {
        id: "figura-04",
        titulo: "Figura 04",
        imagen: "./img/Figuras/04.jpg",
        categoria: {
            nombre:"Figuras",
            id:"Figuras"
        },
        precio:85
    },
    {
        id: "figura-05",
        titulo: "Figura 05",
        imagen: "./img/Figuras/05.jpg",
        categoria: {
            nombre:"Figuras",
            id:"Figuras"
        },
        precio:90
    },
    {
        id: "peluche-1",
        titulo: "Peluche 1",
        imagen: "./img/Peluches/1.jpg",
        categoria: {
            nombre:"Peluches",
            id:"Peluches"
        },
        precio:40
    },
    {
        id: "peluche-2",
        titulo: "Peluche 2",
        imagen: "./img/Peluches/2.jpg",
        categoria: {
            nombre:"Peluches",
            id:"Peluches"
        },
        precio:60
    },
    {
        id: "peluche-3",
        titulo: "Peluche 3",
        imagen: "./img/Peluches/3.jpg",
        categoria: {
            nombre:"Peluches",
            id:"Peluches"
        },
        precio:55
    },
    {
        id: "peluche-4",
        titulo: "Peluche 4",
        imagen: "./img/Peluches/4.jpg",
        categoria: {
            nombre:"Peluches",
            id:"Peluches"
        },
        precio:35
    },
    {
        id: "peluche-5",
        titulo: "Peluche 5",
        imagen: "./img/Peluches/5.jpg",
        categoria: {
            nombre:"Peluches",
            id:"Peluches"
        },
        precio:60
    },
    {
        id: "ropa-10",
        titulo: "Ropa 10",
        imagen: "./img/Ropas/10.jpg",
        categoria: {
            nombre:"Ropas",
            id:"Ropas"
        },
        precio:170
    },
    {
        id: "ropa-20",
        titulo: "Ropa 20",
        imagen: "./img/Ropas/20.jpg",
        categoria: {
            nombre:"Ropas",
            id:"Ropas"
        },
        precio:140
    },
    {
        id: "ropa-30",
        titulo: "Ropa 30",
        imagen: "./img/Ropas/30.png",
        categoria: {
            nombre:"Ropas",
            id:"Ropas"
        },
        precio:35
    },
    {
        id: "ropa-40",
        titulo: "Ropa 40",
        imagen: "./img/Ropas/40.jpg",
        categoria: {
            nombre:"Ropas",
            id:"Ropas"
        },
        precio:45
    },
    {
        id: "ropa-50",
        titulo: "Ropa 50",
        imagen: "./img/Ropas/50.jpg",
        categoria: {
            nombre:"Ropas",
            id:"Ropas"
        },
        precio:30
    }
]

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML =""; 

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">s/${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

             const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id)
            cargarProductos(productosBoton);
    } else {
        tituloPrincipal.innerText = "Todos los productos";
        cargarProductos(productos);
    }
    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarrito = JSON.parse(localStorage.getItem("producto-en-carrito"));
if(productosEnCarrito);

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    }

    else {
        productoAgregado.cantidad = 1;
        productoEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
} 