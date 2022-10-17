import maplibregl from 'maplibre-gl'
import bbox from '@turf/bbox'

export async function initMap (container) {
    const map = new maplibregl.Map({
        container: container,
        
        style: 'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
        style: {
            'version': 8,
            'sources': {
            'satellite': {
              'type': 'raster',
              'tiles': [
                'http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
              ],
              'tileSize': 256,
              'attribution': 'Google'
            }
            },
            'layers': [
              {
              'id': 'satellite',
              'type': 'raster',
              'source': 'satellite',
              'minzoom': 0,
              'maxzoom': 20
              }
            ]
            },
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
                'fill-color': 'yellow',
                'fill-opacity': 0.3
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