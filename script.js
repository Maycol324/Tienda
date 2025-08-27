document.addEventListener("DOMContentLoaded", () => {
  const botones = document.querySelectorAll(".add-to-cart");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const nombre = boton.getAttribute("data-name");
      const precio = parseFloat(boton.getAttribute("data-price"));
      const producto = { name: nombre, price: precio, quantity: 1 };
      let carrito = JSON.parse(localStorage.getItem("cart")) || [];
      const encontrado = carrito.find((item) => item.name === nombre);
      if (encontrado) {
        encontrado.quantity += 1;
      } else {
        carrito.push(producto);
      }
      localStorage.setItem("cart", JSON.stringify(carrito));
      actualizarPreview();
    });
  });
  actualizarPreview();
});

function actualizarPreview() {
  const carrito = JSON.parse(localStorage.getItem("cart")) || [];
  const preview = document.getElementById("cart-preview");
  if (!preview) return;
  if (carrito.length === 0) {
    preview.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }
  let html = "";
  let total = 0;
  carrito.forEach((prod, index) => {
    let subtotal = prod.price * prod.quantity;
    total += subtotal;
    html += `
      <div class="cart-preview-item">
        <span>${prod.name} x${prod.quantity}</span>
        <span>
          $${subtotal.toFixed(2)}
          <button onclick="eliminarProductoPreview(${index})">&times;</button>
        </span>
      </div>
    `;
  });
  html += `<strong>Total: $${total.toFixed(2)}</strong>`;
  preview.innerHTML = html;
}

function eliminarProductoPreview(index) {
  let carrito = JSON.parse(localStorage.getItem("cart")) || [];
  carrito.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(carrito));
  actualizarPreview();
}
