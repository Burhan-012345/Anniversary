// DOM Elements
const musicToggle = document.getElementById("music-toggle");
const backgroundMusic = document.getElementById("background-music");
const heartsContainer = document.getElementById("hearts-container");
const petalsContainer = document.getElementById("petals-container");
const revealBtn = document.getElementById("reveal-btn");
const loveMessage = document.getElementById("love-message");
const miniMessages = document.querySelectorAll(".mini-message");
const galleryItems = document.querySelectorAll(".gallery-item");
const modal = document.getElementById("image-modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");
const confettiCanvas = document.getElementById("confetti-canvas");

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  createBackgroundAnimations();
  setupMusicToggle();
  setupGallery();
  setupSurprisePage();
  setupPageTransitions();
});

// Background Animations
function createBackgroundAnimations() {
  // Create floating hearts
  for (let i = 0; i < 15; i++) {
    createFloatingElement("💖", heartsContainer, "heart");
  }

  // Create falling petals
  for (let i = 0; i < 20; i++) {
    createFloatingElement("🌹", petalsContainer, "petal");
  }
}

function createFloatingElement(emoji, container, className) {
  const element = document.createElement("div");
  element.className = className;
  element.textContent = emoji;

  // Random position
  const left = Math.random() * 100;
  element.style.left = `${left}%`;

  // Random size
  const size = 0.5 + Math.random() * 1.5;
  element.style.fontSize = `${size}rem`;

  // Random animation duration and delay
  const duration = 15 + Math.random() * 20;
  const delay = Math.random() * 5;
  element.style.animationDuration = `${duration}s`;
  element.style.animationDelay = `${delay}s`;

  container.appendChild(element);
}

// Music Toggle
function setupMusicToggle() {
  if (musicToggle && backgroundMusic) {
    // Check if music was playing before
    const wasPlaying = localStorage.getItem("musicPlaying") === "true";
    if (wasPlaying) {
      backgroundMusic.play();
      musicToggle.textContent = "♫";
    }

    musicToggle.addEventListener("click", () => {
      if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicToggle.textContent = "♫";
        localStorage.setItem("musicPlaying", "true");
      } else {
        backgroundMusic.pause();
        musicToggle.textContent = "♪";
        localStorage.setItem("musicPlaying", "false");
      }
    });
  }
}

// Gallery Setup
function setupGallery() {
  if (galleryItems.length > 0) {
    let currentImageIndex = 0;
    let autoSlideInterval;

    // Open modal on click
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const index = parseInt(item.getAttribute("data-index"));
        openModal(index);
      });
    });

    // Modal functions
    function openModal(index) {
      currentImageIndex = index;
      const img = galleryItems[index].querySelector("img");
      modalImg.src = img.src;
      modal.style.display = "block";

      // Start auto-sliding
      startAutoSlide();
    }

    function closeModal() {
      modal.style.display = "none";
      clearInterval(autoSlideInterval);
    }

    function nextImage() {
      currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
      const img = galleryItems[currentImageIndex].querySelector("img");
      modalImg.src = img.src;
    }

    function startAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(nextImage, 2000);
    }

    // Event listeners
    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      if (modal.style.display === "block") {
        if (e.key === "Escape") closeModal();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") {
          currentImageIndex =
            (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
          const img = galleryItems[currentImageIndex].querySelector("img");
          modalImg.src = img.src;
        }
      }
    });
  }
}

// Surprise Page Setup
function setupSurprisePage() {
  if (revealBtn && loveMessage) {
    revealBtn.addEventListener("click", () => {
      loveMessage.classList.remove("hidden");
      createConfetti();
    });
  }

  if (miniMessages.length > 0) {
    miniMessages.forEach((message) => {
      message.addEventListener("click", () => {
        const text = message.getAttribute("data-text");
        message.textContent = text;
        message.classList.add("revealed");
      });
    });
  }
}

// Confetti Effect
function createConfetti() {
  if (!confettiCanvas) return;

  const ctx = confettiCanvas.getContext("2d");
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;

  const confettiCount = 150;
  const confettiPieces = [];
  const colors = ["#ff9ec6", "#c084fc", "#fda4af", "#f9a8d4", "#e9d5ff"];

  class ConfettiPiece {
    constructor() {
      this.x = Math.random() * confettiCanvas.width;
      this.y = -20;
      this.size = Math.random() * 10 + 5;
      this.speed = Math.random() * 3 + 2;
      this.angle = Math.random() * Math.PI * 2;
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 5 - 2.5;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.shape = Math.random() > 0.5 ? "circle" : "rect";
    }

    update() {
      this.y += this.speed;
      this.x += Math.sin(this.angle) * 0.5;
      this.angle += 0.02;
      this.rotation += this.rotationSpeed;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);

      if (this.shape === "circle") {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
      }

      ctx.restore();
    }
  }

  // Create confetti pieces
  for (let i = 0; i < confettiCount; i++) {
    confettiPieces.push(new ConfettiPiece());
  }

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let allDone = true;
    confettiPieces.forEach((piece) => {
      if (piece.y < confettiCanvas.height + 50) {
        piece.update();
        piece.draw();
        allDone = false;
      }
    });

    if (!allDone) {
      requestAnimationFrame(animate);
    } else {
      confettiCanvas.style.display = "none";
    }
  }

  confettiCanvas.style.display = "block";
  animate();
}

// Page Transitions - FIXED VERSION
function setupPageTransitions() {
  // Fade in on page load - FIXED
  document.body.style.opacity = "1"; // Set immediately to 1
  document.body.style.transition = "opacity 0.5s ease";

  // Remove any initial hidden class from content
  const content = document.querySelector(".content");
  if (content && content.classList.contains("fade-in")) {
    content.classList.remove("content-initially-hidden");
  }

  // Add fade out effect when navigating
  const links = document.querySelectorAll("a[href]");
  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      // Skip for external links
      if (link.hostname !== window.location.hostname) return;

      e.preventDefault();
      const href = link.getAttribute("href");

      // Fade out current page
      document.body.style.opacity = "0";
      document.body.style.transition = "opacity 0.5s ease";

      // Navigate after fade out
      setTimeout(() => {
        window.location.href = href;
      }, 500);
    });
  });
  // Fade in on page load
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
}
