// FILTER CARS

const filterButtons = document.querySelectorAll(".filter");
const carCards = document.querySelectorAll(".car-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const category = button.dataset.filter;

        carCards.forEach(card => {
            if (
                category === "all" ||
                card.dataset.category === category
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


// BOOKING BUTTONS
const pickup = document.getElementById("pickupDate");
const returnDate = document.getElementById("returnDate");
const totalPrice = document.getElementById("totalPrice");

const prices = {
    "Volkswagen Polo": 90,
    "BMW Série 3": 180,
    "Range Rover": 250
};

function calculatePrice() {
    const start = new Date(pickup.value);
    const end = new Date(returnDate.value);

    const car = carChoice.value;

    if (!pickup.value || !returnDate.value || !car) {
        totalPrice.textContent = "0 DT";
        return;
    }

    const days = Math.round(
        (end - start) / (1000 * 60 * 60 * 24)
    );

    if (days <= 0) {
        totalPrice.textContent = "Dates invalides";
        return;
    }

    totalPrice.textContent =
        (days * prices[car]) + " DT";
}

pickup.addEventListener("change", calculatePrice);
returnDate.addEventListener("change", calculatePrice);
carChoice.addEventListener("change", calculatePrice);

bookingForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = customerName.value.trim();
    const phone = customerPhone.value.trim();
    const car = carChoice.value;

    if (!/^[0-9+\s()-]{8,20}$/.test(phone)) {
        alert("Veuillez vérifier votre numéro de téléphone.");
        return;
    }

    const start = new Date(pickup.value);
    const end = new Date(returnDate.value);
    const days = Math.round((end - start) / 86400000);

    if (days <= 0) {
        alert("La date de retour doit être après la date de départ.");
        return;
    }

    const amount = days * prices[car];

    const message =
        `Bonjour, je souhaite réserver une voiture.\n` +
        `Nom: ${name}\n` +
        `Téléphone: ${phone}\n` +
        `Voiture: ${car}\n` +
        `Départ: ${pickup.value}\n` +
        `Retour: ${returnDate.value}\n` +
        `Durée: ${days} jours\n` +
        `Prix estimé: ${amount} DT`;

    // Remplace ce numéro par celui de l'agence,
    // avec l'indicatif international, sans + ni espaces.
    const agencyPhone = "21624205773";

    const whatsappURL =
        "https://wa.me/" + agencyPhone +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
});