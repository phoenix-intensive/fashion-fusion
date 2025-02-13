document.addEventListener("DOMContentLoaded", () => {
    const loader = document.getElementById("loader");
    const paymentForm = document.getElementById("payment-form");

    // Show loader for 3 seconds, then display the payment form
    setTimeout(() => {
        loader.classList.add("hidden");
        paymentForm.classList.remove("hidden");
    }, 3000);

    paymentForm.addEventListener("submit", (e) => {
        e.preventDefault();


        let hasErrors = false;

        // Create and show the overlay with loader
        const overlay = document.createElement("div");
        overlay.className = "overlay";
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);

        // Валидация номера карты
        const cardNumber = document.getElementById("card-number");
        const cardNumberError = document.getElementById("card-number-error");
        const rawCardNumber = cardNumber.value.replace(/\s/g, "");

        if (rawCardNumber.length !== 16) {
            cardNumberError.textContent = "\n" + "Enter the full card number (16 digits)";
            cardNumberError.classList.remove("hidden");
            hasErrors = true;
        } else {
            cardNumberError.textContent = "";
            cardNumberError.classList.add("hidden");
        }

        // Валидация даты истечения
        const expiryDate = document.getElementById("expiry-date");
        const expiryDateError = document.getElementById("expiry-date-error");
        if (!/^\d{2}\/\d{2}$/.test(expiryDate.value)) {
            expiryDateError.textContent = "Please enter the correct date (MM/YY)";
            expiryDateError.classList.remove("hidden");
            hasErrors = true;
        } else {
            expiryDateError.textContent = "";
            expiryDateError.classList.add("hidden");
        }

        // Валидация CVV
        const cvv = document.getElementById("cvv");
        const cvvError = document.getElementById("cvv-error");
        if (cvv.value.length !== 3) {
            cvvError.textContent = "Enter correct CVV (3 digits)";
            cvvError.classList.remove("hidden");
            hasErrors = true;
        } else {
            cvvError.textContent = "";
            cvvError.classList.add("hidden");
        }

        // Если есть ошибки, прекращаем обработку
        if (hasErrors) {
            document.body.removeChild(overlay); // Убираем оверлей, если есть ошибка
            return;
        }

        // Симуляция обработки платежа
        setTimeout(() => {
            // Remove the overlay
            document.body.removeChild(overlay);

            // Redirect to thank you page
            window.location.href = "thanks.html";
        }, 2000);
    });

    // Input formatting
    const cardNumber = document.getElementById("card-number");
    const expiryDate = document.getElementById("expiry-date");
    const cvv = document.getElementById("cvv");

    cardNumber.addEventListener("input", (e) => {
        e.target.value = e.target.value
            .replace(/\s/g, "")
            .replace(/(\d{4})/g, "$1 ")
            .trim();
    });

    expiryDate.addEventListener("input", (e) => {
        e.target.value = e.target.value
            .replace(/\s/g, "")
            .replace(/(\d{2})(\d{2})/, "$1/$2")
            .trim();
    });

    cvv.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(/\D/g, "").slice(0, 3);
    });
});
