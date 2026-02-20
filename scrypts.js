// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

document.addEventListener("mousemove", (e) => {
   cursor.style.left = e.clientX + "px";
   cursor.style.top = e.clientY + "px";

   setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
   }, 100);
});

// Cursor interaction with links
const links = document.querySelectorAll("a, button");
links.forEach((link) => {
   link.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1.5)";
   });

   link.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursorFollower.style.transform = "translate(-50%, -50%) scale(1)";
   });
});

// ========== MOBILE MENU ==========
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
   hamburger.classList.toggle("active");
   navMenu.classList.toggle("active");
});

// Close menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
   link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
   });
});

// ========== PARTICLES BACKGROUND ==========
function createParticles() {
   const particlesContainer = document.getElementById("particles");
   const particleCount = 50;

   for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 5 + 2;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;

      particle.style.width = size + "px";
      particle.style.height = size + "px";
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      particle.style.animationDuration = duration + "s";
      particle.style.animationDelay = delay + "s";
      particle.style.opacity = Math.random() * 0.5 + 0.2;

      particlesContainer.appendChild(particle);
   }
}

createParticles();

// ========== TYPING EFFECT ==========
const typedTextElement = document.querySelector(".typed-text");
const phrases = [
   "Full Stack Developer",
   "Ai Engineer",
   "Data Engineer",
   "Machine Learning Engineer",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
   const currentPhrase = phrases[phraseIndex];

   if (isDeleting) {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
   } else {
      typedTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 150;
   }

   if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000;
   } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
   }

   setTimeout(type, typingSpeed);
}

// Start typing effect
setTimeout(type, 1000);

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
   anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Only prevent default and smooth scroll if it's an internal anchor link
      if (href.startsWith("#") && href.length > 1) {
         e.preventDefault();
         const target = document.querySelector(href);
         if (target) {
            target.scrollIntoView({
               behavior: "smooth",
               block: "start",
            });
         }
      }
   });
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
   const currentScroll = window.pageYOffset;

   if (currentScroll > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.98)";
      navbar.style.boxShadow = "0 5px 30px rgba(255, 0, 85, 0.3)";
   } else {
      navbar.style.background = "rgba(10, 10, 10, 0.95)";
      navbar.style.boxShadow = "none";
   }

   lastScroll = currentScroll;
});

// ========== REVEAL ANIMATION ON SCROLL ==========
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
   (entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting) {
            entry.target.classList.add("active");
         }
      });
   },
   {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
   },
);

revealElements.forEach((element) => {
   revealObserver.observe(element);
});

// ========== ANIMATED COUNTER ==========
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

const statsObserver = new IntersectionObserver(
   (entries) => {
      entries.forEach((entry) => {
         if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach((stat) => {
               const target = parseInt(stat.getAttribute("data-target"));
               const duration = 2000;
               const increment = target / (duration / 16);
               let current = 0;

               const updateCounter = () => {
                  current += increment;
                  if (current < target) {
                     stat.textContent = Math.floor(current) + "+";
                     requestAnimationFrame(updateCounter);
                  } else {
                     stat.textContent = target + "+";
                  }
               };

               updateCounter();
            });
         }
      });
   },
   { threshold: 0.5 },
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
   statsObserver.observe(statsSection);
}

// ========== PROJECT FILTERING ==========
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
   button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      const filterValue = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
         if (
            filterValue === "all" ||
            card.getAttribute("data-category") === filterValue
         ) {
            card.style.display = "block";
            setTimeout(() => {
               card.style.opacity = "1";
               card.style.transform = "translateY(0)";
            }, 10);
         } else {
            card.style.opacity = "0";
            card.style.transform = "translateY(20px)";
            setTimeout(() => {
               card.style.display = "none";
            }, 300);
         }
      });
   });
});

// ========== PROJECT MODAL ==========
const modal = document.getElementById("projectModal");
const modalClose = document.querySelector(".modal-close");
const projectDetailLinks = document.querySelectorAll("[data-project]");

// Sample project data
const projectsData = {
   1: {
      title: "Mood2Music",
      description:
         "Built with a clean separation between Presentation, Business, and Data Access layers, backed by SQL Server and Entity Framework Core.",
      category: "Web Development",
      duration: "6 Months",
      role: "Own Project",
      technologies: [
         "C#",
         "ASP.NET",
         "SQL Server",
         "Entity Framework Core",
         "JavaScript",
         "HTML/CSS",
      ],
      videoUrl: "https://www.youtube.com/embed/ka6gRig6_aI?autoplay=1&mute=1",
      github: "https://github.com/Dalemski/Mood2Music",
      live: "https://i546396.luna.fhict.nl/",
   },
   2: {
      title: "ATOS Flag System",
      description:
         "The system includes multiple role-based views for managing customer details, order entries, and invoice dispatching.Invoices are sent via Microsoft Outlook.",
      category: "Web Development",
      duration: "6 Months",
      role: "Backend Developer",
      technologies: [
         "C#",
         "ASP.NET",
         "MVC",
         "MySQL",
         "Entity Framework",
         "HTML/CSS",
      ],
      images: ["images/after.png", "images/Before.png"],
      github: "https://github.com/Dalemski/ATOS-App",
      live: "#",
   },
   3: {
      title: "Eyes Refractive Error",
      description:
         "Recent research shows that neural networks can predict the need for vision correction using retinal images alone, achieving high accuracy. Inspired by this, I aimed to build an interpretable and practical AI system that not only makes predictions but also explains its decisions using techniques like Grad-CAM heatmaps.",
      category: "Web Development",
      duration: "2 Months",
      role: "Own Project",
      technologies: [
         "Python",
         "Streamlit",
         "OpenCV",
         "TensorFlow",
         "Grad-Cam",
         "Convolutional Neural Networks(CNN)",
         "Pandas",
         "Numpy",
      ],
      videoUrl: "https://www.youtube.com/embed/CM7_zgLX1r0?autoplay=1",
      github: "https://github.com/Dalemski/AI-Eyes-Refractive-Error",
      live: "https://dalemski-ai-eyes-refractive-error-interface-tbjovi.streamlit.app/",
   },
   4: {
      title: "FitPhone Mobile App",
      description:
         "Behavioral Awareness: Highlights the relationship between phone habits and sleep quality.\n Personalized Insights: Adapts predictions to individual users based on their unique patterns.\n Ethical Design: Avoids demographic shortcuts and ensures fairness across diverse user groups.\n Continuous Monitoring: Tracks prediction accuracy, detects emerging biases, and incorporates user feedback to prevent misuse.",
      category: "Ai, Mobile Development",
      duration: "6 Months",
      role: "Machine Learning Engineer, Data Collector, Data Preprocessor, Model Trainer, Model Evaluator, Model Deployer",
      technologies: ["Python", "scikit-learn", "Pandas", "Numpy"],
      videoUrl: "https://www.youtube.com/embed/Byn_7oayUaU?autoplay=1&mute=1",
      github: "https://github.com/Dalemski/AI-FitPhone",
      live: "#",
   },
   5: {
      title: "Vehicle Price Evaluation",
      description:
         "This project involves scraping data from auto.bg, cleaning and preprocessing the data, and building machine learning models to make accurate price predictions. The ultimate goal is to provide insights that help car dealerships and buyers make informed decisions about vehicle pricing.",
      category: "AI, Data Science",
      duration: "2 Months",
      role: "Own Project",
      technologies: ["Python", "scikit-learn", "Pandas", "Numpy", "Matplotlib"],
      images: ["images/val.png"],
      github: "https://github.com/Dalemski/AI-Vehicle-Price-Evaluation",
      live: "#",
   },
   6: {
      title: "Travel Booking App",
      description:
         "Order Management: Handle customer orders and manage the queue. Oven Control: Simulate oven operations using Arduino. User Accounts: Manage user accounts for customers and staff. Interactive Web Interface: A user-friendly interface built with Flask and HTML templates. Data Persistence: Store and retrieve data using JSON files.",
      category: "Web Development",
      duration: "4 Months",
      role: "Full Stack Developer",
      technologies: ["Python", "Flask", "HTML/CSS", "Arduino", "C++"],
      images: ["images/order.png", "images/kitchen.png"],
      github: "https://github.com/Dalemski/MARIO-AND-LUIGI-S-PIZZERIA",
      live: "#",
   },
};

projectDetailLinks.forEach((link) => {
   link.addEventListener("click", (e) => {
      e.preventDefault();
      const projectId = link.getAttribute("data-project");
      const project = projectsData[projectId];

      if (project) {
         // Update modal content
         document.querySelector(".modal-title").textContent = project.title;
         document.querySelector(".modal-description").textContent =
            project.description;

         // Check if project has images or video
         const modalVideo = document.querySelector(".modal-video");
         if (project.images) {
            modalVideo.innerHTML = `
               <div class="image-gallery">
                  <img src="${project.images[0]}" alt="Project image" class="gallery-image" />
                  <div class="gallery-nav">
                     ${project.images
                        .map(
                           (img, idx) =>
                              `<span class="gallery-dot ${idx === 0 ? "active" : ""}" data-index="${idx}"></span>`,
                        )
                        .join("")}
                  </div>
               </div>
            `;

            // Image gallery navigation
            let currentImageIndex = 0;
            const galleryImage = document.querySelector(".gallery-image");
            const galleryDots = document.querySelectorAll(".gallery-dot");

            function updateImage(index) {
               galleryImage.src = project.images[index];
               galleryDots.forEach((dot) => dot.classList.remove("active"));
               galleryDots[index].classList.add("active");
            }

            // Auto-rotate images every 4 seconds
            let imageInterval = setInterval(() => {
               currentImageIndex =
                  (currentImageIndex + 1) % project.images.length;
               updateImage(currentImageIndex);
            }, 4000);

            // Click on dots to manually navigate
            galleryDots.forEach((dot) => {
               dot.addEventListener("click", () => {
                  clearInterval(imageInterval);
                  currentImageIndex = parseInt(dot.getAttribute("data-index"));
                  updateImage(currentImageIndex);
                  // Restart auto-rotation after manual click
                  imageInterval = setInterval(() => {
                     currentImageIndex =
                        (currentImageIndex + 1) % project.images.length;
                     updateImage(currentImageIndex);
                  }, 4000);
               });
            });
         } else {
            modalVideo.innerHTML = `<iframe src="${project.videoUrl}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
         }

         const infoItems = document.querySelectorAll(".modal-info-item");
         infoItems[0].querySelector("p").textContent = project.category;
         infoItems[1].querySelector("p").textContent = project.duration;
         infoItems[2].querySelector("p").textContent = project.role;

         const techContainer = document.querySelector(
            ".modal-tech .project-tech",
         );
         techContainer.innerHTML = project.technologies
            .map((tech) => `<span>${tech}</span>`)
            .join("");

         const modal = document.getElementById("projectModal");
         const modalClose = document.querySelector(".modal-close");
         const modalBack = document.querySelector(".modal-back");

         modalBack.addEventListener("click", () => {
            modal.classList.remove("active");
            document.body.style.overflow = "auto";
         });

         const modalLinks = document.querySelectorAll(".modal-links .btn");
         if (project.github && project.github !== "#") {
            modalLinks[0].href = project.github;
            modalLinks[0].target = "_blank";
            modalLinks[0].rel = "noopener noreferrer";
            modalLinks[0].style.display = "inline-flex";
            modalLinks[0].style.pointerEvents = "auto";
         } else {
            modalLinks[0].style.display = "none";
         }

         if (project.live && project.live !== "#") {
            modalLinks[1].href = project.live;
            modalLinks[1].target = "_blank";
            modalLinks[1].rel = "noopener noreferrer";
            modalLinks[1].style.display = "inline-flex";
            modalLinks[1].style.pointerEvents = "auto";
         } else {
            modalLinks[1].style.display = "none";
         }

         // Show modal
         modal.classList.add("active");
         document.body.style.overflow = "hidden";
      }
   });
});

modalClose.addEventListener("click", () => {
   modal.classList.remove("active");
   document.body.style.overflow = "auto";
});

window.addEventListener("click", (e) => {
   if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
   }
});
modal.addEventListener("click", (e) => {
   if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
      document.querySelector(".modal-video iframe").src = "";
   }
});

document.addEventListener("keydown", (e) => {
   if (e.key === "Escape" && modal.classList.contains("active")) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
      document.querySelector(".modal-video iframe").src = "";
   }
});

// ========== CONTACT FORM ==========
// const contactForm = document.querySelector(".contact-form");

// contactForm.addEventListener("submit", (e) => {
//    e.preventDefault();

//    // Get form values
//    const formData = new FormData(contactForm);

//    // Here you would typically send the data to a server
//    // For now, we'll just show an alert
//    alert("Thank you for your message! I will get back to you soon.");

//    // Reset form
//    contactForm.reset();
// });

// ========== PARALLAX EFFECT ==========
window.addEventListener("scroll", () => {
   const scrolled = window.pageYOffset;
   const parallaxElements = document.querySelectorAll(".hero-content");

   parallaxElements.forEach((element) => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
   });
});

// ========== SKILL CARDS TILT EFFECT ==========
const skillCards = document.querySelectorAll(".skill-card");

skillCards.forEach((card) => {
   card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
   });

   card.addEventListener("mouseleave", () => {
      card.style.transform =
         "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
   });
});

// ========== PROJECT CARDS TILT EFFECT ==========
projectCards.forEach((card) => {
   card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
   });

   card.addEventListener("mouseleave", () => {
      card.style.transform =
         "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
   });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll("section[id]");

function activateNavLink() {
   const scrollY = window.pageYOffset;

   sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
         document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
               link.classList.add("active");
            }
         });
      }
   });
}

window.addEventListener("scroll", activateNavLink);

// ========== PRELOADER (Optional) ==========
window.addEventListener("load", () => {
   document.body.classList.add("loaded");
});

// ========== INTERSECTION OBSERVER FOR PERFORMANCE ==========
// Lazy load images
const images = document.querySelectorAll("img[data-src]");

const imageObserver = new IntersectionObserver((entries) => {
   entries.forEach((entry) => {
      if (entry.isIntersecting) {
         const img = entry.target;
         img.src = img.getAttribute("data-src");
         img.removeAttribute("data-src");
         imageObserver.unobserve(img);
      }
   });
});

images.forEach((img) => imageObserver.observe(img));

// ========== CONSOLE MESSAGE ==========
console.log(
   "%c👋 Hey there!",
   "font-size: 20px; font-weight: bold; color: #ff0055;",
);
console.log("%cWelcome to my portfolio!", "font-size: 16px; color: #00ffff;");
console.log(
   "%cIf you're checking the console, you might be the kind of person I'd love to work with!",
   "font-size: 14px; color: #a0a0a0;",
);
console.log(
   "%cFeel free to reach out: ivan.dalemski@email.com",
   "font-size: 14px; color: #ff00ff;",
);
