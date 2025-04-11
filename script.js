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

  // Inside your script.js, replace the existing form submit handler

if (inspectionForm) {
    inspectionForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Replace with your actual Deployed Google Apps Script Web App URL
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxq98p-qb0taSMcTmLGgaWGS-c0gQfxv1rQpwIkMhhk8yfeRFH2gwEfKk_QP5Pr1UFK/exec';
        const form = event.target; // Get the form element
        const submitButton = form.querySelector('button[type="submit"]');
        const formData = new FormData(form);

        // Optional: Disable button during submission
        if (submitButton) submitButton.disabled = true;
        if (submitButton) submitButton.textContent = 'Submitting...';


        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => response.json()) // Expect a JSON response from Apps Script
            .then(data => {
                console.log('Success:', data);
                if (data.result === 'success') {
                    alert("Thank you! Your request has been submitted successfully. Randy will contact you soon.");
                    form.reset(); // Clear the form
                    closeModal(); // Close the modal (if `closeModal` function is accessible here)
                } else {
                    // Log the detailed error from Apps Script if available
                    console.error('Submission Error:', data.error || 'Unknown error from script.');
                     alert("Oops! There was a problem submitting your request. Please try again or call Randy directly.");
                }
            })
            .catch(error => {
                console.error('Fetch Error:', error);
                alert("Oops! There was an error sending your request. Please check your internet connection or call Randy directly.");
            })
            .finally(() => {
                 // Re-enable button
                 if (submitButton) submitButton.disabled = false;
                 if (submitButton) submitButton.textContent = 'Submit Request';
            });
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
