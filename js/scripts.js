
//fade animation idea is from here: https://www.youtube.com/watch?v=T33NN_pPeNI
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        }
        else {
            entry.target.classList.remove('show')
        }
    });
})


const products = [
    { id: 1, title: "Solar Light Kit", description: "Provides essential lighting for a family in an off-grid location.", price: 25.00, image: "./img/emergencySolar.jpg" },
    { id: 2, title: "Warm Winter Blanket", description: "A high-quality, thermal blanket to provide warmth and shelter.", price: 35.00, image: "./img/winterBlanket.avif" },
    { id: 3, title: "Educational Tablet", description: "A pre-loaded tablet with offline learning materials for one student.", price: 150.00, image: "./img/educationalTablet.webp" },
    { id: 4, title: "Water Purification Straw", description: "Portable device that filters contaminated water for safe drinking.", price: 50.00, image: "./img/waterPurifStraw.webp" },
    { id: 5, title: "Food Pack", description: "Provides a week's supply of staple foods for an individual.", price: 40.00, image: "./img/foodPack.webp" },
    { id: 6, title: "Basic First Aid Kit", description: "Includes essential supplies for treating minor injuries and illnesses.", price: 15.00, image: "./img/firstAidKit.webp" },
    { id: 7, title: "Durable Work Gloves", description: "Protective gear for safe cleanup and construction efforts.", price: 12.00, image: "./img/workGloves.jpg" },
    { id: 8, title: "Rechargeable Desk Lamp", description: "Provides focused, long-lasting light for study and work.", price: 30.00, image: "./img/deskLamp.webp" },
    { id: 9, title: "Hygiene Essentials Kit", description: "Contains soap, toothbrush, toothpaste, and shampoo for personal care.", price: 10.00, image: "./img/hygieneKit.avif" },
    { id: 10, title: "School Supplies", description: "A durable backpack filled with notebooks, pens, and pencils.", price: 45.00, image: "./img/backpack.jpg" },
    { id: 11, title: "Insulated Thermal Mug", description: "Keeps drinks hot or cold for essential hydration.", price: 8.00, image: "./img/thermalMug.webp" },
    { id: 12, title: "Heavy-Duty Ground Tarp", description: "Waterproof sheet for ground cover or temporary roofing.", price: 20.00, image: "./img/groundTarp.webp" },
]


let shoppingCart = []

const renderProducts = () => {
    let itemsContainer = document.getElementById("items-container")
    if (!itemsContainer) {
        console.error("Items container not found!")
        return;
    }

    let cardsHtml = "<div class='row g-4 justify-content-center'>"
    cardsHtml += products.map(product => {
        return `
                <div class="card col-auto hidden d-flex flex-column" style="width: 18rem; margin: 3px; padding-top:10px">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body d-flex flex-column">
                        <div style="margin-top:50% margin-bottom:50%">
                            <h5 class="card-title">${product.title}</h5>
                            <p class="card-text">${product.description}</p>
                            <div id="add-to-cart-alert${product.id}" class="alert alert-success alert-dismissible fade show d-none" role="alert">Item added to cart!</div>
                        </div>
                        <div class="card-text-price">
                            <div>
                                <p class="card-text"><b>$${product.price.toFixed(2)}</b></p>
                            </div>
                            <div>
                                <a id=${product.id} onclick="addToCart(this.id)" class="btn mt-auto">Add to Cart</a>
                            </div>
                        </div>
                    </div>
                </div>
            `
    }).join("");
    cardsHtml += "</div>";

    itemsContainer.innerHTML = cardsHtml;
}

/*
    Alert works like this: we have a pre added alert div with
    the d-none element so it is hidden first and the
    id of the product so we can reach it.
    Then if the button is clicked we remove the d-none
    class element where the id of the alert is the 
    same as the id of the product so the
    alert shows up in the right card.
    Then with the timeout function add the d-none back to
    the div after 3 seconds so the alert fades away
*/

const addToCart = (id) => {
    const alert = document.getElementById(`add-to-cart-alert${id}`)
    try {
        products.forEach(product => {
            if (product.id == id) {
                shoppingCart.push(product)
                alert.classList.remove("d-none")
                setTimeout(() => {
                    alert.classList.add("d-none")
                }, 3000)
            }
        });

    } catch (error) {
        console.log("Could not find item")
        console.log(error)
    }
}

const ShoppingCart = () => {
    let tableContent = document.getElementById("table-content")
    let confirmTableContent = document.getElementById("confirm-table-content")
    let finalPrice = document.getElementById("final-price")
    let confirmFinalPrice = document.getElementById("confirm-final-price")
    let price = shoppingCart.reduce((accumulator, product) => {
        return accumulator + product.price
    }, 0)
    //js reduce method is for accumulating a specific value of an array
    //found it after some searching on how I can sum up the values: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    let discount = 0
    if (shoppingCart.length >= 3) {
        price -= price * 0.25
        discount = 25
    }
    tableContent.innerHTML = "" //have to clear popup so it does not add more products to cart every time you click the button
    tableContent.innerHTML += shoppingCart.map(product => {
        return `
            <tr>
                <td class="product-title">${product.title}</td>
                <td class="product-price">$${product.price}</td>
                <td><div class="deleteText" onclick="deleteProduct(${product.id})" style="color: red">Delete</div></td>
            </tr>
        `
    }).join("")
    finalPrice.innerHTML = `$${price.toFixed(2)} <b>(discount: -${discount}%)</b>`
    confirmTableContent.innerHTML = ""
    confirmTableContent.innerHTML += shoppingCart.map(product => {
        return `
            <tr>
                <td class="product-title">${product.title}</td>
                <td class="product-price">$${product.price}</td>
            </tr>
        `
    }).join("")
    confirmFinalPrice.innerHTML = `$${price.toFixed(2)} <b>(discount: -${discount}%)</b>`

}

const deleteProduct = (product) => {
    shoppingCart.pop(product)
    ShoppingCart()

}


const confirmOrder = () => {
    const form = document.getElementById('checkoutForm');
    const formDiv = document.getElementById("formDiv");
    const confirmDiv = document.getElementById("confirmDiv");

    if (!form) {
        console.error("Form element 'checkoutForm' not found.");
        return;
    }

    //Add the 'was-validated' class to manually trigger Bootstrap's validation messages
    form.classList.add('was-validated');

    //Check if all required fields are valid.
    if (form.checkValidity()) {
        formDiv.classList.add("d-none");
        confirmDiv.classList.remove("d-none");
        ShoppingCart()
    }
}

const confirmed = () => {
    alert("Thank you for your purchase!")
    window.location.reload()
}

renderProducts()


//part of fade animation
const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el))