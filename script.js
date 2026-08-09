const nav = document.getElementById("nav");
const menuToggle = document.querySelector(".menu-toggle");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  document.querySelectorAll(".nav a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const filters = document.querySelectorAll(".filter");
const cards = document.querySelectorAll(".collection-card");

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    filters.forEach(item => item.classList.remove("active"));
    filter.classList.add("active");

    const value = filter.dataset.filter;
    cards.forEach(card => {
      const show = value === "all" || card.dataset.category === value;
      card.classList.toggle("hidden", !show);
    });
  });
});

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  backTop.classList.toggle("show", window.scrollY > 500);
});

backTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", async event => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(contactForm).entries());

  if (formNote) formNote.textContent = "Sending your enquiry...";

  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Unable to send enquiry.");
    }

    if (formNote) formNote.textContent = result.message;
    contactForm.reset();
  } catch (error) {
    if (formNote) {
      formNote.textContent = "Something went wrong. Please try again.";
    }
    console.error(error);
  }
});;

document.getElementById("year").textContent = new Date().getFullYear();


// Premium scroll progress + header state
const scrollProgress = document.getElementById("scrollProgress");
const header = document.getElementById("siteHeader");

function updateScrollUI() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${percent}%`;
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", updateScrollUI, { passive: true });
updateScrollUI();


// Collection detail modal
const collectionModal = document.getElementById("collectionModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const modalDescription = document.getElementById("modalDescription");
const modalArt = document.getElementById("modalArt");

function openCollection(card) {
  if (!collectionModal) return;

  modalTitle.textContent = card.dataset.title || "Collection";
  modalType.textContent = card.dataset.type || "COLLECTION";
  modalDescription.textContent = card.dataset.description || "Discover the collection.";
  const sourceArt = card.querySelector(".art");
  if (sourceArt) {
    modalArt.className = `modal-art ${[...sourceArt.classList].filter(c => c.startsWith("art-")).join(" ")}`;
  }

  collectionModal.classList.add("open");
  collectionModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeCollection() {
  if (!collectionModal) return;
  collectionModal.classList.remove("open");
  collectionModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

cards.forEach(card => {
  card.addEventListener("click", () => openCollection(card));
  card.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCollection(card);
    }
  });
});

modalClose?.addEventListener("click", closeCollection);
collectionModal?.querySelector("[data-close-modal]")?.addEventListener("click", closeCollection);
document.getElementById("modalEnquire")?.addEventListener("click", closeCollection);

document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeCollection();
});


// Smooth anchor fallback for all internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
