document.addEventListener("DOMContentLoaded", () => {

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

    // Authentication logic
    const loginForm = document.getElementById("login-form")
    const registerForm = document.getElementById("register-form")
    const authToggle = document.querySelector(".auth-toggle")

    if (authToggle) {
        authToggle.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") {
                const formToShow = e.target.getAttribute("data-form")
                document.querySelectorAll(".auth-form").forEach((form) => {
                    form.style.display = "none"
                })
                document.getElementById(`${formToShow}-form`).style.display = "block"

                authToggle.querySelectorAll("button").forEach((btn) => {
                    btn.classList.remove("active")
                })
                e.target.classList.add("active")
            }
        })
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault()
            const email = this.querySelector("#login-email").value
            const password = this.querySelector("#login-password").value
            const messageElement = this.querySelector(".form-message")

            if (!email || !password) {
                messageElement.textContent = "Please fill in all fields"
                return
            }

            // Simulate login error
            window.location.href = "index.html"
            // In a real application, you would send these credentials to your server here
        })
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault()
            const name = this.querySelector("#register-name").value
            const email = this.querySelector("#register-email").value
            const password = this.querySelector("#register-password").value
            const confirmPassword = this.querySelector("#register-confirm-password").value
            const messageElement = this.querySelector(".form-message")

            if (!name || !email || !password || !confirmPassword) {
                messageElement.textContent = "Please fill in all fields"
                return
            }

            if (password !== confirmPassword) {
                messageElement.textContent = "Passwords do not match"
                return
            }

            // Simulate successful registration
            messageElement.textContent = "Registration successful! You can now log in."
            messageElement.style.color = "green"
            this.reset()
            window.location.href = "index.html"
            // In a real application, you would send this data to your server here
        })
    }


// Cart functionality
    const cartCount = document.querySelector(".cart-count")
    let count = 0

    function addToCart() {
        count++
        cartCount.textContent = count
    }

    // Product Pop-up
    const popup = document.getElementById("product-popup")
    const closePopup = document.querySelector(".close-popup")
    const popupImage = document.getElementById("popup-image")
    const popupTitle = document.getElementById("popup-title")
    const popupPrice = document.getElementById("popup-price")
    const popupAddToCart = document.getElementById("popup-add-to-cart")

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

    // Products
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
            {
                name: "Hawaiian Shirts",
                price: 21.7,
                image: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?w=400",
            },
            {
                name: "Denim Shirt",
                price: 75.0,
                image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=400"
            },
            {
                name: "Printed Shirt",
                price: 48.9,
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
            },
            {
                name: "Oxford Shirt",
                price: 65.0,
                image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=400",
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
            {
                name: "Zip-up Hoodie",
                price: 85.5,
                image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400",
            },
            {
                name: "Oversized Hoodie",
                price: 92.0,
                image: "https://images.unsplash.com/photo-1614975059251-992f11792b9f?w=400",
            },
            {
                name: "Graphic Hoodie",
                price: 88.75,
                image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
            },
            {
                name: "Tech Hoodie",
                price: 105.0,
                image: "https://images.unsplash.com/photo-1596568359553-a56de6970068?w=400",
            },
        ],
    }

    // Display products
    function displayProducts(category = "all", limit = null) {
        const productsGrid = document.querySelector(".products-grid")
        if (!productsGrid) return // Exit if not on a page with products

        productsGrid.innerHTML = ""
        let productsToShow = category === "all" ? [...products.shirts, ...products.hoodies] : products[category]

        // If limit is set, slice the array to show only the specified number of products
        if (limit) {
            productsToShow = productsToShow.slice(0, limit)
        }

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

    // Category filter for shop page
    const categoryFilterShop = document.getElementById("category-filter")
    if (categoryFilterShop) {
        categoryFilterShop.addEventListener("change", function () {
            displayProducts(this.value)
        })

        // Initialize products on shop page
        displayProducts("all")
    }

    // Initialize products on index page
    const bestSellersSection = document.querySelector(".best-sellers")
    if (bestSellersSection) {
        displayProducts("all", 4) // Display only 4 products on the index page
    }


    new WOW().init();


    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            })
        })
    })


    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const mainNav = document.querySelector(".main-nav")
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener("click", () => {
            mainNav.classList.toggle("show")
        })
    }

    // Testimonial Carousel
    const testimonials = document.querySelectorAll(".testimonial")
    const prevButton = document.querySelector(".carousel-nav .prev")
    const nextButton = document.querySelector(".carousel-nav .next")
    let currentTestimonial = 0

    function showTestimonial(index) {
        testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
        testimonials[index].classList.add("active")
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length
        showTestimonial(currentTestimonial)
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length
        showTestimonial(currentTestimonial)
    }

    nextButton.addEventListener("click", nextTestimonial)
    prevButton.addEventListener("click", prevTestimonial)

    // Show the first testimonial initially
    showTestimonial(currentTestimonial)

    // Auto-advance the carousel every 5 seconds
    setInterval(nextTestimonial, 5000)


    // FAQ Accordion
    const faqItems = document.querySelectorAll(".faq-item")

    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question")

        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active")

            // Close all items
            faqItems.forEach((faqItem) => {
                faqItem.classList.remove("active")
            })

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add("active")
            }
        })
    })
})

