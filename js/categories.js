document.addEventListener("DOMContentLoaded", () => {
    const productsGrid = document.querySelector(".categories-grid")
    const customSelect = document.querySelector(".custom-select")
    const selectSelected = customSelect.querySelector(".select-selected")
    const selectItems = customSelect.querySelector(".select-items")

    const products = {
        shirts: [
            {
                name: "Casual Shirt",
                price: 54.0,
                image: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400",
            },
            { name: "Linen Shirt", price: 56.7, image: "https://images.unsplash.com/photo-1604695573706-53170668f6a6?w=400" },
            { name: "Denim Shirt", price: 62.5, image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=400" },
            {
                name: "Printed Shirt",
                price: 48.9,
                image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400",
            },
            {
                name: "Flannel Shirt",
                price: 59.99,
                image: "https://images.unsplash.com/photo-1638718297700-e828368a54e2?w=400",
            },
            {
                name: "Oxford Shirt",
                price: 65.0,
                image: "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?w=400",
            },
            {
                name: "Hawaiian Shirt",
                price: 52.8,
                image: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?w=400",
            },
            { name: "Dress Shirt", price: 72.5, image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=400" },
        ],
        jackets: [
            {
                name: "Denim Jacket",
                price: 89.99,
                image: "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=500",
            },
            {
                name: "Motorcycle Jacket",
                price: 120.0,
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
            },
            {
                name: "Baseball Jacket",
                price: 95.5,
                image: "https://images.unsplash.com/photo-1559551409-dadc959f76b8?w=500",
            },
            {
                name: "Leather Jacket",
                price: 199.99,
                image: "https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500",
            },
        ],
    }

    function displayProducts(category) {
        productsGrid.innerHTML = ""
        const productsToShow = category === "all" ? [...products.shirts, ...products.jackets] : products[category]

        productsToShow.forEach((product) => {
            const productCard = document.createElement("div")
            productCard.className = "category-card"
            productCard.dataset.category =
                category === "all" ? (products.shirts.includes(product) ? "shirts" : "jackets") : category
            productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="category-image">
        <div class="category-info">
          <h2 class="category-title">${product.name}</h2>
          <p class="product-price">$ ${product.price.toFixed(2)} USD</p>
        </div>
      `
            productsGrid.appendChild(productCard)
        })
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

    // Initial display of all products
    displayProducts("all")
})

