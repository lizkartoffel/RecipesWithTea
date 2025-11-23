import { useState } from "react";
import { ArrowLeft, Edit2, Save, X, Camera, Mail, MapPin, Calendar, ChefHat } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { RecipeCard } from "./RecipeCard";

interface ProfilePageProps {
  currentUser: string | null;
  userRecipes: any[];
  favoriteRecipes: any[];
  userReviews: any[];
  onBackToHome: () => void;
  onRecipeClick: (recipe: any) => void;
  onFavoriteToggle: (recipeId: number) => void;
}

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  location: string;
  joinDate: string;
  avatar: string;
  favoriteIngredients: string[];
  specialties: string[];
}

export function ProfilePage({
  currentUser,
  userRecipes,
  favoriteRecipes,
  userReviews,
  onBackToHome,
  onRecipeClick,
  onFavoriteToggle,
}: ProfilePageProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: currentUser || "Tea Enthusiast",
    email: "tea.lover@example.com",
    bio: "Passionate about creating delicious recipes that celebrate the harmony of tea culture and mindful cooking. I love experimenting with matcha and other tea-inspired ingredients.",
    location: "San Francisco, CA",
    joinDate: "March 2024",
    avatar: "",
    favoriteIngredients: ["Matcha", "Green Tea", "Ginger", "Honey", "Oats"],
    specialties: ["Asian Cuisine", "Healthy Desserts", "Tea-based Drinks"],
  });

  const [editedProfile, setEditedProfile] = useState(profile);

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleInputChange = (field: keyof UserProfile, value: string) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: 'favoriteIngredients' | 'specialties', value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item !== '');
    setEditedProfile(prev => ({
      ...prev,
      [field]: items
    }));
  };

  return (
    <div className="min-h-screen bg-[#f5f2e8]">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e3d3] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={onBackToHome}
              className="text-[#4a6741] hover:bg-[#f5f2e8] hover:text-[#2d3e1f]"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Recipes
            </Button>
            
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-[#4a6741] hover:bg-[#2d3e1f] text-white"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="bg-[#4a6741] hover:bg-[#2d3e1f] text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="border-[#4a6741] text-[#4a6741] hover:bg-[#f5f2e8]"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-[#e8e3d3] shadow-lg">
              <CardContent className="p-6">
                {/* Avatar Section */}
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-[#8bc34a]">
                      <AvatarImage src={profile.avatar} alt={profile.name} />
                      <AvatarFallback className="bg-[#4a6741] text-white text-2xl">
                        {profile.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="sm"
                        className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-[#4a6741] hover:bg-[#2d3e1f]"
                      >
                        <Camera className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {isEditing ? (
                    <div className="mt-4 space-y-3">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                          id="name"
                          value={editedProfile.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="border-[#e8e3d3] focus:border-[#4a6741]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={editedProfile.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="border-[#e8e3d3] focus:border-[#4a6741]"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={editedProfile.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="border-[#e8e3d3] focus:border-[#4a6741]"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="mt-4">
                      <h1 className="text-2xl font-bold text-[#2d3e1f] mb-2">{profile.name}</h1>
                      <div className="space-y-2 text-sm text-[#2d3e1f] opacity-80">
                        <div className="flex items-center justify-center gap-2">
                          <Mail className="h-4 w-4" />
                          <span>{profile.email}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{profile.location}</span>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {profile.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bio Section */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[#2d3e1f] mb-2">About</h3>
                  {isEditing ? (
                    <Textarea
                      value={editedProfile.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                      className="border-[#e8e3d3] focus:border-[#4a6741] min-h-[100px]"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-[#2d3e1f] opacity-80 text-sm leading-relaxed">{profile.bio}</p>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 text-center">
                  <div className="bg-[#f5f2e8] p-3 rounded-lg">
                    <div className="font-bold text-[#4a6741] text-lg">{userRecipes.length}</div>
                    <div className="text-xs text-[#2d3e1f] opacity-70">Recipes</div>
                  </div>
                  <div className="bg-[#f5f2e8] p-3 rounded-lg">
                    <div className="font-bold text-[#4a6741] text-lg">{favoriteRecipes.length}</div>
                    <div className="text-xs text-[#2d3e1f] opacity-70">Favorites</div>
                  </div>
                  <div className="bg-[#f5f2e8] p-3 rounded-lg">
                    <div className="font-bold text-[#4a6741] text-lg">{userReviews.length}</div>
                    <div className="text-xs text-[#2d3e1f] opacity-70">Reviews</div>
                  </div>
                </div>

                {/* Favorite Ingredients */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[#2d3e1f] mb-3">Favorite Ingredients</h3>
                  {isEditing ? (
                    <div>
                      <Input
                        value={editedProfile.favoriteIngredients.join(', ')}
                        onChange={(e) => handleArrayChange('favoriteIngredients', e.target.value)}
                        className="border-[#e8e3d3] focus:border-[#4a6741]"
                        placeholder="Matcha, Green Tea, Ginger..."
                      />
                      <p className="text-xs text-[#2d3e1f] opacity-70 mt-1">Separate with commas</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.favoriteIngredients.map((ingredient, index) => (
                        <Badge key={index} className="bg-[#8bc34a] text-white hover:bg-[#4a6741]">
                          {ingredient}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Specialties */}
                <div>
                  <h3 className="font-semibold text-[#2d3e1f] mb-3">Cooking Specialties</h3>
                  {isEditing ? (
                    <div>
                      <Input
                        value={editedProfile.specialties.join(', ')}
                        onChange={(e) => handleArrayChange('specialties', e.target.value)}
                        className="border-[#e8e3d3] focus:border-[#4a6741]"
                        placeholder="Asian Cuisine, Healthy Desserts..."
                      />
                      <p className="text-xs text-[#2d3e1f] opacity-70 mt-1">Separate with commas</p>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.specialties.map((specialty, index) => (
                        <Badge key={index} className="bg-[#cdaa7d] text-white hover:bg-[#2d3e1f]">
                          <ChefHat className="h-3 w-3 mr-1" />
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* My Recipes */}
            <Card className="border-[#e8e3d3] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#2d3e1f] flex items-center gap-2">
                  <ChefHat className="h-5 w-5 text-[#4a6741]" />
                  My Recipes ({userRecipes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userRecipes.slice(0, 4).map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onRecipeClick={onRecipeClick}
                        onFavoriteToggle={onFavoriteToggle}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <ChefHat className="h-12 w-12 text-[#8bc34a] mx-auto mb-4" />
                    <p className="text-[#2d3e1f] opacity-70">No recipes uploaded yet</p>
                    <p className="text-sm text-[#2d3e1f] opacity-50">Share your first recipe with the community!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Favorite Recipes */}
            <Card className="border-[#e8e3d3] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#2d3e1f] flex items-center gap-2">
                  <span className="text-red-500">❤️</span>
                  Favorite Recipes ({favoriteRecipes.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {favoriteRecipes.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {favoriteRecipes.slice(0, 4).map((recipe) => (
                      <RecipeCard
                        key={recipe.id}
                        recipe={recipe}
                        onRecipeClick={onRecipeClick}
                        onFavoriteToggle={onFavoriteToggle}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">💚</span>
                    <p className="text-[#2d3e1f] opacity-70">No favorite recipes yet</p>
                    <p className="text-sm text-[#2d3e1f] opacity-50">Heart some recipes to see them here!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Reviews */}
            <Card className="border-[#e8e3d3] shadow-lg">
              <CardHeader>
                <CardTitle className="text-[#2d3e1f] flex items-center gap-2">
                  <span className="text-[#d4af37]">⭐</span>
                  Recent Reviews ({userReviews.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userReviews.length > 0 ? (
                  <div className="space-y-4">
                    {userReviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="bg-[#f5f2e8] p-4 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex text-[#d4af37]">
                            {'⭐'.repeat(review.rating)}
                          </div>
                          <span className="text-sm text-[#2d3e1f] opacity-70">{review.date}</span>
                        </div>
                        <p className="text-[#2d3e1f] text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <span className="text-4xl mb-4 block">💭</span>
                    <p className="text-[#2d3e1f] opacity-70">No reviews written yet</p>
                    <p className="text-sm text-[#2d3e1f] opacity-50">Share your thoughts on recipes you've tried!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}