document.addEventListener("DOMContentLoaded", () => {
    displayCart();
    updateCartCount(); // Обновляем счетчик при загрузке страницы
});

function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cartContainer.innerHTML = ""; // Очистка содержимого перед отрисовкой

    cart.forEach((item) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-image">
            <h3 class="cart-title">${item.name}</h3>
            <p class="cart-price">$ ${item.price.toFixed(2)} USD</p>
            <div class="quantity-controls">
                <button class="decrease-btn" data-id="${item.id}">-</button>
                <span class="cart-quantity">${item.quantity}</span>
                <button class="increase-btn" data-id="${item.id}">+</button>
            </div>
            <button class="remove-btn" data-id="${item.id}">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    // Добавляем обработчики событий для кнопок увеличения и уменьшения
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            updateItemQuantity(productId, 1); // Увеличиваем количество на 1
        });
    });

    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            updateItemQuantity(productId, -1); // Уменьшаем количество на 1
        });
    });

    // Добавляем обработчики событий для кнопок "Remove"
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.dataset.id;
            removeFromCart(productId);
        });
    });

    updateCartTotal(); // Обновляем итоговую сумму
}

function updateItemQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Находим товар по ID
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        item.quantity += change; // Изменяем количество товара

        // Если количество меньше или равно 0, удаляем товар из корзины
        if (item.quantity <= 0) {
            cart.splice(itemIndex, 1);
        }

        // Сохраняем обновленный массив в localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Обновляем отображение корзины и сумму
    displayCart();
    updateCartCount();
    updateCartTotal(); // Обновляем итоговую сумму
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item => item.id !== productId); // Удаляем товар из корзины
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    updateCartCount();
    updateCartTotal(); // Обновляем итоговую сумму после удаления товара
}


function updateCartTotal() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Если корзина пустая, устанавливаем итоговую сумму равной $0.00
    const total = cart.length > 0
        ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
        : 0;

    const cartTotalElement = document.getElementById("cart-total");
    if (cartTotalElement) {
        cartTotalElement.textContent = `$${total.toFixed(2)}`;
    }
}

