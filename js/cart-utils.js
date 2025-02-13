// Функция для обновления количества товаров в значке корзины
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalItems = cart.reduce((count, item) => count + item.quantity, 0); // Суммируем item.quantity
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
        cartCountElement.textContent = totalItems; // Устанавливаем значение в счетчик
    }
}

// Вызываем функцию сразу при загрузке
document.addEventListener("DOMContentLoaded", updateCartCount);
