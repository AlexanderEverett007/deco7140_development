import { postFormData } from "./modules/postFormData.js"; // 你已有的 POST 模块
// js/genericeventForm.js
const API_URL =
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/";
const HEADERS = {
    student_number: "s4906205", // Your student number
    uqcloud_zone_id: "fd22064f", // Your uqcloud zone ID
};

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("event-form");
    const feedback = document.getElementById("form-feedback");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        feedback.textContent = "Submitting...";

        const formData = new FormData(form);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: HEADERS,
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                feedback.textContent =
                    data.message || "Event added successfully!";
                form.reset();
            } else {
                feedback.textContent = data.message || "Something went wrong.";
            }
        } catch (error) {
            console.error("Error:", error);
            feedback.textContent = "Error submitting form.";
        }
    });
});
