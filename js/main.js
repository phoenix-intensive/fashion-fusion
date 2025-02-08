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
                name: "Sleeve Casual Shirts",
                price: 54.0,
                image: "./images/shirt/shirt.webp",
                discount: 30
            },
            {
                name: "Sleeve Linen Shirt",
                price: 56.7,
                image: "./images/shirt/shirt2.webp",
                discount: 20
            },
            {
                name: "Abstract Print T-shirt",
                price: 946.98,
                image: "./images/shirt/shirt3.webp"
            },
            {
                name: "Shirt Fashion Casual",
                price: 890.98,
                image: "./images/shirt/shirt4.webp"
            },
            {
                name: "Hawaiian Shirts",
                price: 21.7,
                image: "./images/shirt/shirt5.webp"
            },
            {
                name: "Denim Shirt",
                price: 75.0,
                image: "./images/shirt/shirt6.webp"
            },
            {
                name: "Printed Shirt",
                price: 48.9,
                image: "./images/shirt/shirt7.webp"
            },
            {
                name: "Oxford Shirt",
                price: 65.0,
                image: "./images/shirt/shirt8.webp"
            },
        ],
        hoodies: [
            {
                name: "Embroidered Sweatshirt",
                price: 107.98,
                image: "./images/hoodies/hoodies.webp"
            },
            {
                name: "Patchwork Hoodies",
                price: 430.0,
                image: "./images/hoodies/hoodies2.webp"
            },
            {
                name: "Cardigan Hoodies",
                price: 535.98,
                image: "./images/hoodies/hoodies3.webp",
                discount: 15
            },
            {
                name: "Classic Hoodie",
                price: 79.99,
                image: "./images/hoodies/hoodies4.webp"
            },
            {
                name: "Zip-up Hoodie",
                price: 85.5,
                image: "./images/hoodies/hoodies5.webp"
            },
            {
                name: "Oversized Hoodie",
                price: 92.0,
                image: "./images/hoodies/hoodies6.webp"
            },
            {
                name: "Graphic Hoodie",
                price: 88.75,
                image: "./images/hoodies/hoodies7.webp"
            },
            {
                name: "Tech Hoodie",
                price: 105.0,
                image: "./images/hoodies/hoodies8.webp"
            },
        ],
        jackets: [
            {
                name: "Denim Jacket",
                price: 89.99,
                image: "./images/jacket/jacket.webp"
            },
            {
                name: "Motorcycle Jacket",
                price: 120.0,
                image: "./images/jacket/jacket2.webp"
            },
            {
                name: "Baseball Jacket",
                price: 95.5,
                image: "./images/jacket/jacket3.webp"
            },
            {
                name: "Leather Jacket",
                price: 199.99,
                image: "./images/jacket/jacket4.webp"
            },
        ],
    };



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
        popupPrice.textContent = `$ ${product.price.toFixed(2)} USD`;
        popup.style.display = "block";
    }

    function displayProducts(category = "all", limit = null) {
        if (!productsGrid) return;
        productsGrid.innerHTML = "";
        let productsToShow = category === "all" ? [...products.shirts, ...products.hoodies, ...products.jackets] : products[category];
        if (limit) productsToShow = productsToShow.slice(0, limit);

        productsToShow.forEach((product) => {
            const productCard = document.createElement("div");
            productCard.className = "product-card";
            productCard.innerHTML = `
                ${product.discount ? `<div class="product-badge">${product.discount}% Off</div>` : ""}
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$ ${product.price.toFixed(2)} USD</p>
                <button class="add-to-cart">Add to Cart</button>
            `;
            productsGrid.appendChild(productCard);

            const addToCartBtn = productCard.querySelector(".add-to-cart");
            addToCartBtn.addEventListener("click", (e) => {
                e.preventDefault();
                showPopup(product);
            });
        });
    }

    function displayCategories(category = "all") {
        if (!categoriesGrid) return;
        categoriesGrid.innerHTML = "";
        const productsToShow = category === "all" ? [...products.shirts, ...products.jackets] : products[category];

        productsToShow.forEach((product) => {
            const categoryCard = document.createElement("div");
            categoryCard.className = "category-card";
            categoryCard.dataset.category = category === "all" ? (products.shirts.includes(product) ? "shirts" : "jackets") : category;
            categoryCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="category-image">
                <div class="category-info">
                    <h2 class="category-title">${product.name}</h2
                </div>
            `;
            categoriesGrid.appendChild(categoryCard);
        });
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
            e.preventDefault(); // Останавливаем стандартное поведение формы
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
        addToCart();
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
            window.location.href = "auth.html"; // Перенаправляем на страницу авторизации
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