// Fetch the phone number dynamically from FastAPI
fetch("/get_phone_number")
    .then(response => response.json())
    .then(data => {
        const phoneNumber = data.phone_number;

        document.getElementById("book-button").addEventListener("click", function () {
            const name = document.getElementById("name").value;
            const date = document.getElementById("date").value;
            const time = document.getElementById("time").value;
            const service = document.getElementById("service").value;

            if (!name || !date || !time || !service) {
                alert("Please fill in all the details!");
                return;
            }

            const message = `Hi, I would like to book an appointment.\nName: ${name}\nDate: ${date}\nTime: ${time}\nService: ${service}`;
            const encodedMessage = encodeURIComponent(message);
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            document.getElementById("whatsapp-link").href = whatsappLink;
            window.open(whatsappLink, "_blank");
        });
    })
    .catch(error => console.error("Error fetching phone number:", error));
