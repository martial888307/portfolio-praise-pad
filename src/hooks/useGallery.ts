import { useState, useEffect, useMemo } from "react";
import { fetchGalleryData, fetchCollections, ApiArtwork, ApiCollection } from "../services/api";

export interface Collection {
    id: string;
    name: string;
    description?: string;
    order?: number;
}

/**
 * Extrait les médiums uniques à partir d'une liste d'œuvres.
 * Utilise le champ `technique` de l'API s'il existe.
 */
function extractUniqueMediums(artworks: ApiArtwork[]): string[] {
    const mediumsSet = new Set<string>();

    artworks.forEach(artwork => {
        if (artwork.technique) {
            // Normaliser en lowercase pour éviter les doublons
            mediumsSet.add(artwork.technique.toLowerCase());
        }
    });

    return Array.from(mediumsSet);
}

export function useGallery() {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
    const [selectedMedium, setSelectedMedium] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Cache de TOUTES les œuvres (pour filtrage global et liste exhaustive des médiums)
    const [allArtworksCache, setAllArtworksCache] = useState<ApiArtwork[]>([]);
    const [allMediums, setAllMediums] = useState<string[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);

    // Initial load: collections + ALL artworks (for exhaustive medium list)
    useEffect(() => {
        async function loadInitialData() {
            setInitialLoading(true);
            setError(null);

            try {
                // Charger collections et toutes les œuvres en parallèle
                const [apiCols, allArtworksData] = await Promise.all([
                    fetchCollections(),
                    fetchGalleryData("0", "") // collection_id=0 = toutes les œuvres
                ]);

                // Mapper et trier les collections
                const mappedCols = apiCols.map((c: ApiCollection) => ({
                    id: c.id,
                    name: c.name,
                    description: c.description,
                    order: c.order
                }));
                mappedCols.sort((a, b) => (a.order || 999) - (b.order || 999));
                setCollections(mappedCols);

                // Stocker toutes les œuvres et extraire les médiums
                if (allArtworksData?.artworks) {
                    setAllArtworksCache(allArtworksData.artworks);
                    const uniqueMediums = extractUniqueMediums(allArtworksData.artworks);
                    console.log("[useGallery] Tous les médiums disponibles:", uniqueMediums);
                    setAllMediums(uniqueMediums);
                }
            } catch (err: any) {
                console.error("Failed to load initial data", err);
                setError("Impossible de charger les données.");
            } finally {
                setInitialLoading(false);
            }
        }

        loadInitialData();
    }, []);

    // Calcul des médiums disponibles selon le contexte
    const availableMediums = useMemo(() => {
        if (selectedCollectionId) {
            // Si une collection est sélectionnée, montrer uniquement les médiums de cette collection
            const collectionArtworks = allArtworksCache.filter(
                art => art.collection_id === selectedCollectionId
            );
            return extractUniqueMediums(collectionArtworks);
        }
        // Sinon, montrer tous les médiums disponibles
        return allMediums;
    }, [selectedCollectionId, allArtworksCache, allMediums]);

    // Filtrage des œuvres selon les critères sélectionnés
    const artworks = useMemo(() => {
        let filtered = allArtworksCache;

        // Filtre par collection (si sélectionnée)
        if (selectedCollectionId) {
            filtered = filtered.filter(art => art.collection_id === selectedCollectionId);
        }

        // Filtre par médium (si sélectionné)
        if (selectedMedium) {
            filtered = filtered.filter(art =>
                art.technique?.toLowerCase() === selectedMedium.toLowerCase()
            );
        }

        return filtered;
    }, [allArtworksCache, selectedCollectionId, selectedMedium]);

    // Reset du médium si le médium sélectionné n'est plus disponible
    useEffect(() => {
        if (selectedMedium && !availableMediums.includes(selectedMedium)) {
            setSelectedMedium("");
        }
    }, [availableMediums, selectedMedium]);

    return {
        artworks,
        collections,
        selectedCollectionId,
        setSelectedCollectionId,
        selectedMedium,
        setSelectedMedium,
        loading: initialLoading || loading,
        error,
        availableMediums,
    };
}
