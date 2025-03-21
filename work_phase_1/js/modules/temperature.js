document.addEventListener("DOMContentLoaded", () => {
    const temperatureValue = document.getElementById("temperature-value");

    if (!temperatureValue) {
        console.error(" Error: temperature-value element not found!");
        return;
    }

    async function fetchTemperature() {
        try {
            const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=37.7749&longitude=-122.4194&current_weather=true");
            const data = await response.json();

            if (data.current_weather) {
                temperatureValue.textContent = data.current_weather.temperature;
            } else {
                temperatureValue.textContent = "Error";
            }
        } catch (error) {
            console.error("Error fetching temperature:", error);
            temperatureValue.textContent = "Error";
        }
    }

    fetchTemperature();
});