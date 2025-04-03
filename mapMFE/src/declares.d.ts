declare module 'host/geoStore' {
    import { StoreApi } from 'zustand';
    
    type Feature = { 
      id: string; 
      name: string; 
      geometry: [number, number];
    };
    
    type GeoState = {
      features: Feature[];
      setFeatures: (features: Feature[]) => void;
    };
    
    export const useGeoStore: StoreApi<GeoState> & {
      getState: () => GeoState;
      setState: (partial: Partial<GeoState>) => void;
      subscribe: <U>(
        selector: (state: GeoState) => U,
        listener: (selectedState: U, previousSelectedState: U) => void
      ) => () => void;
    };
  }
  