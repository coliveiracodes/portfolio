document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('ph-moon', 'ph-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        let targetTheme = 'light';
        
        if (currentTheme !== 'dark') {
            targetTheme = 'dark';
            themeIcon.classList.replace('ph-moon', 'ph-sun');
        } else {
            themeIcon.classList.replace('ph-sun', 'ph-moon');
        }
        
        document.documentElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });

    // Language toggle logic
    const langToggleBtn = document.getElementById('lang-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-pt]');

    // Check for saved language
    let currentLang = localStorage.getItem('lang') || 'PT';
    
    const setLanguage = (lang) => {
        langToggleBtn.innerText = lang;
        elementsToTranslate.forEach(el => {
            if (lang === 'EN') {
                el.innerText = el.getAttribute('data-en');
            } else {
                el.innerText = el.getAttribute('data-pt');
            }
        });
        document.documentElement.lang = lang === 'EN' ? 'en' : 'pt';
    };

    // Initialize with saved language
    setLanguage(currentLang);

    langToggleBtn.addEventListener('click', () => {
        currentLang = currentLang === 'PT' ? 'EN' : 'PT';
        localStorage.setItem('lang', currentLang);
        setLanguage(currentLang);
    });

    // Slogan Typing Effect
    const sloganEl = document.querySelector('.slogan');
    const phrases = [
        { pt: "transformando ideias em realidade", en: "transforming ideas into reality" },
        { pt: "escrevendo código limpo e eficaz", en: "writing clean and effective code" },
        { pt: "criando soluções inovadoras", en: "creating innovative solutions" }
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const langCode = document.documentElement.lang === 'en' ? 'en' : 'pt';
        const currentPhrase = phrases[phraseIndex][langCode];

        if (isDeleting) {
            sloganEl.innerText = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            sloganEl.innerText = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2500; // Pause at end before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before typing next phrase
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Start typing effect slightly after load
    setTimeout(typeEffect, 1000);
});
