import { Star, Clock, Users, Heart, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  rating: number;
  reviewCount: number;
  cookTime: string;
  servings: number;
  difficulty: string;
  dietary: string[];
  cuisine: string;
  isFavorite: boolean;
  prepTime: string;
}

interface RecipePreviewModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onFavoriteToggle: (recipeId: number) => void;
  onViewFullRecipe: (recipe: Recipe) => void;
}

export function RecipePreviewModal({
  recipe,
  isOpen,
  onClose,
  onFavoriteToggle,
  onViewFullRecipe,
}: RecipePreviewModalProps) {
  if (!recipe) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  const handleViewFullRecipe = () => {
    onViewFullRecipe(recipe);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="sr-only">{recipe.title}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Image */}
          <div className="relative">
            <ImageWithFallback
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-80 hover:bg-opacity-100"
              onClick={() => onFavoriteToggle(recipe.id)}
            >
              <Heart
                className={`h-5 w-5 ${
                  recipe.isFavorite
                    ? "fill-red-500 text-red-500"
                    : "text-gray-600"
                }`}
              />
            </Button>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-4">
            <div>
              <h1 className="text-xl font-bold text-[#2d3319] mb-2">{recipe.title}</h1>
              <p className="text-gray-600 text-sm leading-relaxed">{recipe.description}</p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex">
                {renderStars(recipe.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
              </span>
            </div>

            {/* Quick Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center text-gray-600">
                <Clock className="h-4 w-4 mr-2" />
                <div>
                  <div>Prep: {recipe.prepTime}</div>
                  <div>Cook: {recipe.cookTime}</div>
                </div>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="h-4 w-4 mr-2" />
                Serves {recipe.servings}
              </div>
            </div>

            {/* Main Filter Tags */}
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-[#7d8471] text-white">
                  {recipe.difficulty}
                </Badge>
                <Badge variant="outline" className="border-[#7d8471] text-[#7d8471]">
                  {recipe.cuisine}
                </Badge>
              </div>
              
              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-2">
                {recipe.dietary.slice(0, 3).map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-green-500 text-green-700 bg-green-50"
                  >
                    {tag}
                  </Badge>
                ))}
                {recipe.dietary.length > 3 && (
                  <Badge variant="outline" className="border-gray-300 text-gray-500">
                    +{recipe.dietary.length - 3} more
                  </Badge>
                )}
              </div>
            </div>

            {/* Author */}
            <p className="text-sm text-gray-500">
              Recipe by <span className="font-medium text-[#7d8471]">{recipe.author}</span>
            </p>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={handleViewFullRecipe}
                className="flex-1 bg-[#7d8471] hover:bg-[#6b7463] text-white"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Full Recipe
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}