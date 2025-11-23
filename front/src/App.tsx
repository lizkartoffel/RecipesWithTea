import { useState, useEffect } from "react";
import { Filter, TrendingUp, Search, Clock, Users, ChefHat, Heart } from "lucide-react";
const heroImage = "https://images.unsplash.com/photo-1627769124375-8f797bb17140?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VyZG91Z2glMjBsYXR0ZSUyMHRlYSUyMGNlcmVtb255fGVufDF8fHx8MTc1ODg5NTAxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
import { Input } from "./components/ui/input";
import { Header } from "./components/Header";
import { FilterSidebar } from "./components/FilterSidebar";
import { RecipeCard } from "./components/RecipeCard";
import { RecipeModal } from "./components/RecipeModal";
import { RecipePreviewModal } from "./components/RecipePreviewModal";
import { AuthModal } from "./components/AuthModal";
import { UploadRecipeModal } from "./components/UploadRecipeModal";
import { UserProfile } from "./components/UserProfile";
import { ProfilePage } from "./components/ProfilePage";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./components/ui/carousel";

// Mock data
const mockRecipes = [
  {
    id: 1,
    title: "Matcha Green Tea Cookies",
    description: "Delicate, buttery cookies infused with premium matcha powder and a hint of vanilla. Perfect for afternoon tea or as a light dessert.",
    image: "https://images.unsplash.com/photo-1559951742-948d2e2c86f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRjaGElMjBncmVlbiUyMHRlYSUyMHJlY2lwZXxlbnwxfHx8fDE3NTg3MzE0OTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Sarah Chen",
    rating: 4.8,
    reviewCount: 124,
    cookTime: "20 min",
    servings: 24,
    difficulty: "Easy",
    dietary: ["Vegetarian"],
    cuisine: "Asian",
    isFavorite: false,
    prepTime: "15 min",
    totalTime: "35 min",
    ingredients: [
      "2 cups all-purpose flour",
      "1/4 cup matcha powder",
      "1/2 cup unsalted butter, softened",
      "1/2 cup powdered sugar",
      "1 large egg",
      "1 tsp vanilla extract",
      "1/4 tsp salt"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Line baking sheets with parchment paper.",
      "In a bowl, whisk together flour, matcha powder, and salt.",
      "In another bowl, cream butter and powdered sugar until light and fluffy.",
      "Beat in egg and vanilla extract until well combined.",
      "Gradually mix in the flour mixture until a soft dough forms.",
      "Roll dough into small balls and place on prepared baking sheets.",
      "Bake for 12-15 minutes until edges are lightly golden.",
      "Cool on baking sheet for 5 minutes before transferring to wire rack."
    ]
  },
  {
    id: 2,
    title: "Homemade Fresh Pasta",
    description: "Traditional Italian pasta made from scratch with just eggs, flour, and a pinch of salt. Silky smooth texture that pairs perfectly with any sauce.",
    image: "https://images.unsplash.com/photo-1564813227527-a99b83712e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lbWFkZSUyMHBhc3RhJTIwcmVjaXBlfGVufDF8fHx8MTc1ODczMTUwM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Marco Rossi",
    rating: 4.9,
    reviewCount: 89,
    cookTime: "3 min",
    servings: 4,
    difficulty: "Medium",
    dietary: ["Vegetarian"],
    cuisine: "Italian",
    isFavorite: true,
    prepTime: "45 min",
    totalTime: "48 min",
    ingredients: [
      "2 cups 00 flour (or all-purpose flour)",
      "3 large eggs",
      "1/2 tsp salt",
      "1 tbsp olive oil (optional)",
      "Semolina flour for dusting"
    ],
    instructions: [
      "Create a well with flour on a clean work surface. Add eggs, salt, and olive oil to the center.",
      "Using a fork, gradually incorporate flour into the eggs until a shaggy dough forms.",
      "Knead the dough for 8-10 minutes until smooth and elastic.",
      "Wrap dough in plastic wrap and let rest for 30 minutes at room temperature.",
      "Roll out dough using a pasta machine or rolling pin until very thin.",
      "Cut into desired pasta shapes (fettuccine, tagliatelle, etc.).",
      "Cook in boiling salted water for 2-3 minutes until al dente."
    ]
  },
  {
    id: 3,
    title: "Decadent Chocolate Cake",
    description: "Rich, moist chocolate cake with layers of smooth chocolate ganache. This indulgent dessert is perfect for special occasions.",
    image: "https://images.unsplash.com/photo-1636589314668-bf6a924cd353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBjYWtlJTIwYmFraW5nfGVufDF8fHx8MTc1ODczMTUxM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Emma Baker",
    rating: 4.7,
    reviewCount: 156,
    cookTime: "35 min",
    servings: 12,
    difficulty: "Hard",
    dietary: ["Vegetarian"],
    cuisine: "American",
    isFavorite: false,
    prepTime: "30 min",
    totalTime: "1 hour 5 min",
    ingredients: [
      "1 3/4 cups all-purpose flour",
      "2 cups granulated sugar",
      "3/4 cup unsweetened cocoa powder",
      "2 tsp baking soda",
      "1 tsp baking powder",
      "1 tsp salt",
      "2 large eggs",
      "1 cup buttermilk",
      "1/2 cup vegetable oil",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C). Grease and flour two 9-inch round cake pans.",
      "In a large bowl, whisk together flour, sugar, cocoa powder, baking soda, baking powder, and salt.",
      "In another bowl, beat eggs, buttermilk, oil, and vanilla until well combined.",
      "Add wet ingredients to dry ingredients and mix until just combined.",
      "Divide batter evenly between prepared pans.",
      "Bake for 30-35 minutes until a toothpick inserted in center comes out clean.",
      "Cool in pans for 10 minutes, then turn out onto wire racks to cool completely.",
      "Frost with chocolate ganache or your favorite frosting."
    ]
  },
  {
    id: 4,
    title: "Rainbow Buddha Bowl",
    description: "A vibrant, nutritious bowl packed with fresh vegetables, quinoa, and a creamy tahini dressing. Perfect for a healthy lunch or dinner.",
    image: "https://images.unsplash.com/photo-1643750182373-b4a55a8c2801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc1ODY0NzU3MXww&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Green Goddess",
    rating: 4.6,
    reviewCount: 73,
    cookTime: "25 min",
    servings: 2,
    difficulty: "Easy",
    dietary: ["Vegan", "Gluten-Free"],
    cuisine: "Mediterranean",
    isFavorite: true,
    prepTime: "20 min",
    totalTime: "45 min",
    ingredients: [
      "1 cup quinoa",
      "2 cups mixed greens",
      "1 cup cherry tomatoes, halved",
      "1 cucumber, diced",
      "1 avocado, sliced",
      "1/2 cup shredded carrots",
      "1/4 cup pumpkin seeds",
      "2 tbsp tahini",
      "1 lemon, juiced",
      "2 cloves garlic, minced",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Cook quinoa according to package instructions and let cool.",
      "Prepare all vegetables by washing, chopping, and arranging in bowls.",
      "For the dressing, whisk together tahini, lemon juice, garlic, salt, and pepper.",
      "Add water gradually to achieve desired consistency.",
      "Divide quinoa between two bowls as the base.",
      "Arrange vegetables in colorful sections on top of quinoa.",
      "Drizzle with tahini dressing and sprinkle with pumpkin seeds.",
      "Serve immediately and enjoy!"
    ]
  },
  {
    id: 5,
    title: "Artisan Sourdough Bread",
    description: "Traditional sourdough bread with a perfect crust and tangy flavor. This recipe requires patience but delivers exceptional results.",
    image: "https://images.unsplash.com/photo-1614936686168-fe496ca37dc3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3VyZG91Z2glMjBicmVhZCUyMHJlY2lwZXxlbnwxfHx8fDE3NTg3MzE1MTh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Bread Master",
    rating: 4.9,
    reviewCount: 201,
    cookTime: "45 min",
    servings: 8,
    difficulty: "Hard",
    dietary: ["Vegan"],
    cuisine: "French",
    isFavorite: false,
    prepTime: "24 hours",
    totalTime: "25 hours",
    ingredients: [
      "500g bread flour",
      "375ml water",
      "100g active sourdough starter",
      "10g salt"
    ],
    instructions: [
      "Mix flour and water, let autolyse for 30 minutes.",
      "Add starter and salt, mix until well combined.",
      "Perform 4 sets of stretch and folds every 30 minutes.",
      "Bulk ferment for 4-6 hours at room temperature.",
      "Pre-shape and let rest for 30 minutes.",
      "Final shape and place in banneton, refrigerate overnight.",
      "Preheat Dutch oven to 475°F (245°C).",
      "Score the dough and bake covered for 20 minutes, then uncovered for 25 minutes."
    ]
  },
  {
    id: 6,
    title: "Asian Vegetable Stir Fry",
    description: "Quick and flavorful stir fry with crisp vegetables and a savory sauce. Ready in under 15 minutes for a perfect weeknight meal.",
    image: "https://images.unsplash.com/photo-1614955177711-2540ad25432b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHN0aXIlMjBmcnl8ZW58MXx8fHwxNzU4NjAyMzY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    author: "Wok Chef",
    rating: 4.5,
    reviewCount: 92,
    cookTime: "10 min",
    servings: 4,
    difficulty: "Easy",
    dietary: ["Vegan", "Gluten-Free"],
    cuisine: "Asian",
    isFavorite: false,
    prepTime: "15 min",
    totalTime: "25 min",
    ingredients: [
      "2 tbsp vegetable oil",
      "1 bell pepper, sliced",
      "1 cup broccoli florets",
      "1 carrot, julienned",
      "1 cup snap peas",
      "3 cloves garlic, minced",
      "1 inch ginger, minced",
      "3 tbsp soy sauce",
      "1 tbsp rice vinegar",
      "1 tsp sesame oil",
      "1 tsp cornstarch",
      "2 green onions, chopped"
    ],
    instructions: [
      "Heat oil in a large wok or skillet over high heat.",
      "Add harder vegetables (broccoli, carrots) first and stir-fry for 2-3 minutes.",
      "Add bell pepper and snap peas, continue stir-frying for 2 minutes.",
      "Add garlic and ginger, stir-fry for 30 seconds until fragrant.",
      "In a small bowl, whisk together soy sauce, rice vinegar, sesame oil, and cornstarch.",
      "Pour sauce over vegetables and toss to coat.",
      "Cook for another minute until sauce thickens slightly.",
      "Garnish with green onions and serve immediately over rice."
    ]
  }
];

const mockReviews = [
  {
    id: 1,
    author: "FoodLover123",
    rating: 5,
    comment: "Absolutely delicious! The matcha flavor is perfect and not too overpowering. Will definitely make again.",
    date: "2 days ago"
  },
  {
    id: 2,
    author: "BakingMom",
    rating: 4,
    comment: "Great recipe! My kids loved these cookies. I added a bit more sugar to make them sweeter.",
    date: "1 week ago"
  },
  {
    id: 3,
    author: "TeaEnthusiast",
    rating: 5,
    comment: "As a matcha lover, this recipe is perfect. The texture is amazing and they look beautiful too!",
    date: "2 weeks ago"
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState<"home" | "profile">("home");
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const [recipes, setRecipes] = useState(mockRecipes);
  const [reviews, setReviews] = useState(mockReviews);
  
  const [filters, setFilters] = useState({
    dietary: [] as string[],
    allergies: [] as string[],
    cuisine: [] as string[],
    difficulty: [] as string[],
    cookingTime: [] as string[],
  });

  // Helper function to check cooking time filter
  const matchesCookingTime = (recipe: any, timeFilters: string[]) => {
    if (timeFilters.length === 0) return true;
    
    const totalMinutes = parseInt(recipe.totalTime) || parseInt(recipe.cookTime) || 0;
    
    return timeFilters.some(timeFilter => {
      switch (timeFilter) {
        case "Under 30 min":
          return totalMinutes < 30;
        case "30-60 min":
          return totalMinutes >= 30 && totalMinutes <= 60;
        case "1-2 hours":
          return totalMinutes > 60 && totalMinutes <= 120;
        case "2+ hours":
          return totalMinutes > 120;
        default:
          return false;
      }
    });
  };



  // Filter recipes based on search and filters
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch = recipe.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         recipe.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = 
      (filters.dietary.length === 0 || filters.dietary.some(diet => recipe.dietary.includes(diet))) &&
      (filters.difficulty.length === 0 || filters.difficulty.includes(recipe.difficulty)) &&
      (filters.cuisine.length === 0 || filters.cuisine.includes(recipe.cuisine)) &&
      matchesCookingTime(recipe, filters.cookingTime);
    
    const matchesTab = 
      activeTab === "all" ||
      (activeTab === "favorites" && recipe.isFavorite) ||
      (activeTab === "top-rated" && recipe.rating >= 4.5) ||
      (activeTab === "beverages" && (recipe.title.toLowerCase().includes("latte") || 
                                    recipe.title.toLowerCase().includes("tea") || 
                                    recipe.title.toLowerCase().includes("drink") ||
                                    recipe.title.toLowerCase().includes("matcha"))) ||
      (activeTab === "dessert" && (recipe.title.toLowerCase().includes("cookie") || 
                                   recipe.title.toLowerCase().includes("cake") || 
                                   recipe.title.toLowerCase().includes("dessert")));

    return matchesSearch && matchesFilters && matchesTab;
  });

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
    setCurrentUser(email.split('@')[0]);
  };

  const handleSignUp = (name: string, email: string, password: string) => {
    setIsLoggedIn(true);
    setCurrentUser(name);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleRecipeClick = (recipe: any) => {
    setSelectedRecipe(recipe);
    setIsPreviewModalOpen(true);
  };

  const handleViewFullRecipe = (recipe: any) => {
    // Create recipe details page content in new window
    const recipeContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${recipe.title} - Recipes with Tea</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #2d3e1f;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: #faf8f5;
          }
          .header {
            text-align: center;
            margin-bottom: 40px;
            padding: 20px;
            background: linear-gradient(135deg, #f5f2e8, #f0ede5);
            border-radius: 12px;
          }
          .recipe-image {
            width: 100%;
            max-width: 600px;
            height: 300px;
            object-fit: cover;
            border-radius: 12px;
            margin: 20px 0;
          }
          .recipe-meta {
            display: flex;
            gap: 20px;
            margin: 20px 0;
            flex-wrap: wrap;
          }
          .meta-item {
            background: #f0f4e8;
            padding: 10px 15px;
            border-radius: 8px;
            border-left: 4px solid #8bc34a;
          }
          .ingredients, .instructions {
            background: white;
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .ingredients h2, .instructions h2 {
            color: #8bc34a;
            border-bottom: 2px solid #f0f4e8;
            padding-bottom: 10px;
          }
          .ingredients ul {
            list-style: none;
            padding: 0;
          }
          .ingredients li {
            padding: 8px 0;
            border-bottom: 1px solid #f0f4e8;
          }
          .ingredients li:before {
            content: "🌿";
            margin-right: 10px;
          }
          .instructions ol {
            padding-left: 20px;
          }
          .instructions li {
            margin: 15px 0;
            padding: 10px;
            background: #faf8f5;
            border-radius: 6px;
          }
          .rating {
            color: #d4af37;
            font-size: 1.2em;
          }
          .badges {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
            margin: 15px 0;
          }
          .badge {
            background: #8bc34a;
            color: white;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 0.9em;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${recipe.title}</h1>
          <p style="font-size: 1.1em; color: #6b7060;">${recipe.description}</p>
          <div class="rating">
            ${'⭐'.repeat(Math.floor(recipe.rating))} ${recipe.rating} (${recipe.reviewCount} reviews)
          </div>
          <p style="margin: 10px 0;">by <strong>${recipe.author}</strong></p>
          <div class="badges">
            ${recipe.dietary.map(diet => `<span class="badge">${diet}</span>`).join('')}
            <span class="badge">${recipe.cuisine}</span>
            <span class="badge">${recipe.difficulty}</span>
          </div>
        </div>
        
        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image" />
        
        <div class="recipe-meta">
          <div class="meta-item">
            <strong>Prep Time:</strong> ${recipe.prepTime}
          </div>
          <div class="meta-item">
            <strong>Cook Time:</strong> ${recipe.cookTime}
          </div>
          <div class="meta-item">
            <strong>Total Time:</strong> ${recipe.totalTime}
          </div>
          <div class="meta-item">
            <strong>Servings:</strong> ${recipe.servings}
          </div>
        </div>
        
        <div class="ingredients">
          <h2>Ingredients</h2>
          <ul>
            ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
          </ul>
        </div>
        
        <div class="instructions">
          <h2>Instructions</h2>
          <ol>
            ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
          </ol>
        </div>
        
        <div style="text-align: center; margin-top: 40px; padding: 20px; background: #f0f4e8; border-radius: 12px;">
          <p style="margin: 0;">Made with ❤️ by <strong>Recipes with Tea</strong></p>
        </div>
      </body>
      </html>
    `;
    
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      newWindow.document.write(recipeContent);
      newWindow.document.close();
    }
  };

  const handleFavoriteToggle = (recipeId: number) => {
    setRecipes(prev => prev.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, isFavorite: !recipe.isFavorite }
        : recipe
    ));
  };

  const handleFilterChange = (category: string, value: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      [category]: checked 
        ? [...prev[category as keyof typeof prev], value]
        : prev[category as keyof typeof prev].filter((item: string) => item !== value)
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      dietary: [],
      allergies: [],
      cuisine: [],
      difficulty: [],
      cookingTime: [],
    });
  };

  const handleUploadRecipe = (recipeData: any) => {
    const newRecipe = {
      ...recipeData,
      id: Math.max(...recipes.map(r => r.id)) + 1,
      author: currentUser || "Anonymous",
      rating: 0,
      reviewCount: 0,
      isFavorite: false,
      totalTime: `${parseInt(recipeData.prepTime) + parseInt(recipeData.cookTime)} min`,
      cuisine: recipeData.cuisine,
    };
    
    setRecipes(prev => [newRecipe, ...prev]);
  };

  const handleAddReview = (recipeId: number, rating: number, comment: string) => {
    const newReview = {
      id: Math.max(...reviews.map(r => r.id)) + 1,
      author: currentUser || "Anonymous",
      rating,
      comment,
      date: "Just now"
    };
    
    setReviews(prev => [...prev, newReview]);
    
    // Update recipe rating
    setRecipes(prev => prev.map(recipe => {
      if (recipe.id === recipeId) {
        const recipeReviews = reviews.filter(r => r.author === currentUser).concat(newReview);
        const avgRating = recipeReviews.reduce((sum, r) => sum + r.rating, 0) / recipeReviews.length;
        return {
          ...recipe,
          rating: avgRating,
          reviewCount: recipe.reviewCount + 1
        };
      }
      return recipe;
    }));
  };

  // Render different pages based on currentPage state
  if (currentPage === "profile") {
    return (
      <ProfilePage
        currentUser={currentUser}
        userRecipes={recipes.filter(recipe => recipe.author === currentUser)}
        favoriteRecipes={recipes.filter(recipe => recipe.isFavorite)}
        userReviews={reviews.filter(review => review.author === currentUser)}
        onBackToHome={() => setCurrentPage("home")}
        onRecipeClick={handleRecipeClick}
        onFavoriteToggle={handleFavoriteToggle}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f2e8]">
      <Header
        onLoginClick={() => {
          setAuthMode("login");
          setIsAuthModalOpen(true);
        }}
        onSignUpClick={() => {
          setAuthMode("signup");
          setIsAuthModalOpen(true);
        }}
        onUploadClick={() => setIsUploadModalOpen(true)}
        onProfileClick={() => setCurrentPage("profile")}
        onFavoritesClick={() => setActiveTab("favorites")}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] bg-gradient-to-br from-[#f5f2e8] via-[#e8e3d3] to-[#f5f2e8]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#8bc34a]"></div>
          <div className="absolute top-32 right-20 w-12 h-12 rounded-full bg-[#4a6741]"></div>
          <div className="absolute bottom-20 left-20 w-16 h-16 rounded-full bg-[#cdaa7d]"></div>
          <div className="absolute bottom-32 right-10 w-8 h-8 rounded-full bg-[#8bc34a]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#4a6741]/10 px-4 py-2 rounded-full mb-6">
                <span className="text-[#4a6741]">🍃</span>
                <span className="text-sm text-[#4a6741]">Welcome to Recipes with Tea</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d3e1f] mb-6 leading-tight">
                Discover the Art of 
                <span className="text-[#4a6741] block">Tea-Inspired Cooking</span>
              </h1>

              <p className="text-lg text-[#2d3e1f]/80 mb-8 leading-relaxed max-w-xl">
                From ceremonial matcha lattes to delicate green tea cookies, explore a world of recipes that celebrate the harmony of tea in every dish.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  onClick={() => {
                    setActiveTab("all");
                    // Scroll to the navigation section
                    setTimeout(() => {
                      const navigationSection = document.querySelector('[data-navigation-section]');
                      if (navigationSection) {
                        navigationSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                  className="bg-[#4a6741] hover:bg-[#2d3e1f] text-white px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <span className="mr-2">🍵</span>
                  Explore Recipes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    if (isLoggedIn) {
                      setIsUploadModalOpen(true);
                    } else {
                      setAuthMode("login");
                      setIsAuthModalOpen(true);
                    }
                  }}
                  className="border-[#4a6741] text-[#4a6741] hover:bg-[#4a6741] hover:text-white px-8 py-3 rounded-full transition-all duration-300"
                >
                  <span className="mr-2">📝</span>
                  {isLoggedIn ? "Share Your Recipe" : "Login to Share Recipe"}
                </Button>
              </div>
            </div>

            {/* Right Content - Featured Recipe */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                <div className="relative">
                  <img 
                    src={heroImage} 
                    alt="Featured Matcha Recipe"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-[#4a6741] text-white px-3 py-1">
                      Featured
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleRecipeClick(mockRecipes[0])}
                    className="absolute bottom-4 right-4 bg-white/90 text-[#4a6741] hover:bg-white shadow-lg rounded-full p-3"
                  >
                    <ChefHat className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2d3e1f] mb-2">Ceremonial Matcha Latte</h3>
                  <p className="text-[#2d3e1f]/70 text-sm mb-4">A traditional Japanese matcha experience with premium ceremonial grade powder...</p>
                  
                  <div className="flex items-center justify-between text-xs text-[#2d3e1f]/60">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        10 min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        1 serving
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#d4af37]">⭐</span>
                      <span>4.8</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-[#8bc34a] rounded-full floating-leaf opacity-80"></div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#cdaa7d] rounded-full floating-leaf opacity-60" style={{animationDelay: '2s'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Pills Section */}
      <section data-navigation-section className="bg-white py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#2d3e1f] mb-2">Browse Recipes</h2>
            <p className="text-[#2d3e1f]/70">Find the perfect recipe for any occasion</p>
          </div>
          
          {/* Main Navigation Pills */}
          <div className="flex justify-center">
            <div className="flex items-center gap-3 flex-wrap justify-center">
              <Button
                variant={activeTab === "all" ? "default" : "outline"}
                onClick={() => setActiveTab("all")}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === "all" 
                    ? "bg-[#4a6741] text-white shadow-md" 
                    : "bg-white text-[#2d3e1f] border-[#e8e3d3] hover:bg-[#f5f2e8]"
                }`}
              >
                All
              </Button>
              <Button
                variant={activeTab === "favorites" ? "default" : "outline"}
                onClick={() => setActiveTab("favorites")}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === "favorites" 
                    ? "bg-[#4a6741] text-white shadow-md" 
                    : "bg-white text-[#2d3e1f] border-[#e8e3d3] hover:bg-[#f5f2e8]"
                }`}
              >
                <Heart className="h-4 w-4 mr-2" />
                Favorites
              </Button>
              <Button
                variant={activeTab === "top-rated" ? "default" : "outline"}
                onClick={() => setActiveTab("top-rated")}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === "top-rated" 
                    ? "bg-[#4a6741] text-white shadow-md" 
                    : "bg-white text-[#2d3e1f] border-[#e8e3d3] hover:bg-[#f5f2e8]"
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                Popular
              </Button>
              <Button
                variant={activeTab === "beverages" ? "default" : "outline"}
                onClick={() => setActiveTab("beverages")}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === "beverages" 
                    ? "bg-[#4a6741] text-white shadow-md" 
                    : "bg-white text-[#2d3e1f] border-[#e8e3d3] hover:bg-[#f5f2e8]"
                }`}
              >
                Beverages
              </Button>
              <Button
                variant={activeTab === "dessert" ? "default" : "outline"}
                onClick={() => setActiveTab("dessert")}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  activeTab === "dessert" 
                    ? "bg-[#4a6741] text-white shadow-md" 
                    : "bg-white text-[#2d3e1f] border-[#e8e3d3] hover:bg-[#f5f2e8]"
                }`}
              >
                Dessert
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              isOpen={true}
              onClose={() => {}}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Filter Toggle - Mobile */}
            <div className="lg:hidden mb-6">
              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="w-full justify-center border-[#4a6741] text-[#4a6741] hover:bg-[#e8e3d3] shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#2d3e1f]">
                {activeTab === "all" && `All Recipes (${filteredRecipes.length})`}
                {activeTab === "beverages" && `Beverages (${filteredRecipes.length})`}
                {activeTab === "dessert" && `Desserts (${filteredRecipes.length})`}
                {activeTab === "favorites" && `Your Favorites (${filteredRecipes.length})`}
                {activeTab === "top-rated" && `Popular Recipes (${filteredRecipes.length})`}
              </h2>
            </div>

            {/* Recipe Grid */}
            {filteredRecipes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.id}
                    recipe={recipe}
                    onRecipeClick={handleRecipeClick}
                    onFavoriteToggle={handleFavoriteToggle}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-[#2d3e1f] opacity-70 text-lg">No recipes found matching your criteria.</p>
                <Button
                  variant="outline"
                  onClick={handleClearFilters}
                  className="mt-4 border-[#4a6741] text-[#4a6741] hover:bg-[#e8e3d3] shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      <RecipePreviewModal
        recipe={selectedRecipe}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        onFavoriteToggle={handleFavoriteToggle}
        onViewFullRecipe={handleViewFullRecipe}
      />

      <RecipeModal
        recipe={selectedRecipe}
        isOpen={isRecipeModalOpen}
        onClose={() => setIsRecipeModalOpen(false)}
        onFavoriteToggle={handleFavoriteToggle}
        reviews={reviews}
        onAddReview={handleAddReview}
        isLoggedIn={isLoggedIn}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onSwitchMode={() => setAuthMode(authMode === "login" ? "signup" : "login")}
      />

      <UploadRecipeModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleUploadRecipe}
      />

      <UserProfile
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        userRecipes={recipes.filter(recipe => recipe.author === currentUser)}
        favoriteRecipes={recipes.filter(recipe => recipe.isFavorite)}
        userReviews={reviews.filter(review => review.author === currentUser)}
      />
    </div>
  );
}