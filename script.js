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

const galleryContainer = document.getElementById('gallery');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalBadge = document.getElementById('modal-badge');
const closeBtn = document.querySelector('.close-btn');

// 2. Функция создания карточек
function renderGallery() {
    galleryData.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        // Создаем случайный URL картинки. В реальном проекте используйте свои пути к файлам.
        // Используем сервис Unsplash Source для демо
        const imgUrl = `https://source.unsplash.com/600x400/?${item.keywords},industrial&sig=${item.id}`;

        card.innerHTML = `
            <div class="card-image-wrapper">
                <img src="${imgUrl}" loading="lazy" alt="${item.title}"> 
            </div>
            <div class="card-info">
                <div class="card-category">${item.category}</div>
                <h3 class="card-title">${item.title}</h3>
            </div>
        `;

        const imgUrl = `images/${item.keywords}.png`; 

        // 3. Обработчик клика (открытие модального окна)
        card.addEventListener('click', () => {
            openModal(item, imgElement.src);
        });

        galleryContainer.appendChild(card);
    });
}

// 4. Логика Модального окна
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
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку фона
}

function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Возвращаем прокрутку
}

// События закрытия
closeBtn.addEventListener('click', closeModal);

window.addEventListener('click', (e) => {
    if (e.target == modal) {
        closeModal();
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// Запуск
document.addEventListener('DOMContentLoaded', renderGallery);

document.addEventListener('DOMContentLoaded', () => {
    // 1. Получаем элементы
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    // 2. Добавляем обработчик клика на иконку
    menuToggle.addEventListener('click', () => {
        // Переключаем класс 'active' для списка ссылок
        navMenu.classList.toggle('active');
        
        // По желанию, можно добавить класс для анимации самой иконки бургера
        menuToggle.classList.toggle('is-open'); 
    });
    
    // --- Дополнительно: Закрытие модального окна (ваш код для галереи) ---
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.close-btn');

    // Функция закрытия модального окна
    const closeModal = () => {
        modal.classList.remove('show');
        // Добавьте задержку, чтобы анимация успела отработать, затем скрывайте display: none
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    };

    closeBtn.addEventListener('click', closeModal);

    // Закрытие при клике вне контента модального окна
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    // Закрытие по клавише ESC
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });

    // --- Ваш существующий или будущий код для открытия галереи должен быть здесь ---
    // Здесь вы добавите код, который ищет карточки и вызывает modal.classList.add('show');
});

