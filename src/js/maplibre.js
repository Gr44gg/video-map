import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'

export async function initMap (container) {
    const map = new maplibregl.Map({
        container: container,
        style: 'https://demotiles.maplibre.org/style.json', 
        center: [-74.5, 40], 
        zoom: 9 
        });   

        const response = await fetch('https://gist.githubusercontent.com/Gr44gg/388ca705b6c97b0d29380ec0272521dd/raw/003f8d5f0a4fbde02ee0f39db011ec7b890fc411/data.geojson')
        const data = await response.json()
        
        map.on('load', async () => {
            map.loadImage(
                'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png',
                (error, image) => {
                if (error) throw error;
                map.addImage('marker', image)
            })
            map.addSource('data', {
                'type': 'geojson',
                'data': data
            });
            map.addLayer({
                'id': 'polygons',
                'type': 'fill',
                'source': 'data',
                'paint': {
                'fill-color': '#888888',
                'fill-opacity': 0.4
                },
                'filter': ['==', '$type', 'Polygon']
            });
            map.addLayer({
                'id': 'lines',
                'type': 'line',
                'source': 'data',
                'paint': {
                'line-color': 'red',
                'line-width': 14,
                },
                'filter': ['==', '$type', 'LineString']
            });  
            map.addLayer({
                'id': 'markers',
                'type': 'symbol',
                'source': 'data',
                'layout': {
                    'icon-image': 'marker',
                },
                'filter': ['==', '$type', 'Point']
            });     
            
            const bounds = bbox(data)
            map.fitBounds(bounds)
        })
                         
    return map    
}