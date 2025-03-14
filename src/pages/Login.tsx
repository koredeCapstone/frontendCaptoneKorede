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

interface User {
  fullName: string;
  email: string;
  password: string;
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUsers = localStorage.getItem('users') ? 
        JSON.parse(localStorage.getItem('users') || '[]') : [];
      
      const user = existingUsers.find((u: User) => 
        u.email === formData.email && u.password === formData.password
      );

      if (!user) {
        toast.error("Invalid email or password");
        return;
      }

      localStorage.setItem('user', JSON.stringify({
        fullName: user.fullName,
        email: user.email,
        isLoggedIn: true
      }));

      toast.success("Successfully signed in!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/images/background.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
      className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative"
    >
      {/* Logo and Text */}
      <div className=" left-10 text-white">
        <img src="/images/logo.png" alt="WorkHive Logo" className="w-32 mb-4" />
        <h1 className="text-3xl font-light-bold text-align:left tracking-tight">Empower Your Career...</h1>
        <p className="text-base text-align:left font-light">Discover a world of opportunities with meaningful internships</p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
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
                  className={`appearance-none rounded-md relative block w-full px-3 py-2 border ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
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
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-workhive-blue hover:bg-workhive-blue/90"
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
           <CardFooter className="flex flex-col space-y-4">
            <div className="flex justify-center space-x-1">
              <span className="text-sm text-gray-600">Don't have an account?</span>
              <Link to="/signup" className="text-sm text-blue-600 hover:text-blue-500">
                Sign up
              </Link>
            </div>
            <Button 
              variant="link" 
              className="text-sm text-gray-600 hover:text-gray-900"
              onClick={() => navigate('/forgot-password')}
            >
              Forgot your password?
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;

     
