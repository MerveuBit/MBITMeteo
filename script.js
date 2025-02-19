// Tableau de correspondance des codes de pays aux noms
const countries = {
    "FR": "France",
    "US": "États-Unis",
    "GB": "Royaume-Uni",
    "DE": "Allemagne",
    "IT": "Italie",
    "ES": "Espagne",
    "CN": "Chine",
    "BI":"Burundi"
    // Ajoutez d'autres pays selon vos besoins
};

document.getElementById('searchBtn').addEventListener('click', function() {
    const city = document.getElementById('city').value.trim();
    const apiKey = '587448645ff6a827d66377405650a71c'; // Remplacez par votre clé API
    let url;

    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&lang=fr&units=metric`;
    } else {
        alert('Veuillez entrer une ville.');
        return;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ville non trouvée');
            }
            return response.json();
        })
        .then(data => {
            const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
            const countryName = countries[data.sys.country] || data.sys.country; // Récupération du nom du pays
            const weatherResult = `
                <h2>Météo à ${data.name}, ${countryName}</h2> <!-- Affichage du nom du pays -->
                <img src="${weatherIcon}" alt="Icône météo">
                <p>Température : ${data.main.temp} °C</p>
                <p>Conditions : ${data.weather[0].description}</p>
            `;
            document.getElementById('weatherResult').innerHTML = weatherResult;

            // Appel pour les prévisions
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&lang=fr&units=metric`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Prévisions non trouvées');
                    }
                    return response.json();
                })
                .then(data => {
                    let forecastHTML = '<h3>Prévisions sur 5 jours :</h3>';
                    data.list.forEach(item => {
                        const date = new Date(item.dt * 1000).toLocaleDateString();
                        const temp = item.main.temp;
                        const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                        forecastHTML += `
                            <div>
                                <p>${date}: ${temp} °C <img src="${icon}" alt="Icône météo"></p>
                            </div>
                        `;
                    });
                    document.getElementById('forecastResult').innerHTML = forecastHTML;
                })
                .catch(error => {
                    document.getElementById('forecastResult').innerHTML = `<p>${error.message}</p>`;
                });
        })
        .catch(error => {
            document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
        });
});

// Événement pour le bouton des coordonnées
document.getElementById('coordBtn').addEventListener('click', function() {
    const latitude = document.getElementById('latitude').value.trim();
    const longitude = document.getElementById('longitude').value.trim();
    const apiKey = 'VOTRE_CLE_API'; // Remplacez par votre clé API

    if (latitude && longitude) {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=fr&units=metric`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Coordonnées non trouvées');
                }
                return response.json();
            })
            .then(data => {
                const weatherIcon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                const countryName = countries[data.sys.country] || data.sys.country; // Récupération du nom du pays
                const weatherResult = `
                    <h2>Météo à ${data.name}, ${countryName}</h2> <!-- Affichage du nom du pays -->
                    <img src="${weatherIcon}" alt="Icône météo">
                    <p>Température : ${data.main.temp} °C</p>
                    <p>Conditions : ${data.weather[0].description}</p>
                `;
                document.getElementById('weatherResult').innerHTML = weatherResult;

                // Appel pour les prévisions
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&lang=fr&units=metric`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Prévisions non trouvées');
                        }
                        return response.json();
                    })
                    .then(data => {
                        let forecastHTML = '<h3>Prévisions sur 5 jours :</h3>';
                        data.list.forEach(item => {
                            const date = new Date(item.dt * 1000).toLocaleDateString();
                            const temp = item.main.temp;
                            const icon = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
                            forecastHTML += `
                                <div>
                                    <p>${date}: ${temp} °C <img src="${icon}" alt="Icône météo"></p>
                                </div>
                            `;
                        });
                        document.getElementById('forecastResult').innerHTML = forecastHTML;
                    })
                    .catch(error => {
                        document.getElementById('forecastResult').innerHTML = `<p>${error.message}</p>`;
                    });
            })
            .catch(error => {
                document.getElementById('weatherResult').innerHTML = `<p>${error.message}</p>`;
            });
    } else {
        alert('Veuillez entrer des coordonnées.');
    }
});