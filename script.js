/* ==================================================
   IMUTERIA Service
   Main JavaScript
================================================== */
document.addEventListener("DOMContentLoaded", () => {
  /* ==================================================
     ELEMENTS
  ================================================== */
  const header =
    document.getElementById("siteHeader");
  const menuToggle =
    document.getElementById("menuToggle");
  const globalNav =
    document.getElementById("globalNav");
  const body =
    document.body;
  /* ==================================================
     HEADER SCROLL
  ================================================== */
  const updateHeader = () => {
    if (!header) {
      return;
    }
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
  );
  updateHeader();
  /* ==================================================
     MOBILE MENU
  ================================================== */
  if (menuToggle && globalNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        globalNav.classList.toggle("mobile-open");
      menuToggle.classList.toggle(
        "active",
        isOpen
      );
      menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
      );
      body.classList.toggle(
        "menu-open",
        isOpen
      );
    });
    /* メニューをクリックしたら閉じる */
    const navLinks =
      globalNav.querySelectorAll("a");
    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        globalNav.classList.remove(
          "mobile-open"
        );
        menuToggle.classList.remove(
          "active"
        );
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
        body.classList.remove(
          "menu-open"
        );
      });
    });
  }
  /* ==================================================
     FAQ
  ================================================== */
  const faqItems =
    document.querySelectorAll(".faq-item");
  faqItems.forEach(item => {
    const question =
      item.querySelector(".faq-question");
    const answer =
      item.querySelector(".faq-answer");
    if (!question || !answer) {
      return;
    }
    question.addEventListener("click", () => {
      const isOpen =
        item.classList.contains("active");
      /* 他のFAQを閉じる */
      faqItems.forEach(otherItem => {
        if (otherItem === item) {
          return;
        }
        otherItem.classList.remove(
          "active"
        );
        const otherAnswer =
          otherItem.querySelector(
            ".faq-answer"
          );
        if (otherAnswer) {
          otherAnswer.style.maxHeight =
            null;
        }
      });
      /* 現在のFAQ */
      if (isOpen) {
        item.classList.remove(
          "active"
        );
        answer.style.maxHeight = null;
      } else {
        item.classList.add(
          "active"
        );
        answer.style.maxHeight =
          answer.scrollHeight + "px";
      }
    });
  });
  /* ==================================================
     SCROLL REVEAL
  ================================================== */
  const revealTargets =
    document.querySelectorAll(
      ".service-card, " +
      ".work-card, " +
      ".reason-item, " +
      ".flow-item"
    );
  if (
    "IntersectionObserver" in window
  ) {
    const observer =
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (
              entry.isIntersecting
            ) {
              entry.target.classList.add(
                "is-visible"
              );
              observer.unobserve(
                entry.target
              );
            }
          });
        },
        {
          threshold: 0.12
        }
      );
    revealTargets.forEach(target => {
      observer.observe(target);
    });
  } else {
    revealTargets.forEach(target => {
      target.classList.add(
        "is-visible"
      );
    });
  }
  /* ==================================================
     SMOOTH SCROLL
  ================================================== */
  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );
  anchorLinks.forEach(link => {
    link.addEventListener(
      "click",
      event => {
        const targetId =
          link.getAttribute("href");
        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }
        const target =
          document.querySelector(
            targetId
          );
        if (!target) {
          return;
        }
        event.preventDefault();
        const headerHeight =
          header
            ? header.offsetHeight
            : 0;
        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });
      }
    );
  });
  /* ==================================================
     ESCAPE KEY
  ================================================== */
  document.addEventListener(
    "keydown",
    event => {
      if (
        event.key === "Escape" &&
        globalNav &&
        menuToggle
      ) {
        globalNav.classList.remove(
          "mobile-open"
        );
        menuToggle.classList.remove(
          "active"
        );
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
        body.classList.remove(
          "menu-open"
        );
      }
    }
  );
  /* ==================================================
     RESIZE
  ================================================== */
  window.addEventListener(
    "resize",
    () => {
      if (
        window.innerWidth > 900 &&
        globalNav &&
        menuToggle
      ) {
        globalNav.classList.remove(
          "mobile-open"
        );
        menuToggle.classList.remove(
          "active"
        );
        menuToggle.setAttribute(
          "aria-expanded",
          "false"
        );
        body.classList.remove(
          "menu-open"
        );
      }
    }
  );
});
