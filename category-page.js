
const BASE_URL = 'https://fakestoreapi.com/products'

function buildUrl(baseUrl, queryParams) {
    const url = new URL(baseUrl);
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.append(key, value);
    }
    return url.toString();   
  }
  
document.addEventListener("DOMContentLoaded", (event) => {
    getProducts(BASE_URL, '')
});

function getProducts(baseUrl, queryParams) {
    const finalUrl = buildUrl(baseUrl, queryParams)
    console.log('Calling URL: ' + finalUrl)

    fetch(finalUrl)
        .then(res => res.json())
        .then(json => displayProductList(json))
        .catch((err) => {
            console.log("Error - ", err)
        });
}

function resetProductsUI(productList) {
    const liElements = productList.querySelectorAll("li")
    liElements.forEach(li => li.remove())
}

function displayProductList(products) {
    const productList = document.getElementById('product-list')
    resetProductsUI(productList)

    let countResults = 0
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img id="product-image" src="${product.image}" alt="Product Image">
          <p><b><span id="product-title">${product.title}</span></b></p>
          <p><span id="product-price">$${product.price}</span></p>
          <p><input type="hidden" id="product-id" value="${product.id}"></p>
          `;
        productList.appendChild(li);
        countResults++
      });

      let counter =  document.getElementById("results-count")
      counter.textContent = countResults + ' Results'
    }

//   https://fakestoreapi.com/products?sort=desc'
const sortByDropdown = document.getElementById('sort-by-dropdown')

sortByDropdown.addEventListener("change", () => {
    const selectedValue = sortByDropdown.value

    let queryParams = {}

    if (selectedValue === 'price-asc') {
        queryParams = {
            sort: 'asc'
            // page: 2,
            // pageSize: 10
        }
        
    } else if (selectedValue === 'price-desc') {
        queryParams = {
            sort: 'desc'
        }
    } else {
        // null value, do nothing
    }

    getProducts(BASE_URL, queryParams)
});

