document.addEventListener("DOMContentLoaded", () => {
    const newsletterForm = document.getElementById("newsletter-form");
    const subscriptionPopup = document.getElementById("subscription-popup");
    const closeSubscriptionPopup = subscriptionPopup?.querySelector(".close-popup");
    const subscriptionPopupOkBtn = document.getElementById("subscription-popup-ok");
    const popup = document.getElementById("product-popup");
    const closePopup = document.querySelector(".close-popup");
    const popupImage = document.getElementById("popup-image");
    const popupTitle = document.getElementById("popup-title");
    const popupPrice = document.getElementById("popup-price");
    const popupAddToCart = document.getElementById("popup-add-to-cart");
    const popupPay = document.getElementById("popup-pay-to-cart");
    const cartCount = document.querySelector(".cart-count");
    const productsGrid = document.querySelector(".products-grid");
    const categoriesGrid = document.querySelector(".categories-grid");
    const customSelect = document.querySelector(".custom-select");
    const selectSelected = customSelect?.querySelector(".select-selected");
    const selectItems = customSelect?.querySelector(".select-items");
    const testimonials = document.querySelectorAll(".testimonial");
    const prevButton = document.querySelector(".carousel-nav .prev");
    const nextButton = document.querySelector(".carousel-nav .next");
    const faqItems = document.querySelectorAll(".faq-item");
    const bestSellersSection = document.querySelector(".best-sellers");
    // Mobile menu functionality
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
    const navMenu = document.querySelector(".main-nav")
    // Элементы для авторизации
    const userNameElement = document.getElementById("user-name");
    const userIconElement = document.getElementById("user-icon");
    const logoutButton = document.getElementById("logout-button");

    let count = 0; // Счетчик корзины

    // Данные о продуктах
    const products = {
        shirts: [
            {
                id: "shirt1",
                name: "Sleeve Casual Shirts",
                price: 54.0,
                image: "/fashion-fusion/src/assets/images/shirt/shirt.webp",
                discount: 30,
                description: "A stylish and comfortable casual shirt made from breathable cotton fabric, perfect for everyday wear. The modern cut and classic design make it a versatile addition to your wardrobe. Pair it with jeans or chinos for a polished look."
            },
            {
                id: "shirt2",
                name: "Sleeve Linen Shirt",
                price: 56.7,
                image: "/fashion-fusion/src/assets/images/shirt/shirt2.webp",
                discount: 20,
                description: "This lightweight linen shirt is ideal for warm weather, offering excellent breathability and a relaxed fit. The natural fabric ensures comfort, while the minimalistic design adds elegance to casual and semi-formal outfits."
            },
            {
                id: "shirt3",
                name: "Abstract Print T-shirt",
                price: 94.98,
                image: "/fashion-fusion/src/assets/images/shirt/shirt3.webp",
                description: "Stand out from the crowd with this unique abstract print T-shirt. Designed with premium quality fabric, it offers both durability and a bold artistic statement. Perfect for creative individuals looking to express their personality."
            },
            {
                id: "shirt4",
                name: "Shirt Fashion Casual",
                price: 89.98,
                image: "/fashion-fusion/src/assets/images/shirt/shirt4.webp",
                description: "A fashionable casual shirt with a sleek design and modern fit. The soft fabric and subtle details make it suitable for both work and leisure. Enhance your wardrobe with this versatile piece."
            },
            {
                id: "shirt5",
                name: "Hawaiian Shirts",
                price: 21.7,
                image: "/fashion-fusion/src/assets/images/shirt/shirt5.webp",
                description: "Bring a touch of the tropics to your outfit with this vibrant Hawaiian shirt. Featuring colorful floral prints and lightweight material, it's perfect for summer parties, beach trips, or casual weekends."
            },
            {
                id: "shirt6",
                name: "Denim Shirt",
                price: 75.0,
                image: "/fashion-fusion/src/assets/images/shirt/shirt6.webp",
                description: "This classic denim shirt combines rugged durability with timeless style. Whether worn as a standalone piece or layered over a T-shirt, it's a must-have for casual and urban looks."
            },
            {
                id: "shirt7",
                name: "Printed Shirt",
                price: 48.9,
                image: "/fashion-fusion/src/assets/images/shirt/shirt7.webp",
                description: "A lightweight printed shirt featuring eye-catching designs. Its breathable fabric and relaxed fit make it perfect for casual gatherings or vacations. Stand out in style wherever you go."
            },
            {
                id: "shirt8",
                name: "Oxford Shirt",
                price: 65.0,
                image: "/fashion-fusion/src/assets/images/shirt/shirt8.webp",
                description: "An elegant Oxford shirt crafted from high-quality fabric for a timeless look. Perfect for professional settings or upscale casual events. Its crisp design and comfortable fit make it a wardrobe essential."
            },
        ],
        hoodies: [
            {
                id: "hoodie1",
                name: "Embroidered Sweatshirt",
                price: 107.98,
                image: "/fashion-fusion/src/assets/images/hoodies/hoodies.webp",
                description: "A cozy and stylish sweatshirt featuring intricate embroidery details. Made with soft fleece lining for maximum comfort, this piece is ideal for chilly evenings or relaxed weekends."
            },
            {
                id: "hoodie2",
                name: "Patchwork Hoodies",
                price: 43.0,
                image: "/fashion-fusion/src/assets/images/hoodies/hoodies2.webp",
                description: "This trendy hoodie boasts a unique patchwork design, combining different textures and colors for a bold statement. Perfect for fashion-forward individuals who love to stand out."
            },
            {
                id: "hoodie3",
                name: "Cardigan Hoodies",
                price: 53.98,
                image: "/fashion-fusion/src/assets/images/hoodies/hoodies3.webp",
                discount: 15,
                description: "A blend of comfort and style, this cardigan-style hoodie is perfect for layering. Made from soft materials, it provides warmth without compromising on breathability."
            },
            {
                id: "hoodie4",
                name: "Classic Hoodie",
                price: 79.99,
                image: "/fashion-fusion/src/assets/images/hoodies/hoodies4.webp",
                description: "A timeless classic hoodie that goes with everything. Features a drawstring hood, kangaroo pocket, and a relaxed fit for all-day comfort. A must-have for any wardrobe."
            },
            {
                id: "hoodie5",
                name: "Zip-up Hoodie",
                price: 85.5,
                image: "/fashion-fusion/src/assets/images/hoodies/hoodies5.webp",
                description: "This versatile zip-up hoodie offers easy wearability and a sleek design. Made with premium materials for durability and comfort, it's perfect for outdoor activities or casual outings."
            },
            {
                id: "hoodie6",
                name: "Oversized Hoodie",
                price: 92.0,
                image: "/fashion-fusion/src/assets/images/hoodies/hoodies6.webp",
                description: "Stay cozy in this oversized hoodie, designed for a relaxed and trendy fit. Its plush fabric and spacious design make it perfect for lounging or layering on colder days."
            },
            {
                id: "hoodie7",
                name: "Graphic Hoodie",
                price: 88.75,
                image: "/fashion-fusion/src/assets/images/hoodies/hoodies7.webp",
                description: "A bold graphic hoodie featuring eye-catching designs that let you express your personality. Perfect for casual wear or making a statement on the go."
            },
            {
                id: "hoodie8",
                name: "Tech Hoodie",
                price: 105.0,
                image: "/fashion-fusion/src/assets/images/hoodies/hoodies8.webp",
                description: "An innovative tech hoodie with moisture-wicking fabric and a sleek, modern design. Ideal for active lifestyles or anyone who values functionality with style."
            },
        ],
        jackets: [
            {
                id: "jacket1",
                name: "Denim Jacket",
                price: 89.99,
                image: "/fashion-fusion/src/assets/images/jacket/jacket.webp",
                description: "A rugged denim jacket that exudes timeless style. Designed for durability and versatility, it's the perfect layer for casual and smart-casual outfits alike."
            },
            {
                id: "jacket2",
                name: "Motorcycle Jacket",
                price: 120.0,
                image: "/fashion-fusion/src/assets/images/jacket/jacket2.webp",
                description: "An edgy motorcycle jacket crafted from high-quality materials for a bold and confident look. Features sturdy zippers, stylish lapels, and a perfect fit for road trips or city adventures."
            },
            {
                id: "jacket3",
                name: "Baseball Jacket",
                price: 95.5,
                image: "/fashion-fusion/src/assets/images/jacket/jacket3.webp",
                description: "A sporty baseball jacket with a classic design and comfortable fit. Ideal for casual outings, this jacket pairs well with jeans or joggers for a laid-back vibe."
            },
            {
                id: "jacket4",
                name: "Leather Jacket",
                price: 199.99,
                image: "/fashion-fusion/src/assets/images/jacket/jacket4.webp",
                description: "A premium leather jacket with a sleek, tailored fit. Its luxurious finish and timeless appeal make it a statement piece for any wardrobe."
            },
        ],
    };


    if (!localStorage.getItem("products")) {
        // Сохраняем объект products в localStorage в виде строки JSON
        localStorage.setItem("products", JSON.stringify(products));
    }


    // Функции
    function closeSubscriptionPopupFunc() {
        subscriptionPopup.style.display = "none";
    }

    function closePopupFunc() {
        popup.style.display = "none";
    }

    function addToCart() {
        count++;
        cartCount.textContent = count;
    }

    function showPopup(product) {
        popupImage.src = product.image;
        popupImage.alt = product.name;
        popupTitle.textContent = product.name;
        popup.style.display = "block";


    }

    function displayProducts(category = "all", limit = null) {
        if (!productsGrid) return;
        productsGrid.innerHTML = "";

        let productsToShow = category === "all"
            ? [...products.shirts, ...products.hoodies, ...products.jackets]
            : products[category];

        if (limit) productsToShow = productsToShow.slice(0, limit);

        // Получаем текущий путь, чтобы понять, где мы находимся
        const currentPath = window.location.pathname;

// Если мы находимся в папке src/pages (например, на странице shop.html), убираем лишний префикс src/pages
        const basePath = currentPath.includes("/fashion-fusion/src/pages/") ? "" : "/fashion-fusion/src/pages/";

        productsToShow.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.innerHTML = `
            ${product.discount ? `<div class="product-badge">${product.discount}% Off</div>` : ""}
            <a href="${basePath}product.html?id=${product.id}" class="product-link">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">$ ${product.price.toFixed(2)} USD</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
            productsGrid.appendChild(productCard);

            const addToCartBtn = productCard.querySelector(".add-to-cart");
            addToCartBtn.addEventListener("click", (e) => {
                e.preventDefault();
                showPopup(product);
                addToCartPro(product);
                addToCart();
                updateCartCount(); // Актуализация счетчика корзины
            });
        });
    }

    function addToCartPro(product) {
        // Проверка наличия ID
        if (!product.id) {
            console.error("У товара отсутствует ID:", product);
            return;
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        console.log("Корзина до добавления:", cart); // Логирование

        const existingProduct = cart.find((item) => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1,
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
    }


    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault()

            const targetId = this.getAttribute("href").substring(1)
            const targetElement = document.getElementById(targetId)

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100, // Adjust offset as needed
                    behavior: "smooth",
                })
            }
        })
    });


    // Обработчики событий
    if (newsletterForm) {
        newsletterForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            console.log("Subscribing email:", email);
            this.reset();
            setTimeout(() => {
                subscriptionPopup.style.display = "block";
            }, 500); // Задержка для наглядности
        });
    }

    if (closeSubscriptionPopup) closeSubscriptionPopup.onclick = closeSubscriptionPopupFunc;
    if (subscriptionPopupOkBtn) subscriptionPopupOkBtn.onclick = closeSubscriptionPopupFunc;

    window.onclick = (event) => {
        if (event.target == subscriptionPopup) closeSubscriptionPopupFunc();
        if (event.target == popup) closePopupFunc();
    };


    if (closePopup) closePopup.onclick = closePopupFunc;
    if (popupAddToCart) popupAddToCart.onclick = () => {
        closePopupFunc();
    };


    if (customSelect) {
        selectSelected.addEventListener("click", function (e) {
            e.stopPropagation();
            this.classList.toggle("select-arrow-active");
            selectItems.classList.toggle("select-hide");
        });

        selectItems.querySelectorAll("div").forEach((item) => {
            item.addEventListener("click", function (e) {
                e.stopPropagation();
                selectSelected.innerHTML = this.innerHTML;
                selectItems.classList.add("select-hide");
                selectSelected.classList.remove("select-arrow-active");
                const selectedValue = this.getAttribute("data-value");
                if (productsGrid) displayProducts(selectedValue);
                if (categoriesGrid) displayCategories(selectedValue);
            });
        });

        document.addEventListener("click", (e) => {
            if (!customSelect.contains(e.target)) {
                selectItems.classList.add("select-hide");
                selectSelected.classList.remove("select-arrow-active");
            }
        });
    }


    // Карусель отзывов
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial) => testimonial.classList.remove("active"));
        testimonials[index].classList.add("active");
    }

    function nextTestimonial() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    function prevTestimonial() {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    }

    if (nextButton) nextButton.addEventListener("click", nextTestimonial);
    if (prevButton) prevButton.addEventListener("click", prevTestimonial);
    setInterval(nextTestimonial, 5000);

    // FAQ Аккордеон
    faqItems.forEach((item) => {
        const question = item.querySelector(".faq-question");
        question.addEventListener("click", () => {
            const isActive = item.classList.contains("active");
            faqItems.forEach((faqItem) => faqItem.classList.remove("active"));
            if (!isActive) item.classList.add("active");
        });
    });

    // Mobile menu toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener("click", () => {
            mobileMenuBtn.classList.toggle("active")
            navMenu.classList.toggle("active")
        })

        // Close mobile menu when a link is clicked
        navMenu.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                mobileMenuBtn.classList.remove("active")
                navMenu.classList.remove("active")
            })
        })

        // Close mobile menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenuBtn.classList.remove("active")
                navMenu.classList.remove("active")
            }
        })
    }


    // Работа с авторизацией
    const storedUserName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("userEmail");

    if (storedUserName && userNameElement) {
        userNameElement.textContent = storedUserName;
        if (userIconElement) userIconElement.style.display = "none"; // Скрываем иконку, если пользователь авторизован
    } else if (userNameElement) {
        userNameElement.textContent = ""; // Очищаем имя, если пользователь не авторизован
        if (userIconElement) userIconElement.style.display = "block"; // Показываем иконку
    }

    if (storedEmail && logoutButton) {
        logoutButton.style.display = "block"; // Показываем кнопку выхода
    } else if (logoutButton) {
        logoutButton.style.display = "none"; // Скрываем кнопку выхода
    }

    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            localStorage.clear(); // Очищаем localStorage
            if (userNameElement) userNameElement.textContent = ""; // Очищаем имя
            if (userIconElement) userIconElement.style.display = "block"; // Показываем иконку
            if (logoutButton) logoutButton.style.display = "none"; // Скрываем кнопку выхода
            window.location.href = "../../auth.html"; // Перенаправляем на страницу авторизации
        });
    }

    // Функция для установки cookie
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    }

    // Функция для получения cookie
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(`${name}=`)) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }

    // Проверка и показ баннера
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptButton = document.getElementById('accept-cookies');
    const rejectButton = document.getElementById('reject-cookies');

    // Если пользователь ещё не принял cookies, показываем баннер
    if (!getCookie('cookiesAccepted') && !getCookie('cookiesRejected')) {
        cookieBanner.style.display = 'block';
    }


    acceptButton.addEventListener('click', () => {
        setCookie('cookiesAccepted', 'true', 365); // Устанавливаем cookie на 1 год
        cookieBanner.style.display = 'none';
    });

    // При клике на "Reddet" скрываем баннер и сохраняем флаг
    rejectButton.addEventListener('click', () => {
        setCookie('cookiesRejected', 'false', 365); // Устанавливаем cookie на 1 год
        cookieBanner.style.display = 'none';
    });


    // Инициализация
    if (bestSellersSection) {
        // На главной странице показываем только 4 карточки
        displayProducts("all", 4);
    } else if (productsGrid) {
        // На других страницах показываем все продукты
        displayProducts("all");
    }

    // Инициализация
    if (categories) {
        // На главной странице показываем только 4 карточки
        displayProducts("all", 4);
    } else if (categoriesGrid) {
        // На других страницах показываем все продукты
        displayProducts("all");
    }

});

new WOW().init();