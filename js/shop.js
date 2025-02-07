document.addEventListener("DOMContentLoaded", () => {
    const productsGrid = document.querySelector(".products-grid")
    const customSelect = document.querySelector(".custom-select")
    const selectSelected = customSelect.querySelector(".select-selected")
    const selectItems = customSelect.querySelector(".select-items")
    const popup = document.getElementById("product-popup")
    const closePopup = document.querySelector(".close-popup")
    const popupImage = document.getElementById("popup-image")
    const popupTitle = document.getElementById("popup-title")
    const popupPrice = document.getElementById("popup-price")
    const popupAddToCart = document.getElementById("popup-add-to-cart")
    const cartCount = document.querySelector(".cart-count")
    const newsletterForm = document.getElementById("newsletter-form")
    const subscriptionPopup = document.getElementById("subscription-popup")
    const closeSubscriptionPopup = subscriptionPopup.querySelector(".close-popup")
    const subscriptionPopupOkBtn = document.getElementById("subscription-popup-ok")

    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault()
            const email = this.querySelector('input[type="email"]').value

            // Here you would typically send the email to your server
            console.log("Subscribing email:", email)

            // Show the subscription thank you popup
            subscriptionPopup.style.display = "block"

            // Reset the form
            this.reset()
        })
    }

    function closeSubscriptionPopupFunc() {
        subscriptionPopup.style.display = "none"
    }

    closeSubscriptionPopup.onclick = closeSubscriptionPopupFunc
    subscriptionPopupOkBtn.onclick = closeSubscriptionPopupFunc

    // Close popup when clicking outside
    window.onclick = (event) => {
        if (event.target == subscriptionPopup) {
            closeSubscriptionPopupFunc()
        }
        if (event.target == popup) {
            closePopupFunc()
        }
    }



    let count = 0

    const products = {
        shirts: [
            {
                name: "Sleeve Casual Shirts",
                price: 54.0,
                image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400",
                discount: 30,
            },
            {
                name: "Sleeve Linen Shirt",
                price: 56.7,
                image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=400",
                discount: 20,
            },
            {
                name: "Abstract Print T-shirt",
                price: 946.98,
                image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400",
            },
            {
                name: "Shirt Fashion Casual",
                price: 890.98,
                image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400",
            },
        ],
        hoodies: [
            {
                name: "Embroidered Sweatshirt",
                price: 107.98,
                image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
            },
            {
                name: "Patchwork Hoodies",
                price: 430.0,
                image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
            },
            {
                name: "Cardigan Hoodies",
                price: 535.98,
                image: "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=400",
                discount: 15,
            },
            {
                name: "Classic Hoodie",
                price: 79.99,
                image: "https://images.unsplash.com/photo-1578948856697-db91d246b7b8?w=400",
            },
        ],
    }

    function displayProducts(category) {
        productsGrid.innerHTML = ""
        const productsToShow = category === "all" ? [...products.shirts, ...products.hoodies] : products[category]

        productsToShow.forEach((product) => {
            const productCard = document.createElement("div")
            productCard.className = "product-card"
            productCard.innerHTML = `
                ${product.discount ? `<div class="product-badge">${product.discount}% Off</div>` : ""}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$ ${product.price.toFixed(2)} USD</p>
                <button class="add-to-cart">Add to Cart</button>
            `
            productsGrid.appendChild(productCard)

            const addToCartBtn = productCard.querySelector(".add-to-cart")
            addToCartBtn.addEventListener("click", (e) => {
                e.preventDefault()
                showPopup(product)
            })
        })
    }

    function showPopup(product) {
        popupImage.src = product.image
        popupImage.alt = product.name
        popupTitle.textContent = product.name
        popupPrice.textContent = `$ ${product.price.toFixed(2)} USD`
        popup.style.display = "block"
    }

    function closePopupFunc() {
        popup.style.display = "none"
    }

    function addToCart() {
        count++
        cartCount.textContent = count
    }

    selectSelected.addEventListener("click", function (e) {
        e.stopPropagation()
        this.classList.toggle("select-arrow-active")
        selectItems.classList.toggle("select-hide")
    })

    selectItems.querySelectorAll("div").forEach((item) => {
        item.addEventListener("click", function (e) {
            e.stopPropagation()
            selectSelected.innerHTML = this.innerHTML
            selectItems.classList.add("select-hide")
            selectSelected.classList.remove("select-arrow-active")
            const selectedValue = this.getAttribute("data-value")
            displayProducts(selectedValue)
        })
    })

    document.addEventListener("click", (e) => {
        if (!customSelect.contains(e.target)) {
            selectItems.classList.add("select-hide")
            selectSelected.classList.remove("select-arrow-active")
        }
    })

    closePopup.onclick = closePopupFunc

    window.onclick = (event) => {
        if (event.target == popup) {
            closePopupFunc()
        }
    }

    popupAddToCart.onclick = () => {
        addToCart()
        closePopupFunc()
    }

    // Initial display of all products
    displayProducts("all")
})

