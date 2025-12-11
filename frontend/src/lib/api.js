// API base URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

/**
 * Get authentication token from localStorage
 */
const getToken = () => {
  return localStorage.getItem('token');
};

/**
 * Get user from localStorage
 */
export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

/**
 * Check if user is authenticated
 */
export const isAuthenticated = () => {
  return !!getToken();
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

/**
 * Make authenticated API request
 */
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    // If unauthorized, logout user
    if (response.status === 401) {
      logout();
      window.location.href = '/login';
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

/**
 * Authentication API calls
 */
export const authAPI = {
  signup: async (userData) => {
    return apiRequest('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  getProfile: async () => {
    return apiRequest('/auth/me', {
      method: 'GET',
    });
  },

  updateProfile: async (userData) => {
    return apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  changePassword: async (passwords) => {
    return apiRequest('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify(passwords),
    });
  },

  logout: async () => {
    return apiRequest('/auth/logout', {
      method: 'POST',
    });
  },
};

/**
 * Contact API calls
 */
export const contactAPI = {
  // Public - Submit contact form
  submit: async (contactData) => {
    return apiRequest('/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
    });
  },

  // Admin - Get all contacts
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/contact${queryString ? `?${queryString}` : ''}`, {
      method: 'GET',
    });
  },

  // Admin - Get contact by ID
  getById: async (id) => {
    return apiRequest(`/contact/${id}`, {
      method: 'GET',
    });
  },

  // Admin - Update contact status
  updateStatus: async (id, status) => {
    return apiRequest(`/contact/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  // Admin - Delete contact
  delete: async (id) => {
    return apiRequest(`/contact/${id}`, {
      method: 'DELETE',
    });
  },

  // Admin - Get statistics
  getStats: async () => {
    return apiRequest('/contact/stats', {
      method: 'GET',
    });
  },
};

/**
 * Health check
 */
export const healthCheck = async () => {
  return apiRequest('/health', {
    method: 'GET',
  });
};

export default apiRequest;
