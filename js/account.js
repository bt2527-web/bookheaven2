
// ==========================================
// BOOK HEAVEN — ОСОБИСТИЙ КАБІНЕТ
// ==========================================

const USERS_KEY = "bookspace-users";
const CURRENT_USER_KEY = "bookspace-current-user";
const CURRENT_EMAIL_KEY = "bookspace-current-email";
const ORDERS_KEY = "bookspace-orders";

// ==========================================
// ЕЛЕМЕНТИ СТОРІНКИ
// ==========================================

const loginForm = document.getElementById("account-login-form");
const registerForm = document.getElementById("account-register-form");

const authSection = document.getElementById("auth-section");
const welcomeSection = document.getElementById("account-welcome");

const title = document.getElementById("account-title");
const subtitle = document.getElementById("account-subtitle");
const eyebrow = document.getElementById("account-eyebrow");

const userButton = document.getElementById("user-button");

// ==========================================
// ОТРИМАННЯ КОРИСТУВАЧІВ
// ==========================================

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
        return Array.isArray(users) ? users : [];
    } catch {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getCurrentUser() {
    const users = getUsers();

    const currentEmail = (
        sessionStorage.getItem(CURRENT_EMAIL_KEY) || ""
    ).toLowerCase();

    if (currentEmail) {
        return users.find(user =>
            (user.email || "").toLowerCase() === currentEmail
        ) || null;
    }

    // ПІДТРИМКА РАНІШЕ СТВОРЕНИХ СЕСІЙ
    const currentName = sessionStorage.getItem(CURRENT_USER_KEY);

    if (currentName) {
        return users.find(user => user.name === currentName) || null;
    }

    return null;
}

// ==========================================
// ПЕРЕХІД МІЖ ВХОДОМ І РЕЄСТРАЦІЄЮ
// ==========================================

function showLoginForm() {
    loginForm.hidden = false;
    registerForm.hidden = true;

    title.textContent = "Вхід";
    subtitle.textContent =
        "Увійди, щоб продовжити свою книжкову подорож.";
    eyebrow.textContent = "РАДІ ТЕБЕ БАЧИТИ";
}

function showRegisterForm() {
    loginForm.hidden = true;
    registerForm.hidden = false;

    title.textContent = "Реєстрація";
    subtitle.textContent =
        "Створи акаунт і відкрий для себе більше можливостей.";
    eyebrow.textContent = "СТВОРИ СВІЙ АКАУНТ";
}

document.getElementById("show-register").addEventListener(
    "click",
    showRegisterForm
);

document.getElementById("show-login").addEventListener(
    "click",
    showLoginForm
);

// ==========================================
// РЕЄСТРАЦІЯ
// ==========================================

registerForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById(
        "account-register-name"
    ).value.trim();

    const email = document.getElementById(
        "account-register-email"
    ).value.trim().toLowerCase();

    const password = document.getElementById(
        "account-register-password"
    ).value;

    const confirmPassword = document.getElementById(
        "account-register-confirm"
    ).value;

    if (password !== confirmPassword) {
        alert("Паролі не збігаються. Перевір їх і спробуй ще раз.");
        return;
    }

    const users = getUsers();

    if (users.some(user =>
        (user.email || "").toLowerCase() === email
    )) {
        alert("Акаунт із такою електронною поштою вже існує.");
        return;
    }

    const newUser = {
        name: name,
        email: email,
        password: password,

        profile: {
            firstName: name,
            lastName: "",
            phone: "",
            city: "",
            address: ""
        }
    };

    users.push(newUser);

    saveUsers(users);

    sessionStorage.setItem(CURRENT_USER_KEY, name);
    sessionStorage.setItem(CURRENT_EMAIL_KEY, email);

    registerForm.reset();

    alert("Вітаємо, " + name + "! Реєстрація успішна.");

    updateAccountView();
});

// ==========================================
// ВХІД
// ==========================================

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById(
        "account-login-email"
    ).value.trim().toLowerCase();

    const password = document.getElementById(
        "account-login-password"
    ).value;

    const user = getUsers().find(item =>
        (item.email || "").toLowerCase() === email &&
        item.password === password
    );

    if (!user) {
        alert("Не вдалося увійти. Перевір електронну пошту та пароль.");
        return;
    }

    sessionStorage.setItem(CURRENT_USER_KEY, user.name);
    sessionStorage.setItem(CURRENT_EMAIL_KEY, user.email);

    loginForm.reset();

    alert("Вітаємо, " + user.name + "!");

    updateAccountView();
});

// ==========================================
// ВІДОБРАЖЕННЯ ОСОБИСТОГО КАБІНЕТУ
// ==========================================

function updateAccountView() {
    const user = getCurrentUser();

    if (user) {
        authSection.hidden = true;
        welcomeSection.hidden = false;

        const profile = user.profile || {};

        document.getElementById("welcome-name").textContent =
            profile.firstName || user.name;

        userButton.textContent = "♙ " + user.name;

        fillProfileForm(user);
        renderAccountOrders(user);

        showAccountTab("profile");

    } else {
        authSection.hidden = false;
        welcomeSection.hidden = true;

        userButton.textContent = "♙ Увійти";

        showLoginForm();
    }
}

// ==========================================
// ПЕРЕХІД МІЖ ВКЛАДКАМИ
// ==========================================

function showAccountTab(tabName) {
    const tabs = document.querySelectorAll(".account-tab");
    const panels = document.querySelectorAll(".account-panel");

    tabs.forEach(tab => {
        const isActive = tab.dataset.accountTab === tabName;
        tab.classList.toggle("active", isActive);
    });

    panels.forEach(panel => {
        const isActive = panel.dataset.accountPanel === tabName;

        panel.classList.toggle("active", isActive);
        panel.hidden = !isActive;
    });
}

document.querySelectorAll(".account-tab").forEach(tab => {
    tab.addEventListener("click", function() {
        showAccountTab(this.dataset.accountTab);
    });
});

// ==========================================
// ЗАПОВНЕННЯ ОСОБИСТИХ ДАНИХ
// ==========================================

function fillProfileForm(user) {
    if (!user.profile) {
        user.profile = {
            firstName: user.name || "",
            lastName: "",
            phone: "",
            city: "",
            address: ""
        };
    }

    const profile = user.profile;

    document.getElementById("profile-first-name").value =
        profile.firstName || user.name || "";

    document.getElementById("profile-last-name").value =
        profile.lastName || "";

    document.getElementById("profile-email").value =
        user.email || "";

    document.getElementById("profile-phone").value =
        profile.phone || "";

    document.getElementById("profile-city").value =
        profile.city || "";

    document.getElementById("profile-address").value =
        profile.address || "";
}

// ==========================================
// ЗБЕРЕЖЕННЯ ОСОБИСТИХ ДАНИХ
// ==========================================

const profileForm = document.getElementById("account-profile-form");

profileForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const user = getCurrentUser();

    if (!user) {
        alert("Спочатку увійди до свого акаунта.");
        return;
    }

    const users = getUsers();

    const userIndex = users.findIndex(item =>
        (item.email || "").toLowerCase() ===
        (user.email || "").toLowerCase()
    );

    if (userIndex === -1) {
        alert("Не вдалося знайти акаунт.");
        return;
    }

    const updatedProfile = {
        firstName: document.getElementById(
            "profile-first-name"
        ).value.trim(),

        lastName: document.getElementById(
            "profile-last-name"
        ).value.trim(),

        phone: document.getElementById(
            "profile-phone"
        ).value.trim(),

        city: document.getElementById(
            "profile-city"
        ).value.trim(),

        address: document.getElementById(
            "profile-address"
        ).value.trim()
    };

    if (!updatedProfile.firstName) {
        alert("Будь ласка, введи своє ім'я.");
        return;
    }

    users[userIndex].profile = updatedProfile;

    // ОНОВЛЮЄМО ІМ'Я КОРИСТУВАЧА
    users[userIndex].name = updatedProfile.firstName;

    saveUsers(users);

    sessionStorage.setItem(
        CURRENT_USER_KEY,
        updatedProfile.firstName
    );

    document.getElementById("welcome-name").textContent =
        updatedProfile.firstName;

    userButton.textContent = "♙ " + updatedProfile.firstName;

    const message = document.getElementById("profile-save-message");

    message.textContent = "✓ Дані успішно збережено!";

    setTimeout(function() {
        message.textContent = "";
    }, 3000);
});

// ==========================================
// ОТРИМАННЯ ЗАМОВЛЕНЬ
// ==========================================

function getOrders() {
    try {
        const orders = JSON.parse(
            localStorage.getItem(ORDERS_KEY) || "[]"
        );

        return Array.isArray(orders) ? orders : [];
    } catch {
        return [];
    }
}

// ==========================================
// ВІДОБРАЖЕННЯ МОЇХ ЗАМОВЛЕНЬ
// ==========================================

function renderAccountOrders(user) {
    const container = document.getElementById("account-orders-list");

    const orders = getOrders();

    const userEmail = (user.email || "").toLowerCase();

    const userOrders = orders.filter(order =>
        (order.email || order.userEmail || "").toLowerCase() === userEmail
    );

    if (userOrders.length === 0) {
        container.innerHTML = `
            <div class="account-orders-empty">
                <div class="account-empty-icon">♡</div>

                <h4>Поки що замовлень немає</h4>

                <p>
                    Саме час знайти свою наступну улюблену книгу!
                </p>

                <a href="catalog.html" class="primary-button">
                    Перейти до каталогу →
                </a>
            </div>
        `;

        return;
    }

    container.innerHTML = userOrders.slice().reverse().map(
        (order, index) => {

            const orderNumber = order.orderNumber ||
                (userOrders.length - index);

            const orderItems = Array.isArray(order.items)
                ? order.items
                : [];

            const itemsHTML = orderItems.length
                ? orderItems.map(item => `
                    <div class="account-order-product">
                        <span>
                            ${escapeAccountText(item.title || "Товар")}
                            ${item.quantity ? " × " + item.quantity : ""}
                        </span>

                        <strong>
                            ${Number(item.subtotal || (
                                Number(item.price || 0) *
                                Number(item.quantity || 1)
                            ))} грн
                        </strong>
                    </div>
                `).join("")
                : `
                    <p class="account-order-old">
                        Товари із замовлення: ${Array.isArray(order.books)
                            ? order.books.length
                            : 0} шт.
                    </p>
                `;

            const total = Number(order.total || 0);

            return `
                <article class="account-order-card">

                    <div class="account-order-top">
                        <div>
                            <span class="account-order-label">
                                ЗАМОВЛЕННЯ
                            </span>

                            <h4>№ ${escapeAccountText(orderNumber)}</h4>
                        </div>

                        <span class="account-order-status">
                            ${escapeAccountText(order.status || "Оформлено")}
                        </span>
                    </div>

                    <p class="account-order-date">
                        Дата: ${escapeAccountText(order.date || "Не вказана")}
                    </p>

                    <div class="account-order-products">
                        ${itemsHTML}
                    </div>

                    <div class="account-order-bottom">
                        <span>Сума замовлення</span>

                        <strong>
                            ${total > 0 ? total + " грн" : "Уточнюється"}
                        </strong>
                    </div>

                </article>
            `;
        }
    ).join("");
}

// ==========================================
// БЕЗПЕЧНЕ ВІДОБРАЖЕННЯ ТЕКСТУ
// ==========================================

function escapeAccountText(value) {
    return String(value ?? "").replace(/[&<>"']/g, function(char) {
        const entities = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return entities[char];
    });
}

// ==========================================
// ВИХІД З АКАУНТА
// ==========================================

function logoutAccount() {
    sessionStorage.removeItem(CURRENT_USER_KEY);
    sessionStorage.removeItem(CURRENT_EMAIL_KEY);

    alert("Ти вийшла з акаунта.");

    updateAccountView();
}

document.getElementById("account-logout").addEventListener(
    "click",
    logoutAccount
);

// ==========================================
// КНОПКА ПРОФІЛЮ В ШАПЦІ
// ==========================================

userButton.addEventListener("click", function() {
    const user = getCurrentUser();

    if (user) {
        // НЕ ВИХОДИМО З АКАУНТА!
        showAccountTab("profile");

        document.getElementById("account-welcome").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } else {
        showLoginForm();

        loginForm.querySelector("input").focus();
    }
});

// ==========================================
// ПОЧАТКОВИЙ СТАН
// ==========================================

updateAccountView();
