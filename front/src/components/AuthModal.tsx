import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Separator } from "./ui/separator";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "login" | "signup";
  onLogin: (email: string, password: string) => void;
  onSignUp: (name: string, email: string, password: string) => void;
  onSwitchMode: () => void;
}

export function AuthModal({
  isOpen,
  onClose,
  mode,
  onLogin,
  onSignUp,
  onSwitchMode,
}: AuthModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    // Basic validation
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    
    if (mode === "signup") {
      if (!formData.name) newErrors.name = "Name is required";
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords don't match";
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (mode === "login") {
        onLogin(formData.email, formData.password);
      } else {
        onSignUp(formData.name, formData.email, formData.password);
      }
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1a2e0b] text-center">
            {mode === "login" ? "Welcome Back" : "Join Recipes with Tea"}
          </DialogTitle>
          <DialogDescription className="text-center text-[#2d5016]">
            {mode === "login" 
              ? "Sign in to your account to access your favorite recipes and share your culinary creations." 
              : "Create an account to start sharing recipes and connect with fellow food enthusiasts."
            }
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="name" className="text-[#1a2e0b]">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          )}

          <div>
            <Label htmlFor="email" className="text-[#1a2e0b]">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-[#1a2e0b]">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {mode === "signup" && (
            <div>
              <Label htmlFor="confirmPassword" className="text-[#1a2e0b]">
                Confirm Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                className={`mt-1 ${errors.confirmPassword ? "border-red-500" : ""}`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-[#7cb342] hover:bg-[#4a7c59] text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            {mode === "login" ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <Separator className="my-4" />

        <div className="text-center">
          <p className="text-sm text-gray-600">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}
          </p>
          <Button
            variant="ghost"
            onClick={onSwitchMode}
            className="text-[#4a7c59] hover:text-[#2d5016] hover:bg-[#e8f5e8] transition-colors duration-200"
          >
            {mode === "login" ? "Sign up here" : "Sign in here"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}