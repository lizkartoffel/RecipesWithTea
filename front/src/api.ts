// api.ts
const API_URL = "http://localhost:8000";

// ... (Recipe API functions are unchanged) ...
// Recipe API
export async function getRecipes() {
  const response = await fetch(`${API_URL}/recipes`);
  if (!response.ok) throw new Error("Failed to fetch recipes");
  return response.json();
}

export async function getRecipeById(id: number) {
  const response = await fetch(`${API_URL}/recipes/${id}`);
  if (!response.ok) throw new Error("Failed to fetch recipe details");
  return response.json();
}

export async function createRecipe(data: any) {
  const response = await fetch(`${API_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to create recipe");
  }
  return response.json();
}

export async function updateRecipe(id: number, data: any) {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update recipe");
  return response.json();
}

export async function deleteRecipe(id: number) {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete recipe");
  return response.json();
}

// Review API
export async function getReviews() {
  const response = await fetch(`${API_URL}/reviews`);
  if (!response.ok) throw new Error("Failed to fetch reviews");
  return response.json();
}

export async function getReviewsForRecipe(recipeId: number) {
  const response = await fetch(`${API_URL}/reviews/recipe/${recipeId}`);
  if (!response.ok) throw new Error("Failed to fetch reviews for recipe");
  return response.json();
}

export async function createReview(data: {
  rating: number;
  comment: string;
  recipe_id: number;
  user_id: number;
}) {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to create review");
  return response.json();
}

export async function updateReview(id: number, data: any) {
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Failed to update review");
  return response.json();
}

export async function deleteReview(id: number) {
  const response = await fetch(`${API_URL}/reviews/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete review");
  return response.json();
}
// ... (Review API functions are unchanged) ...

// User API
export async function getUsers() {
 const response = await fetch(`${API_URL}/users`);
 if (!response.ok) throw new Error("Failed to fetch users");
 return response.json();
}

export async function getUserById(id: number) {
 const response = await fetch(`${API_URL}/users/${id}`);
 if (!response.ok) throw new Error("Failed to fetch user");
 return response.json();
}

export async function getUserByUsername(username: string) {
 const response = await fetch(`${API_URL}/users/username/${username}`);
 if (!response.ok) throw new Error("Failed to fetch user");
 return response.json();
}

// UPDATED/REUSED: This function will now be used for sign-up
export async function createUser(data: {
 username: string;
 display_name: string;
 email: string;
 password: string; // The front-end is sending the clear password
 bio?: string;
}) {
 const response = await fetch(`${API_URL}/users`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify(data),
 });
 if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.detail || "Failed to create user");
 }
 return response.json();
}

// Auth API

// NOTE: register is now only for minimal register (not used by AuthModal's signup)
export async function register(username: string, password: string) {
 const response = await fetch(`${API_URL}/auth/register`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, password }),
 });
 if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.detail || "Failed to register");
 }
 return response.json();
}

// Login remains the same, but the front-end now correctly passes a username
export async function login(username: string, password: string) {
 const response = await fetch(`${API_URL}/auth/login`, {
  method: "POST",
  headers: {
   "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, password }),
 });
 if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.detail || "Invalid credentials");
 }
 return response.json();
}
// const API_URL = "http://localhost:8000";

// // Recipe API
// export async function getRecipes() {
//   const response = await fetch(`${API_URL}/recipes`);
//   if (!response.ok) throw new Error("Failed to fetch recipes");
//   return response.json();
// }

// export async function getRecipeById(id: number) {
//   const response = await fetch(`${API_URL}/recipes/${id}`);
//   if (!response.ok) throw new Error("Failed to fetch recipe details");
//   return response.json();
// }

// export async function createRecipe(data: any) {
//   const response = await fetch(`${API_URL}/recipes`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.detail || "Failed to create recipe");
//   }
//   return response.json();
// }

// export async function updateRecipe(id: number, data: any) {
//   const response = await fetch(`${API_URL}/recipes/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to update recipe");
//   return response.json();
// }

// export async function deleteRecipe(id: number) {
//   const response = await fetch(`${API_URL}/recipes/${id}`, {
//     method: "DELETE",
//   });
//   if (!response.ok) throw new Error("Failed to delete recipe");
//   return response.json();
// }

// // Review API
// export async function getReviews() {
//   const response = await fetch(`${API_URL}/reviews`);
//   if (!response.ok) throw new Error("Failed to fetch reviews");
//   return response.json();
// }

// export async function getReviewsForRecipe(recipeId: number) {
//   const response = await fetch(`${API_URL}/reviews/recipe/${recipeId}`);
//   if (!response.ok) throw new Error("Failed to fetch reviews for recipe");
//   return response.json();
// }

// export async function createReview(data: {
//   rating: number;
//   comment: string;
//   recipe_id: number;
//   user_id: number;
// }) {
//   const response = await fetch(`${API_URL}/reviews`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to create review");
//   return response.json();
// }

// export async function updateReview(id: number, data: any) {
//   const response = await fetch(`${API_URL}/reviews/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to update review");
//   return response.json();
// }

// export async function deleteReview(id: number) {
//   const response = await fetch(`${API_URL}/reviews/${id}`, {
//     method: "DELETE",
//   });
//   if (!response.ok) throw new Error("Failed to delete review");
//   return response.json();
// }

// // User API
// export async function getUsers() {
//   const response = await fetch(`${API_URL}/users`);
//   if (!response.ok) throw new Error("Failed to fetch users");
//   return response.json();
// }

// export async function getUserById(id: number) {
//   const response = await fetch(`${API_URL}/users/${id}`);
//   if (!response.ok) throw new Error("Failed to fetch user");
//   return response.json();
// }

// export async function getUserByUsername(username: string) {
//   const response = await fetch(`${API_URL}/users/username/${username}`);
//   if (!response.ok) throw new Error("Failed to fetch user");
//   return response.json();
// }

// export async function createUser(data: {
//   username: string;
//   display_name: string;
//   email: string;
//   password: string;
//   bio?: string;
// }) {
//   const response = await fetch(`${API_URL}/users`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.detail || "Failed to create user");
//   }
//   return response.json();
// }

// // Auth API - FIXED TO USE USERNAME
// export async function register(username: string, password: string) {
//   const response = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.detail || "Failed to register");
//   }
//   return response.json();
// }

// export async function login(username: string, password: string) {
//   const response = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.detail || "Invalid credentials");
//   }
//   return response.json();
// }
// const API_URL = "http://localhost:8000";

// // Recipe API
// export async function getRecipes() {
//   const response = await fetch(`${API_URL}/recipes`);
//   if (!response.ok) throw new Error("Failed to fetch recipes");
//   return response.json();
// }

// export async function getRecipeById(id: number) {
//   const response = await fetch(`${API_URL}/recipes/${id}`);
//   if (!response.ok) throw new Error("Failed to fetch recipe details");
//   return response.json();
// }

// export async function createRecipe(data: any) {
//   const response = await fetch(`${API_URL}/recipes`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.detail || "Failed to create recipe");
//   }
//   return response.json();
// }

// export async function updateRecipe(id: number, data: any) {
//   const response = await fetch(`${API_URL}/recipes/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to update recipe");
//   return response.json();
// }

// export async function deleteRecipe(id: number) {
//   const response = await fetch(`${API_URL}/recipes/${id}`, {
//     method: "DELETE",
//   });
//   if (!response.ok) throw new Error("Failed to delete recipe");
//   return response.json();
// }

// // Review API
// export async function getReviews() {
//   const response = await fetch(`${API_URL}/reviews`);
//   if (!response.ok) throw new Error("Failed to fetch reviews");
//   return response.json();
// }

// export async function getReviewsForRecipe(recipeId: number) {
//   const response = await fetch(`${API_URL}/reviews/recipe/${recipeId}`);
//   if (!response.ok) throw new Error("Failed to fetch reviews for recipe");
//   return response.json();
// }

// export async function createReview(data: {
//   rating: number;
//   comment: string;
//   recipe_id: number;
//   user_id: number;
// }) {
//   const response = await fetch(`${API_URL}/reviews`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to create review");
//   return response.json();
// }

// export async function updateReview(id: number, data: any) {
//   const response = await fetch(`${API_URL}/reviews/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) throw new Error("Failed to update review");
//   return response.json();
// }

// export async function deleteReview(id: number) {
//   const response = await fetch(`${API_URL}/reviews/${id}`, {
//     method: "DELETE",
//   });
//   if (!response.ok) throw new Error("Failed to delete review");
//   return response.json();
// }

// // User API
// export async function getUsers() {
//   const response = await fetch(`${API_URL}/users`);
//   if (!response.ok) throw new Error("Failed to fetch users");
//   return response.json();
// }

// export async function getUserById(id: number) {
//   const response = await fetch(`${API_URL}/users/${id}`);
//   if (!response.ok) throw new Error("Failed to fetch user");
//   return response.json();
// }

// export async function getUserByUsername(username: string) {
//   const response = await fetch(`${API_URL}/users/username/${username}`);
//   if (!response.ok) throw new Error("Failed to fetch user");
//   return response.json();
// }

// export async function createUser(data: {
//   username: string;
//   display_name: string;
//   email: string;
//   password: string;
//   bio?: string;
// }) {
//   const response = await fetch(`${API_URL}/users`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.detail || "Failed to create user");
//   }
//   return response.json();
// }

// // Auth API
// export async function register(username: string, password: string) {
//   const response = await fetch(`${API_URL}/auth/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.detail || "Failed to register");
//   }
//   return response.json();
// }

// export async function login(username: string, password: string) {
//   const response = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//   });
//   if (!response.ok) {
//     const errorData = await response.json();
//     throw new Error(errorData.detail || "Invalid credentials");
//   }
//   return response.json();
// }