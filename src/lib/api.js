// API Client for NexoFit Backend
const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:8080/api";

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getAuthHeaders() {
    const token = localStorage.getItem("accessToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.error || data.message || "Error en la petición",
        };
      }

      return data;
    } catch (error) {
      return {
        success: false,
        error: "Error de conexión con el servidor",
      };
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async getProfile() {
    return this.request("/auth/profile");
  }

  // Classes endpoints
  async getClasses(filters) {
    const params = new URLSearchParams();
    if (filters?.modalityId)
      params.append("modalityId", filters.modalityId.toString());
    if (filters?.search) params.append("search", filters.search);
    if (filters?.futureOnly) params.append("futureOnly", "true");

    const query = params.toString();
    return this.request(`/classes${query ? `?${query}` : ""}`);
  }

  async getMyClasses() {
    return this.request("/classes/my-classes");
  }

  async createClass(classData) {
    return this.request("/classes", {
      method: "POST",
      body: JSON.stringify(classData),
    });
  }

  async updateClass(id, classData) {
    return this.request(`/classes/${id}`, {
      method: "PUT",
      body: JSON.stringify(classData),
    });
  }

  async deleteClass(id) {
    return this.request(`/classes/${id}`, {
      method: "DELETE",
    });
  }

  // Bookings endpoints
  async getMyUpcomingBookings() {
    return this.request("/bookings/my-upcoming");
  }

  async createBooking(classId) {
    return this.request("/bookings", {
      method: "POST",
      body: JSON.stringify({ class_id: classId }),
    });
  }

  async cancelBooking(bookingId) {
    return this.request(`/bookings/${bookingId}`, {
      method: "DELETE",
    });
  }

  // Categories endpoints
  async getCategories() {
    return this.request("/categories");
  }

  async getCategoriesWithModalities() {
    return this.request("/categories/with-modalities");
  }

  async createCategory(categoryData) {
    return this.request("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(id, categoryData) {
    return this.request(`/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(categoryData),
    });
  }

  async deleteCategory(id) {
    return this.request(`/categories/${id}`, {
      method: "DELETE",
    });
  }

  // Modalities endpoints
  async getModalities() {
    return this.request("/modalities");
  }

  async searchModalities(query, limit = 5) {
    const params = new URLSearchParams();
    params.append("q", query);
    params.append("limit", limit.toString());
    return this.request(`/modalities/search?${params.toString()}`);
  }

  async getModalityWithClasses(id) {
    return this.request(`/modalities/${id}/with-classes`);
  }

  async createModality(modalityData) {
    return this.request("/modalities", {
      method: "POST",
      body: JSON.stringify({
        title: modalityData.title,
        description: modalityData.description,
        category_id: modalityData.categoryId,
        image_url: modalityData.imageUrl,
      }),
    });
  }

  async updateModality(id, modalityData) {
    return this.request(`/modalities/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: modalityData.title,
        description: modalityData.description,
        category_id: modalityData.categoryId,
        image_url: modalityData.imageUrl,
      }),
    });
  }

  async deleteModality(id) {
    return this.request(`/modalities/${id}`, {
      method: "DELETE",
    });
  }
}

export const api = new ApiClient(API_URL);
export default api;
