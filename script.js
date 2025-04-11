document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Menu Toggle ---
    const menuButton = document.getElementById('mobile-menu-button');
    const navUl = document.querySelector('header nav ul');

    if (menuButton && navUl) {
        menuButton.addEventListener('click', () => {
            navUl.classList.toggle('active');
        });

        // Close menu if a nav link is clicked
        navUl.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navUl.classList.contains('active')) {
                    navUl.classList.remove('active');
                }
            });
        });
    }


    // --- Modal Logic ---
    const modal = document.getElementById('inspection-modal');
    const overlay = document.getElementById('modal-overlay');
    const openModalButtons = document.querySelectorAll('#open-inspection-modal, #open-inspection-modal-contact'); // Target both buttons
    const closeModalButton = document.getElementById('close-inspection-modal');
    const inspectionForm = document.getElementById('inspection-form');

    const openModal = () => {
        if (modal && overlay) {
            modal.classList.remove('hidden');
            overlay.classList.remove('hidden');
        }
    };

    const closeModal = () => {
        if (modal && overlay) {
            modal.classList.add('hidden');
            overlay.classList.add('hidden');
        }
    };

    if (openModalButtons.length > 0 && modal) {
        openModalButtons.forEach(button => {
            button.addEventListener('click', openModal);
        });
    }

    if (closeModalButton) {
        closeModalButton.addEventListener('click', closeModal);
    }

    if (overlay) {
        // Close modal if clicking outside the modal content
        overlay.addEventListener('click', closeModal);
    }

    // Prevent closing when clicking inside the modal content
    if (modal) {
        modal.addEventListener('click', (event) => {
            event.stopPropagation();
        });
    }

    // --- Form Submission Handling (Basic for Static Site) ---
    if (inspectionForm) {
        inspectionForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // **IMPORTANT:** For GitHub Pages (static), you can't process this server-side.
            // Option 1: Use a third-party service like Formspree (https://formspree.io/)
            //           - Set form action="YOUR_FORMSPREE_ENDPOINT" method="POST"
            //           - The form will submit to Formspree, which emails you.
            // Option 2: Display a simple confirmation message (as done here)
            alert("Thank you for your request! Randy will contact you soon to schedule your inspection.");
            closeModal(); // Close the modal after showing the message
            inspectionForm.reset(); // Clear the form fields

            // Option 3: Use mailto: (less reliable, exposes email)
            //           - Set form action="mailto:your.email@example.com" method="post" enctype="text/plain"
        });
    }


    // --- Footer: Update Copyright Year ---
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Optional: Smooth scrolling for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Don't prevent default for mobile menu links when menu is open
            if (this.closest('header nav ul.active')) {
                // Allow default behavior (link click closes menu)
            } else {
                 e.preventDefault(); // Prevent default jump only for section scrolls
            }


            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calculate offset if using a sticky header
                const headerOffset = document.querySelector('header')?.offsetHeight || 70; // Get header height or default
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

}); // End DOMContentLoaded