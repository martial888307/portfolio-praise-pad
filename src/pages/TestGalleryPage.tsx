import { useEffect, useState } from "react";
import { fetchGalleryData, ApiArtwork } from "../services/api";

export default function TestGalleryPage() {
    const [data, setData] = useState<ApiArtwork[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [rawJson, setRawJson] = useState<string>("");

    useEffect(() => {
        fetchGalleryData()
            .then((response) => {
                setData(response.artworks);
                setRawJson(JSON.stringify(response, null, 2));
            })
            .catch((err) => {
                setError(err.message);
                setRawJson(JSON.stringify(err, null, 2));
            });
    }, []);

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Test Page Isolation</h1>
            <p>This page tests API connection without any UI library components.</p>

            <hr />

            <h3>Status</h3>
            {error ? (
                <div style={{ color: "red", fontWeight: "bold" }}>Error: {error}</div>
            ) : (
                <div style={{ color: "green", fontWeight: "bold" }}>Success: Loaded {data.length} items</div>
            )}

            <hr />

            <h3>First Image Test</h3>
            {data.length > 0 && (
                <div>
                    <p>Title: {data[0].name}</p>
                    {/* Use simple img tag */}
                    <img
                        src={`https://www.sylvianeleboulch.com${data[0].img_url}`}
                        alt="Test"
                        style={{ maxWidth: "300px", border: "1px solid #ccc" }}
                    />
                </div>
            )}

            <hr />

            <h3>Raw Data</h3>
            <pre style={{ background: "#f4f4f4", padding: "10px", overflow: "auto" }}>
                {rawJson}
            </pre>
        </div>
    );
}
