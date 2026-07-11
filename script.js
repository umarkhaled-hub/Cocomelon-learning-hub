// Music Toggle Functionality
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

let isMusicPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isMusicPlaying) {
        bgMusic.pause();
        musicBtn.textContent = '🔊 Music ON';
        isMusicPlaying = false;
    } else {
        bgMusic.play();
        musicBtn.textContent = '🔇 Music OFF';
        isMusicPlaying = true;
    }
});

// CTA Button - Start Learning
document.querySelector('.cta-btn').addEventListener('click', () => {
    alert('🎉 Welcome to Cocomelon! Let\'s start learning together! 🌈');
    document.getElementById('videos').scrollIntoView({ behavior: 'smooth' });
});

// Play Buttons for Videos
const playButtons = document.querySelectorAll('.play-btn');
playButtons.forEach((btn, index) => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const videoTitle = btn.parentElement.querySelector('h3').textContent;
        alert(`🎥 Now playing: ${videoTitle}\n\nEnjoy learning! 🎉`);
        playAnimation(btn);
    });
});

// Play Animation for buttons
function playAnimation(btn) {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);
}

// Learning Cards - Interactive
const learningCards = document.querySelectorAll('.learning-card');
learningCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        const cardTitle = card.querySelector('h3').textContent;
        const cardPreview = card.querySelector('.content-preview').textContent;
        console.log(`Clicked: ${cardTitle}\nContent: ${cardPreview}`);
        
        // Add ripple effect
        createRippleEffect(card);
    });
});

// Create Ripple Effect
function createRippleEffect(element) {
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'rippleAnimation 0.6s ease-out';
    
    const rect = element.getBoundingClientRect();
    ripple.style.left = rect.width / 2 - 10 + 'px';
    ripple.style.top = rect.height / 2 - 10 + 'px';
    
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Add Ripple Animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes rippleAnimation {
        to {
            width: 200px;
            height: 200px;
            opacity: 0;
            transform: translate(-50%, -50%);
        }
    }
`;
document.head.appendChild(style);

// Game Cards - Interactive
const gameCards = document.querySelectorAll('.game-card');
gameCards.forEach((card) => {
    card.addEventListener('click', () => {
        const gameTitle = card.querySelector('h3').textContent;
        alert(`🎮 Ready to play ${gameTitle}?\n\nHave fun! 🎉`);
        playAnimation(card);
    });
});

// Parent Cards - Hover effects already in CSS
const parentCards = document.querySelectorAll('.parent-card');
parentCards.forEach((card) => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'none';
    });
});

// Smooth Scroll for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fun Easter Egg - Konami Code for special surprise
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        triggerEasterEgg();
    }
});

function triggerEasterEgg() {
    console.log('🎉 Easter Egg Activated! 🎉');
    
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    alert('🎉 Wow! You found the Cocomelon Secret! Amazing! 🌈✨');
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#9B59B6', '#27AE60'][Math.floor(Math.random() * 5)];
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = '-10px';
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '9999';
    
    document.body.appendChild(confetti);
    
    let top = 0;
    let left = parseInt(confetti.style.left);
    let velocity = Math.random() * 3 + 2;
    let angle = Math.random() * Math.PI * 2;
    
    const animate = () => {
        top += velocity;
        left += Math.sin(angle) * 2;
        confetti.style.top = top + 'px';
        confetti.style.left = left + 'px';
        confetti.style.opacity = 1 - (top / window.innerHeight);
        
        if (top < window.innerHeight) {
            requestAnimationFrame(animate);
        } else {
            confetti.remove();
        }
    };
    
    animate();
}

// Add some fun console messages
console.log('%c🎉 Welcome to Cocomelon Learning Hub! 🎉', 'font-size: 20px; color: #FF6B6B; font-weight: bold;');
console.log('%cWhere kids can be happy and smart! 📚✨', 'font-size: 14px; color: #4ECDC4; font-weight: bold;');
console.log('%cTip: Press ↑↑↓↓←→←→BA to unlock a special surprise! 🎁', 'font-size: 12px; color: #FFE66D;');

// Auto-scroll animations on page load
window.addEventListener('load', () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease-out';
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.video-card, .learning-card, .game-card, .parent-card').forEach(el => {
        observer.observe(el);
    });
});

// Add fade-in animation
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(fadeStyle);

// Add Click Particle Effect for Fun
document.addEventListener('click', (e) => {
    // Don't create particles on button clicks
    if (e.target.tagName !== 'BUTTON') {
        createClickParticle(e.clientX, e.clientY);
    }
});

function createClickParticle(x, y) {
    const particle = document.createElement('div');
    const emojis = ['⭐', '💫', '✨', '🌟', '💖', '🎉'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    particle.textContent = emoji;
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.pointerEvents = 'none';
    particle.style.fontSize = '1.5rem';
    particle.style.zIndex = '9999';
    particle.style.userSelect = 'none';
    
    document.body.appendChild(particle);
    
    let top = y;
    let left = x;
    let velocity = Math.random() * 3 + 2;
    let angle = Math.random() * Math.PI * 2;
    
    const animate = () => {
        top -= velocity;
        left += Math.sin(angle) * 2;
        particle.style.top = top + 'px';
        particle.style.left = left + 'px';
        particle.style.opacity = 1 - ((y - top) / 100);
        
        if (top > y - 100) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    
    animate();
}

// Responsive Background Music for Mobile
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    console.log('Mobile device detected - Music autoplay may be restricted');
}

console.log('✨ All interactive features loaded successfully! Have fun! ✨');