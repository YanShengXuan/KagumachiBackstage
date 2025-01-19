const BASE_URL = "http://localhost:8080/Category";

// Fetch all main categories
export const fetchMainCategories = async () => {
    const response = await fetch("http://localhost:8080/Category/getMain");
    if (!response.ok) throw new Error("Failed to fetch main categories");
    return response.json();
};

// Fetch all subcategories for a specific main category
export const fetchSubCategories = (mainId) =>
    fetch(`${BASE_URL}/getSub?mainCategoryId=${mainId}`).then((response) => response.json());

// Add a new main category
export const addMainCategory = async (formData) => {
    const response = await fetch(`${BASE_URL}/addMain`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const text = await response.text();
    try {
        return JSON.parse(text); // 確保 JSON 格式正確
    } catch (error) {
        console.error("Response is not valid JSON:", text);
        throw new Error("Invalid JSON response");
    }
};


export const addSubCategory = async (data) => {

    const response = await fetch(`${BASE_URL}/addSub`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const text = await response.text();
    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("API 回應非 JSON 格式:", text);
        throw new Error("Invalid JSON response from server.");
    }
};

// Update an existing main category
export const updateMainCategory = (mainId, data) =>
    fetch(`${BASE_URL}/updateMain/${mainId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then((response) => response.json());

// Update an existing subcategory
export const updateSubCategory = (subId, data) =>
    fetch(`${BASE_URL}/updateSub/${subId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then((response) => response.json());

// Delete a main category
export const deleteMainCategory = (mainId) =>
    fetch(`${BASE_URL}/deleteMain/${mainId}`, { method: "DELETE" });

// Delete a subcategory
export const deleteSubCategory = (subId) =>
    fetch(`${BASE_URL}/deleteSub/${subId}`, { method: "DELETE" });