export interface ApiArtwork {
    id: string;
    name: string;
    collection_id: string;
    collection_name: string;
    dateRealisation: string;
    img_url: string;
    description?: string;
    price?: string | number;
    visiblePrice?: string;
    sold?: string | number;
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

    // description: MUST be present even if empty (as per user request: ?api&description&collection_id=0)
    urlParams.append("description", medium || "");

    // Base URL is always relative proxy path (Dev: Vite proxy, Prod: Vercel rewrite)
    const baseUrl = "/api_sylviane";

    // Custom query string formatting
    // User requested format: "?api&description&collection_id=0"
    // Standard URLSearchParams gives "api=&description="
    // We strictly replace "key=" with "key" for api and description (if empty)
    let queryString = urlParams.toString();
    queryString = queryString.replace("api=", "api");

    if (!medium) {
        queryString = queryString.replace("description=", "description");
    }

    const targetUrl = `${baseUrl}/galerySelection.php?${queryString}`;

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



export interface ApiCollection {
    id: string;
    name: string;
}

export async function fetchCollections(): Promise<ApiCollection[]> {
    // Base URL is always relative proxy path (Dev: Vite proxy, Prod: Vercel rewrite)
    const baseUrl = "/api_sylviane";
    const targetUrl = `${baseUrl}/galerySelection.php?api&collections`;

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();

        try {
            const data = JSON.parse(text);

            // API returns { collections: [...] }
            if (data && Array.isArray(data.collections)) {
                return data.collections.map((col: any) => ({
                    id: col.collection_id,
                    name: col.name
                }));
            } else {
                console.error("API returned unexpected structure for collections:", data);
                return [];
            }
        } catch (e) {
            console.error("API returned non-JSON for collections:", text);
            throw new Error("Réponse serveur invalide (Non-JSON)");
        }
    } catch (error) {
        console.warn("API collections fetch failed, using Mock Data", error);
        // Mock data for collections if API fails
        return [
            { id: "1", name: "Arts cyniques et Homme dentelle" },
            { id: "3", name: "L'oeuf Story" },
            { id: "22", name: "Dis-moi des poèmes" },
            { id: "26", name: "L'ombre des hommes" },
            { id: "36", name: "Au fond de la mère" }
        ];
    }
}
