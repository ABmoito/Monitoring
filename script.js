// Initialiser la carte Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiYWhpamFiIiwiYSI6ImNtMjU2d2I5NjBvdmoydnF3Y25zcmVlMWcifQ.tG8-kMUEkhX664eTWvjpGQ'; // Remplacez par votre access token Mapbox

const map = new mapboxgl.Map({
    container: 'map', // ID du div dans lequel la carte sera affichée
    style: 'mapbox://styles/mapbox/satellite-v9', // Style satellite de la carte
    center: [3.525, 50.358], // Coordonnées de Valenciennes (longitude, latitude)
    zoom: 12 // Niveau de zoom initial
});

// Ajouter un contrôle de navigation
map.addControl(new mapboxgl.NavigationControl());

// Ajouter un contrôle de localisation
const geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
map.addControl(geolocate);

// Lorsque l'utilisateur clique sur le bouton de localisation
geolocate.on('geolocate', function(event) {
    const latitude = event.coords.latitude;
    const longitude = event.coords.longitude;

    // Centrer la carte sur la position de l'utilisateur
    map.setCenter([longitude, latitude]);

    // Ajouter un marqueur pour la position de l'utilisateur
    new mapboxgl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);

    // Remplir le champ d'emplacement avec les coordonnées
    document.getElementById('location').value = `Lat: ${latitude}, Lng: ${longitude}`;
});

// Fonction pour obtenir la position de l'utilisateur par un bouton
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

// Écouter les clics sur la carte pour ajouter un marqueur
map.on('click', function(e) {
    const coordinates = e.lngLat;

    // Ajouter un marqueur à l'endroit où l'utilisateur a cliqué
    new mapboxgl.Marker()
        .setLngLat(coordinates)
        .addTo(map);

    // Remplir le champ d'emplacement avec les coordonnées du clic
    document.getElementById('location').value = `Lat: ${coordinates.lat}, Lng: ${coordinates.lng}`;
});
