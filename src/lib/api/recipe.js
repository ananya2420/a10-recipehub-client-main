const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

// Helper to get headers with Authorization
const getHeaders = (token) => {
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
};


export const getAllRecips = async (search = "", category = "", queryString = "") => {
    const buildQuery = (value) => (value.startsWith('?') ? value : `?${value}`);
    const buildUrl = (value) => {
        if (value) return buildQuery(value);
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (category) params.append('category', category);
        return params.toString() ? `?${params.toString()}` : '';
    };

    const fetchRecipes = async (url) => {
        try {
            const res = await fetch(url, { cache: 'no-store' });
            if (!res.ok) {
                const errorData = await res.text();
                console.warn(`Recipe fetch failed for ${url}: ${res.status} - ${errorData || res.statusText}`);
                return null;
            }
            return await res.json();
        } catch (error) {
            console.warn(`Recipe fetch error for ${url}:`, error);
            return null;
        }
    };

    const query = buildUrl(queryString);
    const localUrl = `/api/recips${query}`;
    const localData = await fetchRecipes(localUrl);

    if (localData) {
        return Array.isArray(localData) ? localData : [];
    }

    if (!baseUrl) {
        return [];
    }

    const fallbackUrl = `${baseUrl}/recips${query}`;
    const fallbackData = await fetchRecipes(fallbackUrl);
    return Array.isArray(fallbackData) ? fallbackData : [];
};


// Add the token parameter here
export const getRecipeById = async (id, token = null) => {
    const localUrl = `/api/recipe/${id}`;

    try {
        const localRes = await fetch(localUrl, { cache: 'no-store' });
        if (localRes.ok) {
            return await localRes.json();
        }
    } catch (error) {
        console.warn(`Local recipe fetch failed for ${localUrl}:`, error);
    }

    if (!baseUrl) return null;

    try {
        const res = await fetch(`${baseUrl}/recipe/${id}`, {
            cache: 'no-store',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.warn(`Fallback recipe fetch failed for ${baseUrl}/recipe/${id}:`, error);
        return null;
    }
};


export const updateRecipe = async (id, data) => {
    if (!baseUrl) throw new Error("NEXT_PUBLIC_SERVER_URL is not defined");

    const res = await fetch(`${baseUrl}/recipe/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to update recipe');
    }

    return await res.json();
};