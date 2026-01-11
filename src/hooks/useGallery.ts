import { useState, useEffect, useRef } from "react";
import { fetchGalleryData, fetchCollections, ApiArtwork, ApiCollection } from "../services/api";

export interface Collection {
    id: string;
    name: string;
    description?: string;
    order?: number;
}

/**
 * Extrait les médiums uniques à partir d'une liste d'œuvres.
 * Utilise le champ `medium` de l'API s'il existe.
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
    const [artworks, setArtworks] = useState<ApiArtwork[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
    const [selectedMedium, setSelectedMedium] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [availableMediums, setAvailableMediums] = useState<string[]>([]);

    // Cache des œuvres de la collection sélectionnée
    const [collectionArtworksCache, setCollectionArtworksCache] = useState<ApiArtwork[]>([]);

    // Ref pour éviter les appels multiples pendant le chargement
    const loadingCollectionRef = useRef<string | null>(null);

    // Initial load for collections
    useEffect(() => {
        async function loadCollections() {
            try {
                const apiCols = await fetchCollections();
                const mappedCols = apiCols.map((c: ApiCollection) => ({
                    id: c.id,
                    name: c.name,
                    description: c.description,
                    order: c.order
                }));
                // Sort by API order
                mappedCols.sort((a, b) => (a.order || 999) - (b.order || 999));
                setCollections(mappedCols);
            } catch (err) {
                console.error("Failed to load collections", err);
                setCollections([]);
            }
        }
        loadCollections();
    }, []);

    // Charger les œuvres de la collection et extraire les médiums
    useEffect(() => {
        // Reset si pas de collection sélectionnée
        if (!selectedCollectionId) {
            setAvailableMediums([]);
            setSelectedMedium("");
            setArtworks([]);
            setCollectionArtworksCache([]);
            return;
        }

        // Éviter les appels multiples pour la même collection
        if (loadingCollectionRef.current === selectedCollectionId) {
            return;
        }

        async function loadCollectionData() {
            loadingCollectionRef.current = selectedCollectionId;
            setLoading(true);
            setError(null);

            try {
                // Récupérer toutes les œuvres de la collection (sans filtre medium)
                const data = await fetchGalleryData(selectedCollectionId, "");

                if (data?.artworks) {
                    const loadedArtworks = data.artworks;

                    // Mettre en cache les œuvres
                    setCollectionArtworksCache(loadedArtworks);

                    // Extraire les médiums uniques depuis le champ medium de l'API
                    const uniqueMediums = extractUniqueMediums(loadedArtworks);
                    console.log("[useGallery] Médiums extraits:", uniqueMediums);

                    setAvailableMediums(uniqueMediums);

                    // Auto-sélectionner le premier medium s'il y en a
                    if (uniqueMediums.length > 0) {
                        setSelectedMedium(uniqueMediums[0]);
                    } else {
                        // Si aucun medium trouvé, montrer toutes les œuvres
                        setSelectedMedium("");
                        setArtworks(loadedArtworks);
                    }
                } else {
                    setCollectionArtworksCache([]);
                    setAvailableMediums([]);
                    setSelectedMedium("");
                    setArtworks([]);
                }
            } catch (err: any) {
                console.error("Gallery load error:", err);
                setError("Impossible de charger la galerie.");
                setArtworks([]);
            } finally {
                setLoading(false);
                loadingCollectionRef.current = null;
            }
        }

        loadCollectionData();
    }, [selectedCollectionId]);

    // Filtrage local des œuvres par medium (depuis le cache)
    useEffect(() => {
        // Ne rien faire si pas de collection ou si chargement en cours
        if (!selectedCollectionId || collectionArtworksCache.length === 0) {
            return;
        }

        if (selectedMedium) {
            // Filtrer depuis le cache
            const filtered = collectionArtworksCache.filter(
                art => art.technique?.toLowerCase() === selectedMedium.toLowerCase()
            );
            setArtworks(filtered);
        } else {
            // Montrer toutes les œuvres du cache
            setArtworks(collectionArtworksCache);
        }
    }, [selectedMedium, collectionArtworksCache]);

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
