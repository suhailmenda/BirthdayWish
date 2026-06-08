function runPageEnterTransition() {
    if (sessionStorage.getItem('pageTransition') !== 'cause') return;

    sessionStorage.removeItem('pageTransition');
    document.documentElement.classList.remove('from-transition');

    const overlay = document.querySelector('.page-transition');
    const container = document.querySelector('.container');

    gsap.set(container, { autoAlpha: 0, y: 30 });

    gsap.to(overlay, {
        opacity: 0,
        duration: 0.7,
        ease: 'power2.inOut',
        delay: 0.05
    });

    gsap.to(container, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: 'power2.out',
        delay: 0.15
    });
}

window.addEventListener('load', runPageEnterTransition);

 // Reasons database
 const reasons = [
    { 
        text: "May Allah keep us together in jannah, fid duniya wal akhirah 🫀", 
        emoji: "🌟"
    },
    { 
        text: "Lazmi hain tere chehre par Til ka hona, Khubsurat chehro par pahredarri bhi zaruri hain! ", 
        emoji: "💗"
    },
    { 
        text: "Tujhe nazar andaz karu Mujh mein itna guroor kaha, Aur tumhe dekhu nazar bhar kar Meri aakhon mein itna noor kaha! ✨ ", 
        emoji: "💕"
    },
    { 
        text: "Shiddat aur bhi shadeed hote ja rahi hai Aapse mohabbat aur bhi mazeed hote ja rahi hai, Dil toh tha hi aapka deewana jana Ab toh rooh bhi aapki deewani hote ja rahi ha 🥳 ", 
        emoji: "🌟"
    }
];

// State management
let currentReasonIndex = 0;
const reasonsContainer = document.getElementById('reasons-container');
const shuffleButton = document.querySelector('.shuffle-button');
const reasonCounter = document.querySelector('.reason-counter');
let isTransitioning = false;

// Create reason card
function createReasonCard(reason) {
    const card = document.createElement('div');
    card.className = 'reason-card';
    
    const text = document.createElement('div');
    text.className = 'reason-text';
    text.innerHTML = `${reason.emoji} ${reason.text}`;
    
    card.appendChild(text);
    
    gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.5,
        ease: "back.out",
        clearProps: "transform"
    });

    return card;
}

// Display new reason
function displayNewReason() {
    if (isTransitioning) return;
    isTransitioning = true;

    if (currentReasonIndex < reasons.length) {
        const card = createReasonCard(reasons[currentReasonIndex]);
        reasonsContainer.appendChild(card);
        
        // Update counter
        reasonCounter.textContent = `Reason ${currentReasonIndex + 1} of ${reasons.length}`;
        
        currentReasonIndex++;

        // Check if we should transform the button
        if (currentReasonIndex === reasons.length) {
            gsap.to(shuffleButton, {
                scale: 1.1,
                duration: 0.5,
                ease: "elastic.out",
                onComplete: () => {
                    shuffleButton.textContent = "Enter Our Storylane 💫";
                    shuffleButton.classList.add('story-mode');
                    shuffleButton.addEventListener('click', () => {
                        gsap.to('body', {
                            opacity: 0,
                            duration: 1,
                            onComplete: () => {
                                window.location.href = 'last.html'; // Replace with the actual URL of the next page
                            }
                        });
                    });
                }
            });
        }

        // Create floating elements
        createFloatingElement();
        
        setTimeout(() => {
            isTransitioning = false;
        }, 500);
    } else {
        // Handle navigation to new page or section
        window.location.href = "#storylane";
        // Or trigger your next page functionality
    }
}

// Initialize button click
shuffleButton.addEventListener('click', () => {
    gsap.to(shuffleButton, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1
    });
    displayNewReason();
});

// Floating elements function (same as before)
function createFloatingElement() {
    const elements = ['🌸', '✨', '💖', '🦋', '⭐'];
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = elements[Math.floor(Math.random() * elements.length)];
    element.style.left = Math.random() * window.innerWidth + 'px';
    element.style.top = Math.random() * window.innerHeight + 'px';
    element.style.fontSize = (Math.random() * 20 + 10) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        duration: Math.random() * 10 + 10,
        opacity: 0,
        onComplete: () => element.remove()
    });
}

// Custom cursor (desktop only)
const cursor = document.querySelector('.custom-cursor');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches && cursor) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX - 15,
            y: e.clientY - 15,
            duration: 0.2
        });
    });
} else if (cursor) {
    cursor.style.display = 'none';
}

// Create initial floating elements (less frequent on mobile)
const floatingIntervalMs = window.matchMedia('(max-width: 768px)').matches ? 4000 : 2000;
setInterval(createFloatingElement, floatingIntervalMs);