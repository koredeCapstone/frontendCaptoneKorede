import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const response = await fetch("http://localhost:3000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || "Account created successfully!");
        localStorage.setItem(
          "user",
          JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            isLoggedIn: true,
          })
        );
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Signup error:", error);
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
        minHeight: "100vh",
      }}
      className="relative"
    >
      <div className="absolute left-10 ml-10 top-1/2 transform -translate-y-1/2 text-white hidden md:block">
        <div className="flex items-center ">
          <img src="/images/logo.png" alt="WorkHive Logo" className="h-12 w-auto" />
          <span className="ml-2 text-2xl font-bold text-workhive-white">WORKHIVE</span>
        </div>
        <h1 className="text-3xl font-light-bold tracking-tight mt-4">
          Empower Your Career...
        </h1>
        <p className="text-base font-light">
          Discover a world of opportunities with meaningful internships
        </p>
      </div>

      <div className="flex min-h-screen items-center justify-end px-10"> 
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full space-y-8 ml-auto mr-20"
        >
          <Card className="border-0 shadow-lg bg-white rounded-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Create an account
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Join WorkHive to start your journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className={`text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 border ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
                    disabled={isLoading}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={`text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 border ${errors.email ? "border-red-500" : "border-gray-300"}`}
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-500">{errors.email}</p>
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
                    className={`text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    disabled={isLoading}
                  />
                  {errors.password && (
                    <p className="mt-1 text-xs text-red-500">{errors.password}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className={`text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2 border ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-300"
                    } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                    disabled={isLoading}
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm sm:text-base py-1.5 sm:py-2 rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </Button>
              </form>
              <div className="text-center my-2 sm:my-3 text-gray-500 text-xs sm:text-sm">Or</div>
              <Button className="w-full flex items-center justify-center border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg">
                <FcGoogle className="mr-2" /> Sign up with Google
              </Button>
            </CardContent>
            <CardFooter className="flex justify-center space-x-1 text-xs sm:text-sm">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Link to="/login" className="text-blue-600 hover:text-blue-500">
                Sign in
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;