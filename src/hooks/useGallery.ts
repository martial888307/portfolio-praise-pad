import { useState, useEffect } from "react";
import { fetchGalleryData, fetchCollections, ApiArtwork, ApiCollection } from "../services/api";
import { detectMedium, getAvailableMediums } from "../utils/artworkHelper";

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

    const [availableMediums, setAvailableMediums] = useState<string[]>([]);

    useEffect(() => {
        // If nothing is selected, we don't fetch anything -> Gallery component shows placeholder
        if (!selectedCollectionId && !selectedMedium) {
            setArtworks([]);
            setAvailableMediums([]);
            return;
        }

        async function loadData() {
            setLoading(true);
            setError(null);
            try {
                // Client-side filtering strategy:
                // 1. Always fetch ALL artworks for the collection (medium="")
                // 2. Determine available mediums from the full list
                // 3. Filter the displayed artworks client-side if a specific medium is selected

                const colId = selectedCollectionId || "0";
                // Pass empty string for medium to fetch everything
                const data = await fetchGalleryData(colId, "");

                if (data && data.artworks) {
                    const allArtworks = data.artworks;

                    // distinct mediums in this collection
                    const available = getAvailableMediums(allArtworks);
                    setAvailableMediums(available);

                    // Filter for display
                    if (selectedMedium) {
                        const filtered = allArtworks.filter(art => detectMedium(art) === selectedMedium);
                        setArtworks(filtered);
                    } else {
                        setArtworks(allArtworks);
                    }
                } else {
                    setArtworks([]);
                    setAvailableMediums([]);
                }
            } catch (err: any) {
                console.error("Gallery load error:", err);
                setError("Impossible de charger la galerie.");
                setArtworks([]);
                setAvailableMediums([]);
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
