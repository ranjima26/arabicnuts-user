"use client";

import { useState } from "react";
import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { setUser } from "@/redux/slices/usersSlice";
import { toast } from "sonner";
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
import { Loader2, Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/redux/api/authApi";
import { useDispatch } from "react-redux";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// ── Validation  ──────────────────────────────────────────────────────
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required.";
  if (!re.test(email)) return "Please enter a valid email address.";
  return "";
};

const validatePassword = (password: string) => {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
  return "";
};

const getPasswordStrength = (password: string): { label: string; color: string; width: string } => {
  if (!password) return { label: "", color: "", width: "0%" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score === 1) return { label: "Weak", color: "#ef4444", width: "25%" };
  if (score === 2) return { label: "Fair", color: "#f59e0b", width: "50%" };
  if (score === 3) return { label: "Good", color: "#3b82f6", width: "75%" };
  return { label: "Strong", color: "#496506", width: "100%" };
};

// ── FieldError helper component ─────────────────────────────────────────────
function FieldError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p className="flex items-center gap-1 text-xs text-red-500 mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
      <XCircle size={12} />
      {message}
    </p>
  );
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [register, { isLoading: isRegistering }] = useRegisterMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  // ── Login State ────────────────────────────────────────────────────────────
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });
  const [loginTouched, setLoginTouched] = useState({ email: false, password: false });

  // ── Register State ─────────────────────────────────────────────────────────
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regErrors, setRegErrors] = useState({ name: "", email: "", password: "" });
  const [regTouched, setRegTouched] = useState({ name: false, email: false, password: false });

  // ── Login validation ───────────────────────────────────────────────────────
  const validateLoginForm = () => {
    const errors = {
      email: validateEmail(loginEmail),
      password: loginPassword ? "" : "Password is required.",
    };
    setLoginErrors(errors);
    return !errors.email && !errors.password;
  };

  const handleLoginBlur = (field: "email" | "password") => {
    setLoginTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "email") setLoginErrors((prev) => ({ ...prev, email: validateEmail(loginEmail) }));
    if (field === "password") setLoginErrors((prev) => ({ ...prev, password: loginPassword ? "" : "Password is required." }));
  };

  // ── Register validation ────────────────────────────────────────────────────
  const validateRegisterForm = () => {
    const errors = {
      name: regName.trim() ? "" : "Full name is required.",
      email: validateEmail(regEmail),
      password: validatePassword(regPassword),
    };
    setRegErrors(errors);
    return !errors.name && !errors.email && !errors.password;
  };

  const handleRegBlur = (field: "name" | "email" | "password") => {
    setRegTouched((prev) => ({ ...prev, [field]: true }));
    if (field === "name") setRegErrors((prev) => ({ ...prev, name: regName.trim() ? "" : "Full name is required." }));
    if (field === "email") setRegErrors((prev) => ({ ...prev, email: validateEmail(regEmail) }));
    if (field === "password") setRegErrors((prev) => ({ ...prev, password: validatePassword(regPassword) }));
  };

  const passwordStrength = getPasswordStrength(regPassword);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginTouched({ email: true, password: true });
    if (!validateLoginForm()) return;

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

      if (!res.ok) {
        toast.error("Failed to sync with server");
      } else {
        toast.success("Login successful! Welcome to Arabic Dry Fruits");
        // Clear login form
        setLoginEmail("");
        setLoginPassword("");
        setLoginErrors({ email: "", password: "" });
        setLoginTouched({ email: false, password: false });
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
    setRegTouched({ name: true, email: true, password: true });
    if (!validateRegisterForm()) return;

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
        // Clear register form
        setRegName("");
        setRegEmail("");
        setRegPassword("");
        setRegErrors({ name: "", email: "", password: "" });
        setRegTouched({ name: false, email: false, password: false });
        onClose();
        router.refresh();
      } else {
        toast.error(data.message || "Registration sync failed");
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
            Luxury Dry Fruits &amp; Nuts
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8 bg-gray-100/50 p-1 rounded-2xl">
            <TabsTrigger value="login" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">Login</TabsTrigger>
            <TabsTrigger value="register" className="rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm">Register</TabsTrigger>
          </TabsList>

          {/* ── LOGIN TAB ── */}
          <TabsContent value="login" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="login-email" className="text-sm font-light text-gray-600">Email address</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  className={`h-12 bg-white/50 rounded-xl transition-colors ${
                    loginTouched.email && loginErrors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                      : loginTouched.email && !loginErrors.email
                      ? "border-green-400 focus:border-green-400"
                      : "border-gray-200 focus:ring-[#496506] focus:border-[#496506]/30"
                  }`}
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    if (loginTouched.email) setLoginErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                  }}
                  onBlur={() => handleLoginBlur("email")}
                />
                <FieldError message={loginTouched.email ? loginErrors.email : ""} />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password" className="text-sm font-light text-gray-600">Password</Label>
                  <button type="button" className="text-xs text-[#496506] hover:underline">Forgot password?</button>
                </div>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`h-12 bg-white/50 rounded-xl pr-10 transition-colors ${
                      loginTouched.password && loginErrors.password
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : loginTouched.password && !loginErrors.password
                        ? "border-green-400 focus:border-green-400"
                        : "border-gray-200 focus:ring-[#496506] focus:border-[#496506]/30"
                    }`}
                    value={loginPassword}
                    onChange={(e) => {
                      setLoginPassword(e.target.value);
                      if (loginTouched.password) setLoginErrors((prev) => ({ ...prev, password: e.target.value ? "" : "Password is required." }));
                    }}
                    onBlur={() => handleLoginBlur("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                  >
                    {showLoginPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <FieldError message={loginTouched.password ? loginErrors.password : ""} />
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

          {/* ── REGISTER TAB ── */}
          <TabsContent value="register" className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <form onSubmit={handleRegister} className="space-y-4" noValidate>
              {/* Full Name */}
              <div className="space-y-1">
                <Label htmlFor="reg-name" className="text-sm font-light text-gray-600">Full Name</Label>
                <Input
                  id="reg-name"
                  placeholder="Enter your full name"
                  className={`h-12 bg-white/50 rounded-xl transition-colors ${
                    regTouched.name && regErrors.name
                      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                      : regTouched.name && !regErrors.name
                      ? "border-green-400 focus:border-green-400"
                      : "border-gray-200 focus:ring-[#496506] focus:border-[#496506]/30"
                  }`}
                  value={regName}
                  onChange={(e) => {
                    setRegName(e.target.value);
                    if (regTouched.name) setRegErrors((prev) => ({ ...prev, name: e.target.value.trim() ? "" : "Full name is required." }));
                  }}
                  onBlur={() => handleRegBlur("name")}
                />
                <FieldError message={regTouched.name ? regErrors.name : ""} />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <Label htmlFor="reg-email" className="text-sm font-light text-gray-600">Email address</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="Enter your email"
                  className={`h-12 bg-white/50 rounded-xl transition-colors ${
                    regTouched.email && regErrors.email
                      ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                      : regTouched.email && !regErrors.email
                      ? "border-green-400 focus:border-green-400"
                      : "border-gray-200 focus:ring-[#496506] focus:border-[#496506]/30"
                  }`}
                  value={regEmail}
                  onChange={(e) => {
                    setRegEmail(e.target.value);
                    if (regTouched.email) setRegErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
                  }}
                  onBlur={() => handleRegBlur("email")}
                />
                <FieldError message={regTouched.email ? regErrors.email : ""} />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <Label htmlFor="reg-password" className="text-sm font-light text-gray-600">Password</Label>
                <div className="relative">
                  <Input
                    id="reg-password"
                    type={showRegPassword ? "text" : "password"}
                    placeholder="Min 8 chars, 1 uppercase, 1 number"
                    className={`h-12 bg-white/50 rounded-xl pr-10 transition-colors ${
                      regTouched.password && regErrors.password
                        ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                        : regTouched.password && !regErrors.password
                        ? "border-green-400 focus:border-green-400"
                        : "border-gray-200 focus:ring-[#496506] focus:border-[#496506]/30"
                    }`}
                    value={regPassword}
                    onChange={(e) => {
                      setRegPassword(e.target.value);
                      if (regTouched.password) setRegErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
                    }}
                    onBlur={() => handleRegBlur("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                  >
                    {showRegPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Password strength bar */}
                {regPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: passwordStrength.width, backgroundColor: passwordStrength.color }}
                      />
                    </div>
                    <p className="text-xs font-medium" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </p>
                  </div>
                )}

                <FieldError message={regTouched.password ? regErrors.password : ""} />

                {/* Password requirements checklist */}
                {regTouched.password && regPassword && (
                  <ul className="mt-2 space-y-1">
                    {[
                      { rule: regPassword.length >= 8, label: "At least 8 characters" },
                      { rule: /[A-Z]/.test(regPassword), label: "One uppercase letter" },
                      { rule: /[0-9]/.test(regPassword), label: "One number" },
                    ].map(({ rule, label }) => (
                      <li key={label} className={`flex items-center gap-1.5 text-xs ${rule ? "text-green-600" : "text-gray-400"}`}>
                        {rule ? <CheckCircle2 size={12} /> : <XCircle size={12} />}
                        {label}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <Button
                type="submit"
                disabled={isRegistering || isLoading}
                className="w-full h-12 bg-[#496506] hover:bg-[#3a5005] text-white rounded-xl transition-all duration-300 shadow-md hover:shadow-lg mt-2"
              >
                {isRegistering || isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create Account"}
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
