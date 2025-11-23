import { Star, Clock, Users, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
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
}

interface RecipeCardProps {
  recipe: Recipe;
  onRecipeClick: (recipe: Recipe) => void;
  onFavoriteToggle: (recipeId: number) => void;
}

export function RecipeCard({ recipe, onRecipeClick, onFavoriteToggle }: RecipeCardProps) {
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

  return (
    <Card className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-gray-200 overflow-hidden">
      <div className="relative" onClick={() => onRecipeClick(recipe)}>
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <ImageWithFallback
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 hover:bg-opacity-100"
          onClick={(e) => {
            e.stopPropagation();
            onFavoriteToggle(recipe.id);
          }}
        >
          <Heart
            className={`h-4 w-4 ${
              recipe.isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600"
            }`}
          />
        </Button>

        {/* Difficulty Badge */}
        <Badge
          className="absolute top-2 left-2 bg-[#7d8471] text-white"
          variant="secondary"
        >
          {recipe.difficulty}
        </Badge>
      </div>

      <CardContent className="p-4" onClick={() => onRecipeClick(recipe)}>
        <h3 className="font-semibold text-lg mb-2 text-[#2d3319] line-clamp-2">
          {recipe.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {recipe.description}
        </p>

        {/* Dietary Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {recipe.dietary.slice(0, 2).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-[#7d8471] text-[#7d8471]"
            >
              {tag}
            </Badge>
          ))}
          {recipe.dietary.length > 2 && (
            <Badge variant="outline" className="text-xs border-gray-300 text-gray-500">
              +{recipe.dietary.length - 2} more
            </Badge>
          )}
        </div>

        {/* Recipe Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {recipe.cookTime}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {recipe.servings}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {renderStars(recipe.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {recipe.rating.toFixed(1)} ({recipe.reviewCount})
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0" onClick={() => onRecipeClick(recipe)}>
        <p className="text-xs text-gray-500">
          by <span className="font-medium text-[#7d8471]">{recipe.author}</span>
        </p>
      </CardFooter>
    </Card>
  );
}