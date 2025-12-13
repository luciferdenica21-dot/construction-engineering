// 1. Данные для галереи
const galleryData = [
    { id: 1, title: "Лазерная установка CO2", category: "Лазерная резка", keywords: "laser-cutting-machine" },
    { id: 2, title: "Роботизированная сварка", category: "Сварка", keywords: "welding-robot" },
    { id: 3, title: "Фрезерный станок ЧПУ", category: "ЧПУ Обработка", keywords: "cnc-milling" },
    { id: 4, title: "Плазменный резак", category: "Плазменная резка", keywords: "plasma-cutter" },
    { id: 5, title: "Инженерный контроль", category: "Инжиниринг", keywords: "engineer-tablet" },
    { id: 6, title: "Токарная обработка", category: "Токарные работы", keywords: "lathe-metal" },
    { id: 7, title: "Сварка TIG", category: "Ручная сварка", keywords: "tig-welding" },
    { id: 8, title: "3D Печать металлом", category: "Аддитивные технологии", keywords: "3d-printing-metal" },
    { id: 9, title: "Гидравлический пресс", category: "Штамповка", keywords: "hydraulic-press" },
    { id: 10, title: "Лазерная гравировка", category: "Маркировка", keywords: "laser-engraving" },
    { id: 11, title: "Сборочная линия", category: "Производство", keywords: "assembly-line" },
    { id: 12, title: "Шлифовка деталей", category: "Финишная обработка", keywords: "metal-grinding" },
];

// Получение элементов DOM
const galleryContainer = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalBadge = document.getElementById('modal-badge');
const closeBtn = document.querySelector('.close-btn');

// --- ЛОГИКА МОДАЛЬНОГО ОКНА ---

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Возвращаем прокрутку
    // Скрываем после анимации
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function openModal(item, currentImageSrc) {
    modalImg.src = currentImageSrc; 
    modalTitle.textContent = item.title;
    modalBadge.textContent = item.category;
    
    // Генерируем описание
    modalDesc.innerHTML = `
        Это высокотехнологичное оборудование категории <b>"${item.category}"</b>.<br><br>
        Идеально подходит для выполнения сложных производственных задач. 
        Включает в себя современные системы управления и обеспечивает высокую точность 
        (до 0.01 мм). <br><br>
        <i>ID товара: #${item.id} | Статус: В наличии</i>
    `;
    
    modal.style.display = 'flex'; // Показываем модальное окно
    // Небольшая задержка для корректного запуска transition
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
}


// --- ЛОГИКА ГАЛЕРЕИ ---

function renderGallery() {
    galleryData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Путь к изображению
        const imgUrl = `images/${item.keywords}.png`; 

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${imgUrl}" loading="lazy" alt="${item.title}"> 
            </div>
            <div class="card-info">
                <div class="card-category">${item.category}</div>
                <h3 class="card-title">${item.title}</h3>
            </div>
        `;

        const imgElement = card.querySelector('img');

        // Обработчик клика (открытие модального окна)
        card.addEventListener('click', () => {
            openModal(item, imgElement.src);
        });

        galleryContainer.appendChild(card);
    });
}


// --- ЗАПУСК ВСЕХ ОБРАБОТЧИКОВ ПОСЛЕ ЗАГРУЗКИ DOM ---

document.addEventListener('DOMContentLoaded', () => {
    // 1. Запуск рендеринга галереи
    renderGallery();

    // 2. Обработчики закрытия модального окна
    closeBtn.addEventListener('click', closeModal);

    // Закрытие по клику вне модального окна
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Закрытие по клавише Escape
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
});



