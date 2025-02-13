document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");
    const sizeOptions = document.querySelectorAll(".size-option");

    if (productId) {
        // Загрузить данные о продукте
        loadProductDetails(productId);
    }

    sizeOptions.forEach((option) => {
        option.addEventListener("click", () => {
            sizeOptions.forEach((btn) => btn.classList.remove("selected"))
            option.classList.add("selected")
            selectedSize = option.dataset.size
        })
    })
});


function loadProductDetails(productId) {
    // Загрузить данные из LocalStorage
    const data = JSON.parse(localStorage.getItem("products")) || {};

    // Собрать все продукты из категорий в один массив
    const allProducts = [
        ...(data.shirts || []),
        ...(data.hoodies || []),
        ...(data.jackets || [])
    ];

    // Найти продукт по ID
    const product = allProducts.find((p) => p.id === productId);

    if (product) {
        // Заполнение данных о продукте
        document.getElementById("product-image").src = product.image;
        document.getElementById("product-title").textContent = product.name;
        document.getElementById("product-price").textContent = `$${product.price.toFixed(2)}`;
        document.getElementById("product-description").textContent = product.description || "No description available.";

        // Добавление обработчика на кнопку "Add to Cart"
        document.querySelector(".add-to-cart").addEventListener("click", () => {
            addToCartPro(product);
        });
    } else {
        document.getElementById("product-container").innerHTML = "<p>Product not found</p>";
    }
}

function addToCartPro(product) {
    if (!product.id) {
        console.error("У товара отсутствует ID:", product);
        return;
    }

    // Получить корзину из LocalStorage или создать новую
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1; // Увеличить количество, если товар уже в корзине
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });
    }

    // Сохранить корзину обратно в LocalStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(`${product.name} добавлен в корзину.`);

    updateCartCount();
}
