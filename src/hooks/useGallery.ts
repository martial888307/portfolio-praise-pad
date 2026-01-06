import { useState, useEffect } from "react";
import { fetchGalleryData, fetchCollections, ApiArtwork, ApiCollection } from "../services/api";
import { detectMedium } from "../utils/artworkHelper";
import { COLLECTION_CATEGORIES, CATEGORY_MAPPING } from "../data/collectionCategories";

export interface Collection {
    id: string;
    name: string;
    description?: string;
}

export function useGallery() {
    const [artworks, setArtworks] = useState<ApiArtwork[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
    const [selectedMedium, setSelectedMedium] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [availableMediums, setAvailableMediums] = useState<string[]>([]);

    // Initial load for collections
    useEffect(() => {
        async function loadCollections() {
            try {
                const apiCols = await fetchCollections();
                const mappedCols = apiCols.map((c: ApiCollection) => ({
                    id: c.id,
                    name: c.name,
                    description: c.description
                }));
                // Sort by name
                mappedCols.sort((a, b) => a.name.localeCompare(b.name));
                setCollections(mappedCols);
            } catch (err) {
                console.error("Failed to load collections", err);
                setCollections([]);
            }
        }
        loadCollections();
    }, []);

    // Handle Collection Change & Auto-selection
    useEffect(() => {
        if (!selectedCollectionId) {
            setAvailableMediums([]);
            setSelectedMedium("");
            setArtworks([]);
            return;
        }

        // Get static categories for this collection
        const rawCategories = COLLECTION_CATEGORIES[selectedCollectionId] || [];
        // Map to French values
        const mappedCategories = rawCategories.map(cat => CATEGORY_MAPPING[cat]).filter(Boolean);

        setAvailableMediums(mappedCategories);

        // Auto-select the first available medium
        if (mappedCategories.length > 0) {
            setSelectedMedium(mappedCategories[0]);
        } else {
            setSelectedMedium("");
        }
    }, [selectedCollectionId]);

    // Data Loading & Filtering
    useEffect(() => {
        // Only load if we have a collection selected
        if (!selectedCollectionId) return;

        async function loadData() {
            setLoading(true);
            setError(null);
            try {
                const colId = selectedCollectionId || "0";
                // Pass empty string for medium to fetch everything for the collection
                const data = await fetchGalleryData(colId, "");


                if (data && data.artworks) {
                    const loadedArtworks = data.artworks;

                    // Filter for display based on the selected medium
                    // Use the helper to detect medium for each artwork
                    if (selectedMedium) {
                        const filtered = loadedArtworks.filter(art => detectMedium(art) === selectedMedium);
                        setArtworks(filtered);
                    } else {
                        // Keep strict: if no medium is selected (shouldn't happen with auto-select unless empty), show all?
                        // Or show nothing? User said "auto-select first".
                        // Let's show all if for some reason no medium is selected but collection is.
                        setArtworks(loadedArtworks);
                    }
                } else {
                    setArtworks([]);
                }
            } catch (err: any) {
                console.error("Gallery load error:", err);
                setError("Impossible de charger la galerie.");
                setArtworks([]);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, [selectedCollectionId, selectedMedium]);

    return {
        artworks,
        collections,
        selectedCollectionId,
        setSelectedCollectionId,
        selectedMedium,
        setSelectedMedium,
        loading,
        error,
        availableMediums,
    };
}
