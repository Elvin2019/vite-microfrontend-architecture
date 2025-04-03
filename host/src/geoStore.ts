import { create } from 'zustand';

export type Feature = { id: string; name: string; geometry: [number, number] };

export type GeoState = {
  features: Feature[];
  setFeatures: (features: Feature[]) => void;
};

// Create the store
export const useGeoStore = create<GeoState>((set) => ({
  features: [],
  setFeatures: (features) => set({ features }),
}));

// Add a default export for easier federation consumption
export default { useGeoStore };
