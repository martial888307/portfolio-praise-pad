import { ApiArtwork } from "../services/api";

/**
 * Detects the medium category of an artwork based on its description.
 * Returns a normalized medium key (e.g., 'peinture', 'dessin') or null if no match found.
 * 
 * STRICT RULES (User defined):
 * - Painting: contains 'acrylique' AND NOT 'papier'
 * - Drawing: contains 'papier'
 * - Volume: contains 'céramique' OR 'résine' OR 'plâtre' OR 'bronze'
 * - Curiosity (Installation): contains 'installation'
 * - Edition: contains 'edition'
 */
export function detectMedium(artwork: ApiArtwork): string | null {
    if (!artwork.description) return null;

    const desc = artwork.description.toLowerCase();

    // Priority Order:
    // User complaint: "Installation" was stuck in "Drawing" (likely due to 'encre' -> Drawing in old logic).
    // User rule for Drawing is STRICTLY "contains 'papier'".

    // Curiosity (Installation)
    // Rule: contains 'installation'
    if (desc.includes('installation')) {
        return 'installation';
    }

    // Drawing
    // Rule: contains 'papier'
    if (desc.includes('papier')) {
        return 'dessin';
    }

    // Painting
    // Rule: contains 'acrylique' AND NOT 'papier'
    if (desc.includes('acrylique') && !desc.includes('papier')) {
        return 'peinture';
    }

    // Volume
    // Rule: contains 'céramique' OR 'résine' OR 'plâtre' OR 'bronze'
    // (Keeping strict rules as requested, can broaden only if user asks again)
    if (desc.includes('céramique') || desc.includes('résine') || desc.includes('plâtre') || desc.includes('bronze')) {
        return 'sculpture';
    }

    // Edition
    // Rule: contains 'edition'
    if (desc.includes('edition') || desc.includes('édition')) {
        return 'edition';
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
