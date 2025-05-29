import { fetchGetData } from "./modules/getData.js"; // 你已有的 GET 模块

// js/getGenericeventData.js

// API base URL and headers
const API_URL =
    "https://damp-castle-86239-1b70ee448fbd.herokuapp.com/decoapi/genericevent/";
const HEADERS = {
    student_number: "s4906205", // 学号
    uqcloud_zone_id: "fd22064f", // uqcloud 区域ID
};

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById("events-container");
    container.textContent = "Loading events...";

    try {
        const response = await fetch(API_URL, {
            method: "GET",
            headers: HEADERS,
        });

        const data = await response.json();

        if (response.ok) {
            container.innerHTML = ""; // 清空加载文字

            if (Array.isArray(data) && data.length > 0) {
                const recentEvents = data
                    .sort(
                        (a, b) => new Date(a.date_time) - new Date(b.date_time)
                    ) // 按时间从新到旧排序
                    .slice(-3); // 只保留前三条

                recentEvents.forEach((event) => {
                    const eventDiv = document.createElement("div");
                    eventDiv.className = "event-card"; // 引用外部 CSS 中定义的 class

                    eventDiv.innerHTML = `
            <h2>${event.event_name}</h2>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Organiser:</strong> ${event.organiser}</p>
            <p><strong>Type:</strong> ${event.event_type}</p>
            <p><strong>Description:</strong> ${event.description}</p>
            <p><strong>Date & Time:</strong> ${new Date(
                event.date_time
            ).toLocaleString()}</p>
            <p><strong>Website Code:</strong> ${event.website_code || "N/A"}</p>
            ${
                event.genericevent_photo
                    ? `<img src="${event.genericevent_photo}" alt="Event Photo" style="max-width: 300px;">`
                    : `<p><em>No photo provided.</em></p>`
            }
          `;
                    container.appendChild(eventDiv);
                });
            } else {
                container.textContent = "No events found.";
            }
        } else {
            container.textContent = data.message || "Failed to fetch events.";
        }
    } catch (error) {
        console.error("Error:", error);
        container.textContent = "Error loading events.";
    }
});
