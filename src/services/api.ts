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

// Valid parameters based on documentation
export async function fetchGalleryData(collectionId: string = "0", medium: string = ""): Promise<GalleryData> {
    const urlParams = new URLSearchParams();

    // API requires 'api' parameter (value can be empty but param must exist)
    urlParams.append("api", "");

    // collection_id: 0 for all, or specific ID
    urlParams.append("collection_id", collectionId || "0");

    // description: empty for all, or 'peinture', 'dessin', etc.
    if (medium) {
        urlParams.append("description", medium);
    }

    // Determine base URL based on environment
    const baseUrl = import.meta.env.DEV
        ? "/api_sylviane"
        : "https://www.sylvianeleboulch.com";

    // Start with ?api to ensure it's first if order matters, though logic above handles params
    const queryString = urlParams.toString().replace("api=", "api"); // Handle empty value for api param if needed specifically as ?api

    // Ideally URLSearchParams handles it, but PHP sometimes checks isset($_GET['api'])
    // let's stick to standard params first.
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
                    img_url: "/BDD/ARTWORKS/185/image/card/5f2fe934b7300.JPG"
                },
                {
                    id: "3",
                    name: "Métamorphose",
                    collection_id: "1",
                    collection_name: "Peinture",
                    dateRealisation: "2022",
                    img_url: "/BDD/ARTWORKS/185/image/card/5f2fe934b7300.JPG"
                },
                {
                    id: "4",
                    name: "Empreintes",
                    collection_id: "3",
                    collection_name: "Volume",
                    dateRealisation: "2021",
                    img_url: "/BDD/ARTWORKS/185/image/card/5f2fe934b7300.JPG"
                }
            ]
        };
    }
}
