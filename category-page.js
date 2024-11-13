document.addEventListener("DOMContentLoaded", (event) => {
    getAllProducts()
});

function getAllProducts() {
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => displayProductList(json))
        .catch((err) => {
            console.log("Error - ", err)
        });
}

function displayProductList(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img id="product-image" src="${product.image}" alt="Product Image" width="300px">
          <p><b><span id="product-title">${product.title}</span></b></p>
          <p><span id="product-price">$${product.price}</span></p>
          <p><input type="hidden" id="product-id" value="${product.id}"></p>
          `;
        productList.appendChild(li);
      });

}
