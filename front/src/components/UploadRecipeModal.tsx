import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Plus, Minus } from "lucide-react";

interface UploadRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (recipeData: any) => void;
}

export function UploadRecipeModal({ isOpen, onClose, onUpload }: UploadRecipeModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    prepTime: "",
    cookTime: "",
    servings: "",
    difficulty: "",
    cuisine: "",
    dietary: [] as string[],
    ingredients: [""],
    instructions: [""],
  });

  const dietaryOptions = [
    "Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo", "Low-Carb", "Dairy-Free"
  ];

  const cuisineOptions = [
    "Italian", "Asian", "Mexican", "Indian", "French", "Mediterranean", "American", 
    "Chinese", "Japanese", "Thai", "Korean", "Greek", "Spanish", "Middle Eastern", 
    "German", "British", "Brazilian", "Moroccan", "Turkish", "Vietnamese"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const recipeData = {
      ...formData,
      ingredients: formData.ingredients.filter(ingredient => ingredient.trim()),
      instructions: formData.instructions.filter(instruction => instruction.trim()),
      servings: parseInt(formData.servings),
    };

    onUpload(recipeData);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      image: "",
      prepTime: "",
      cookTime: "",
      servings: "",
      difficulty: "",
      cuisine: "",
      dietary: [],
      ingredients: [""],
      instructions: [""],
    });
    
    onClose();
  };

  const addIngredient = () => {
    setFormData(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, ""]
    }));
  };

  const removeIngredient = (index: number) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const updateIngredient = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      ingredients: prev.ingredients.map((ingredient, i) => 
        i === index ? value : ingredient
      )
    }));
  };

  const addInstruction = () => {
    setFormData(prev => ({
      ...prev,
      instructions: [...prev.instructions, ""]
    }));
  };

  const removeInstruction = (index: number) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.filter((_, i) => i !== index)
    }));
  };

  const updateInstruction = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      instructions: prev.instructions.map((instruction, i) => 
        i === index ? value : instruction
      )
    }));
  };

  const toggleDietary = (option: string) => {
    setFormData(prev => ({
      ...prev,
      dietary: prev.dietary.includes(option)
        ? prev.dietary.filter(item => item !== option)
        : [...prev.dietary, option]
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#2d3319]">
            Share Your Recipe
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title" className="text-[#2d3319]">
                Recipe Title *
              </Label>
              <Input
                id="title"
                required
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter recipe title"
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description" className="text-[#2d3319]">
                Description *
              </Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your recipe..."
                className="mt-1"
                rows={3}
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="image" className="text-[#2d3319]">
                Image URL
              </Label>
              <Input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                placeholder="https://example.com/recipe-image.jpg"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="prepTime" className="text-[#2d3319]">
                Prep Time *
              </Label>
              <Input
                id="prepTime"
                required
                value={formData.prepTime}
                onChange={(e) => setFormData(prev => ({ ...prev, prepTime: e.target.value }))}
                placeholder="15 min"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="cookTime" className="text-[#2d3319]">
                Cook Time *
              </Label>
              <Input
                id="cookTime"
                required
                value={formData.cookTime}
                onChange={(e) => setFormData(prev => ({ ...prev, cookTime: e.target.value }))}
                placeholder="30 min"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="servings" className="text-[#2d3319]">
                Servings *
              </Label>
              <Input
                id="servings"
                type="number"
                required
                min="1"
                value={formData.servings}
                onChange={(e) => setFormData(prev => ({ ...prev, servings: e.target.value }))}
                placeholder="4"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="difficulty" className="text-[#2d3319]">
                Difficulty Level *
              </Label>
              <Select 
                value={formData.difficulty} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cuisine" className="text-[#2d3319]">
                Cuisine Type *
              </Label>
              <Select 
                value={formData.cuisine} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, cuisine: value }))}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {cuisineOptions.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>{cuisine}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Dietary Options */}
          <div>
            <Label className="text-[#2d3319] mb-3 block">
              Dietary Options
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {dietaryOptions.map((option) => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`dietary-${option}`}
                    checked={formData.dietary.includes(option)}
                    onCheckedChange={() => toggleDietary(option)}
                  />
                  <Label
                    htmlFor={`dietary-${option}`}
                    className="text-sm text-gray-700"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Ingredients */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-[#2d3319]">
                Ingredients *
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addIngredient}
                className="text-[#7d8471] border-[#7d8471] hover:bg-[#f5f7f0]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder={`Ingredient ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.ingredients.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 border-red-500 hover:bg-red-50"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Instructions */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <Label className="text-[#2d3319]">
                Instructions *
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addInstruction}
                className="text-[#7d8471] border-[#7d8471] hover:bg-[#f5f7f0]"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            </div>
            <div className="space-y-2">
              {formData.instructions.map((instruction, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 bg-[#7d8471] text-white rounded-full text-sm font-medium mt-2 flex-shrink-0">
                    {index + 1}
                  </span>
                  <Textarea
                    value={instruction}
                    onChange={(e) => updateInstruction(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="flex-1"
                    rows={2}
                  />
                  {formData.instructions.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeInstruction(index)}
                      className="text-red-500 border-red-500 hover:bg-red-50 mt-2"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#7d8471] hover:bg-[#6b7463] text-white"
            >
              Share Recipe
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}