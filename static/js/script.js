document.addEventListener("DOMContentLoaded", () => {
    // Select all accordion headers
    const headers = document.querySelectorAll(".accordion-header");

    // Add click event listener to each header
    headers.forEach((header) => {
        header.addEventListener("click", () => {
            const content = header.nextElementSibling;
            const icon = header.querySelector(".icon");

            // Collapse all other active items
            document.querySelectorAll(".accordion-content.active").forEach((activeContent) => {
                if (activeContent !== content) {
                    activeContent.classList.remove("active");
                    activeContent.style.maxHeight = null;
                }
            });

            // Toggle the clicked accordion
            content.classList.toggle("active");
            header.classList.toggle("active");

            // Rotate arrow icon
            if (content.classList.contains("active")) {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.textContent = "▲"; // Arrow up
            } else {
                content.style.maxHeight = null;
                icon.textContent = "▼"; // Arrow down
            }
        });
    });
});
