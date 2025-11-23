import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface FilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    dietary: string[];
    allergies: string[];
    cuisine: string[];
    difficulty: string[];
    cookingTime: string[];
  };
  onFilterChange: (category: string, value: string, checked: boolean) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  if (!isOpen) return null;

  const filterOptions = {
    dietary: ["Vegetarian", "Vegan", "Gluten-Free", "Keto", "Paleo", "Low-Carb", "Dairy-Free"],
    allergies: ["Nuts", "Dairy", "Eggs", "Soy", "Shellfish", "Fish", "Gluten"],
    cuisine: ["Italian", "Asian", "Mexican", "Indian", "French", "Mediterranean", "American", "Chinese", "Japanese", "Thai", "Korean", "Greek", "Spanish", "Middle Eastern", "German", "British", "Brazilian", "Moroccan", "Turkish", "Vietnamese"],
    difficulty: ["Easy", "Medium", "Hard"],
    cookingTime: ["Under 30 min", "30-60 min", "1-2 hours", "2+ hours"],
  };

  return (
    <div className="fixed inset-0 z-40 lg:relative lg:inset-auto lg:z-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg lg:relative lg:w-64 lg:shadow-none lg:border-r border-[#e8e3d3]">
        <div className="p-6 relative">
          {/* Decorative leaf */}
          <div className="absolute top-4 right-4 opacity-10">
            <svg className="w-8 h-8 text-[#4a6741] floating-leaf" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-[#2d3e1f]">Filters</h3>
            <div className="flex space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-[#2d3e1f] hover:text-[#4a6741] hover:bg-[#e8e3d3]"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6 overflow-y-auto max-h-[calc(100vh-120px)] custom-scrollbar pr-2">
            {/* Dietary Restrictions */}
            <div>
              <Label className="text-sm font-medium text-[#2d3e1f] mb-3 block">
                Dietary Restrictions
              </Label>
              <div className="space-y-2">
                {filterOptions.dietary.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dietary-${option}`}
                      checked={filters.dietary.includes(option)}
                      onCheckedChange={(checked) =>
                        onFilterChange("dietary", option, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`dietary-${option}`}
                      className="text-sm text-[#2d3e1f]"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Allergies */}
            <div>
              <Label className="text-sm font-medium text-[#2d3e1f] mb-3 block">
                Allergy-Free
              </Label>
              <div className="space-y-2">
                {filterOptions.allergies.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`allergy-${option}`}
                      checked={filters.allergies.includes(option)}
                      onCheckedChange={(checked) =>
                        onFilterChange("allergies", option, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`allergy-${option}`}
                      className="text-sm text-[#2d3e1f]"
                    >
                      {option}-Free
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Cuisine Type */}
            <div>
              <Label className="text-sm font-medium text-[#2d3e1f] mb-3 block">
                Cuisine Type
              </Label>
              <div className="space-y-2">
                {filterOptions.cuisine.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`cuisine-${option}`}
                      checked={filters.cuisine.includes(option)}
                      onCheckedChange={(checked) =>
                        onFilterChange("cuisine", option, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`cuisine-${option}`}
                      className="text-sm text-[#2d3e1f]"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Difficulty */}
            <div>
              <Label className="text-sm font-medium text-[#2d3e1f] mb-3 block">
                Difficulty Level
              </Label>
              <div className="space-y-2">
                {filterOptions.difficulty.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`difficulty-${option}`}
                      checked={filters.difficulty.includes(option)}
                      onCheckedChange={(checked) =>
                        onFilterChange("difficulty", option, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`difficulty-${option}`}
                      className="text-sm text-[#2d3e1f]"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Cooking Time */}
            <div>
              <Label className="text-sm font-medium text-[#2d3e1f] mb-3 block">
                Cooking Time
              </Label>
              <div className="space-y-2">
                {filterOptions.cookingTime.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={`time-${option}`}
                      checked={filters.cookingTime.includes(option)}
                      onCheckedChange={(checked) =>
                        onFilterChange("cookingTime", option, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={`time-${option}`}
                      className="text-sm text-[#2d3e1f]"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}