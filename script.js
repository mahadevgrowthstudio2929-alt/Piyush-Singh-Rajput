(() => {
  "use strict";

  /*
    ==========================================
    LOAD DETAILS FROM config.js
    ==========================================
  */

  const config = window.PSR_CONFIG || {};

  const channelUrl =
    typeof config.channelUrl === "string" && config.channelUrl.trim()
      ? config.channelUrl.trim()
      : "#";

  const agencyUrl =
    typeof config.agencyUrl === "string" && config.agencyUrl.trim()
      ? config.agencyUrl.trim()
      : "#";

  const memberCount =
    Number.isFinite(Number(config.memberCount))
      ? Math.max(0, Number(config.memberCount))
      : 0;

  /*
    ==========================================
    ADD CHANNEL LINK TO ALL JOIN BUTTONS
    ==========================================
  */

  const joinButtons = document.querySelectorAll(".join-link");

  joinButtons.forEach((button) => {
    button.href = channelUrl;
    button.target = "_blank";
    button.rel = "noopener noreferrer";

    button.addEventListener("click", (event) => {
      if (!channelUrl || channelUrl === "#") {
        event.preventDefault();

        alert(
          "Channel joining link abhi add nahi kiya gaya hai. config.js file mein channelUrl update karein."
        );
      }
    });
  });

  /*
    ==========================================
    MAHADEV GROWTH STUDIO LINK
    ==========================================
  */

  const agencyLink = document.getElementById("agencyLink");

  if (agencyLink) {
    agencyLink.href = agencyUrl;
    agencyLink.target = "_blank";
    agencyLink.rel = "noopener noreferrer";

    agencyLink.addEventListener("click", (event) => {
      if (!agencyUrl || agencyUrl === "#") {
        event.preventDefault();

        alert(
          "Mahadev Growth Studio ka link config.js file mein update karein."
        );
      }
    });
  }

  /*
    ==========================================
    ANIMATED COMMUNITY COUNTER
    ==========================================
  */

  const counterElement = document.getElementById("memberCounter");

  let counterStarted = false;

  function animateCounter() {
    if (!counterElement || counterStarted) {
      return;
    }

    counterStarted = true;

    const suffix = counterElement.dataset.suffix || "+";
    const animationDuration = 1800;
    const startingTime = performance.now();

    function updateCounter(currentTime) {
      const elapsedTime = currentTime - startingTime;

      const progress = Math.min(
        elapsedTime / animationDuration,
        1
      );

      // Smooth easing effect
      const easedProgress =
        1 - Math.pow(1 - progress, 4);

      const currentValue = Math.floor(
        memberCount * easedProgress
      );

      counterElement.textContent =
        `${currentValue.toLocaleString("en-IN")}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counterElement.textContent =
          `${memberCount.toLocaleString("en-IN")}${suffix}`;
      }
    }

    requestAnimationFrame(updateCounter);
  }

  /*
    Counter tab animate hoga jab screen par visible hoga.
  */

  if (counterElement && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter();
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.35
      }
    );

    counterObserver.observe(counterElement);
  } else {
    animateCounter();
  }

  /*
    ==========================================
    SCROLL REVEAL ANIMATION
    ==========================================
  */

  const revealItems =
    document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
      }
    );

    revealItems.forEach((item) => {
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("visible");
    });
  }

  /*
    ==========================================
    PREMIUM PARTICLE BACKGROUND
    ==========================================
  */

  const canvas =
    document.getElementById("particleCanvas");

  const context =
    canvas ? canvas.getContext("2d") : null;

  let screenWidth = 0;
  let screenHeight = 0;
  let particles = [];
  let animationFrameId = null;

  function createParticles() {
    const particleCount = Math.min(
      72,
      Math.max(34, Math.floor(screenWidth / 20))
    );

    particles = Array.from(
      { length: particleCount },
      () => ({
        x: Math.random() * screenWidth,
        y: Math.random() * screenHeight,

        radius:
          Math.random() * 1.4 + 0.35,

        speedX:
          (Math.random() - 0.5) * 0.16,

        speedY:
          Math.random() * -0.16 - 0.035,

        opacity:
          Math.random() * 0.45 + 0.12
      })
    );
  }

  function resizeCanvas() {
    if (!canvas || !context) {
      return;
    }

    const devicePixelRatio =
      Math.min(window.devicePixelRatio || 1, 2);

    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;

    canvas.width =
      Math.floor(screenWidth * devicePixelRatio);

    canvas.height =
      Math.floor(screenHeight * devicePixelRatio);

    canvas.style.width = `${screenWidth}px`;
    canvas.style.height = `${screenHeight}px`;

    context.setTransform(
      devicePixelRatio,
      0,
      0,
      devicePixelRatio,
      0,
      0
    );

    createParticles();
  }

  function drawParticles() {
    if (!canvas || !context) {
      return;
    }

    context.clearRect(
      0,
      0,
      screenWidth,
      screenHeight
    );

    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Particle top ke bahar jaane par bottom se restart
      if (particle.y < -10) {
        particle.y = screenHeight + 10;
        particle.x = Math.random() * screenWidth;
      }

      // Horizontal looping
      if (particle.x < -10) {
        particle.x = screenWidth + 10;
      }

      if (particle.x > screenWidth + 10) {
        particle.x = -10;
      }

      context.beginPath();

      context.arc(
        particle.x,
        particle.y,
        particle.radius,
        0,
        Math.PI * 2
      );

      context.fillStyle =
        `rgba(120, 245, 207, ${particle.opacity})`;

      context.fill();
    });

    animationFrameId =
      requestAnimationFrame(drawParticles);
  }

  /*
    User ke device par reduced motion enabled hai
    toh particles disable rahenge.
  */

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if (canvas && context && !reducedMotion) {
    resizeCanvas();
    drawParticles();

    window.addEventListener(
      "resize",
      resizeCanvas,
      { passive: true }
    );
  }

  /*
    ==========================================
    SMOOTH SCROLL FOR INTERNAL LINKS
    ==========================================
  */

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId =
        link.getAttribute("href");

      if (
        !targetId ||
        targetId === "#" ||
        targetId.length < 2
      ) {
        return;
      }

      const targetElement =
        document.querySelector(targetId);

      if (targetElement) {
        event.preventDefault();

        targetElement.scrollIntoView({
          behavior: reducedMotion
            ? "auto"
            : "smooth",

          block: "start"
        });
      }
    });
  });

  /*
    ==========================================
    BUTTON MOUSE GLOW EFFECT
    ==========================================
  */

  const glowingButtons =
    document.querySelectorAll(".primary-button");

  glowingButtons.forEach((button) => {
    button.addEventListener(
      "mousemove",
      (event) => {
        const buttonRect =
          button.getBoundingClientRect();

        const mouseX =
          event.clientX - buttonRect.left;

        const mouseY =
          event.clientY - buttonRect.top;

        button.style.setProperty(
          "--mouse-x",
          `${mouseX}px`
        );

        button.style.setProperty(
          "--mouse-y",
          `${mouseY}px`
        );
      }
    );
  });

  /*
    ==========================================
    CLEANUP WHEN PAGE CLOSES
    ==========================================
  */

  window.addEventListener(
    "beforeunload",
    () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    }
  );
})();
