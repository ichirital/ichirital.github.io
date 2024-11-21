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

    console.log(product)

    // Vanilla JS Version (V4+)

// let rating = new Raty(document.querySelector('#rating'), {
//     score: 3.5, // Initial rating
//     readOnly: true // Prevent user interaction
// });



// jQuery Version (V3)

$('.rating').raty({
    score: 3, // Initial rating
    readOnly: true // Prevent user interaction

});


    // document.getElementById("rating").raty({
    //     score: 3.5, // Initial rating
    //     readOnly: true // Prevent user interaction
    //   });



    // const productList = document.getElementById('product-list')
    // let countResults = 0
    // products.forEach(product => {
    //     const li = document.createElement('li');
    //     li.innerHTML = `
    //       <img class="product-image" src="${product.image}" alt="Product Image">
    //       <p><b>${product.title}</b></p>
    //       <p>$${product.price}</p>
    //       <img class="product-icons" src="files/heart.svg" alt="Add to Favorites Icon" />
    //       <p><input type="hidden" value="${product.id}"></p>
    //       `;
    //     li.setAttribute("onclick","redirectToProductPage('" + product.id +"')")
    //     productList.appendChild(li);
    //     countResults++
    //   });

    //   let counter =  document.getElementById("results-count")
    //   countResults += Number(counter.textContent)
    //   counter.textContent = countResults


            //output
            // {
            //     id:1,
            //     title:'...',
            //     price:'...',
            //     category:'...',
            //     description:'...',
            //     image:'...'
            // }


    }
 