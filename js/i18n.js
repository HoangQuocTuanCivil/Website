document.addEventListener('DOMContentLoaded', () => {
    // Check locally saved language, default to VI
    const currentLang = localStorage.getItem('site_lang') || 'vi';
    
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
    
    // Custom Dropdown Logic
    const langSelector = document.getElementById('customLangSelector');
    const langCurrent = document.getElementById('langCurrent');
    const langOptions = document.getElementById('langOptions');
    const langOptionItems = document.querySelectorAll('.lang-option');
    const currentFlag = document.getElementById('currentFlag');
    const currentLangText = document.getElementById('currentLangText');

    if (langSelector && currentFlag && currentLangText) {
        // Set initial flag based on currentLang
        const initOption = document.querySelector(`.lang-option[data-value="${currentLang}"]`);
        if (initOption) {
            const flagSrc = initOption.querySelector('img').src;
            const text = initOption.textContent.trim();
            currentFlag.src = flagSrc;
            currentLangText.textContent = text;
        }

        langCurrent.addEventListener('click', (e) => {
            e.stopPropagation();
            langOptions.classList.toggle('show');
        });

        langOptionItems.forEach(item => {
            item.addEventListener('click', () => {
                const selectedLang = item.getAttribute('data-value');
                const flagSrc = item.querySelector('img').src;
                const text = item.textContent.trim();

                // Update UI
                currentFlag.src = flagSrc;
                currentLangText.textContent = text;
                langOptions.classList.remove('show');

                // Apply Language
                localStorage.setItem('site_lang', selectedLang);
                updateLanguage(selectedLang);
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (langOptions.classList.contains('show')) {
                langOptions.classList.remove('show');
            }
        });
    }
});
