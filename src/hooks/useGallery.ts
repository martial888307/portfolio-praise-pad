import { useState, useEffect } from "react";
import { fetchGalleryData, fetchCollections, ApiArtwork, ApiCollection } from "../services/api";

export interface Collection {
    id: string;
    name: string;
}

export function useGallery() {
    const [artworks, setArtworks] = useState<ApiArtwork[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
    const [selectedMedium, setSelectedMedium] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Initial load for collections
    useEffect(() => {
        async function loadCollections() {
            try {
                const apiCols = await fetchCollections();
                const mappedCols = apiCols.map((c: ApiCollection) => ({
                    id: c.id,
                    name: c.name
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

    useEffect(() => {
        // If nothing is selected, we don't fetch anything -> Gallery component shows placeholder
        if (!selectedCollectionId && !selectedMedium) {
            setArtworks([]);
            return;
        }

        async function loadData() {
            setLoading(true);
            setError(null);
            try {
                // Pass "0" if selectedCollectionId is empty string, handled by api.ts or here
                // api.ts handles empty string as "0" if we pass it, but let's be explicit
                const colId = selectedCollectionId || "0";

                const data = await fetchGalleryData(colId, selectedMedium);

                if (data && data.artworks) {
                    setArtworks(data.artworks);
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
    };
}
