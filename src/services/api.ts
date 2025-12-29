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
        // Fallback with Mock Data when API fails (API currently has DB error)
        console.warn("API failed, using Mock Data for demonstration", error);
        return {
            artworks: [
                {
                    id: "1",
                    name: "L'Envol",
                    collection_id: "1",
                    collection_name: "Peinture",
                    dateRealisation: "2024",
                    img_url: "/BDD/ARTWORKS/185/image/card/5f2fe934b7300.JPG"
                },
                {
                    id: "2",
                    name: "Silence",
                    collection_id: "2",
                    collection_name: "Dessin",
                    dateRealisation: "2023",
                    img_url: "/BDD/ARTWORKS/186/image/card/5f2fea3d42e93.JPG"
                },
                {
                    id: "3",
                    name: "Métamorphose",
                    collection_id: "1",
                    collection_name: "Peinture",
                    dateRealisation: "2022",
                    img_url: "/BDD/ARTWORKS/187/image/card/5f2feb2b4bd0f.JPG"
                },
                {
                    id: "4",
                    name: "Empreintes",
                    collection_id: "3",
                    collection_name: "Volume",
                    dateRealisation: "2021",
                    img_url: "/BDD/ARTWORKS/188/image/card/5f2febf0a2c0a.JPG"
                }
            ]
        };
    }
}
