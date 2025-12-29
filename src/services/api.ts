export interface ApiArtwork {
    id: string;
    name: string;
    collection_id: string;
    collection_name: string;
    dateRealisation: string;
    img_url: string;
}

export interface GalleryData {
    artworks: ApiArtwork[];
}

export async function fetchGalleryData(collectionId: string = "", medium: string = ""): Promise<GalleryData> {
    const urlParams = new URLSearchParams();
    urlParams.append("api", "");
    urlParams.append("collection_id", collectionId);
    if (medium) {
        urlParams.append("description", medium);
    }

    // Determine base URL based on environment
    // In dev, we use the proxy set up in vite.config.ts (likely /api_sylviane)
    // In prod, we use the real domain directly
    const baseUrl = import.meta.env.DEV
        ? "/api_sylviane"
        : "https://www.sylvianeleboulch.com";

    const targetUrl = `${baseUrl}/galerySelection.php?${urlParams.toString()}`;

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();

        try {
            const data = JSON.parse(text);
            return data;
        } catch (e) {
            console.error("API returned non-JSON:", text);
            throw new Error("Réponse serveur invalide (Non-JSON)");
        }
    } catch (error) {
        // Fallback for demo/dev if API fails (which it currently does with DB error)
        if (import.meta.env.DEV) {
            console.warn("API failed, using Mock Data for demonstration");
            return {
                artworks: [
                    {
                        id: "1",
                        name: "L'Envol (Mock)",
                        collection_id: "1",
                        collection_name: "Peinture",
                        dateRealisation: "2024",
                        // Using the valid URL provided by the user
                        img_url: "/BDD/ARTWORKS/185/image/card/5f2fe934b7300.JPG"
                    },
                    {
                        id: "2",
                        name: "Silence (Mock)",
                        collection_id: "2",
                        collection_name: "Dessin",
                        dateRealisation: "2023",
                        img_url: "/BDD/ARTWORKS/185/image/card/5f2fe934b7300.JPG"
                    }
                ]
            };
        }
        console.error("Fetch error:", error);
        throw error;
    }
}
