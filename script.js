// script.js

// Esperar a que el documento esté listo
document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".add-to-cart");

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const nombre = boton.getAttribute("data-name");
      const precio = parseFloat(boton.getAttribute("data-price"));

      const producto = {
        name: nombre,
        price: precio,
        quantity: 1
      };

      let carrito = JSON.parse(localStorage.getItem("cart")) || [];

      const encontrado = carrito.find((item) => item.name === nombre);

      if (encontrado) {
        encontrado.quantity += 1;
      } else {
        carrito.push(producto);
      }

      localStorage.setItem("cart", JSON.stringify(carrito));

      alert(`${nombre} se agregó al carrito.`);
    });
  });
});
