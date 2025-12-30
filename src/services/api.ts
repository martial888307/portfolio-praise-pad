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
    description?: string;
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
                    name: col.name,
                    description: col.description || ""
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
        console.warn("API collections fetch failed, using Mock Data. Error:", error);
        // Mock data for collections if API fails - Updated with descriptions
        return [
            {
                id: "1",
                name: "Art cynique et hommes dentelles",
                description: "Je brode à l'encre, à l'infini des visages entremêlés, aux regards sidérés. Cet assemblage de trognes structure des formes biologiques qui se font ou se défont, flirtant avec le déséquilibre auquel chacun contribue. Au coeur de tout, singulier, fragile, disgracieux, l'humain qui peut tout détruire, peut aussi choisir de composer, en lien avec les autres, un tout fort et beau. L'apparition de la femme, au travers de robes de dentelles d'hommes tente au delà d'une symbiose esthétique, de questionner les récits de fantasme et de séduction."
            },
            {
                id: "24",
                name: "Dentelles et fossiles",
                description: "\"La mer était là\", disait mon père en ramassant des coquillages fossiles avec moi, en pleine campagne. J'ai créé ces pièces en imaginant des extraterrestres dans une découverte semblable à quelques milliers d'années. La terre, telle une Pompei, serait alors un lieu où nous-mêmes ne serions plus que de jolis coquillages à la ramasse."
            },
            {
                id: "3",
                name: "L'Oeuf Story",
                description: "Oubliées les couleurs franches, l'éclat des couleurs, la fantaisie des personnages. Nues et rondes comme un oeuf au premier jour, les femmes, intérieures, aux prises avec le nid, le corps, la fabrication, la douleur, la plénitude aussi, consciente de la responsabilité à venir ou du poids d'une obligation silencieuse, regardent devant. Des natures mortes qui portent la vie."
            },
            {
                id: "5",
                name: "Les Sumos Q",
                description: "Flirter avec l'abstraction, c'est moins figurer, moins affirmer. Tout peut être dit, car ce sont d'abord les couleurs qui parlent. Quel plaisir l'exagération! Les femmes prennent des formes telles celles de Sumos sculptées dans le granit rose qui m'est cher."
            },
            {
                id: "14",
                name: "Noeuds",
                description: "René Char écrivait: \"Imite le moins possible les hommes dans leur énigmatique maladie de faire des nœuds.\" Ce mot aux mille définitions m'inspire mille dessins, du plus drôle au plus inquiétant."
            },
            {
                id: "18",
                name: "Motus",
                description: "Motus... et bouche cousue. Le secret ou l'héritage du secret, cousu de fil rouge, personnel, familial ou politique, la violence d'une censure étouffante qui d' un coup de ciseau libèrerait pourtant souffle et sourire."
            },
            {
                id: "2",
                name: "Des chefs à l'oeuvre",
                description: "C'est d'abord à l'encre que l'homme subit ma dérision. Un état d'esprit dessins de presse dans lequel mon père m'a baignée."
            },
            { id: "22", name: "Dis-moi des poèmes" },
            { id: "26", name: "L'ombre des hommes" },
            { id: "36", name: "Au fond de la mère" }
        ];
    }
}
