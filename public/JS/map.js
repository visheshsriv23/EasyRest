// map.js
const map = new maplibregl.Map({
    container: 'map',
    style: `https://api.jawg.io/styles/jawg-sunny.json?access-token=${mapToken}`,
    center: listing.geometry.coordinates, // Now dynamic! [lng, lat]
    zoom: 9,
    trackResize: false
});

const el = document.createElement("div");
el.className = "marker";
el.innerHTML = `
    <i class="fa-solid fa-thumbtack pin"></i>
    <i class="fa-regular fa-compass compass"></i>
`; 

el.addEventListener("click", () => {
    window.alert(`Location of this listing is in [${listing.location}]`);
});
new maplibregl.Marker({ className: "marker",
        element: el,})
    .setLngLat(listing.geometry.coordinates)
    .setPopup(
        new maplibregl.Popup({ offset: 25 })
        .setHTML(`<h4>${listing.location}</h4>`)
    )
    .addTo(map);