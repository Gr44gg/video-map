import bbox from '@turf/bbox'
import { useStore } from '../stores/store';

export async function initMap (container) {
    const maplibregl = await import ('maplibre-gl')
    const map = new maplibregl.Map({
        container: container,
        style: {
            'version': 8,
            'sources': {
            'satellite': {
              'type': 'raster',
              'tiles': [
                'https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}'
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

    const loadImageAsPromise = (map, url) => {
        return new Promise((resolve, reject) => {
          map.loadImage(url, (error, image) => {
            if (error) reject(error)
            resolve(image)
          })
        })
    }
    
    const response = await fetch('https://gist.githubusercontent.com/Gr44gg/388ca705b6c97b0d29380ec0272521dd/raw/003f8d5f0a4fbde02ee0f39db011ec7b890fc411/data.geojson')
    const data = await response.json()  

    map.on('load', async () => {
        const marker = await loadImageAsPromise(map, 'https://docs.mapbox.com/mapbox-gl-js/assets/custom_marker.png')
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
            'line-width': 12,
            },
            'filter': ['==', '$type', 'LineString']
        });  
        map.addImage('marker', marker)        
        map.addLayer({
            'id': 'markers',
            'type': 'symbol',
            'source': 'data',
            'layout': {
                'icon-image': 'marker',
            },
            'filter': ['==', '$type', 'Point']
        });     

        map.on('mousemove', (e) => {
          if (e.defaultPrevented === false) {
            map.getCanvas().style.cursor = "grab";
          }
        })

        const layers = ['polygons', 'lines', 'markers']
        
        layers.forEach((layer) => {
          map.on("mousemove", layer, (e) => {
              e.preventDefault()
              map.getCanvas().style.cursor = "pointer"
          })            
        })
        
        map.on("click", (e) => {
            const store = useStore()
            store.$reset()
            let f = map.queryRenderedFeatures(e.point, {layers:layers})
            if (f.length) {
              if (f[0].properties.has_video) {
                store.popup.has_video = true
              } else store.popup.id = f[0].properties.id 
              store.popup.show = true
            } 
          });        
        
        const bounds = bbox(data)
        map.fitBounds(bounds)
    })
                         
    return map    
}