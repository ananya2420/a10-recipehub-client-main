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
    if (!baseUrl) throw new Error("NEXT_PUBLIC_SERVER_URL is not defined");

    // If queryString is provided, use it directly
    if (queryString) {
        const query = queryString.startsWith('?') ? queryString : `?${queryString}`;
        const res = await fetch(`${baseUrl}/recips${query}`, { cache: 'no-store' });
        
        if (!res.ok) {
            const errorData = await res.text();
            throw new Error(`Failed to fetch data: ${res.status} - ${errorData || res.statusText}`);
        }
        return await res.json();
    }

    // Default logic: Ensure params include search, category, AND potential pagination
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (category) params.append('category', category);
    
    // If you need to support pagination here as well, 
    // you should pass 'page' and 'perPage' as arguments to getAllRecips
    
    const url = `${baseUrl}/recips?${params.toString()}`;

    const res = await fetch(url, { cache: 'no-store' });
    
    // Improved error reporting to help debug the specific cause
    if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`Failed to fetch data: ${res.status} - ${errorData}`);
    }
    
    return await res.json();
};


// Add the token parameter here
export const getRecipeById = async (id, token = null) => {
    if (!baseUrl) throw new Error("NEXT_PUBLIC_SERVER_URL is not defined");

    const res = await fetch(`${baseUrl}/recipe/${id}`, { 
        cache: 'no-store',
        // Add the headers object
        headers: {
            'Content-Type': 'application/json',
         
        }
    });
    
    if (!res.ok) return null;
    return await res.json();
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