
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
    { id: 1, title: "Wireless Earbuds", description: "Noise-cancelling, 24-hour battery life.", price: 129.99, image: "https://placehold.co/400x300/3B82F6/ffffff?text=Earbuds" },
    { id: 2, title: "Mechanical Keyboard", description: "Tactile brown switches, RGB backlit.", price: 99.50, image: "https://placehold.co/400x300/EF4444/ffffff?text=Keyboard" },
    { id: 3, title: "Vintage Camera", description: "Classic 35mm film camera, fully manual.", price: 249.00, image: "https://placehold.co/400x300/10B981/ffffff?text=Camera" },
    { id: 4, title: "Smart Watch", description: "Heart rate monitor, waterproof design.", price: 175.99, image: "https://placehold.co/400x300/F59E0B/ffffff?text=SmartWatch" },
    { id: 5, title: "Portable Blender", description: "Perfect for smoothies on the go.", price: 35.00, image: "https://placehold.co/400x300/8B5CF6/ffffff?text=Blender" },
    { id: 6, title: "E-Reader", description: "Paper-like display, thousands of books.", price: 139.99, image: "https://placehold.co/400x300/EC4899/ffffff?text=E-Reader" },
    { id: 7, title: "Gaming Mouse", description: "High precision sensor, customizable weights.", price: 55.99, image: "https://placehold.co/400x300/06B6D4/ffffff?text=Mouse" },
    { id: 8, title: "Dimmable Desk Lamp", description: "Modern design with touch control.", price: 45.00, image: "https://placehold.co/400x300/F97316/ffffff?text=Lamp" },
    { id: 9, title: "Bluetooth Speaker", description: "Powerful bass, IPX7 water resistance.", price: 89.99, image: "https://placehold.co/400x300/6B7280/ffffff?text=Speaker" },
    { id: 10, title: "Travel Backpack", description: "Durable, fits a 15-inch laptop.", price: 79.99, image: "https://placehold.co/400x300/1C64F2/ffffff?text=Backpack" },
    { id: 11, title: "Coffee Brewer", description: "Programmable automatic drip machine.", price: 65.00, image: "https://placehold.co/400x300/047857/ffffff?text=Coffee" },
    { id: 12, title: "Yoga Mat", description: "Extra thick, non-slip grip.", price: 25.99, image: "https://placehold.co/400x300/D97706/ffffff?text=Yoga" },
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
                <div class="card col-auto hidden" style="width: 18rem; margin: 3px;">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${product.description}</p>
                        <div id="add-to-cart-alert${product.id}" class="alert alert-success alert-dismissible fade show d-none" role="alert">Item added to cart!</div>                        <p class="card-text"><b>$${product.price.toFixed(2)}</b></p>
                        <a href="#" id=${product.id} onclick="addToCart(this.id)" class="btn btn-primary">Add to Cart</a>
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

    tableContent = document.getElementById("table-content")
    finalPrice = document.getElementById("final-price")
    let price = shoppingCart.reduce((accumulator,product)=>{
        return accumulator+product.price
    },0)
    //js reduce method is for accumulating a specific value of an array
    //found it after some searching on how I can sum up the values: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
    let discount = 0
    if (shoppingCart.length>=3) {
        price-=price*0.25
        discount=25
    }
    tableContent.innerHTML="" //have to clear popup so it does not add more products to cart every time you click the button
    tableContent.innerHTML += shoppingCart.map(product => {
        return `
            <tr>
                <td>${product.title}</td>
                <td>$${product.price}</td>
            </tr>
        `
    }).join("")
    finalPrice.innerHTML=`$${price.toFixed(2)} <b>(-${discount}%)</b>`
}



renderProducts()

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el) => observer.observe(el))