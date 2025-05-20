import { Axios } from "axios";


// Setup axios instance
const axios = new Axios({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

// Request interceptor to add Authorization token
axios.interceptors.request.use(
    (config) => {
        const token = import.meta.env.VITE_API_TOKEN;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors, e.g., 401 Unauthorized
axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            // Handle unauthorized access
            console.error("Unauthorized access - redirecting to login");
        }
        return Promise.reject(error);
    }
);

/**
 * Fetches logged-in user information from the API.
 * @returns {Promise<any>} A promise that resolves with the user data.
 * @throws Will throw an error if the request fails.
 */
export const getUser = async () => {
    try {
        const response = await axios.get(`/users/get-logged-in-user`);
        return JSON.parse(response.data); // SAFE: response.data is a string
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};


/**
 * Creates a new product.
 * @param {string} name - The name of the product.
 * @param {number} amount - The amount/price of the product.
 * @returns {Promise<any>} A promise that resolves with the response data.
 * @throws Will throw an error if the request fails.
 */
export const createProduct = async (name: string, amount: number) => {
    try {
        const response = await axios.post(`/products`, JSON.stringify([{ name, amount, }]));
        return response.data;
    } catch (error) {
        console.error("Error creating product:", error);
        throw error;
    }
};

/**
 * Creates a new post with a caption, content file, and associated product IDs.
 * @param {string} caption - The caption for the post.
 * @param {File} content - The image or video file for the post.
 * @param {string} productIds - A comma-separated string of product IDs.
 * @returns {Promise<any>} A promise that resolves with the response data.
 * @throws Will throw an error if the request fails.
 */
export const createPost = async (caption: string, content: File, productIds: string) => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("content", content);
    formData.append("productIds", productIds);

    try {
        const response = await axios.post(`/posts`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

/**
 * Fetches all products.
 * @returns {Promise<any>} A promise that resolves with a collection of products.
 * @throws Will throw an error if the request fails.
 */
export const getProducts = async () => {
    try {
        const response = await axios.get(`/products`);
        return JSON.parse(response.data);
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
};

/**
 * Fetches a specific product by its ID.
 * @param {string} productId - The ID of the product to fetch.
 * @returns {Promise<any>} A promise that resolves with the product data.
 * @throws Will throw an error if the request fails.
 */
export const getProductById = async (productId: string) => {
    try {
        const response = await axios.get(`/products/${productId}`);
        return JSON.parse(response.data);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        throw error;
    }
};

/**
 * Fetches all posts.
 * @returns {Promise<any>} A promise that resolves with a collection of posts.
 * @throws Will throw an error if the request fails.
 */
export const getPosts = async (pageSize: number) => {
    try {
        const response = await axios.get(`/posts/search`, {
            params: {
                pageSize,
                pageNumber: 0,
                tag: ""
            }
        });
        return JSON.parse(response.data);
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
}

export const initiateCheckout = async () => {
    try {
        const response = await axios.get(`/carts/initiate-checkout`, {
        });
        return JSON.parse(response.data);
    } catch (error) {
        console.error("Error initiating cart checkout", error);
        throw error;
    }
}

export const getUserCart = async () => {
    try {
        const response = await axios.get(`/carts`, {
        });
        return JSON.parse(response.data);
    } catch (error) {
        console.error("Error getting user cart", error);
        throw error;
    }
}

export const addItemToCart = async (productId: number) => {
    try {
        const response = await axios.post(`/carts/${productId}`, {
        });
        return JSON.parse(response.data);
    } catch (error) {
        console.error("Error adding product to cart", error);
        throw error;
    }
}
