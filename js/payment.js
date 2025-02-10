document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader")
    const paymentForm = document.getElementById("payment-form")

    // Show loader for 3 seconds, then display the payment form
    setTimeout(() => {
        loader.classList.add("hidden")
        paymentForm.classList.remove("hidden")
    }, 3000)

    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        // Create and show the overlay with loader
        const overlay = document.createElement("div")
        overlay.className = "overlay"
        overlay.innerHTML = '<div class="spinner"></div>'
        document.body.appendChild(overlay)

        // Simulate payment processing
        setTimeout(() => {
            // Remove the overlay
            document.body.removeChild(overlay)

            // Redirect to thank you page
            window.location.href = "thanks.html"
        }, 3000)
    })

    // Input formatting
    const cardNumber = document.getElementById("card-number")
    const expiryDate = document.getElementById("expiry-date")
    const cvv = document.getElementById("cvv")

    cardNumber.addEventListener("input", (e) => {
        e.target.value = e.target.value
            .replace(/\D/g, "") // Убираем все нецифровые символы
            .substring(0, 16) // Ограничиваем длину до 16 цифр
            .replace(/(\d{4})(?=\d)/g, "$1 ") // Форматируем каждые 4 цифры с пробелом
            .trim(); // Убираем пробелы в конце
    });

    expiryDate.addEventListener("input", (e) => {
        let value = e.target.value
            .replace(/\D/g, "") // Удаляем все, кроме цифр
            .slice(0, 4); // Ограничиваем длину до 4 цифр (MMYY)

        if (value.length >= 3) {
            value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2"); // Добавляем слэш после двух цифр
        }

        e.target.value = value;
    });

    cvv.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3)
    })
})

