import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
        credentials: "include", // Required to send/receive cookies (HTTP-only cookie set by backend)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Since the token is set in an HTTP-only cookie, we don't need to store it manually
        // Optionally store user info in localStorage for UI purposes
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: formData.email,
            isLoggedIn: true,
          })
        );

        toast.success(data.message || "Successfully signed in!");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/ap.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
      className="relative"
    >
      {/* Logo and Text */}
      <div className="hidden md:block md:absolute md:left-10 md:ml-10 md:top-1/2 md:-translate-y-1/2 text-white text-center md:text-left mb-8 md:mb-0">
        <div className="flex justify-center md:justify-start items-center">
          <img src="/images/logo.png" alt="WorkHive Logo" className="h-12 w-auto" />
          <span className="ml-2 text-2xl font-bold text-workhive-white">WORKHIVE</span>
        </div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mt-4">
          Empower Your Career...
        </h1>
        <p className="text-sm sm:text-base font-light">
          Discover a world of opportunities with meaningful internships
        </p>
      </div>

      <div className="flex min-h-screen items-center justify-end px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-5 ml-auto mr-20"
        >
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-3 py-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-workhive-blue hover:bg-workhive-blue/90 py-2 rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>
              </form>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Or</p>
                <Button variant="outline" className="w-full flex items-center justify-center mt-2">
                  <FcGoogle className="mr-2" /> Log In with Google
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 text-center">
              <div className="flex justify-center space-x-1">
                <span className="text-sm text-gray-600">Don't have an account?</span>
                <Link to="/signup" className="text-sm text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </div>
              <Button
                variant="link"
                className="text-sm text-gray-600 hover:text-gray-900"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot your password?
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;