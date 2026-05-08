"use client";

import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { setUser } from "@/redux/slices/usersSlice";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // Login State
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register State
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const firebaseUser = result.user;

      const res = await fetch('/api/auth/firebase-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: firebaseUser.email,
          uid: firebaseUser.uid,
          signupMethod: 'Email/Password'
        }),
      });
      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success("Login successful!");
        onClose();
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      await updateProfile(result.user, { displayName: regName });

      const res = await fetch('/api/auth/firebase-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: result.user.email,
          name: regName,
          uid: result.user.uid,
          signupMethod: 'Email/Password'
        }),
      });
      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success("Account created successfully!");
        onClose();
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const res = await fetch('/api/auth/firebase-sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          image: firebaseUser.photoURL,
          uid: firebaseUser.uid,
          signupMethod: 'OAuth'
        }),
      });
      const data = await res.json();

      if (data.success) {
        dispatch(setUser(data.user));
        toast.success("Login successful!");
        onClose();
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error.message || "Google sign in failed");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-xl border border-[#496506]/10 rounded-3xl p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-light text-center text-gray-800">Welcome to Arabic</DialogTitle>
          <DialogDescription className="text-center text-gray-500 font-light">
            Luxury Dry Fruits & Nuts
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/50 p-1 rounded-2xl">
            <TabsTrigger value="login" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
            <TabsTrigger value="register" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-light text-gray-600">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 bg-white/50 border-gray-200 rounded-xl focus:ring-[#496506] focus:border-[#496506]/30"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-light text-gray-600">Password</Label>
                  <button type="button" className="text-xs text-[#496506] hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showLoginPassword ? "text" : "password"}
                    className="h-12 bg-white/50 border-gray-200 rounded-xl focus:ring-[#496506] focus:border-[#496506]/30 pr-10"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#496506] hover:bg-[#3a5005] text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mt-2"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
              </Button>
            </form>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-400">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <Button
                variant="outline"
                className="h-12 border-gray-200 rounded-xl hover:bg-gray-50 font-light"
                onClick={handleGoogleSignIn}
              >
                Google
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="reg-name" className="text-sm font-light text-gray-600">Full Name</Label>
                <Input
                  id="reg-name"
                  placeholder="John Doe"
                  className="h-12 bg-white/50 border-gray-200 rounded-xl focus:ring-[#496506] focus:border-[#496506]/30"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email" className="text-sm font-light text-gray-600">Email address</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="name@example.com"
                  className="h-12 bg-white/50 border-gray-200 rounded-xl focus:ring-[#496506] focus:border-[#496506]/30"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password" className="text-sm font-light text-gray-600">Password</Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    type={showRegPassword ? "text" : "password"}
                    className="h-12 bg-white/50 border-gray-200 rounded-xl focus:ring-[#496506] focus:border-[#496506]/30 pr-10"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                  >
                    {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isRegistering}
                className="w-full h-12 bg-[#496506] hover:bg-[#3a5005] text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mt-2"
              >
                {isRegistering ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>
            </form>
            <p className="text-center text-xs text-gray-400 font-light mt-4">
              By joining, you agree to our <button className="text-[#496506] hover:underline">Terms of Service</button> and <button className="text-[#496506] hover:underline">Privacy Policy</button>
            </p>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
