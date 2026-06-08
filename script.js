// Cursor following effect (desktop only)
const cursor = document.querySelector('.cursor');
const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

if (isFinePointer && cursor) {
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
    });

    function updateCursor() {
        cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
        requestAnimationFrame(updateCursor);
    }
    requestAnimationFrame(updateCursor);
} else if (cursor) {
    cursor.style.display = 'none';
}

// Typing effect for greeting
const greetingText = "It's you in a thousand lifetimes, it's always you 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 150);
    }
}

// Create floating elements (capped count, slower spawn)
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
const MAX_FLOATING = 8;
let floatingCount = 0;

function createFloating() {
    if (floatingCount >= MAX_FLOATING) return;

    floatingCount++;
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => {
            element.remove();
            floatingCount--;
        }
    });
}

// Initialize animations
let floatingInterval;

window.addEventListener('load', () => {
    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    floatingInterval = setInterval(createFloating, 2500);
});

let isNavigating = false;

document.querySelectorAll('.cta-button').forEach(button => {
        if (isFinePointer) {
            button.addEventListener('mouseenter', () => {
                if (!document.querySelector('link[rel="prefetch"][href="cause.html"]')) {
                    const prefetch = document.createElement('link');
                    prefetch.rel = 'prefetch';
                    prefetch.href = 'cause.html';
                    document.head.appendChild(prefetch);
                }

                gsap.to(button, {
                    scale: 1.1,
                    boxShadow: '0 0 25px rgba(255, 105, 180, 0.7)',
                    duration: 0.35,
                    ease: 'back.out(1.7)',
                    overwrite: 'auto'
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    boxShadow: '0 0 15px rgba(255, 105, 180, 0.5)',
                    duration: 0.35,
                    ease: 'power2.out',
                    overwrite: 'auto'
                });
            });
        }

        // Smooth page transition on click
        button.addEventListener('click', () => {
            if (isNavigating) return;
            isNavigating = true;

            clearInterval(floatingInterval);
            gsap.killTweensOf('.floating');

            const overlay = document.querySelector('.page-transition');

            gsap.to(['.container', '.cursor'], {
                opacity: 0,
                y: -30,
                duration: 0.5,
                ease: 'power2.in'
            });

            gsap.to(overlay, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.inOut',
                delay: 0.1,
                onComplete: () => {
                    sessionStorage.setItem('pageTransition', 'cause');
                    window.location.href = 'cause.html';
                }
            });
        });
    });