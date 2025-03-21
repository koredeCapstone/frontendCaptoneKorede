import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleReset = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    alert(`Password reset link sent to ${email}`);
    // TODO: Integrate API call for password reset
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-96 p-6">
        <CardContent className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Forgot Password</h2>
          <p className="text-sm text-gray-600 text-center">Enter your email to receive a password reset link.</p>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button className="w-full" onClick={handleReset}>
            Reset Password
          </Button>
          <p className="text-center text-sm">
            <a href="/login" className="text-blue-600 hover:underline">Back to Login</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
