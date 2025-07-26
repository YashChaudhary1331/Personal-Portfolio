// Initialize AOS (Animate on Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 50,
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Typing animation
const nameText = document.getElementById('name-text');
const titleText = document.getElementById('title-text');
const taglineSection = document.getElementById('tagline-section');
const name = "Hey, I'm Yash Chaudhary";
const titles = ["Next.js Developer", "MERN Stack Developer"];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeName() {
    if (charIndex < name.length) {
        nameText.textContent += name.charAt(charIndex);
        charIndex++;
        setTimeout(typeName, 120);
    } else {
        // Name typing finished, start typing titles
        const cursor = document.querySelector('.typing-cursor');
        if (cursor) {
            cursor.remove();
        }
        charIndex = 0;
        setTimeout(typeTitle, 500);
    }
}

function typeTitle() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        titleText.textContent = currentTitle.substring(0, titleText.textContent.length - 1);
    } else {
        titleText.textContent = currentTitle.substring(0, titleText.textContent.length + 1);
    }

    let typeSpeed = isDeleting ? 100 : 200;

    if (!isDeleting && titleText.textContent === currentTitle) {
        // If it's the last title, show the rest of the content
        if (titleIndex === titles.length - 1) {
            setTimeout(() => {
                taglineSection.classList.remove('hidden');
            }, 1000); // Pause before showing
        }
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && titleText.textContent === '') {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typeSpeed = 500;
    }

    setTimeout(typeTitle, typeSpeed);
}

document.addEventListener('DOMContentLoaded', () => {
    typeName();
});


// Particles.js configuration
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": "#ff0000" /* Red particles */
        },
        "shape": {
            "type": "circle",
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 2,
            "random": true,
        },
        "line_linked": {
            "enable": true,
            "distance": 120,
            "color": "#ff4d4d", /* Light Red lines */
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1.5,
            "direction": "none",
            "random": true,
            "straight": false,
            "out_mode": "out",
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "repulse": {
                "distance": 100,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
        }
    },
    "retina_detect": true
});

// Contact Form Submission
const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    try {
        const response = await fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            formStatus.textContent = "Thanks for your submission!";
            formStatus.className = 'text-green-500 mt-4';
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    formStatus.textContent = data["errors"].map(error => error["message"]).join(", ");
                } else {
                    formStatus.textContent = "Oops! There was a problem submitting your form";
                }
                formStatus.className = 'text-red-500 mt-4';
            })
        }
    } catch (error) {
        formStatus.textContent = "Oops! There was a problem submitting your form";
        formStatus.className = 'text-red-500 mt-4';
    }
}
form.addEventListener("submit", handleSubmit)
