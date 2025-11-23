import { useState } from "react";
import { User, Settings, Heart, ChefHat, MessageSquare, Calendar, MapPin, Edit2, ArrowLeft, Star } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: string | null;
  userRecipes: any[];
  favoriteRecipes: any[];
  userReviews: any[];
}

export function UserProfile({
  isOpen,
  onClose,
  currentUser,
  userRecipes,
  favoriteRecipes,
  userReviews,
}: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    displayName: currentUser?.toLowerCase() || "liz kartoffel",
    bio: "Passionate about creating and sharing delicious tea recipes. Love experimenting with new flavors and techniques!",
    location: "San Francisco, CA",
    joinedDate: "January 2024",
    allergies: ["Nuts", "Dairy"],
    dietaryPreferences: ["Vegetarian", "Gluten-Free"],
    favoriteTeaType: "Green Tea",
  });

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you would typically save to backend
  };

  // Calculate average rating
  const avgRating = userReviews.length > 0 
    ? (userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length).toFixed(1)
    : "0.0";

  const stats = [
    { label: "Recipes", value: userRecipes.length },
    { label: "Favorites", value: favoriteRecipes.length },
    { label: "Reviews", value: userReviews.length },
    { label: "Avg Rating", value: avgRating, icon: true },
  ];

  const recentActivities = [
    { text: 'Published "My Special Matcha Latte"', time: "2 weeks ago", color: "#4a6741" },
    { text: "Added to favorites", time: "3 weeks ago", color: "#cdaa7d" },
    { text: "Received 5-star review", time: "1 month ago", color: "#8bc34a" },
    { text: 'Published "Homemade Taro Bubble Tea"', time: "1 month ago", color: "#2d3e1f" },
  ];

  if (!isOpen) return null;

  return (
    <div className="min-h-screen bg-[#f5f2e8]">
      {/* Header */}
      <div className="bg-white border-b border-[#e8e3d3] px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-[#cdaa7d] hover:text-[#2d3e1f] hover:bg-[#e8e3d3] p-0 h-auto font-normal"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Recipes
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-[#e8e3d3] to-[#f5f2e8] rounded-2xl p-8 border border-[#cdaa7d] mb-8 shadow-lg">
          <div className="flex items-start gap-8">
            <Avatar className="h-24 w-24 bg-[#cdaa7d] text-white border-4 border-white shadow-lg">
              <AvatarFallback className="bg-[#cdaa7d] text-white text-3xl font-semibold">
                {profile.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-[#2d3e1f] mb-3">{profile.displayName}</h1>
                  <p className="text-[#2d3e1f] mb-4 max-w-2xl text-lg">{profile.bio}</p>
                  <div className="flex items-center text-[#2d3e1f] mb-6">
                    <MapPin className="h-5 w-5 mr-2 text-[#cdaa7d]" />
                    <span>{profile.location}</span>
                    <Calendar className="h-5 w-5 ml-6 mr-2 text-[#cdaa7d]" />
                    <span>Joined {profile.joinedDate}</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="border-[#cdaa7d] text-[#cdaa7d] hover:bg-[#cdaa7d] hover:text-white"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center bg-white rounded-xl p-4 shadow-md">
                    <div className="text-3xl font-bold text-[#cdaa7d] flex items-center justify-center gap-2 mb-1">
                      {stat.value}
                      {stat.icon && <Star className="h-6 w-6 fill-current" />}
                    </div>
                    <div className="text-sm text-[#2d3e1f] font-medium">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-white rounded-xl p-1 shadow-md mb-8">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-[#e8e3d3] data-[state=active]:text-[#2d3e1f] text-[#2d3e1f] rounded-lg"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="recipes" 
              className="data-[state=active]:bg-[#e8e3d3] data-[state=active]:text-[#2d3e1f] text-[#2d3e1f] rounded-lg"
            >
              My Recipes ({userRecipes.length})
            </TabsTrigger>
            <TabsTrigger 
              value="favorites" 
              className="data-[state=active]:bg-[#e8e3d3] data-[state=active]:text-[#2d3e1f] text-[#2d3e1f] rounded-lg"
            >
              Favorites ({favoriteRecipes.length})
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-[#e8e3d3] data-[state=active]:text-[#2d3e1f] text-[#2d3e1f] rounded-lg"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Dietary Information */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2d3e1f] flex items-center gap-2">
                    <Settings className="h-5 w-5 text-[#cdaa7d]" />
                    Dietary Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-[#2d3e1f] mb-3">Allergies</h4>
                    <div className="flex gap-2 flex-wrap">
                      {profile.allergies.map((allergy) => (
                        <Badge key={allergy} className="bg-red-100 text-red-800 hover:bg-red-200">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2d3e1f] mb-3">Dietary Preferences</h4>
                    <div className="flex gap-2 flex-wrap">
                      {profile.dietaryPreferences.map((pref) => (
                        <Badge key={pref} className="bg-green-100 text-green-800 hover:bg-green-200">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#2d3e1f] mb-3">Favorite Tea Type</h4>
                    <Badge className="bg-[#8bc34a] text-white hover:bg-[#4a6741]">
                      {profile.favoriteTeaType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-white border-0 shadow-lg">
                <CardHeader className="pb-4">
                  <CardTitle className="text-[#2d3e1f]">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-[#f5f2e8] rounded-lg">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: activity.color }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[#2d3e1f]">{activity.text}</p>
                          <p className="text-xs text-[#2d3e1f] opacity-60">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recipes">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {userRecipes.length > 0 ? (
                    userRecipes.map((recipe) => (
                      <div key={recipe.id} className="flex items-center gap-6 p-6 border border-[#e8e3d3] rounded-xl hover:shadow-md transition-shadow">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#2d3e1f] mb-2">{recipe.title}</h3>
                          <p className="text-sm text-[#2d3e1f] opacity-70 line-clamp-2 mb-3">{recipe.description}</p>
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="text-xs border-[#cdaa7d] text-[#cdaa7d]">
                              ⭐ {recipe.rating}
                            </Badge>
                            <Badge variant="outline" className="text-xs border-[#cdaa7d] text-[#cdaa7d]">
                              {recipe.reviewCount} reviews
                            </Badge>
                            <Badge variant="outline" className="text-xs border-[#4a6741] text-[#4a6741]">
                              {recipe.difficulty}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-[#2d3e1f] opacity-70">
                      <ChefHat className="h-16 w-16 mx-auto mb-6 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">No recipes shared yet</h3>
                      <p>Start cooking and share your creations with the community!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="favorites">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  {favoriteRecipes.length > 0 ? (
                    favoriteRecipes.map((recipe) => (
                      <div key={recipe.id} className="flex items-center gap-6 p-6 border border-[#e8e3d3] rounded-xl hover:shadow-md transition-shadow">
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                          className="w-20 h-20 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-[#2d3e1f] mb-2">{recipe.title}</h3>
                          <p className="text-sm text-[#2d3e1f] opacity-70 line-clamp-2 mb-2">{recipe.description}</p>
                          <p className="text-sm text-[#cdaa7d] font-medium">by {recipe.author}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12 text-[#2d3e1f] opacity-70">
                      <Heart className="h-16 w-16 mx-auto mb-6 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">No favorite recipes yet</h3>
                      <p>Start exploring and save your favorites!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-white border-0 shadow-lg">
              <CardContent className="p-8">
                {isEditing ? (
                  <div className="space-y-6 max-w-2xl">
                    <div>
                      <Label htmlFor="displayName" className="text-[#2d3e1f] font-semibold">Display Name</Label>
                      <Input
                        id="displayName"
                        value={profile.displayName}
                        onChange={(e) => setProfile(prev => ({...prev, displayName: e.target.value}))}
                        className="bg-white border-[#e8e3d3] focus:border-[#cdaa7d] mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio" className="text-[#2d3e1f] font-semibold">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profile.bio}
                        onChange={(e) => setProfile(prev => ({...prev, bio: e.target.value}))}
                        className="bg-white border-[#e8e3d3] focus:border-[#cdaa7d] mt-2"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-[#2d3e1f] font-semibold">Location</Label>
                      <Input
                        id="location"
                        value={profile.location}
                        onChange={(e) => setProfile(prev => ({...prev, location: e.target.value}))}
                        className="bg-white border-[#e8e3d3] focus:border-[#cdaa7d] mt-2"
                      />
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-[#4a6741] hover:bg-[#2d3e1f] text-white"
                      >
                        Save Changes
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(false)}
                        className="border-[#cdaa7d] text-[#cdaa7d] hover:bg-[#cdaa7d] hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-[#2d3e1f] opacity-70">
                    <Settings className="h-16 w-16 mx-auto mb-6 opacity-50" />
                    <h3 className="text-xl font-semibold mb-2">Profile Settings</h3>
                    <p>Click "Edit Profile" to modify your settings.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}