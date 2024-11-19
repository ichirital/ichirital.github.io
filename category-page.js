const BASE_URL = 'https://fakestoreapi.com/products'

// keeping this globally, so we can have filtering, sorting and pagination
let queryParams = {};

function buildUrl(baseUrl, queryParams) {
    const url = new URL(baseUrl);
    for (const [key, value] of Object.entries(queryParams)) {
      url.searchParams.append(key, value);
    }
    return url.toString();   
  }
  
document.addEventListener("DOMContentLoaded", (event) => {
    getProducts(BASE_URL, '')
    getCategories(BASE_URL + "/categories", '')
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

function getCategories(baseUrl, queryParams) {
    const finalUrl = buildUrl(baseUrl, queryParams)
    console.log('Calling URL: ' + finalUrl)

    fetch(finalUrl)
        .then(res => res.json())
        .then(json => displayCategories(json))
        .catch((err) => {
            console.log("Error - ", err)
        });
}

function clearList(productList) {
    const liElements = productList.querySelectorAll("li")
    liElements.forEach(li => li.remove())
}

function displayProductList(products) {
    const productList = document.getElementById('product-list')
    clearList(productList)

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

function displayCategories(categories) {
    const categoriesList = document.getElementById('categories-list')
    clearList(categoriesList)
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input class="category-value" type="checkbox" name="${category}" onchange="filterByCategory(this)"><label class="category-label">${category}</label>
          `;
          categoriesList.appendChild(li);
      });
    }


const sortByDropdown = document.getElementById('sort-by-dropdown')

sortByDropdown.addEventListener("change", () => {
    const selectedValue = sortByDropdown.value

    if (selectedValue === 'price-asc') {
        queryParams = {
            sort: 'asc'
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

function filterByCategory(checkbox) {
    let checkboxes = document.getElementsByClassName("category-value")
    for (let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            console.log(checkboxes[i].name + " selected")
            getProducts(BASE_URL + "/category/" + checkboxes[i].name, queryParams)
        }
    }
  }
  
  