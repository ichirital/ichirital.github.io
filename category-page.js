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

function displayProductList(json) {
    console.log(json)

    let productInfo = json[0]
    document.getElementById("product-id").value = productInfo.id;
    document.getElementById("product-title").textContent = productInfo.title;
    document.getElementById("product-price").textContent = productInfo.price + "$";
    document.getElementById("product-image").src = productInfo.image;
    
}