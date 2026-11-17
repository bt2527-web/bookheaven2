
const USERS_KEY = "bookspace-users";
const CURRENT_USER_KEY = "bookspace-current-user";

const loginForm = document.getElementById("account-login-form");
const registerForm = document.getElementById("account-register-form");

const authSection = document.getElementById("auth-section");
const welcomeSection = document.getElementById("account-welcome");

const title = document.getElementById("account-title");
const subtitle = document.getElementById("account-subtitle");
const eyebrow = document.getElementById("account-eyebrow");

const userButton = document.getElementById("user-button");

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
        return Array.isArray(users) ? users : [];
    } catch {
        return [];
    }
}

function getCurrentUser() {
    return sessionStorage.getItem(CURRENT_USER_KEY) || "";
}

function showLoginForm() {
    loginForm.hidden = false;
    registerForm.hidden = true;

    title.textContent = "Вхід";
    subtitle.textContent = "Увійди, щоб продовжити свою книжкову подорож.";
    eyebrow.textContent = "РАДІ ТЕБЕ БАЧИТИ";
}

function showRegisterForm() {
    loginForm.hidden = true;
    registerForm.hidden = false;

    title.textContent = "Реєстрація";
    subtitle.textContent = "Створи акаунт і відкрий для себе більше можливостей.";
    eyebrow.textContent = "СТВОРИ СВІЙ АКАУНТ";
}

function updateAccountView() {
    const currentUser = getCurrentUser();

    if (currentUser) {
        authSection.hidden = true;
        welcomeSection.hidden = false;

        document.getElementById("welcome-name").textContent = currentUser;

        userButton.textContent = "♙ " + currentUser;
    } else {
        authSection.hidden = false;
        welcomeSection.hidden = true;

        userButton.textContent = "♙ Увійти";
        showLoginForm();
    }
}

// ПЕРЕХІД МІЖ ВХОДОМ І РЕЄСТРАЦІЄЮ

document.getElementById("show-register").addEventListener("click", showRegisterForm);
document.getElementById("show-login").addEventListener("click", showLoginForm);

// РЕЄСТРАЦІЯ

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("account-register-name").value.trim();
    const email = document.getElementById("account-register-email").value.trim().toLowerCase();
    const password = document.getElementById("account-register-password").value;
    const confirmPassword = document.getElementById("account-register-confirm").value;

    if (password !== confirmPassword) {
        alert("Паролі не збігаються. Перевір їх і спробуй ще раз.");
        return;
    }

    const users = getUsers();

    if (users.some(user => user.email === email)) {
        alert("Акаунт із такою електронною поштою вже існує.");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    sessionStorage.setItem(CURRENT_USER_KEY, name);

    registerForm.reset();

    alert("Вітаємо, " + name + "! Реєстрація успішна.");

    updateAccountView();
});

// ВХІД

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("account-login-email").value.trim().toLowerCase();
    const password = document.getElementById("account-login-password").value;

    const user = getUsers().find(item =>
        item.email === email && item.password === password
    );

    if (!user) {
        alert("Не вдалося увійти. Перевір електронну пошту та пароль.");
        return;
    }

    sessionStorage.setItem(CURRENT_USER_KEY, user.name);

    loginForm.reset();

    alert("Вітаємо, " + user.name + "!");

    updateAccountView();
});

// ВИХІД

function logoutAccount() {
    sessionStorage.removeItem(CURRENT_USER_KEY);
    alert("Ти вийшла з акаунта.");
    updateAccountView();
}

document.getElementById("account-logout").addEventListener("click", logoutAccount);

userButton.addEventListener("click", function() {
    if (getCurrentUser()) {
        logoutAccount();
    } else {
        showLoginForm();
        loginForm.querySelector("input").focus();
    }
});

// ПОЧАТКОВИЙ СТАН

updateAccountView();
