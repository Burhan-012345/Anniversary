// Advanced Features JavaScript
class AdvancedFeatures {
  constructor() {
    this.romanticQuotes = [
      "Every moment with you is a treasure I'll always cherish",
      "Your love is the melody that fills my heart with joy",
      "In your arms, I've found my forever home",
      "Your smile is my favorite sunrise",
      "With you, every day feels like a beautiful adventure",
      "My heart beats only for you, now and forever",
      "You are the missing piece I never knew I needed",
      "Your love is the greatest gift I've ever received",
    ];
    this.currentQuoteIndex = 0;
  }

  init() {
    // Only initialize features if the required elements exist on the current page
    if (document.getElementById("heartbeat-container")) {
      this.setupHeartbeatVisualization();
    }

    // These features are available on multiple pages
    this.setupAILetterGenerator();
    this.setupVirtualRose();
  }

  // AI Love Letter Generator - FIXED
  setupAILetterGenerator() {
    const aiLetterBtn = document.getElementById("ai-letter-btn");
    const generateBtn = document.getElementById("generate-letter");
    const modal = document.getElementById("ai-letter-modal");

    // Only set up if elements exist
    if (!modal) return;

    const closeBtn = modal.querySelector(".close");

    if (aiLetterBtn) {
      aiLetterBtn.addEventListener("click", () => {
        modal.style.display = "block";
        this.generateLoveLetter();
      });
    }

    if (generateBtn) {
      generateBtn.addEventListener("click", () => this.generateLoveLetter());
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  generateLoveLetter() {
    const letterContent = document.getElementById("ai-letter-content");
    if (!letterContent) return;

    const templates = [
      {
        greeting: "My dearest love,",
        body: "today as we celebrate our anniversary, I find myself overwhelmed with gratitude for having you in my life. Your presence has transformed my world in ways I never imagined possible. Every moment with you feels like a beautiful dream I never want to wake up from.",
        ending: "Forever yours, with all my love.",
      },
      {
        greeting: "To the love of my life,",
        body: "on this special day I want to remind you how much you mean to me. Your laughter is my favorite sound, your smile my greatest treasure. With you, I've discovered a love so deep and pure that it continues to amaze me every single day.",
        ending: "Yours eternally, with a heart full of love.",
      },
      {
        greeting: "My darling,",
        body: "as we mark another year of our beautiful journey together, I want you to know that my love for you grows stronger with each passing moment. You are not just my partner but my best friend, my confidant, and my greatest blessing.",
        ending: "With all the love in my heart, now and always.",
      },
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];

    const letterHTML = `
            <p><strong>${template.greeting}</strong></p>
            <p>${template.body}</p>
            <p>I remember the way your eyes light up when you're happy, the warmth of your embrace, and the comfort of your presence. These memories are the precious jewels of my life, each one shining brighter because of you.</p>
            <p><em>${template.ending}</em></p>
        `;

    // Clear previous content and add new letter
    letterContent.innerHTML = letterHTML;
  }

  // Virtual Rose - FIXED
  setupVirtualRose() {
    const roseBtn = document.getElementById("virtual-rose-btn");
    const roseContainer = document.getElementById("virtual-rose-container");

    // Only set up if elements exist
    if (!roseContainer) return;

    const sendBtn = document.getElementById("send-rose");
    const closeBtn = roseContainer.querySelector(".close-rose");

    if (roseBtn) {
      roseBtn.addEventListener("click", () => {
        roseContainer.style.display = "flex";
        this.animateRose();
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        roseContainer.style.display = "none";
      });
    }

    if (sendBtn) {
      sendBtn.addEventListener("click", () => {
        this.sendRoseWithMessage();
      });
    }

    // Close when clicking outside
    roseContainer.addEventListener("click", (e) => {
      if (e.target === roseContainer) {
        roseContainer.style.display = "none";
      }
    });
  }

  animateRose() {
    const rose = document.getElementById("rose-3d");
    if (!rose) return;

    rose.style.animation = "roseFloat 2s ease-in-out infinite";

    // Add hover effect
    rose.addEventListener("mouseenter", () => {
      rose.style.transform = "scale(1.2) rotate(10deg)";
    });

    rose.addEventListener("mouseleave", () => {
      rose.style.transform = "scale(1) rotate(0deg)";
    });
  }

  sendRoseWithMessage() {
    const messages = [
      "Sending you this virtual rose as a symbol of my eternal love 🌹",
      "This rose represents my love for you - beautiful, timeless, and ever-growing 💖",
      "Just like this rose, my love for you will never fade 🌹",
      "Roses may wither, but my love for you is forever eternal 💕",
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];
    this.showNotification(message);

    // Close rose modal after sending
    setTimeout(() => {
      const roseContainer = document.getElementById("virtual-rose-container");
      if (roseContainer) {
        roseContainer.style.display = "none";
      }
    }, 1000);
  }

  // Heartbeat Visualization
  setupHeartbeatVisualization() {
    const heartbeatContainer = document.getElementById("heartbeat-container");
    if (!heartbeatContainer) return;

    this.startHeartbeatAnimation();
    this.startQuoteRotation();
  }

  startHeartbeatAnimation() {
    const heartIcon = document.querySelector(".heart-icon");
    if (heartIcon) {
      heartIcon.style.animation = "heartbeat 1.5s ease-in-out infinite";
    }
  }

  startQuoteRotation() {
    const quoteElement = document.getElementById("romantic-quote");
    if (!quoteElement) return;

    setInterval(() => {
      this.currentQuoteIndex =
        (this.currentQuoteIndex + 1) % this.romanticQuotes.length;

      quoteElement.style.opacity = "0";
      setTimeout(() => {
        quoteElement.textContent = `"${
          this.romanticQuotes[this.currentQuoteIndex]
        }"`;
        quoteElement.style.opacity = "1";
      }, 500);
    }, 5000);
  }

  showNotification(message) {
    // Remove existing notification if any
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(45deg, #ff9ec6, #c084fc);
            color: white;
            padding: 15px 25px;
            border-radius: 25px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            z-index: 10000;
            animation: slideDown 0.5s ease;
            font-weight: 500;
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "slideUp 0.5s ease";
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 500);
    }, 3000);
  }
}

// Initialize advanced features when DOM is loaded - FIXED
document.addEventListener("DOMContentLoaded", () => {
  const advancedFeatures = new AdvancedFeatures();
  advancedFeatures.init();
});
