import axios from 'axios';

const API_BASE_URL = 'https://myblog-backend-t9rr.onrender.com/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ==================== POST APIs ====================

export const postAPI = {
  // Get all posts
  getAllPosts: () => apiClient.get('/postlist'),

  // Get single post
  getPost: (id) => apiClient.get(`/readmorepost/${id}`),

  // Create post
  createPost: (data) => apiClient.post('/createpost', data),

  // Update post
  updatePost: (id, data) => apiClient.put(`/posts/${id}`, data),

  // Delete post
  deletePost: (id) => apiClient.delete(`/posts/${id}`),

  // Like/unlike post
  likePost: (id, userId) => apiClient.post(`/posts/${id}/like`, { userId }),

  // Bookmark post
  bookmarkPost: (id, userId) => apiClient.post(`/posts/${id}/bookmark`, { userId }),

  // Share post
  sharePost: (id) => apiClient.post(`/posts/${id}/share`),

  // Get user posts
  getUserPosts: (userId) => apiClient.get(`/posts/${userId}`),

  // Search posts
  searchPosts: (query) => apiClient.get('/', { params: { q: query } }),
};

// ==================== COMMENT APIs ====================

export const commentAPI = {
  // Add comment
  addComment: (postId, data) => apiClient.post(`/posts/${postId}/comment`, data),

  // Get comments
  getComments: (postId) => apiClient.get(`/posts/${postId}/comments`),

  // Delete comment
  deleteComment: (commentId, userId) => apiClient.delete(`/comments/${commentId}`, {
    data: { userId }
  }),
};

// ==================== USER APIs ====================

export const userAPI = {
  // Register
  register: (data) => apiClient.post('/register', data),

  // Login
  login: (data) => apiClient.post('/login', data),

  // Logout
  logout: () => apiClient.post('/logout'),

  // Get current user profile
  getCurrentProfile: (userId) => apiClient.get(`/user/${userId}`),

  // Get user profile by ID
  getUserProfile: (userId) => apiClient.get(`/users/${userId}`),

  // Edit profile
  editProfile: (userId, data) => apiClient.put(`/users/${userId}/edit`, data),

  // Follow user
  followUser: (userId, currentUserId) => 
    apiClient.put(`/users/${userId}/follow`, { userId: currentUserId }),

  // Unfollow user
  unfollowUser: (userId, currentUserId) => 
    apiClient.put(`/users/${userId}/unfollow`, { userId: currentUserId }),
};

export default apiClient;
