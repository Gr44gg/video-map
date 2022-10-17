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
            map.addSource('data', {
                type: 'geojson',
                data: data
            });
            map.addLayer({
                'id': 'park-boundary',
                'type': 'fill',
                'source': 'data',
                'paint': {
                'fill-color': '#888888',
                'fill-opacity': 0.4
                },
                'filter': ['==', '$type', 'Polygon']
            });
            map.addLayer({
                type: 'line',
                source: 'data',
                id: 'line',
                paint: {
                'line-color': 'red',
                'line-width': 14,
                },
                'filter': ['==', '$type', 'LineString']
            });  
            map.addLayer({
                'id': 'park-volcanoes',
                'type': 'circle',
                'source': 'data',
                'paint': {
                'circle-radius': 6,
                'circle-color': 'blue'
                },
                'filter': ['==', '$type', 'Point']
            });     
            
            const bounds = bbox(data)
            map.fitBounds(bounds)
        })
                         
    return map    
}