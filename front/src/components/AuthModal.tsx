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
 // Login requires username and password
 onLogin: (username: string, password: string) => void;
 // SignUp requires display name, email, username, and password
 onSignUp: (displayName: string, email: string, username: string, password: string) => void;
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
 username: "", 
 displayName: "", 
 email: "",
 password: "",
 confirmPassword: "",
});

const [errors, setErrors] = useState<Record<string, string>>({});

const handleSubmit = (e: React.FormEvent) => {
 e.preventDefault();
 const newErrors: Record<string, string> = {};

 // Validation logic based on mode
 if (mode === "login") {
  // For Login, only Username and Password are required
  if (!formData.username) newErrors.username = "Username is required";
  if (!formData.password) newErrors.password = "Password is required";

 } else { // mode === "signup"
  // For Sign Up, all fields are required
  if (!formData.displayName) newErrors.displayName = "Display Name is required";
  if (!formData.email) newErrors.email = "Email is required";
  if (!formData.username) newErrors.username = "Username is required"; // Crucial for backend
  if (!formData.password) newErrors.password = "Password is required";
  
  if (formData.password && formData.password !== formData.confirmPassword) {
   newErrors.confirmPassword = "Passwords don't match";
  }
 }
 
 setErrors(newErrors);

 if (Object.keys(newErrors).length === 0) {
 if (mode === "login") {
  // Login uses username and password
  onLogin(formData.username, formData.password);
 } else {
  // SignUp: pass displayName, email, username, password
  onSignUp(formData.displayName, formData.email, formData.username, formData.password);
 }
 // Clear form data after successful submission
 setFormData({ username: "", displayName: "", email: "", password: "", confirmPassword: "" });
 onClose();
 }
};

const handleInputChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  if (errors[field]) {
   setErrors(prev => ({ ...prev, [field]: "" }));
  }
};
    
 // Helper for input types/labels based on mode (if you still have the mixed-use input)
 const isLoginMode = mode === "login";

 return (
  <Dialog open={isOpen} onOpenChange={onClose}>
   <DialogContent className="sm:max-w-md">
    <DialogHeader>
     <DialogTitle className="text-2xl font-bold text-[#1a2e0b] text-center">
      {isLoginMode ? "Welcome Back" : "Join Recipes with Tea"}
     </DialogTitle>
     <DialogDescription className="text-center text-[#2d5016]">
      {isLoginMode 
       ? "Sign in to your account using your username." 
       : "Create an account to start sharing recipes and connect with fellow food enthusiasts."
      }
     </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit} className="space-y-4">
     
            {/* Display Name Input (Sign Up Only) */}
     {isLoginMode === false && (
      <div>
       <Label htmlFor="displayName" className="text-[#1a2e0b]">
        Full Name (Display Name)
       </Label>
       <Input
        id="displayName"
        type="text"
        value={formData.displayName}
        onChange={(e) => handleInputChange("displayName", e.target.value)}
        className={`mt-1 ${errors.displayName ? "border-red-500" : ""}`}
        placeholder="Your full name"
       />
       {errors.displayName && (
        <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
       )}
      </div>
     )}

          {/* Username Input (Always visible/used for login) */}
     <div>
      <Label htmlFor="username" className="text-[#1a2e0b]">
       Username
      </Label>
      <Input
       id="username"
       type="text"
       value={formData.username}
       onChange={(e) => handleInputChange("username", e.target.value)}
       className={`mt-1 ${errors.username ? "border-red-500" : ""}`}
       placeholder={isLoginMode ? "Enter your username" : "Choose a unique username"}
      />
      {errors.username && (
       <p className="text-red-500 text-sm mt-1">{errors.username}</p>
      )}
     </div>

          {/* Email Input (Sign Up Only) */}
     {isLoginMode === false && (
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
     )}

          {/* Password Input (Always visible) */}
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

          {/* Confirm Password (Sign Up Only) */}
     {isLoginMode === false && (
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
      {isLoginMode ? "Sign In" : "Create Account"}
     </Button>
    </form>

    <Separator className="my-4" />

    <div className="text-center">
     <p className="text-sm text-gray-600">
      {isLoginMode ? "Don't have an account?" : "Already have an account?"}
     </p>
     <Button
      variant="ghost"
      onClick={onSwitchMode}
      className="text-[#4a7c59] hover:text-[#2d5016] hover:bg-[#e8f5e8] transition-colors duration-200"
     >
      {isLoginMode ? "Sign up here" : "Sign in here"}
     </Button>
    </div>
   </DialogContent>
  </Dialog>
 );
}
// import { useState } from "react";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Separator } from "./ui/separator";

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   mode: "login" | "signup";
//   onLogin: (username: string, password: string) => void;
//   onSignUp: (username: string, email: string, password: string) => void;
//   onSwitchMode: () => void;
// }

// export function AuthModal({
//   isOpen,
//   onClose,
//   mode,
//   onLogin,
//   onSignUp,
//   onSwitchMode,
// }: AuthModalProps) {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newErrors: Record<string, string> = {};

//     // Basic validation
//     if (!formData.username) newErrors.username = "Username is required";
//     if (!formData.password) newErrors.password = "Password is required";
    
//     if (mode === "signup") {
//       if (!formData.email) newErrors.email = "Email is required";
//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords don't match";
//       }
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       if (mode === "login") {
//         onLogin(formData.username, formData.password);
//       } else {
//         onSignUp(formData.username, formData.email, formData.password);
//       }
//       setFormData({ username: "", email: "", password: "", confirmPassword: "" });
//       onClose();
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: "" }));
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-[#1a2e0b] text-center">
//             {mode === "login" ? "Welcome Back" : "Join Recipes with Tea"}
//           </DialogTitle>
//           <DialogDescription className="text-center text-[#2d5016]">
//             {mode === "login" 
//               ? "Sign in to your account to access your favorite recipes and share your culinary creations." 
//               : "Create an account to start sharing recipes and connect with fellow food enthusiasts."
//             }
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="username" className="text-[#1a2e0b]">
//               Username
//             </Label>
//             <Input
//               id="username"
//               type="text"
//               value={formData.username}
//               onChange={(e) => handleInputChange("username", e.target.value)}
//               className={`mt-1 ${errors.username ? "border-red-500" : ""}`}
//               placeholder="Enter your username"
//             />
//             {errors.username && (
//               <p className="text-red-500 text-sm mt-1">{errors.username}</p>
//             )}
//             {mode === "login" && (
//               <p className="text-xs text-gray-500 mt-1">Try: sarah, marco, emma, or chef</p>
//             )}
//           </div>

//           {mode === "signup" && (
//             <div>
//               <Label htmlFor="email" className="text-[#1a2e0b]">
//                 Email Address
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
//                 placeholder="Enter your email"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//               )}
//             </div>
//           )}

//           <div>
//             <Label htmlFor="password" className="text-[#1a2e0b]">
//               Password
//             </Label>
//             <Input
//               id="password"
//               type="password"
//               value={formData.password}
//               onChange={(e) => handleInputChange("password", e.target.value)}
//               className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
//               placeholder="Enter your password"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//             {mode === "login" && (
//               <p className="text-xs text-gray-500 mt-1">Password: p123</p>
//             )}
//           </div>

//           {mode === "signup" && (
//             <div>
//               <Label htmlFor="confirmPassword" className="text-[#1a2e0b]">
//                 Confirm Password
//               </Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//                 className={`mt-1 ${errors.confirmPassword ? "border-red-500" : ""}`}
//                 placeholder="Confirm your password"
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
//               )}
//             </div>
//           )}

//           <Button
//             type="submit"
//             className="w-full bg-[#7cb342] hover:bg-[#4a7c59] text-white shadow-md hover:shadow-lg transition-all duration-300"
//           >
//             {mode === "login" ? "Sign In" : "Create Account"}
//           </Button>
//         </form>

//         <Separator className="my-4" />

//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             {mode === "login" ? "Don't have an account?" : "Already have an account?"}
//           </p>
//           <Button
//             variant="ghost"
//             onClick={onSwitchMode}
//             className="text-[#4a7c59] hover:text-[#2d5016] hover:bg-[#e8f5e8] transition-colors duration-200"
//           >
//             {mode === "login" ? "Sign up here" : "Sign in here"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
// import { useState } from "react";
// import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
// import { Button } from "./ui/button";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { Separator } from "./ui/separator";

// interface AuthModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   mode: "login" | "signup";
//   onLogin: (email: string, password: string) => void;
//   onSignUp: (name: string, email: string, password: string) => void;
//   onSwitchMode: () => void;
// }

// export function AuthModal({
//   isOpen,
//   onClose,
//   mode,
//   onLogin,
//   onSignUp,
//   onSwitchMode,
// }: AuthModalProps) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newErrors: Record<string, string> = {};

//     // Basic validation
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!formData.password) newErrors.password = "Password is required";
    
//     if (mode === "signup") {
//       if (!formData.name) newErrors.name = "Name is required";
//       if (formData.password !== formData.confirmPassword) {
//         newErrors.confirmPassword = "Passwords don't match";
//       }
//     }

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       if (mode === "login") {
//         onLogin(formData.email, formData.password);
//       } else {
//         onSignUp(formData.name, formData.email, formData.password);
//       }
//       setFormData({ name: "", email: "", password: "", confirmPassword: "" });
//       onClose();
//     }
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     if (errors[field]) {
//       setErrors(prev => ({ ...prev, [field]: "" }));
//     }
//   };

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="text-2xl font-bold text-[#1a2e0b] text-center">
//             {mode === "login" ? "Welcome Back" : "Join Recipes with Tea"}
//           </DialogTitle>
//           <DialogDescription className="text-center text-[#2d5016]">
//             {mode === "login" 
//               ? "Sign in to your account to access your favorite recipes and share your culinary creations." 
//               : "Create an account to start sharing recipes and connect with fellow food enthusiasts."
//             }
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {mode === "signup" && (
//             <div>
//               <Label htmlFor="name" className="text-[#1a2e0b]">
//                 Full Name
//               </Label>
//               <Input
//                 id="name"
//                 type="text"
//                 value={formData.name}
//                 onChange={(e) => handleInputChange("name", e.target.value)}
//                 className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
//                 placeholder="Enter your full name"
//               />
//               {errors.name && (
//                 <p className="text-red-500 text-sm mt-1">{errors.name}</p>
//               )}
//             </div>
//           )}

//           <div>
//             <Label htmlFor="email" className="text-[#1a2e0b]">
//               Email Address
//             </Label>
//             <Input
//               id="email"
//               type="email"
//               value={formData.email}
//               onChange={(e) => handleInputChange("email", e.target.value)}
//               className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
//               placeholder="Enter your email"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           <div>
//             <Label htmlFor="password" className="text-[#1a2e0b]">
//               Password
//             </Label>
//             <Input
//               id="password"
//               type="password"
//               value={formData.password}
//               onChange={(e) => handleInputChange("password", e.target.value)}
//               className={`mt-1 ${errors.password ? "border-red-500" : ""}`}
//               placeholder="Enter your password"
//             />
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>

//           {mode === "signup" && (
//             <div>
//               <Label htmlFor="confirmPassword" className="text-[#1a2e0b]">
//                 Confirm Password
//               </Label>
//               <Input
//                 id="confirmPassword"
//                 type="password"
//                 value={formData.confirmPassword}
//                 onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//                 className={`mt-1 ${errors.confirmPassword ? "border-red-500" : ""}`}
//                 placeholder="Confirm your password"
//               />
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
//               )}
//             </div>
//           )}

//           <Button
//             type="submit"
//             className="w-full bg-[#7cb342] hover:bg-[#4a7c59] text-white shadow-md hover:shadow-lg transition-all duration-300"
//           >
//             {mode === "login" ? "Sign In" : "Create Account"}
//           </Button>
//         </form>

//         <Separator className="my-4" />

//         <div className="text-center">
//           <p className="text-sm text-gray-600">
//             {mode === "login" ? "Don't have an account?" : "Already have an account?"}
//           </p>
//           <Button
//             variant="ghost"
//             onClick={onSwitchMode}
//             className="text-[#4a7c59] hover:text-[#2d5016] hover:bg-[#e8f5e8] transition-colors duration-200"
//           >
//             {mode === "login" ? "Sign up here" : "Sign in here"}
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }