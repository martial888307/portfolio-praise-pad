import { useState, useEffect, useMemo, useCallback } from "react";
import { fetchGalleryData, fetchCollections, ApiArtwork, ApiCollection } from "../services/api";

export interface Collection {
    id: string;
    name: string;
    description?: string;
    order?: number;
}

/**
 * Extrait les médiums uniques à partir d'une liste d'œuvres.
 */
function extractUniqueMediums(artworks: ApiArtwork[]): string[] {
    const mediumsSet = new Set<string>();
    artworks.forEach(artwork => {
        if (artwork.technique) {
            mediumsSet.add(artwork.technique.toLowerCase());
        }
    });
    return Array.from(mediumsSet);
}

export function useGallery() {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
    const [selectedMedium, setSelectedMedium] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    // Cache de TOUTES les œuvres
    const [allArtworksCache, setAllArtworksCache] = useState<ApiArtwork[]>([]);
    const [allMediums, setAllMediums] = useState<string[]>([]);
    const [initialLoading, setInitialLoading] = useState(true);

    // Initial load: collections + ALL artworks
    useEffect(() => {
        async function loadInitialData() {
            setInitialLoading(true);
            setError(null);

            try {
                const [apiCols, allArtworksData] = await Promise.all([
                    fetchCollections(),
                    fetchGalleryData("0", "")
                ]);

                // Mapper et trier les collections par ordre
                const mappedCols = apiCols.map((c: ApiCollection) => ({
                    id: c.id,
                    name: c.name,
                    description: c.description,
                    order: c.order
                }));
                mappedCols.sort((a, b) => (a.order || 999) - (b.order || 999));
                setCollections(mappedCols);

                if (allArtworksData?.artworks) {
                    setAllArtworksCache(allArtworksData.artworks);
                    const uniqueMediums = extractUniqueMediums(allArtworksData.artworks);
                    console.log("[useGallery] Tous les médiums:", uniqueMediums);
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

    // Handler pour changement de collection (pas de reset automatique)
    const handleCollectionChange = useCallback((collectionId: string) => {
        setSelectedCollectionId(collectionId);
    }, []);

    // Handler pour changement de médium (pas de reset automatique)
    const handleMediumChange = useCallback((medium: string) => {
        setSelectedMedium(medium);
    }, []);

    // Collections filtrées : si médium sélectionné, ne montrer que les collections qui ont ce médium
    const availableCollections = useMemo(() => {
        if (!selectedMedium) return collections;

        const collectionIds = new Set(
            allArtworksCache
                .filter(art => art.technique?.toLowerCase() === selectedMedium.toLowerCase())
                .map(art => art.collection_id)
        );
        return collections.filter(c => collectionIds.has(c.id));
    }, [selectedMedium, allArtworksCache, collections]);

    // Médiums filtrés : si collection sélectionnée, ne montrer que les médiums de cette collection
    const availableMediums = useMemo(() => {
        if (!selectedCollectionId) return allMediums;

        const collectionArtworks = allArtworksCache.filter(
            art => art.collection_id === selectedCollectionId
        );
        return extractUniqueMediums(collectionArtworks);
    }, [selectedCollectionId, allArtworksCache, allMediums]);

    // Filtrage et tri des œuvres
    const artworks = useMemo(() => {
        // Si rien n'est sélectionné, pas d'œuvres (placeholder)
        if (!selectedCollectionId && !selectedMedium) {
            return [];
        }

        let filtered = allArtworksCache;

        // Filtre par collection
        if (selectedCollectionId) {
            filtered = filtered.filter(art => art.collection_id === selectedCollectionId);
        }

        // Filtre par médium
        if (selectedMedium) {
            filtered = filtered.filter(art =>
                art.technique?.toLowerCase() === selectedMedium.toLowerCase()
            );
        }

        // Tri par ordre de collection (utiliser l'ordre du backoffice)
        const collectionOrderMap = new Map(collections.map(c => [c.id, c.order || 999]));
        filtered.sort((a, b) => {
            const orderA = collectionOrderMap.get(a.collection_id) || 999;
            const orderB = collectionOrderMap.get(b.collection_id) || 999;
            return orderA - orderB;
        });

        return filtered;
    }, [allArtworksCache, selectedCollectionId, selectedMedium, collections]);

    return {
        artworks,
        collections,
        availableCollections,
        selectedCollectionId,
        handleCollectionChange,
        selectedMedium,
        handleMediumChange,
        loading: initialLoading,
        error,
        availableMediums,
    };
}
