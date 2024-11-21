const BASE_URL = 'https://fakestoreapi.com/products'



document.addEventListener("DOMContentLoaded", (event) => {
    
    console.log("loaded: " + window.location.search)

    const urlParams = new URLSearchParams(window.location.search);


    getProductDetails(BASE_URL)
});

function getProductDetails(baseUrl) {

    const urlParams = new URLSearchParams(window.location.search);

    // Get a specific parameter
    const productId = urlParams.get('id');

    const finalUrl = BASE_URL + "/" + productId
    console.log('Calling URL: ' + finalUrl)

    fetch(finalUrl)
        .then(res => res.json())
        .then(json => displayProductDetails(json))
        .catch((err) => {
            console.log("Error - ", err)
        });
}
 

function displayProductDetails(product) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `
        <div id="top-container">
            <div id="product-image"><img src="${product.image}" alt="Image for product ${product.title}"></div>
            <div id="product-details">
                <h1>${product.title}</h1>
                <p>$${product.price}</p>
                <div class="rating"></div><p>(${product.rating.count})</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor labore et dolore magna. <a href="">Read more</a></p>
                <p><strong>Quantity<strong></p>
                

                <div class="input-group">
                <button type="button" class="decrement">-</button>
                <input type="number" value="1" min="1">
                <button type="button" class="increment">+</button>
                </div>

                <button type="button" class="hero-button">Add to cart</button>
            </div>
        </div>

        <div id="bottom-container">
            <h2>${product.title}</h2>
            <p><strong>Description</strong></p>
            <p>${product.description}</p>
        </div>
        `;

    $('.rating').raty({
        score: product.rating.rate,
        readOnly: true // Prevent user interaction

    });

}
 