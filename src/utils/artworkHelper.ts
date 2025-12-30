import { ApiArtwork } from "../services/api";

// Mapping of keywords to medium categories
const MEDIUM_KEYWORDS: Record<string, string[]> = {
    "peinture": ['peinture', 'acrylique', 'huile', 'toile', 'gouache', 'aquarelle'],
    "dessin": ['dessin', 'encre', 'papier', 'fusain', 'crayon', 'mine', 'feutre', 'pastel'],
    "volume": ['volume', 'sculpture', 'bronze', 'céramique', 'résine', 'terre', 'plâtre', 'fer', 'bois', 'raku'],
    "installation": ['installation', 'dentelle'],
    "edition": ['édition', 'gravure', 'estampe', 'lithographie', 'sérigraphie']
};

/**
 * Detects the medium category of an artwork based on its description.
 * Returns a normalized medium key (e.g., 'peinture', 'dessin') or null if no match found.
 */
export function detectMedium(artwork: ApiArtwork): string | null {
    if (!artwork.description) return null;

    const desc = artwork.description.toLowerCase();

    // Check each category for keywords
    for (const [category, keywords] of Object.entries(MEDIUM_KEYWORDS)) {
        if (keywords.some(keyword => desc.includes(keyword))) {
            return category;
        }
    }

    return null;
}

/**
 * Returns a list of unique medium keys present in the artwork list.
 */
export function getAvailableMediums(artworks: ApiArtwork[]): string[] {
    const mediums = new Set<string>();

    artworks.forEach(artwork => {
        const medium = detectMedium(artwork);
        if (medium) {
            mediums.add(medium);
        }
    });

    return Array.from(mediums);
}
