// Initialize the map centered on the US
const map = L.map('map').setView([32.5, -95], 5); // Centered on the US
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
   maxZoom: 19,
   attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Function to generate a random coordinate within a range
function getRandomInRange(from, to, fixed) {
   return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

// Generate three sets of random coordinates
const coordinates = [
   { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
   { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) },
   { lat: getRandomInRange(30, 35, 3), lng: getRandomInRange(-90, -100, 3) }
];

// Container for displaying marker information
const markerInfoContainer = document.getElementById('marker-info-container');

// Function to fetch locality data for given coordinates
async function fetchLocality(lat, lng) {
   const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`);
   const data = await response.json();
   return data.locality || data.city || data.principalSubdivision || data.countryName || 'Locality not found';
}

// Add markers and display locality information
async function addMarkers() {
   for (let i = 0; i < coordinates.length; i++) {
      const { lat, lng } = coordinates[i];

      // Add a marker to the map
      L.marker([lat, lng]).addTo(map);

      // Display coordinates
      const markerInfo = document.createElement('div');
      markerInfo.innerHTML = `<strong>Marker ${i + 1}:</strong> Latitude: ${lat}, Longitude: ${lng}`;
      markerInfoContainer.appendChild(markerInfo);

      // Fetch and display locality
      const locality = await fetchLocality(lat, lng);
      markerInfo.innerHTML += `<p>Locality: ${locality}</p>`;
   }
}

// Run the function to add markers
addMarkers();