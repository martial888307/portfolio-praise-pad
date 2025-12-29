import { useState, useEffect } from "react";
import { fetchGalleryData, ApiArtwork } from "../services/api";

export interface Collection {
    id: string;
    name: string;
}

// Static list of collections based on User documentation
const STATIC_COLLECTIONS: Collection[] = [
    { id: "1", name: "Arts cyniques et Homme dentelle" },
    { id: "3", name: "L'oeuf Story" },
    { id: "22", name: "Dis-moi des poèmes" },
    { id: "26", name: "L'ombre des hommes" },
    { id: "36", name: "Au fond de la mère" }
];

export function useGallery() {
    const [artworks, setArtworks] = useState<ApiArtwork[]>([]);
    const [collections] = useState<Collection[]>(STATIC_COLLECTIONS);
    const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
    const [selectedMedium, setSelectedMedium] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

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
