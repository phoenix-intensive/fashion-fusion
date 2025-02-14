const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const authToggle = document.querySelector(".auth-toggle");


// Переключение между формами регистрации и логина
if (authToggle) {
    authToggle.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const formToShow = e.target.getAttribute("data-form");

            // Скрываем все формы и показываем нужную
            document.querySelectorAll(".auth-form").forEach((form) => {
                form.style.display = "none";
            });
            const formToDisplay = document.getElementById(`${formToShow}-form`);
            if (formToDisplay) {
                formToDisplay.style.display = "block";
            }

            // Активируем соответствующую кнопку
            authToggle.querySelectorAll("button").forEach((btn) => {
                btn.classList.remove("active");
            });
            e.target.classList.add("active");
        }
    });
}

// Обработка формы логина
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = this.querySelector("#login-email").value;
        const password = this.querySelector("#login-password").value;
        const messageElement = this.querySelector(".form-message");

        if (!email || !password) {
            messageElement.textContent = "Please fill in all fields";
            messageElement.style.color = "red";
            return;
        }

        const storedEmail = localStorage.getItem("userEmail");
        const storedPassword = localStorage.getItem("userPassword");

        if (email === storedEmail && password === storedPassword) {
            messageElement.textContent = "Login successful!";
            messageElement.style.color = "green";


            // Перенаправляем на главную страницу
            setTimeout(() => {
                window.location.href = "../../index.html";
            }, 1000);
        } else {
            messageElement.textContent = "Invalid email or password";
            messageElement.style.color = "red";
        }
    });
}

// Обработка формы регистрации
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = this.querySelector("#register-name").value;
        const email = this.querySelector("#register-email").value;
        const password = this.querySelector("#register-password").value;
        const confirmPassword = this.querySelector("#register-confirm-password").value;
        const messageElement = this.querySelector(".form-message");

        if (!name || !email || !password || !confirmPassword) {
            messageElement.textContent = "Please fill in all fields";
            messageElement.style.color = "red";
            return;
        }

        if (password !== confirmPassword) {
            messageElement.textContent = "Passwords do not match";
            messageElement.style.color = "red";
            return;
        }

        // Сохранение данных пользователя в localStorage
        localStorage.setItem("userName", name);
        localStorage.setItem("userEmail", email);
        localStorage.setItem("userPassword", password);

        messageElement.textContent = "Registration successful! You can now log in.";
        messageElement.style.color = "green";

        // Сбрасываем форму
        this.reset();

        // Переключаемся на форму логина
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";

        // Активируем кнопку логина
        authToggle.querySelector('[data-form="login"]').classList.add("active");
        authToggle.querySelector('[data-form="register"]').classList.remove("active");
    });
}
