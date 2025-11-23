const API_URL = "http://localhost:8000";

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
  if (!response.ok) throw new Error("Failed to create recipe");
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

// export async function getreview() {