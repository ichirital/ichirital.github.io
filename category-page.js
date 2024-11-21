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
    clearList(document.getElementById('product-list'))
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

    let counter =  document.getElementById("results-count")
    counter.textContent = '0'
}

function displayProductList(products) {
    const productList = document.getElementById('product-list')
    let countResults = 0
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
          <img class="product-image" src="${product.image}" alt="Product Image">
          <p><b>${product.title}</b></p>
          <p>$${product.price}</p>
          <img class="product-icons" src="files/heart.svg" alt="Add to Favorites Icon" />
          <p><input type="hidden" value="${product.id}"></p>
          `;
        li.setAttribute("onclick","redirectToProductPage('" + product.id +"')")
        productList.appendChild(li);
        countResults++
      });

      let counter =  document.getElementById("results-count")
      countResults += Number(counter.textContent)
      counter.textContent = countResults
    }

function displayCategories(categories) {
    const categoriesList = document.getElementById('categories-list')
    clearList(categoriesList)
    categories.forEach(category => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input class="category-value" type="checkbox" name="${category}" onchange="filterByCategory()"><label class="category-label">${category}</label>
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

    // need to check if any filters are also selected
    filterByCategory()
});

function filterByCategory() {
    clearList(document.getElementById('product-list'))
    let checkboxes = document.getElementsByClassName("category-value")
    for (let i = 0; i < checkboxes.length; i++) {
        if(checkboxes[i].checked) {
            getProducts(BASE_URL + "/category/" + checkboxes[i].name, queryParams)
        }
    }
  }

function redirectToProductPage(productId) {
    const finalUrl = BASE_URL + "/" + productId
    console.log('Calling URL: ' + finalUrl)
    window.location.href = "../product-page.html?id=" + productId
}

