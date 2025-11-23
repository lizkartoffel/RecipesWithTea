import { Search, User, Heart, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onLoginClick: () => void;
  onSignUpClick: () => void;
  onUploadClick: () => void;
  onProfileClick: () => void;
  onFavoritesClick: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Header({
  onLoginClick,
  onSignUpClick,
  onUploadClick,
  onProfileClick,
  onFavoritesClick,
  searchQuery,
  onSearchChange,
  isLoggedIn,
  onLogout,
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-[#e8e3d3] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-[#4a6741] flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
            </div>
            <h1 className="text-xl font-semibold text-[#4a6741]">Recipes & Tea</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2d3e1f] h-4 w-4" />
              <Input
                type="text"
                placeholder="Search recipes & tea..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 bg-[#f5f2e8] border border-[#e8e3d3] focus:ring-2 focus:ring-[#4a6741] focus:border-[#4a6741] rounded-lg"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onUploadClick}
                  className="text-[#4a6741] hover:text-[#2d3e1f] hover:bg-[#e8e3d3] transition-colors duration-200"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Add Recipe
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onFavoritesClick}
                  className="text-[#4a6741] hover:text-[#2d3e1f] hover:bg-[#e8e3d3] transition-colors duration-200"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Favorites
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onProfileClick}
                  className="text-[#4a6741] hover:text-[#2d3e1f] hover:bg-[#e8e3d3] transition-colors duration-200"
                >
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLogout}
                  className="text-[#2d3e1f] hover:text-[#4a6741] hover:bg-[#e8e3d3] transition-colors duration-200"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onFavoritesClick}
                  className="text-[#4a6741] hover:text-[#2d3e1f] hover:bg-[#e8e3d3] transition-colors duration-200"
                >
                  <Heart className="h-4 w-4 mr-1" />
                  Favorites
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onLoginClick}
                  className="text-[#4a6741] hover:text-[#2d3e1f] hover:bg-[#e8e3d3] transition-colors duration-200"
                >
                  <User className="h-4 w-4 mr-1" />
                  Login
                </Button>
                <Button
                  size="sm"
                  onClick={onSignUpClick}
                  className="bg-[#4a6741] hover:bg-[#2d3e1f] text-white shadow-md hover:shadow-lg transition-all duration-300 rounded-lg"
                >
                  Sign Up
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}