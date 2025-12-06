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
  // Updated to use username for login
  onLogin: (username: string, password: string) => void;
   // Updated to pass display_name (from 'name'), email, username, and password
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
  name: "", // This will be the display_name
    username: "", // NEW: Added for backend AuthRequest
  email: "",
  password: "",
  confirmPassword: "",
 });

 const [errors, setErrors] = useState<Record<string, string>>({});

 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const newErrors: Record<string, string> = {};

  // Basic validation
  if (mode === "signup" && !formData.email) newErrors.email = "Email is required";
  if (!formData.password) newErrors.password = "Password is required";
  
  if (mode === "signup") {
   if (!formData.name) newErrors.name = "Full Name is required";
      if (!formData.username) newErrors.username = "Username is required"; // NEW
   if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = "Passwords don't match";
   }
  } else {
        // For login, we use the email field as the username input field
        if (!formData.email) newErrors.email = "Username is required";
    }

  setErrors(newErrors);

  if (Object.keys(newErrors).length === 0) {
   if (mode === "login") {
    // Login uses the email input field as the username
    onLogin(formData.email, formData.password);
   } else {
    // SignUp uses all fields
    onSignUp(formData.name, formData.email, formData.username, formData.password);
   }
   setFormData({ name: "", username: "", email: "", password: "", confirmPassword: "" }); // Reset form
   onClose();
  }
 };

 const handleInputChange = (field: string, value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }));
  if (errors[field]) {
   setErrors(prev => ({ ...prev, [field]: "" }));
  }
 };
    
  const loginFieldLabel = mode === "login" ? "Username" : "Email Address";
  const loginFieldPlaceholder = mode === "login" ? "Enter your username" : "Enter your email";


 return (
  <Dialog open={isOpen} onOpenChange={onClose}>
   <DialogContent className="sm:max-w-md">
    <DialogHeader>
     <DialogTitle className="text-2xl font-bold text-[#1a2e0b] text-center">
      {mode === "login" ? "Welcome Back" : "Join Recipes with Tea"}
     </DialogTitle>
     <DialogDescription className="text-center text-[#2d5016]">
      {mode === "login" 
       ? "Sign in to your account using your username." 
       : "Create an account to start sharing recipes and connect with fellow food enthusiasts."
      }
     </DialogDescription>
    </DialogHeader>

    <form onSubmit={handleSubmit} className="space-y-4">
     {mode === "signup" && (
      <div>
       <Label htmlFor="name" className="text-[#1a2e0b]">
        Full Name (Display Name)
       </Label>
       <Input
        id="name"
        type="text"
        value={formData.name}
        onChange={(e) => handleInputChange("name", e.target.value)}
        className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
        placeholder="Your display name (e.g., TeaLoverChef)"
       />
       {errors.name && (
        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
       )}
      </div>
     )}

          {mode === "signup" && (
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
        placeholder="A unique username for login"
       />
       {errors.username && (
        <p className="text-red-500 text-sm mt-1">{errors.username}</p>
       )}
      </div>
     )}

     <div>
      <Label htmlFor="email" className="text-[#1a2e0b]">
       {loginFieldLabel}
      </Label>
      <Input
       id="email"
       type={mode === "login" ? "text" : "email"}
       value={formData.email}
       onChange={(e) => handleInputChange("email", e.target.value)}
       className={`mt-1 ${errors.email ? "border-red-500" : ""}`}
       placeholder={loginFieldPlaceholder}
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