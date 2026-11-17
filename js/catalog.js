
// ==========================================
// КАТАЛОГ BOOK HEAVEN: КНИГИ ТА МЕРЧ
// ==========================================

// ДАНІ ДЛЯ ФІЛЬТРАЦІЇ КНИГ
const catalogMeta = {
    1: { category: "children", publisher: "А-БА-БА-ГА-ЛА-МА-ГА" },
    2: { category: "fiction", publisher: "КСД" },
    3: { category: "fiction", publisher: "Vivat" },
    4: { category: "children", publisher: "Ранок" },
    5: { category: "fiction", publisher: "Vivat" },
    6: { category: "fiction", publisher: "КСД" },
    7: { category: "education", publisher: "Оріон" },
    8: { category: "education", publisher: "Грамота" },
    9: { category: "education", publisher: "" },
    10: { category: "education", publisher: "Літера ЛТД" },
    11: { category: "education", publisher: "Оріон" },
    12: { category: "children", publisher: "" },
    13: { category: "children", publisher: "" },
    14: { category: "fiction", publisher: "" },
    15: { category: "fiction", publisher: "" },
    16: { category: "fiction", publisher: "" },
    17: { category: "foreign", publisher: "" },
    18: { category: "foreign", publisher: "" },
    19: { category: "foreign", publisher: "" },
    20: { category: "foreign", publisher: "" },
    21: { category: "foreign", publisher: "" },
    22: { category: "foreign", publisher: "" },
    23: { category: "fiction", publisher: "" },
    24: { category: "fiction", publisher: "" },
    25: { category: "fiction", publisher: "" },
    26: { category: "fiction", publisher: "" },
    27: { category: "fiction", publisher: "" },
    28: { category: "fiction", publisher: "" },
    29: { category: "children", publisher: "Ранок" },
    30: { category: "children", publisher: "Школа" },
    31: { category: "children", publisher: "А-БА-БА-ГА-ЛА-МА-ГА" },
    32: { category: "children", publisher: "Видавництво Старого Лева" },
    33: { category: "children", publisher: "Ранок" },
    34: { category: "fiction", publisher: "Vivat" },
    35: { category: "fiction", publisher: "КСД" },
    36: { category: "fiction", publisher: "Видавництво Старого Лева" },
    37: { category: "fiction", publisher: "Vivat" },
    38: { category: "foreign", education: true, publisher: "Cambridge University Press" },
    39: { category: "foreign", education: true, publisher: "Cambridge University Press" },
    40: { category: "foreign", education: true, publisher: "Cambridge University Press" },
    41: { category: "foreign", education: true, publisher: "Universitas" },
    42: { category: "foreign", education: true, publisher: "Preston Publishing" },
    43: { category: "education", publisher: "Фоліо" },
    44: { category: "education", publisher: "Видавничий дім «Професіонал»" },
    45: { category: "education", publisher: "КМ-БУКС" },
    46: { category: "education", publisher: "Elsevier" },
    47: { category: "education", publisher: "Wiley-Blackwell" },
    48: { category: "education", publisher: "Elsevier" },
    49: { category: "education", isSet: true, publisher: "" },
    50: { category: "sets", isSet: true, publisher: "" },
    51: { category: "foreign", education: true, isSet: true, publisher: "" }
};


// ==========================================
// ОПИСИ МЕРЧУ
// ==========================================

const merchDescriptions = {
    52: "Ніжна книжкова закладка з квітковим дизайном",
    53: "Набір із трьох стильних закладок для читання",
    54: "Тканинна сумка для книг і щоденних покупок",
    55: "Керамічна чашка для затишних читацьких вечорів",
    56: "Блокнот для записів, цитат і книжкових вражень",
    57: "Декоративні наліпки для блокнотів і планерів",
    58: "Планер для списку книг і читацьких цілей",
    59: "Книжковий подарунок для справжніх поціновувачів читання"
};


// ==========================================
// ОКРЕМИЙ МАСИВ МЕРЧУ
// ==========================================

const merchProducts = merch.map(product => ({
    ...product,
    category: product.merchCategory || "Аксесуари",
    description: merchDescriptions[product.id] || "Аксесуар Book Heaven"
}));


// ==========================================
// СТАН КАТАЛОГУ
// ==========================================

let activeCategory = "all";

const catalogParams = new URLSearchParams(window.location.search);

let activeProductType =
    catalogParams.get("type") === "merch"
        ? "merch"
        : "books";


// ==========================================
// ДОПОМІЖНІ ФУНКЦІЇ
// ==========================================

function getSelectedValues(className) {
    return Array.from(
        document.querySelectorAll("." + className + ":checked")
    ).map(input => input.value);
}

function escapeCatalogText(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[character]);
}

function getCatalogPrice(book) {
    return Number(book.salePrice || book.price);
}

function openCatalogBook(id) {
    window.location.href = "product.html?id=" + Number(id);
}


// ==========================================
// СКИДАННЯ ВСІХ ФІЛЬТРІВ
// ==========================================

function resetCatalogFilters() {

    // Скидаємо всі прапорці фільтрів
    document.querySelectorAll(
        ".format-filter, .publisher-filter, .language-filter"
    ).forEach(input => {
        input.checked = false;
    });

    // Очищаємо пошук за автором
    const authorInput = document.getElementById("author-search");
    if (authorInput) {
        authorInput.value = "";
    }

    // Очищаємо пошук за назвою
    const searchInput = document.getElementById("catalog-search");
    if (searchInput) {
        searchInput.value = "";
    }

    // Скидаємо ціну
    const minInput = document.getElementById("price-min");
    const maxInput = document.getElementById("price-max");

    if (minInput) minInput.value = "";
    if (maxInput) maxInput.value = "";

    // Повертаємо категорію "Усі"
    activeCategory = "all";

    // Оновлюємо активну вкладку
    if (activeProductType === "books") {
        updateActiveCategoryTab("all");
    } else {
        updateActiveCategoryTab("merch");
    }

    // Повторно відображаємо каталог
    renderCatalog();
}


// ==========================================
// ОНОВЛЕННЯ ТИПУ ТОВАРІВ
// ==========================================

function updateProductType() {
    const categoryTabs = document.querySelector(".category-tabs");

    if (categoryTabs) {
        categoryTabs.style.display = "";
    }

    const heading = document.querySelector(
        ".catalog-main h1, .catalog-main h2"
    );

    if (heading) {
        heading.textContent =
            activeProductType === "merch"
                ? "Книжковий мерч"
                : "Каталог книг";
    }

    updateBookFilters();
}


// ==========================================
// ПРИХОВУВАННЯ КНИЖКОВИХ ФІЛЬТРІВ
// ==========================================

function updateBookFilters() {
    const filters = document.querySelector(".filters");

    if (!filters) return;

    filters.querySelectorAll(".filter-section").forEach(section => {
        const text = section.textContent.toLowerCase();

        const isBookFilter =
            text.includes("формат") ||
            text.includes("автор") ||
            text.includes("мова") ||
            text.includes("видавництво");

        if (isBookFilter) {
            section.style.display =
                activeProductType === "merch" ? "none" : "";
        }
    });
}


// ==========================================
// КАРТКА МЕРЧУ
// ==========================================

function renderMerchCard(product) {
    const id = Number(product.id);

    const isFavorite =
        typeof favorites !== "undefined" &&
        favorites.includes(id);

    return `
        <article class="catalog-book merch-product">

            <h3>
                <a href="product.html?id=${id}" class="product-card-link">
                    ${escapeCatalogText(product.title)}
                </a>
            </h3>

            <p>${escapeCatalogText(product.description)}</p>

            <p>${escapeCatalogText(product.category)}</p>

            <div class="book-price">
                ${escapeCatalogText(product.price)} грн
            </div>

            <div class="catalog-book-buttons">

                <button
                    class="add-button"
                    onclick="addToCart(${id})"
                >
                    У кошик
                </button>

                <button
                    onclick="toggleFavorite(${id})"
                    title="Додати в обране"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>

                <button
                    onclick="openCatalogBook(${id})"
                    title="Детальніше"
                >
                    ℹ
                </button>

            </div>
        </article>
    `;
}


// ==========================================
// ФІЛЬТРАЦІЯ МЕРЧУ
// ==========================================

function getFilteredMerch() {
    const minInput = document.getElementById("price-min");
    const maxInput = document.getElementById("price-max");
    const searchInput = document.getElementById("catalog-search");

    const minPrice = minInput && minInput.value !== ""
        ? Number(minInput.value)
        : 0;

    const maxPrice = maxInput && maxInput.value !== ""
        ? Number(maxInput.value)
        : Infinity;

    const searchText = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    return merchProducts.filter(product => {
        const matchesPrice =
            Number(product.price) >= minPrice &&
            Number(product.price) <= maxPrice;

        const matchesSearch =
            !searchText ||
            product.title.toLowerCase().includes(searchText) ||
            product.description.toLowerCase().includes(searchText);

        return matchesPrice && matchesSearch;
    });
}

function renderMerch() {
    const container = document.getElementById("catalog-books");

    if (!container) return;

    const filteredMerch = getFilteredMerch();

    if (filteredMerch.length === 0) {
        container.innerHTML =
            '<p class="empty-catalog">Товарів не знайдено. Спробуй змінити фільтри.</p>';
        return;
    }

    container.innerHTML = filteredMerch
        .map(renderMerchCard)
        .join("");
}


// ==========================================
// ФІЛЬТРАЦІЯ КНИГ
// ==========================================

function getFilteredBooks() {
    const authorInput = document.getElementById("author-search");
    const minInput = document.getElementById("price-min");
    const maxInput = document.getElementById("price-max");
    const searchInput = document.getElementById("catalog-search");

    const authorSearch = authorInput
        ? authorInput.value.trim().toLowerCase()
        : "";

    const searchText = searchInput
        ? searchInput.value.trim().toLowerCase()
        : "";

    const minPrice = minInput && minInput.value !== ""
        ? Number(minInput.value)
        : 0;

    const maxPrice = maxInput && maxInput.value !== ""
        ? Number(maxInput.value)
        : Infinity;

    const selectedFormats = getSelectedValues("format-filter");
    const selectedPublishers = getSelectedValues("publisher-filter");
    const selectedLanguages = getSelectedValues("language-filter");

    return books.filter(book => {
        const meta = catalogMeta[book.id] || {
            category: "fiction",
            publisher: ""
        };

        const isEbook = book.type === "ebook";
        const format = isEbook ? "ebook" : "paper";

        const isForeignLiterature = meta.category === "foreign";
        const isForeignEducation = meta.education === true;

        const matchesCategory =
            activeCategory === "all" ||
            meta.category === activeCategory ||
            (activeCategory === "sets" && meta.isSet === true) ||
            (activeCategory === "education" && isForeignEducation) ||
            (
                activeCategory === "fiction" &&
                isForeignLiterature &&
                !isForeignEducation
            );

        const matchesAuthor =
            (book.author || "").toLowerCase().includes(authorSearch);

        const matchesSearch =
            !searchText ||
            book.title.toLowerCase().includes(searchText) ||
            (book.author || "").toLowerCase().includes(searchText);

        const matchesFormat =
            selectedFormats.length === 0 ||
            selectedFormats.includes(format);

        const matchesPublisher =
            selectedPublishers.length === 0 ||
            selectedPublishers.includes(meta.publisher);

        const currentPrice = getCatalogPrice(book);

        const matchesPrice =
            currentPrice >= minPrice &&
            currentPrice <= maxPrice;

        const matchesLanguage =
            selectedLanguages.length === 0 ||
            selectedLanguages.includes(book.language || "uk");

        return matchesCategory &&
            matchesAuthor &&
            matchesSearch &&
            matchesFormat &&
            matchesPublisher &&
            matchesPrice &&
            matchesLanguage;
    });
}


// ==========================================
// КАРТКА КНИГИ
// ==========================================

function renderCatalogBookCard(book) {
    const isOnSale =
        book.salePrice !== undefined &&
        book.salePrice !== null &&
        Number(book.salePrice) < Number(book.price);

    const isBundle = book.isBundle === true;
    const id = Number(book.id);

    const isFavorite =
        typeof favorites !== "undefined" &&
        favorites.includes(id);

    const productLink = "product.html?id=" + id;

    const languageNames = {
        uk: "Українська",
        en: "Англійська",
        es: "Іспанська",
        pl: "Польська"
    };

    const priceHTML = isOnSale
        ? `
            <div class="book-prices">
                <span class="old-price">
                    ${escapeCatalogText(book.price)} грн
                </span>
                <span class="sale-price">
                    ${escapeCatalogText(book.salePrice)} грн
                </span>
            </div>
        `
        : `
            <div class="book-price">
                ${escapeCatalogText(book.price)} грн
            </div>
        `;

    return `
        <article class="catalog-book ${isOnSale ? "on-sale" : ""} ${isBundle ? "bundle-book" : ""}">

            <a href="${productLink}" class="product-card-link">
                <img
                    src="${escapeCatalogText(book.image)}"
                    alt="${escapeCatalogText(book.title)}"
                    onerror="this.style.display='none'"
                >
            </a>

            ${isBundle ? `
                <span class="bundle-badge">КОМПЛЕКТ КНИГ</span>
            ` : ""}

            ${isOnSale ? `
                <span class="sale-badge">
                    −${Math.round(
                        (Number(book.price) - Number(book.salePrice)) /
                        Number(book.price) * 100
                    )}%
                </span>
            ` : ""}

            <h3>
                <a href="${productLink}" class="product-card-link">
                    ${escapeCatalogText(book.title)}
                </a>
            </h3>

            <p>${escapeCatalogText(book.author)}</p>

            <p>
                ${isBundle
                    ? "Книжковий набір"
                    : book.type === "ebook"
                        ? "Електронна книга"
                        : "Паперова книга"}
            </p>

            <p>
                Мова: ${languageNames[book.language || "uk"] || "Українська"}
            </p>

            ${priceHTML}

            <div class="catalog-book-buttons">

                <button
                    class="add-button"
                    onclick="addToCart(${id})"
                >
                    У кошик
                </button>

                <button
                    onclick="toggleFavorite(${id})"
                    title="Додати в обране"
                >
                    ${isFavorite ? "♥" : "♡"}
                </button>

                <button
                    onclick="openCatalogBook(${id})"
                    title="Детальніше"
                >
                    ℹ
                </button>

            </div>
        </article>
    `;
}


// ==========================================
// ВІДОБРАЖЕННЯ КНИЖКОВОГО КАТАЛОГУ
// ==========================================

function renderBooks() {
    const container = document.getElementById("catalog-books");

    if (!container) return;

    const filteredBooks = getFilteredBooks();

    if (filteredBooks.length === 0) {
        container.innerHTML =
            '<p class="empty-catalog">За цими параметрами книг не знайдено. Спробуй змінити фільтри.</p>';
        return;
    }

    container.innerHTML = filteredBooks
        .map(renderCatalogBookCard)
        .join("");
}


// ==========================================
// ОНОВЛЕННЯ КАТАЛОГУ
// ==========================================

function renderCatalog() {
    if (activeProductType === "merch") {
        renderMerch();
    } else {
        renderBooks();
    }
}


// ==========================================
// ОНОВЛЕННЯ АКТИВНОЇ КАТЕГОРІЇ
// ==========================================

function updateActiveCategoryTab(category) {
    document.querySelectorAll(".category-tab").forEach(tab => {
        tab.classList.toggle(
            "active",
            tab.dataset.category === category
        );
    });
}


// ==========================================
// ПЕРЕМИКАННЯ КАТЕГОРІЙ
// ==========================================

function initializeCategoryTabs() {
    document.querySelectorAll(".category-tab").forEach(button => {
        button.addEventListener("click", () => {
            const category = button.dataset.category;

            if (category === "merch") {
                activeProductType = "merch";
                activeCategory = "all";

                const url = new URL(window.location.href);
                url.searchParams.set("type", "merch");
                window.history.replaceState({}, "", url);

                updateActiveCategoryTab("merch");
                updateProductType();
                renderCatalog();
                return;
            }

            activeCategory = category;
            activeProductType = "books";

            const url = new URL(window.location.href);
            url.searchParams.set("type", "books");
            window.history.replaceState({}, "", url);

            updateActiveCategoryTab(category);
            updateProductType();
            renderCatalog();
        });
    });
}


// ==========================================
// ОНОВЛЕННЯ ПРИ ЗМІНІ ФІЛЬТРІВ
// ==========================================

function initializeCatalogFilters() {
    document.querySelectorAll(
        ".format-filter, .publisher-filter, .language-filter, #author-search, #price-min, #price-max, #catalog-search"
    ).forEach(control => {
        control.addEventListener("input", renderCatalog);
        control.addEventListener("change", renderCatalog);
    });

    // Кнопка скидання фільтрів
    const resetButton = document.getElementById("reset-filters");

    if (resetButton) {
        resetButton.addEventListener("click", resetCatalogFilters);
    }
}


// ==========================================
// ЗАПУСК КАТАЛОГУ
// ==========================================

function initializeCatalog() {
    initializeCategoryTabs();
    initializeCatalogFilters();

    updateProductType();

    if (activeProductType === "merch") {
        updateActiveCategoryTab("merch");
    } else {
        updateActiveCategoryTab("all");
    }

    renderCatalog();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeCatalog);
} else {
    initializeCatalog();
}
