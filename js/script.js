
const books = [
    {id:1,title:"Маленький принц",author:"Антуан де Сент-Екзюпері",price:250,type:"new",image:"images/little-prince.jpg"},
    {id:2,title:"Гордість і упередження",author:"Джейн Остін",price:320,type:"new",image:"images/pride.jpg"},
    {id:3,title:"Квіти для Елджернона",author:"Деніел Кіз",price:290,type:"ebook",image:"images/flowers.jpg"},
    {id:4,title:"Таємний сад",author:"Френсіс Бернетт",price:280,type:"ebook",image:"images/secret-garden.jpg"},
    {id:5,title:"Місто",author:"Валер'ян Підмогильний",price:350,type:"new",image:"images/city.jpg"},
    {id:6,title:"Нічний цирк",author:"Ерін Морґенштерн",price:410,type:"ebook",image:"images/night-circus.jpg"},

    {id:7,title:"Історія України. 7 клас",author:"Ігор Щупак, Олена Бурлака, Віталій Дрібниця та співавтори",price:390,type:"education",image:"images/history-7.jpg"},
    {id:8,title:"Українська мова. 10 клас",author:"Олександр Авраменко",price:350,type:"education",image:"images/ukr-mova-10.jpg"},
    {id:9,title:"Математика для чайників",author:"Марко Левченко",price:320,type:"education",image:"images/math-beginners.jpg"},
    {id:10,title:"НМТ-2026. Математика. Типові тестові завдання",author:"Альбіна Гальперіна",price:180,type:"education",image:"images/nmt-2026.jpg"},
    {id:11,title:"Географія. 10 клас",author:"Тетяна Гільберг, Ігор Савчук, Володимир Совенко",price:370,type:"education",image:"images/geography-10.jpg"},

    {id:12,title:"Аліса в Країні див",author:"Льюїс Керрол",price:180,type:"ebook",image:"images/alice-ebook.jpg"},
    {id:13,title:"Вінні-Пух",author:"Алан Александр Мілн",price:160,type:"ebook",image:"images/winnie-pooh-ebook.jpg"},

    {id:14,title:"Різдвяна пісня",author:"Чарльз Діккенс",price:280,type:"seasonal",image:"images/christmas-carol.jpg"},
    {id:15,title:"Листи Різдвяного Діда",author:"Джон Р. Р. Толкін",price:350,type:"seasonal",image:"images/letters-father-christmas.jpg"},
    {id:16,title:"Різдво з червоним кардиналом",author:"Фенні Флеґґ",price:390,type:"seasonal",image:"images/redbird-christmas.jpg"},

    {id:17,title:"The Hobbit",author:"J. R. R. Tolkien",price:420,type:"foreign",language:"en",image:"images/hobbit-en.jpg"},
    {id:18,title:"Alice's Adventures in Wonderland",author:"Lewis Carroll",price:350,type:"foreign",language:"en",image:"images/alice-en.jpg"},
    {id:19,title:"Don Quijote de la Mancha",author:"Miguel de Cervantes",price:450,type:"foreign",language:"es",image:"images/don-quijote.jpg"},
    {id:20,title:"Cien años de soledad",author:"Gabriel García Márquez",price:430,type:"foreign",language:"es",image:"images/cien-anos.jpg"},
    {id:21,title:"Pan Tadeusz",author:"Adam Mickiewicz",price:390,type:"foreign",language:"pl",image:"images/pan-tadeusz.jpg"},
    {id:22,title:"Akademia pana Kleksa",author:"Jan Brzechwa",price:340,type:"foreign",language:"pl",image:"images/akademia-kleksa.jpg"},

    {id:23,title:"Кайдашева сім'я",author:"Іван Нечуй-Левицький",price:300,salePrice:240,type:"sale",language:"uk",image:"images/kaidasheva-simya.jpg"},
    {id:24,title:"Тигролови",author:"Іван Багряний",price:350,salePrice:280,type:"sale",language:"uk",image:"images/tigrolovy.jpg"},
    {id:25,title:"Захар Беркут",author:"Іван Франко",price:320,salePrice:260,type:"sale",language:"uk",image:"images/zahar-berkut.jpg"},
    {id:26,title:"Тіні забутих предків",author:"Михайло Коцюбинський",price:300,salePrice:240,type:"sale",language:"uk",image:"images/tini-zabutykh-predkiv.jpg"},
    {id:27,title:"Інтернат",author:"Сергій Жадан",price:420,salePrice:350,type:"sale",language:"uk",image:"images/internat.jpg"},
    {id:28,title:"Доця",author:"Тамара Горіха Зерня",price:390,salePrice:320,type:"sale",language:"uk",image:"images/dotsya.jpg"},

    {id:29,title:"Моя перша абетка",author:"Олена Коваленко",price:220,type:"paper",language:"uk",image:"images/abetka.jpg"},
    {id:30,title:"Веселі прописи для дошкільнят",author:"Олена Даниленко",price:145,type:"paper",language:"uk",image:"images/propisy.jpg"},
    {id:31,title:"Велика книга українських казок",author:"Збірка авторів",price:340,type:"paper",language:"uk",image:"images/kazky.jpg"},
    {id:32,title:"Улюблені віршики для малят",author:"Наталя Забіла",price:190,type:"paper",language:"uk",image:"images/virshyky.jpg"},
    {id:33,title:"Малюємо, читаємо, вивчаємо літери",author:"Збірка авторів",price:260,type:"paper",language:"uk",image:"images/letters-kids.jpg"},

    {id:34,title:"Зимові історії біля каміна",author:"Збірка авторів",price:120,type:"ebook",section:"seasonal",language:"uk",image:"images/winter-stories.jpg"},
    {id:35,title:"Різдвяні оповідання",author:"Збірка авторів",price:145,type:"ebook",section:"seasonal",language:"uk",image:"images/christmas-stories.jpg"},

    {id:38,title:"English Grammar in Use",author:"Raymond Murphy",price:280,type:"ebook",language:"en",image:"images/english-grammar.jpg"},
    {id:39,title:"Essential Grammar in Use",author:"Raymond Murphy",price:250,type:"ebook",language:"en",image:"images/essential-grammar.jpg"},
    {id:40,title:"English Vocabulary in Use: Elementary",author:"Michael McCarthy, Felicity O'Dell",price:420,type:"foreign",language:"en",image:"images/english-vocabulary.jpg"},
    {id:41,title:"Hurra!!! Po Polsku 1",author:"Agnieszka Małolepsza, Aneta Szymkiewicz",price:390,type:"foreign",language:"pl",image:"images/hurra-polsku.jpg"},
    {id:42,title:"Polski krok po kroku A1",author:"Iwona Stempek та співавтори",price:450,type:"foreign",language:"pl",image:"images/polski-krok.jpg"},

    {id:43,title:"Бухгалтерія для початківців",author:"Навчальне видання",price:160,type:"ebook",language:"uk",image:"images/accounting-beginners.jpg"},
    {id:44,title:"Сад і город: практичний довідник",author:"Навчальне видання",price:140,type:"ebook",language:"uk",image:"images/garden-guide.jpg"},
    {id:45,title:"Домашні тварини: догляд та утримання",author:"Навчальне видання",price:150,type:"ebook",language:"uk",image:"images/pets-care.jpg"},
    {id:46,title:"Основи гістології",author:"Навчальне видання",price:230,type:"ebook",language:"uk",image:"images/histology.jpg"},
    {id:47,title:"Ветеринарна паразитологія",author:"Єрохіна.О.M",price:260,type:"ebook",language:"uk",image:"images/veterinary-parasites.jpg"},
    {id:48,title:"Анатомія та фізіологія свійських тварин",author:"Навчальне видання",price:220,type:"ebook",language:"uk",image:"images/animal-anatomy.jpg"},

    {
        id:49,
        title:"Набір «Сад. Город»",
        author:"Збірка авторів",
        price:1490,
        type:"educational",
        language:"uk",
        isBundle:true,
        bundleCount:5,
        bundleBooks:[
            "Сад і город: практичний довідник",
            "Рослини та їх вирощування",
            "Практичне садівництво",
            "Догляд за плодовими деревами",
            "Овочі на власному городі"
        ],
        image:"images/garden-set.jpg"
    },

    {
        id:50,
        title:"Повна серія «Часодії»",
        author:"Наталія Щерба",
        price:2490,
        type:"new",
        language:"uk",
        isBundle:true,
        bundleCount:6,
        bundleBooks:[
            "Часовий ключ",
            "Часове серце",
            "Часова вежа",
            "Часове ім'я",
            "Часограма",
            "Часова битва"
        ],
        image:"images/chasodii-set.jpg"
    },

    {
        id:51,
        title:"Набір «Іспанська мова»",
        author:"Збірка навчальних видань",
        price:1690,
        type:"educational",
        language:"es",
        isBundle:true,
        bundleCount:5,
        bundleBooks:[
            "Don Quijote de la Mancha — Miguel de Cervantes",
            "Cien años de soledad — Gabriel García Márquez",
            "Іспанська мова для початківців",
            "Іспанська граматика та практичні вправи",
            "Short Stories in Spanish for Beginners"
        ],
        image:"images/spanish-set.jpg"
    }
];


// ==========================================
// ОКРЕМИЙ МАСИВ МЕРЧУ
// ==========================================

const merch = [
    {id:52,title:"Закладка «Квіткова історія»",author:"Book Heaven",price:89,type:"merch",language:"uk",image:"images/merch/zakladka-kvitkova-istoriia.jpg",merchCategory:"Закладки"},
    {id:53,title:"Набір закладок Book Heaven",author:"Book Heaven",price:149,type:"merch",language:"uk",image:"images/merch/nabir-zakladok.jpg",merchCategory:"Закладки"},
    {id:54,title:"Шопер Book Heaven",author:"Book Heaven",price:349,type:"merch",language:"uk",image:"images/merch/shoper-book-heaven.jpg",merchCategory:"Аксесуари"},
    {id:55,title:"Чашка «Час для читання»",author:"Book Heaven",price:279,type:"merch",language:"uk",image:"images/merch/chashka-chas-dlia-chytannia.jpg",merchCategory:"Посуд"},
    {id:56,title:"Блокнот читача",author:"Book Heaven",price:229,type:"merch",language:"uk",image:"images/merch/bloknot-chytacha.jpg",merchCategory:"Канцелярія"},
    {id:57,title:"Набір книжкових наліпок",author:"Book Heaven",price:99,type:"merch",language:"uk",image:"images/merch/knyzhkovi-nalipky.jpg",merchCategory:"Канцелярія"},
    {id:58,title:"Читацький планер",author:"Book Heaven",price:189,type:"merch",language:"uk",image:"images/merch/chytatskyi-planer.jpg",merchCategory:"Канцелярія"},
    {id:59,title:"Подарунковий набір читача",author:"Book Heaven",price:499,type:"merch",language:"uk",image:"images/merch/podarunkovyi-nabir.jpg",merchCategory:"Подарункові набори"}
];


// ==========================================
// ПОШУК ТОВАРУ ЗА ID
// ==========================================

function findProduct(id) {
    return [...books, ...merch].find(
        product => Number(product.id) === Number(id)
    );
}


const CART_KEY = "bookspace-cart";
const FAV_KEY = "bookspace-favorites";

function readArray(key) {
    try {
        const value = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(value) ? value : [];
    } catch {
        return [];
    }
}

let cart = readArray(CART_KEY).map(Number);
let favorites = readArray(FAV_KEY).map(Number);
let currentUser = sessionStorage.getItem("bookspace-current-user") || "";


function safeText(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&":"&amp;",
        "<":"&lt;",
        ">":"&gt;",
        '"':"&quot;",
        "'":"&#039;"
    }[char]));
}

function getBookPrice(book) {
    return Number(book.salePrice || book.price);
}

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCounters();
}

function saveFavorites() {
    localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    updateCounters();
}

function updateCounters() {
    const cartCount = document.getElementById("cart-count");
    const favoritesCount = document.getElementById("favorites-count");

    if (cartCount) cartCount.textContent = cart.length;
    if (favoritesCount) favoritesCount.textContent = favorites.length;
}

function openBook(id) {
    window.location.href = "product.html?id=" + Number(id);
}


// ==========================================
// СТВОРЕННЯ КАРТКИ КНИГИ АБО МЕРЧУ
// ==========================================

function createBookCard(book) {
    const id = Number(book.id);
    const favorite = favorites.includes(id);
    const productLink = `product.html?id=${id}`;
    const isMerch = book.type === "merch";

    const isOnSale = Number(book.salePrice) > 0 &&
                     Number(book.price) > Number(book.salePrice);

    const discount = isOnSale
        ? Math.round((Number(book.price) - Number(book.salePrice)) / Number(book.price) * 100)
        : 0;

    const priceHTML = isOnSale
        ? `
            <div class="book-prices">
                <span class="old-price">${book.price} грн</span>
                <strong class="sale-price">${book.salePrice} грн</strong>
            </div>
        `
        : `<strong>${book.price} грн</strong>`;

    return `
        <article class="book-card ${isOnSale ? "on-sale" : ""} ${book.isBundle ? "bundle-book" : ""} ${isMerch ? "merch-card" : ""}">
            ${isOnSale ? `<span class="sale-badge">−${discount}%</span>` : ""}
            ${book.isBundle ? `<span class="bundle-badge">НАБІР</span>` : ""}

            <div class="book-cover">
                <a href="${productLink}" class="product-card-link">
                    <img
                        src="${safeText(book.image)}"
                        alt="${safeText(book.title)}"
                        onerror="this.style.display='none';this.parentElement.parentElement.classList.add('no-image')"
                    >
                </a>
            </div>

            <div class="book-info">
                <h3>
                    <a href="${productLink}" class="product-card-link">
                        ${safeText(book.title)}
                    </a>
                </h3>

                <p>${safeText(book.author || "Book Heaven")}</p>

                ${isMerch
                    ? `<p>${safeText(book.merchCategory || "Аксесуари")}</p>`
                    : book.isBundle
                        ? `<p class="product-bundle-label">У комплекті ${book.bundleCount} книг</p>`
                        : ""
                }

                ${priceHTML}

                <div class="book-actions">
                    <button onclick="addToCart(${id})">До кошика</button>
                    <button onclick="toggleFavorite(${id})" data-favorite-id="${id}">
                        ${favorite ? "♥ В обраному" : "♡ Обране"}
                    </button>
                    <button onclick="openBook(${id})">Детальніше</button>
                </div>
            </div>
        </article>
    `;
}


// ==========================================
// ОНОВЛЕННЯ СЕРДЕЧОК НА ВСІХ КАРТКАХ
// ==========================================

function refreshFavoriteButtons() {
    document.querySelectorAll("[data-favorite-id]").forEach(button => {
        const id = Number(button.dataset.favoriteId);
        const isFavorite = favorites.includes(id);

        button.textContent = isFavorite ? "♥ В обраному" : "♡ Обране";
    });
}


// ==========================================
// ВІДОБРАЖЕННЯ КНИГ
// ==========================================

function renderBooks() {
    const newBooks = document.getElementById("new-books");
    const ebookBooks = document.getElementById("ebook-books");

    if (newBooks) {
        newBooks.innerHTML = books
            .filter(book => book.type === "new" || book.isBundle === true)
            .map(createBookCard)
            .join("");
    }

    if (ebookBooks) {
        ebookBooks.innerHTML = books
            .filter(book => book.type === "ebook")
            .map(createBookCard)
            .join("");
    }

    const saleBooks = document.getElementById("sale-books");

    if (saleBooks) {
        saleBooks.innerHTML = books
            .filter(book => book.type === "sale")
            .map(createBookCard)
            .join("");
    }

    const seasonalSection = document.getElementById("seasonal");

    if (seasonalSection) {
        const seasonalPanel = seasonalSection.querySelector(".seasonal-panel");
        let seasonalBooksContainer = document.getElementById("seasonal-books");

        if (!seasonalBooksContainer) {
            seasonalBooksContainer = document.createElement("div");
            seasonalBooksContainer.id = "seasonal-books";
            seasonalBooksContainer.className = "book-grid";

            if (seasonalPanel) {
                seasonalPanel.insertAdjacentElement("afterend", seasonalBooksContainer);
            } else {
                seasonalSection.appendChild(seasonalBooksContainer);
            }
        }

        const seasonalBooks = books.filter(book =>
            book.type === "seasonal" || book.section === "seasonal"
        );

        if (seasonalBooks.length > 0) {
            if (seasonalPanel) seasonalPanel.style.display = "none";

            seasonalBooksContainer.innerHTML = seasonalBooks
                .map(createBookCard)
                .join("");
        } else {
            if (seasonalPanel) seasonalPanel.style.display = "";
            seasonalBooksContainer.innerHTML = "";
        }
    }
}

function refreshBooks() {
    renderBooks();
    updateCounters();
    refreshFavoriteButtons();
}


// ==========================================
// ПОШУК
// ==========================================

function searchBooks() {
    const input = document.getElementById("search");
    const output = document.getElementById("search-results");

    if (!input || !output) return;

    const query = input.value.trim().toLocaleLowerCase("uk");

    if (!query) {
        output.innerHTML = "";
        return;
    }

    const found = books.filter(book =>
        book.title.toLocaleLowerCase("uk").includes(query) ||
        book.author.toLocaleLowerCase("uk").includes(query) ||
        (book.bundleBooks || []).some(title =>
            title.toLocaleLowerCase("uk").includes(query)
        )
    );

    output.innerHTML = found.length
        ? found.map(createBookCard).join("")
        : '<p class="empty-message">За цим запитом нічого не знайдено.</p>';
}


// ==========================================
// КОШИК: КНИГИ + МЕРЧ
// ==========================================

function addToCart(id) {
    const product = findProduct(id);

    if (!product) {
        console.error("Товар не знайдено. ID:", id);
        return;
    }

    cart.push(Number(id));
    saveCart();

    alert(`«${product.title}» додано до кошика.`);
}

function removeFromCart(index) {
    if (index < 0 || index >= cart.length) return;

    cart.splice(index, 1);
    saveCart();
    showCart();
}

function showCart() {
    const items = document.getElementById("cart-items");
    const totalElement = document.getElementById("cart-total");

    if (!items || !totalElement) return;

    if (cart.length === 0) {
        items.innerHTML = '<p class="empty-message">Твій кошик поки порожній.</p>';
        totalElement.textContent = "0 грн";
    } else {
        let total = 0;

        items.innerHTML = cart.map((id, index) => {
            const product = findProduct(id);

            if (!product) return "";

            const currentPrice = getBookPrice(product);
            total += currentPrice;

            return `
                <div class="cart-item">
                    <img
                        src="${safeText(product.image)}"
                        alt="${safeText(product.title)}"
                        onerror="this.style.display='none'"
                    >

                    <div>
                        <h3>${safeText(product.title)}</h3>
                        <p>${currentPrice} грн</p>
                    </div>

                    <button onclick="removeFromCart(${index})">
                        Видалити
                    </button>
                </div>
            `;
        }).join("");

        totalElement.textContent = total + " грн";
    }

    openModal("cart-modal");
}

function checkout() {
    if (!cart.length) {
        alert("Спочатку додай до кошика хоча б один товар.");
        return;
    }

    alert("Це демонстраційний сайт. Реальне оформлення та оплата не підключені.");
}


// ==========================================
// ОБРАНЕ: КНИГИ + МЕРЧ
// ==========================================

function toggleFavorite(id) {
    id = Number(id);

    const product = findProduct(id);

    if (!product) {
        console.error("Товар не знайдено. ID:", id);
        return;
    }

    const index = favorites.findIndex(item => Number(item) === id);

    if (index !== -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(id);
    }

    saveFavorites();

    refreshBooks();
    refreshFavoriteButtons();

    if (typeof renderFavoritesPage === "function") {
        renderFavoritesPage();
    }

    const search = document.getElementById("search");

    if (search && search.value.trim()) {
        searchBooks();
    }
}

function showFavorites() {
    const output = document.getElementById("search-results");

    if (!output) return;

    const chosen = [...books, ...merch].filter(product =>
        favorites.includes(Number(product.id))
    );

    output.innerHTML = chosen.length
        ? '<div class="favorites-heading"><h2>Обрані товари</h2></div>' +
          chosen.map(createBookCard).join("")
        : '<p class="empty-message">Тут поки немає обраних товарів. Натискай ♡ біля товару, щоб зберегти його.</p>';

    const catalog = document.getElementById("catalog");

    if (catalog) {
        catalog.scrollIntoView({behavior:"smooth"});
    }
}


// ==========================================
// МОДАЛЬНІ ВІКНА
// ==========================================

function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("open");
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("open");
}


// ==========================================
// АВТОРИЗАЦІЯ
// ==========================================

function openLogin() {
    window.location.href = "account.html";
}

function showLogin() {
    window.location.href = "account.html";
}

function showRegister() {
    window.location.href = "account.html?mode=register";
}

function getUsers() {
    try {
        const users = JSON.parse(localStorage.getItem("bookspace-users") || "[]");
        return Array.isArray(users) ? users : [];
    } catch {
        return [];
    }
}

function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("register-name").value.trim();
    const email = document.getElementById("register-email").value.trim().toLowerCase();
    const password = document.getElementById("register-password").value;

    const users = getUsers();

    if (users.some(user => user.email === email)) {
        alert("Акаунт із такою електронною поштою вже існує.");
        return;
    }

    users.push({name, email, password});
    localStorage.setItem("bookspace-users", JSON.stringify(users));

    currentUser = name;
    sessionStorage.setItem("bookspace-current-user", name);

    updateUserButton();
    closeModal("login-modal");
    alert(`Вітаємо, ${name}! Реєстрація успішна.`);
}

function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim().toLowerCase();
    const password = document.getElementById("login-password").value;

    const user = getUsers().find(item =>
        item.email === email && item.password === password
    );

    if (!user) {
        alert("Не вдалося увійти. Перевір електронну пошту та пароль.");
        return;
    }

    currentUser = user.name;
    sessionStorage.setItem("bookspace-current-user", user.name);

    updateUserButton();
    closeModal("login-modal");
    alert(`Вітаємо, ${user.name}!`);
}

function updateUserButton() {
    const button = document.getElementById("user-button");

    if (!button) return;

    if (currentUser) {
        button.textContent = "♙ " + currentUser;
        button.onclick = logoutUser;
    } else {
        button.textContent = "♙ Увійти";
        button.onclick = function() {
            window.location.href = "account.html";
        };
    }
}

function logoutUser() {
    currentUser = "";
    sessionStorage.removeItem("bookspace-current-user");
    updateUserButton();
    alert("Ти вийшла з акаунта.");
}


// ==========================================
// ЗАПУСК ПІСЛЯ ЗАВАНТАЖЕННЯ СТОРІНКИ
// ==========================================

document.addEventListener("DOMContentLoaded", function() {
    refreshBooks();
    updateUserButton();

    const search = document.getElementById("search");

    if (search) {
        search.addEventListener("keydown", function(event) {
            if (event.key === "Enter") searchBooks();
        });
    }

    document.querySelectorAll(".modal").forEach(modal => {
        modal.addEventListener("click", function(event) {
            if (event.target === modal) modal.classList.remove("open");
        });
    });

    document.addEventListener("keydown", function(event) {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal.open").forEach(modal => modal.classList.remove("open"));
        }
    });
});
