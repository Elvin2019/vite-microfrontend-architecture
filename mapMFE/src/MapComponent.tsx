import { SetStateAction, useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature, Feature as OLFeature } from 'ol';
import Point from 'ol/geom/Point';
import { Style, Circle, Fill, Stroke } from 'ol/style';

// Global reference to map instance for external access
let mapInstance: Map | null = null;

const MapComponent = () => {
  const mapElement = useRef<HTMLDivElement>(null);
  const [features, setFeatures] = useState<any[]>([]);

  // Load the store dynamically and subscribe to changes
  useEffect(() => {
    let unsub: () => void;
  
    const load = async () => {
      const mod = await import('host/geoStore');
      const useGeoStore = mod.default?.useGeoStore || mod.useGeoStore;
  
      unsub = useGeoStore.subscribe(
        (state) => {
          console.log('✅ Zustand features updated:', state.features);
          setFeatures(state.features);
        },
        (state: unknown) => (state as { features: unknown[] }).features
      );
    };
  
    load();
  
    return () => {
      unsub?.();
    };
  }, []);

  // Initialize OpenLayers map
  useEffect(() => {
    if (!mapElement.current || mapInstance) return;

    const map = new Map({
      target: mapElement.current,
      layers: [new TileLayer({ source: new OSM() })],
      controls: [], // This removes all default controls
      view: new View({
        center: [0, 0],
        zoom: 2,
      }),
    });

    mapInstance = map;
    console.log('🗺️ Map initialized');

    return () => {
      map.setTarget(undefined); // Clean up map instance on unmount
      mapInstance = null;
    };
  }, []);

  // Update map when features change
  useEffect(() => {
    if (!mapInstance || !features.length) return;
    
    console.log('Updating map with features:', features);
    
    // Create a vector source and layer if they don't exist
    let vectorSource = (mapInstance.getLayers().getArray().find(
      layer => layer.get('name') === 'features'
    ) as VectorLayer<VectorSource<Feature>> | undefined)?.getSource();
    
    if (!vectorSource) {
      console.log('Creating new vector layer');
      vectorSource = new VectorSource();
      const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: new Style({
          image: new Circle({
            radius: 8,
            fill: new Fill({ color: '#FF0000' }),
            stroke: new Stroke({ color: '#000000', width: 1 })
          })
        })
      });
      vectorLayer.set('name', 'features');
      mapInstance.addLayer(vectorLayer);
    } else {
      // Clear existing features
      vectorSource.clear();
    }
    
    // Add new features to the map
    const olFeatures = features.map(f => {
      const olFeature = new OLFeature({
        geometry: new Point(f.geometry),
        name: f.name,
        id: f.id
      });
      olFeature.setId(f.id);
      return olFeature;
    });
    
    vectorSource.addFeatures(olFeatures);
    
    // Zoom to features extent
    const extent = vectorSource.getExtent();
    if (extent && extent.some(x => x !== Infinity && x !== -Infinity)) {
      mapInstance.getView().fit(extent, { padding: [50, 50, 50, 50], duration: 500, maxZoom: 10 });
    }
    
  }, [features]);

  // Export map instance for external use

  return (
    <div>
      <h3>🗺️ Map MFE ({features.length} features)</h3>
      <div ref={mapElement} style={{ height: 400, width: '100%', border: '1px solid black' }} />
    </div>
  );
};

export default MapComponent;
