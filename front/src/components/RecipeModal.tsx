import { Star, Clock, Users, Heart, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useState } from "react";

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
  isFavorite: boolean;
  ingredients: string[];
  instructions: string[];
  prepTime: string;
  totalTime: string;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

interface RecipeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onFavoriteToggle: (recipeId: number) => void;
  reviews: Review[];
  onAddReview: (recipeId: number, rating: number, comment: string) => void;
  isLoggedIn: boolean;
}

export function RecipeModal({
  recipe,
  isOpen,
  onClose,
  onFavoriteToggle,
  reviews,
  onAddReview,
  isLoggedIn,
}: RecipeModalProps) {
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState("");

  if (!recipe) return null;

  const renderStars = (rating: number, interactive = false, onStarClick?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        } ${interactive ? "cursor-pointer hover:text-yellow-400" : ""}`}
        onClick={() => interactive && onStarClick && onStarClick(index + 1)}
      />
    ));
  };

  const handleSubmitReview = () => {
    if (newComment.trim()) {
      onAddReview(recipe.id, newRating, newComment);
      setNewComment("");
      setNewRating(5);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{recipe.title}</DialogTitle>
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-4 top-4 p-2"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Image and Basic Info */}
          <div>
            <div className="relative">
              <ImageWithFallback
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
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

            <div className="mt-6">
              <h1 className="text-2xl font-bold text-[#2d3319] mb-2">{recipe.title}</h1>
              <p className="text-gray-600 mb-4">{recipe.description}</p>

              <div className="flex items-center space-x-2 mb-4">
                {renderStars(recipe.rating)}
                <span className="text-sm text-gray-600">
                  {recipe.rating.toFixed(1)} ({recipe.reviewCount} reviews)
                </span>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Prep: {recipe.prepTime}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    Cook: {recipe.cookTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  Serves {recipe.servings}
                </div>
                <Badge className="bg-[#7d8471] text-white">
                  {recipe.difficulty}
                </Badge>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {recipe.dietary.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="border-[#7d8471] text-[#7d8471]"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-sm text-gray-500">
                Recipe by <span className="font-medium text-[#7d8471]">{recipe.author}</span>
              </p>
            </div>
          </div>

          {/* Right Column - Ingredients and Instructions */}
          <div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#2d3319] mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-start">
                    <span className="inline-block w-2 h-2 bg-[#7d8471] rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Separator className="my-6" />

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-[#2d3319] mb-3">Instructions</h3>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-[#7d8471] text-white rounded-full text-sm font-medium mr-3 flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            <Separator className="my-6" />

            {/* Reviews Section */}
            <div>
              <h3 className="text-lg font-semibold text-[#2d3319] mb-4">
                Reviews ({reviews.length})
              </h3>

              {/* Add Review Form */}
              {isLoggedIn && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-[#2d3319] mb-3">Add Your Review</h4>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-sm text-gray-600">Rating:</span>
                    <div className="flex">
                      {renderStars(newRating, true, setNewRating)}
                    </div>
                  </div>
                  <Textarea
                    placeholder="Share your thoughts about this recipe..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="mb-3"
                  />
                  <Button
                    onClick={handleSubmitReview}
                    className="bg-[#7d8471] hover:bg-[#6b7463] text-white"
                  >
                    Submit Review
                  </Button>
                </div>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="border-l-4 border-[#7d8471] pl-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-[#2d3319]">{review.author}</span>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-700 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}