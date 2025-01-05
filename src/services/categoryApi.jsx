const BASE_URL = "http://localhost:8080";

// Fetch all main categories
export const fetchMainCategories = () =>
    fetch(`${BASE_URL}/categories/main`).then((response) => response.json());

// Fetch all subcategories for a specific main category
export const fetchSubCategories = (mainId) =>
    fetch(`${BASE_URL}/categories/main/${mainId}/sub`).then((response) => response.json());

// Add a new main category
export const addMainCategory = (data) =>
    fetch(`${BASE_URL}/categories/main`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then((response) => response.json());

// Add a new subcategory
export const addSubCategory = (data) =>
    fetch(`${BASE_URL}/categories/sub`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then((response) => response.json());

// Update an existing main category
export const updateMainCategory = (mainId, data) =>
    fetch(`${BASE_URL}/categories/main/${mainId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then((response) => response.json());

// Update an existing subcategory
export const updateSubCategory = (subId, data) =>
    fetch(`${BASE_URL}/categories/sub/${subId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then((response) => response.json());

// Delete a main category
export const deleteMainCategory = (mainId) =>
    fetch(`${BASE_URL}/categories/main/${mainId}`, { method: "DELETE" });

// Delete a subcategory
export const deleteSubCategory = (subId) =>
    fetch(`${BASE_URL}/categories/sub/${subId}`, { method: "DELETE" });