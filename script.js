   document.addEventListener('DOMContentLoaded', () => {
    const storyText = document.getElementById('story-text');
    const scaryBtn = document.getElementById('scary-btn');
    const hiddenMessage = document.getElementById('hidden-message');
    const eyes = document.getElementById('eyes');
    const pupils = document.querySelectorAll('.pupil'); // Добавим зрачки динамически
    const body = document.body;
    const pulseRing = document.querySelector('.pulse-ring');

    // Создаем зрачки внутри глаз
    document.querySelectorAll('.eye').forEach(eye => {
        const pupil = document.createElement('div');
        pupil.classList.add('pupil');
        eye.appendChild(pupil);
    });
    
    const allPupils = document.querySelectorAll('.pupil');

    // Фразы для печати
    const phrases = [
        "Здесь так тихо...",
        "Ты чувствуешь, что за тобой наблюдают?",
        "Не оборачивайся.",
        "Они уже близко...",
        "Беги."
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    // Функция эффекта печатной машинки
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (!isDeleting && charIndex <= currentPhrase.length) {
            storyText.textContent = currentPhrase.substring(0, charIndex);
            charIndex++;
            setTimeout(typeWriter, Math.random() * 100 + 50); // Случайная скорость
        } else if (!isDeleting && charIndex > currentPhrase.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1000); // Пауза перед удалением
        } else if (isDeleting && charIndex >= 0) {
            storyText.textContent = currentPhrase.substring(0, charIndex);
            charIndex--;
            setTimeout(typeWriter, Math.random() * 50 + 30);
        } else {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeWriter, 500);
        }
    }

    // Запуск печати
    setTimeout(typeWriter, 1000);

    // Глаза следят за курсором
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;

        allPupils.forEach(pupil => {
            const rect = pupil.parentElement.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angle = Math.atan2(y - centerY, x - centerX);
            const distance = Math.min(15, Math.hypot(x - centerX, y - centerY)); // Ограничение движения

            const moveX = Math.cos(angle) * distance;
            const moveY = Math.sin(angle) * distance;

            pupil.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
        });

        // Постепенное появление глаз
        if (Math.random() > 0.95) {
            eyes.style.opacity = 0.6;
        } else if (Math.random() > 0.98) {
            eyes.style.opacity = 0;
        }
    });

    // Логика кнопки
    scaryBtn.addEventListener('click', () => {
        // 1. Резкая смена текста
        storyText.textContent = "ПОЗДНО!";
        storyText.style.color = "red";
        storyText.style.fontSize = "3rem";
        
        // 2. Тряска экрана
        body.classList.add('screamer-mode');
        
        // 3. Пульсация
        pulseRing.classList.add('pulsing');
        
        // 4. Глаза становятся красными и большими
        eyes.style.opacity = 1;
        allPupils.forEach(p => {
            p.style.background = '#ff0000';
            p.style.width = '40px';
            p.style.height = '40px';
            p.style.boxShadow = '0 0 20px red';
        });

        // 5. Изменение кнопки
        scaryBtn.textContent = "УХОДИ";
        scaryBtn.style.borderColor = "white";
        scaryBtn.style.color = "white";

        // 6. Случайные вспышки фона
        let flashCount = 0;
        const flashInterval = setInterval(() => {
            body.style.backgroundColor = flashCount % 2 === 0 ? '#300000' : '#000000';
            flashCount++;
            if (flashCount > 10) {
                clearInterval(flashInterval);
                body.style.backgroundColor = '#050505';
                body.classList.remove('screamer-mode');
                storyText.textContent = "Ты всё ещё здесь?";
                storyText.style.fontSize = "1.2rem";
                storyText.style.color = "#ccc";
            }
        }, 100);
    });

    // Случайные звуки (визуально через консоль или изменение заголовка)
    setInterval(() => {
        if (Math.random() > 0.9) {
            document.title = "!!!";
            setTimeout(() => {
                document.title = "НЕ СМОТРИ НАЗАД";
            }, 200);
        }
    }, 2000);
});