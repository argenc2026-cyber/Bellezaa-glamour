let carrito = [];

// CREATE: agrega un producto nuevo o suma cantidad si ya existe
function agregar(producto, precio) {
  let existente = carrito.find(item => item.producto === producto);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ producto, precio, cantidad: 1 });
  }

  actualizarCarrito();
  alert(producto + " agregado al carrito");
}

// UPDATE: cambia la cantidad de un producto (+1 / -1)
function actualizarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    eliminar(index);
    return;
  }

  actualizarCarrito();
}

// DELETE: elimina un producto del carrito
function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// READ: dibuja el carrito completo en pantalla
function actualizarCarrito() {
  let lista = document.getElementById("carrito");
  lista.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    let subtotal = item.precio * item.cantidad;
    total += subtotal;

    let li = document.createElement("li");

    let textoSpan = document.createElement("span");
    textoSpan.textContent = item.producto + " - $" + item.precio.toLocaleString("es-CO") + " x ";

    let btnMenos = document.createElement("button");
    btnMenos.textContent = "-";
    btnMenos.onclick = function () { actualizarCantidad(index, -1); };

    let cantidadSpan = document.createElement("span");
    cantidadSpan.textContent = " " + item.cantidad + " ";

    let btnMas = document.createElement("button");
    btnMas.textContent = "+";
    btnMas.onclick = function () { actualizarCantidad(index, 1); };

    let btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Quitar";
    btnEliminar.onclick = function () { eliminar(index); };

    li.appendChild(textoSpan);
    li.appendChild(btnMenos);
    li.appendChild(cantidadSpan);
    li.appendChild(btnMas);
    li.appendChild(btnEliminar);

    lista.appendChild(li);
  });

  document.getElementById("total").textContent = total.toLocaleString("es-CO");
}

document.addEventListener("DOMContentLoaded", function () {
  let menuToggle = document.getElementById("menuToggle");
  let navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", function () {
    navMenu.classList.toggle("abierto");
  });

  navMenu.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
      navMenu.classList.remove("abierto");
    });
  });

  let form = document.getElementById("formContacto");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let nombre = document.getElementById("nombre").value;

    document.getElementById("confirmacionForm").textContent =
      "¡Gracias " + nombre + "! Hemos recibido tu mensaje, te contactaremos pronto.";

    form.reset();
  });
});
