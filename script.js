// Get the theme toggle button and load the current theme from localStorage
const themeToggleButton = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'light';

// Set the theme based on localStorage or default to 'light'
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Change the button icon based on the theme
    const icon = theme === 'dark' ? 'brightness_7' : 'brightness_4'; // Switch icon depending on the theme
    themeToggleButton.querySelector('i').textContent = icon;
}

// Initial theme setup based on currentTheme value
setTheme(currentTheme);

// Add event listener to the button to toggle the theme when clicked
themeToggleButton.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark'; // Toggle theme
    setTheme(currentTheme); // Apply the theme
});


// Initialize theme on page load
setTheme(currentTheme);

// Event listener to toggle theme on button click
themeToggleButton.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Load language file and apply translations
async function loadLanguage(lang) {
    try {
        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error('Failed to load language file');
        const translations = await response.json();
        
        // Apply translations to elements with data-translate attributes
        document.querySelectorAll('[data-translate]').forEach((element) => {
            const key = element.getAttribute('data-translate');
            if (translations[key]) {
                if (element.placeholder !== undefined) {
                    element.placeholder = translations[key];
                } else {
                    element.textContent = translations[key];
                }
            }
        });
    } catch (error) {
        console.error("Error loading language:", error);
    }
}

// Initialize i18next for language translation
i18next
    .use(i18nextBrowserLanguageDetector)
    .use(i18nextHttpBackend)
    .init({
        fallbackLng: 'en',
        backend: {
            loadPath: '/locales/{{lng}}.json'  // Ensure you have en.json, nl.json, etc.
        }
    }, function(err, t) {
        updateContent();
    });

// Event listener for language selection
document.getElementById("language-select").addEventListener("change", (e) => {
    const selectedLang = e.target.value;
    i18next.changeLanguage(selectedLang, updateContent);
});

// Update content based on the selected language
function updateContent() {
    document.querySelectorAll("[data-translate]").forEach((element) => {
        const key = element.getAttribute("data-translate");
        element.textContent = i18next.t(key);
    });
    document.getElementById("search-box").placeholder = i18next.t('search_placeholder');
}

// Font resizing functionality
function changeFontSize(action) {
    let root = document.documentElement;
    let currentSize = parseFloat(getComputedStyle(root).getPropertyValue("--font-size"));
    root.style.setProperty("--font-size", action === 'increase' ? `${currentSize * 1.1}px` : `${currentSize / 1.1}px`);
}

// Set up font resizing buttons
document.getElementById("increase-font").addEventListener("click", () => changeFontSize("increase"));
document.getElementById("decrease-font").addEventListener("click", () => changeFontSize("decrease"));
