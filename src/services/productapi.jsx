const BASE_URL = "http://localhost:8080";

// Fetch main categories
export const fetchCategories = () => fetch(`${BASE_URL}/categories/main`).then(res => res.json());

// Fetch subcategories based on main category ID
export const fetchSubCategories = (mainId) =>
    fetch(`${BASE_URL}/categories/main/${mainId}/sub`).then(res => res.json());

// Fetch all subcategories and return a map
export const fetchSubCategoryMap = () =>
    fetch(`${BASE_URL}/categories/sub`)
        .then(res => res.json())
        .then((data) => {
            const map = {};
            data.forEach((subCategory) => {
                map[subCategory.subid] = subCategory.subname;
            });
            return map;
        });

// Fetch all products
export const fetchAllProducts = () => fetch(`${BASE_URL}/products/showAllProducts`).then(res => res.json());

// Search products
export const searchProducts = (params) => {
    const query = new URLSearchParams(params).toString();
    return fetch(`${BASE_URL}/products/search?${query}`).then(res => res.json());
};

// Delete product
export const deleteProduct = (id) =>
    fetch(`${BASE_URL}/products/delete/${id}`, { method: "DELETE" });

// Add or update product
export const addOrUpdateProduct = (url, method, data) =>
    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(res => res.json());