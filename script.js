// Placeholder for future scripts, like project filtering or theme switcher
console.log("Welcome to Gabriel's Portfolio");

// Get the theme toggle button and retrieve the current theme from localStorage
const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set the initial theme based on localStorage or default to 'light'
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    themeToggleButton.textContent = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
};

// Initialize theme on page load
setTheme(currentTheme);

// Event listener to toggle theme on button click
themeToggleButton.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});
