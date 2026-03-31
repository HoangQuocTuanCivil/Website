document.addEventListener('DOMContentLoaded', () => {
    const langDropdown = document.getElementById('langDropdown');
    
    // Check locally saved language, default to VI
    const currentLang = localStorage.getItem('site_lang') || 'vi';
    langDropdown.value = currentLang;
    
    // Apply Language Function
    const updateLanguage = (lang) => {
        const dictionary = locales[lang];
        if (!dictionary) return;
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (dictionary[key]) {
                if(el.tagName === 'TITLE') {
                    document.title = dictionary[key];
                } else {
                    el.innerHTML = dictionary[key];
                }
            }
        });
        
        // Update html lang attribute
        document.documentElement.setAttribute('lang', lang);
    };

    // Initial Apply
    updateLanguage(currentLang);
    
    // Listen for changes
    langDropdown.addEventListener('change', (e) => {
        const selectedLang = e.target.value;
        localStorage.setItem('site_lang', selectedLang);
        updateLanguage(selectedLang);
    });
});
