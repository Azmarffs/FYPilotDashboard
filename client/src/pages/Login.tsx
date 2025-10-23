import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Loader2, AlertCircle, Users, BookOpen, Settings } from "lucide-react";

type Role = "student" | "faculty" | "committee";

interface LoginProps {
  onLoginSuccess: (user: { id: string; username: string; role: Role; fullName: string }) => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<Role | "">("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    if (role === "student") {
      setUsername("student1");
      setPassword("password123");
    } else if (role === "faculty") {
      setUsername("faculty1");
      setPassword("password123");
    } else if (role === "committee") {
      setUsername("committee1");
      setPassword("password123");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!selectedRole) {
      setError("Please select a role first");
      return;
    }
    
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      onLoginSuccess(data.user);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-2">FYPILOT</h1>
          <p className="text-muted-foreground">AI-Enhanced FYP Management System</p>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">
              Select your role to sign in
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!selectedRole ? (
              <div className="space-y-4">
                <div className="grid gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleSelect("student")}
                    className="flex items-center gap-4 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg">Student Portal</h3>
                      <p className="text-sm text-muted-foreground">Access your projects and submissions</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("faculty")}
                    className="flex items-center gap-4 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20">
                      <BookOpen className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg">Faculty Portal</h3>
                      <p className="text-sm text-muted-foreground">Manage supervision and evaluations</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRoleSelect("committee")}
                    className="flex items-center gap-4 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20">
                      <Settings className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-lg">Committee Portal</h3>
                      <p className="text-sm text-muted-foreground">Oversee projects and analytics</p>
                    </div>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/20">
                    {selectedRole === "student" && <Users className="h-5 w-5 text-primary" />}
                    {selectedRole === "faculty" && <BookOpen className="h-5 w-5 text-primary" />}
                    {selectedRole === "committee" && <Settings className="h-5 w-5 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium capitalize">{selectedRole} Portal</p>
                    <p className="text-xs text-muted-foreground">Ready to sign in</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setSelectedRole("");
                      setUsername("");
                      setPassword("");
                      setError("");
                    }}
                    type="button"
                  >
                    Change
                  </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      autoComplete="username"
                      disabled={isLoading}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </Button>

                  <div className="text-center text-xs text-muted-foreground p-3 rounded-lg bg-muted/50">
                    Demo credentials auto-filled for {selectedRole}
                  </div>
                </form>
              </div>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          FAST University - Department of Computer Science
        </p>
      </div>
    </div>
  );
}
