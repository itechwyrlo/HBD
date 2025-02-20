let isGiftClickable = false;
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
let hasFlipped = false; 
let isInfiniteMode = false; 
let infiniteInterval = null; 

function flipCard(card) {
    if (isInfiniteMode || hasFlipped) return; 
    let cardInner = card.querySelector(".card-inner");
    cardInner.style.transform = "rotateY(180deg)";
    hasFlipped = true;
   
    setTimeout(() => {
        slideToNext();
    }, 2500); 
}

function slideToNext() {
    if (isInfiniteMode || currentIndex >= slides.length) return; 

    const currentSlide = slides[currentIndex];
    if (!currentSlide) return; 
    const currentP = currentSlide.querySelector(".back-msg");
    if (currentP) {
        currentP.style.display = "none"; // Hide the message after the card is flipped
    }
    currentSlide.classList.remove("active");
    currentSlide.classList.add("inactive");

    currentIndex++;

    if (currentIndex < slides.length) {
        const nextSlide = slides[currentIndex];
        if (!nextSlide) return; 
        nextSlide.classList.remove("inactive");
        nextSlide.classList.add("active");
        hasFlipped = false;
        
    } else {
        isInfiniteMode = true;
        startInfiniteSliding();
        triggerGiftAnimation();
    }
}

function startInfiniteSliding() {
    if (infiniteInterval) return; 

    infiniteInterval = setInterval(() => {
        if (slides.length === 0) return; 

        const currentSlide = slides[currentIndex];
        if (currentSlide) {
            
            currentSlide.classList.remove("active");
            currentSlide.classList.add("inactive");
        }
        currentIndex = (currentIndex + 1) % slides.length; 

        const nextSlide = slides[currentIndex];
        if (nextSlide) {
            const nextP = nextSlide.querySelector("p");
            if (nextP) {
                nextP.style.display = "block"; 
            }
            nextSlide.classList.remove("inactive");
            nextSlide.classList.add("active");
        }
    }, 2000); 
}





function triggerGiftAnimation() {
    const giftBox = document.querySelector(".gift");
    const giftContainer = document.querySelector(".gift-container");
    const giftGif = document.createElement("img");
    giftGif.src = "images/ClickMe.gif";
    giftGif.alt = "Surprise Gift";
    giftGif.style.width = "150px";
    giftGif.style.height = "auto";
    giftGif.style.marginLeft = "20px";
    giftContainer.appendChild(giftGif);

    giftBox.classList.add("crazy-bounce");
    isGiftClickable = true;
}

function openGift() {
    if (!isGiftClickable) return;
    const giftGif = document.querySelector(".gift-container img");

    if (giftGif) {
        giftGif.src = "images/Happy.gif";
    }

    rainImages();
}

function startSurprise() {
    let countdown = 10;
    const countdownElement = document.getElementById("countdown");
    const overlay = document.getElementById("overlay");
    const mainContent = document.querySelector(".slider-container");
    const music = document.getElementById("birthday-song");
    music.play();
    
    countdownElement.style.opacity = 1;
    let interval = setInterval(() => {
        countdownElement.textContent = countdown;
        countdown--;
        if (countdown < 0) {
            clearInterval(interval);
            overlay.style.opacity = "0";
            setTimeout(() => {
                overlay.style.display = "none";
                mainContent.style.display = "block";
            }, 1000);
        }
    }, 1000);
}

const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "10";

let particles = [];

function createFirework(x, y) {
    const particleCount = 80;
    const angleIncrement = (Math.PI * 2) / particleCount;
    for (let i = 0; i < particleCount; i++) {
        const angle = angleIncrement * i;
        const speed = Math.random() * 6 + 2;
        particles.push({
            x: x,
            y: y,
            radius: Math.random() * 2 + 1,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed - Math.random() * 2,
            gravity: 0.05 + Math.random() * 0.05,
            alpha: 1,
            decay: Math.random() * 0.02 + 0.015,
            color: `hsl(${Math.random() * 360}, 100%, 70%)`,
            trail: []
        });
    }
}

function animateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, index) => {
        p.trail.push({ x: p.x, y: p.y, alpha: p.alpha });
        if (p.trail.length > 5) p.trail.shift();

        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
            particles.splice(index, 1);
        }

        for (let i = 0; i < p.trail.length; i++) {
            const trailPoint = p.trail[i];
            ctx.beginPath();
            ctx.arc(trailPoint.x, trailPoint.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.globalAlpha = trailPoint.alpha * (i / p.trail.length);
            ctx.fill();
        }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(animateFireworks);
}

setInterval(() => {
    createFirework(Math.random() * canvas.width, Math.random() * canvas.height * 0.5);
}, 1000);

animateFireworks();

const images = [];
for (let i = 1; i <= 49; i++) {
    let imageName = i <= 9 ? `bl-0${i}.jpeg` : `bl-${i}.jpeg`;
    images.push(`baloon-images/${imageName}`);
}

// Function to trigger the grand fireworks and heartfelt message
function triggerFinalSurprise() {
    createFirework(window.innerWidth / 2, window.innerHeight / 2); // Large central explosion
    setTimeout(function(){
        showHeartfeltMessage();
    }, 2500); 
}


function rainImages() {
    const container = document.querySelector(".image-container");
    const gift = document.querySelector(".gift");
    const giftBoxRect = gift.getBoundingClientRect();

    let totalImages = images.length;
    let poppedImages = 0;
    let halfImages = Math.ceil(totalImages / 2); 

    images.forEach((imageSrc) => {
        const img = document.createElement("img");
        img.src = imageSrc;
        img.classList.add("floating-image");
        img.style.left = `${giftBoxRect.left + giftBoxRect.width / 2 - 50}px`;
        img.style.top = `${giftBoxRect.top + giftBoxRect.height / 2}px`;
        container.appendChild(img);

        let randomX = (Math.random() - 0.5) * window.innerWidth * 0.8;
        let randomDuration = 6 + Math.random() * 4;

        img.animate([
            { transform: `translate(0px, 0px) scale(0.5)`, opacity: 0.8 },
            { transform: `translate(${randomX}px, -90vh) scale(1) rotate(${Math.random() * 30 - 15}deg)`, opacity: 1 }
        ], {
            duration: randomDuration * 1000,
            easing: "ease-in-out",
            fill: "forwards"
        });

        setTimeout(() => {
            img.classList.add("pop");

            setTimeout(() => {
                img.remove();
                poppedImages++; 
                
                if (poppedImages >= halfImages) {
                    triggerFinalSurprise(); 
                }
            }, 500);
        }, randomDuration * 1000);
    });
}

function autoScrollMessage() {
    let messageElement = document.querySelector(".heartfelt-message");
    let messageContainer = document.querySelector(".heartfelt-message-container");

    if (!messageElement || !messageContainer) return; 

    let scrollSpeed = 0.5; 
    let fadeOutStart = messageElement.scrollHeight * 0.6; 
    let scrollAmount = 0;

    function scroll() {
        if (scrollAmount < messageElement.scrollHeight - messageElement.clientHeight) {
            scrollAmount += scrollSpeed;
            messageElement.scrollTop = scrollAmount;

            // Fade out gradually as the message scrolls
            if (scrollAmount >= fadeOutStart) {
                let fadeRatio = (scrollAmount - fadeOutStart) / (messageElement.scrollHeight - fadeOutStart);
                messageContainer.style.opacity = Math.max(1 - fadeRatio, 0); 
            }

            requestAnimationFrame(scroll);
        } else {
            setTimeout(() => {
                fadeOutMessage();
            }, 1500); 
        }
    }

    scroll();
}


let messageShown = false;

function showHeartfeltMessage() {
    if (messageShown) return; 
    messageShown = true;

    let existingMessage = document.querySelector(".heartfelt-message-container");
    if (existingMessage) existingMessage.remove();

    let messageContainer = document.createElement("div");
    messageContainer.classList.add("heartfelt-message-container");

    let messageElement = document.createElement("div");
    messageElement.classList.add("heartfelt-message");

    messageElement.innerText = `
        You are the most amazing person I know! 🌟
        Every day with you is a blessing, and I am so grateful to have you in my life.
        No words can truly express how much you mean to me.

        You light up my world like the stars in the night sky.
        Through ups and downs, joys and sorrows, I want you to know  
        that I will always be here for you. 💖

        On this special day, I just want to remind you  
        how truly wonderful and cherished you are.

        Keep shining, keep smiling! 😊🎉
    `;

    messageContainer.appendChild(messageElement);
    document.body.appendChild(messageContainer);

    // Fade in the message
    setTimeout(() => {
        messageContainer.style.opacity = "1"; 
    }, 100); 

    // Start scrolling after a short delay
    setTimeout(() => {
        autoScrollMessage();
    }, 8000);
}




function fadeOutMessage() {
    let messageContainer = document.querySelector(".heartfelt-message-container");
    if (!messageContainer) return;

    messageContainer.style.transition = "opacity 2s ease-out"; 
    messageContainer.style.opacity = "0";

    setTimeout(() => {
        if (messageContainer) {
            messageContainer.remove(); 
        }
    }, 4000); 
}


























