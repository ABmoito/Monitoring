// script.js

// Initialiser la carte Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYWhpamFiIiwiYSI6ImNtMjU2d2I5NjBvdmoydnF3Y25zcmVlMWcifQ.tG8-kMUEkhX664eTWvjpGQ'; // Remplacez par votre access token Mapbox

const map = new mapboxgl.Map({
    container: 'map', // ID du div dans lequel la carte sera affichée
    style: 'mapbox://styles/mapbox/streets-v11', // Style de la carte
    center: [0, 0], // Coordonnées initiales (remplacez par une valeur par défaut)
    zoom: 12 // Niveau de zoom initial
});

// Ajouter un contrôle de navigation
map.addControl(new mapboxgl.NavigationControl());

// Fonction pour obtenir la position de l'utilisateur
document.getElementById('getLocation').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            // Centrer la carte sur la position de l'utilisateur
            map.setCenter([longitude, latitude]);

            // Ajouter un marqueur pour la position de l'utilisateur
            new mapboxgl.Marker()
                .setLngLat([longitude, latitude])
                .addTo(map);

            // Remplir le champ d'emplacement avec les coordonnées
            document.getElementById('location').value = `Lat: ${latitude}, Lng: ${longitude}`;
        }, function() {
            alert('Erreur lors de la récupération de votre position.');
        });
    } else {
        alert('La géolocalisation n\'est pas supportée par votre navigateur.');
    }
});
