import { useState, useEffect } from "react";
import { fetchGalleryData, ApiArtwork } from "../services/api";

export interface Collection {
    id: string;
    name: string;
}

export function useGallery() {
    const [artworks, setArtworks] = useState<ApiArtwork[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
    const [selectedMedium, setSelectedMedium] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initial load to get all artworks and extract collections
    useEffect(() => {
        async function init() {
            try {
                setLoading(true);
                // Fetch all artworks initially (empty collection_id)
                const data = await fetchGalleryData("", "");

                if (data && data.artworks) {
                    setArtworks(data.artworks);

                    // Extract unique collections from the full dataset
                    const uniqueCollections = new Map<string, string>();
                    data.artworks.forEach((art) => {
                        if (art.collection_id && art.collection_name) {
                            uniqueCollections.set(art.collection_id, art.collection_name);
                        }
                    });

                    const sortedCols = Array.from(uniqueCollections.entries())
                        .map(([id, name]) => ({ id, name }))
                        .sort((a, b) => a.name.localeCompare(b.name));

                    setCollections(sortedCols);
                }
            } catch (err: any) {
                setError(err.message || "Erreur de chargement");
            } finally {
                setLoading(false);
            }
        }
        init();
    }, []);

    // Handle filtering
    useEffect(() => {
        // Avoid double fetching on initial mount if we want, but 
        // the previous implementation refreshed on filter change.
        // To mimic previous behavior but cleaner:
        // If it's the very first load, the init effect handles it.
        // But actually, simpler is to just let this effect handle ALL fetching 
        // IF we didn't need to extract all collections from the "All" view first.
        // Since we need the list of collections based on "All" artworks, we keep the detached init logic 
        // OR we change the API to give us collections (which the PHP might not do).

        // Let's rely on the separate fetch for filtering, but skip if we are in the initial loading state 
        // to avoid race conditions with the init fetch.
        if (loading && artworks.length === 0) return;

        async function applyFilters() {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchGalleryData(selectedCollectionId, selectedMedium);
                if (data && data.artworks) {
                    setArtworks(data.artworks);
                } else {
                    setArtworks([]);
                }
            } catch (err: any) {
                setError("Erreur de filtrage");
                setArtworks([]);
            } finally {
                setLoading(false);
            }
        }

        applyFilters();
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
    };
}
