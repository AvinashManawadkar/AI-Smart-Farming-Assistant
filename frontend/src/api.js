const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

export async function askAI(message) {
    const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: message
        })
    });

    if (!response.ok) {
        throw new Error(`Backend returned ${response.status}`);
    }

    return await response.json();
}
