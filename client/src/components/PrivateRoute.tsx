import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/contexts/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: "student" | "teacher" | "staff" | "admin";
}

export function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const { user, isLoading } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      setLocation("/login");
      return;
    }

    if (requiredRole && user.userType !== requiredRole) {
      switch (user.userType) {
        case "admin":
          setLocation("/dashboard");
          break;
        case "teacher":
          setLocation("/teacher/dashboard");
          break;
        case "student":
          setLocation("/student/dashboard");
          break;
        case "staff":
          setLocation("/staff/dashboard");
          break;
      }
    }
  }, [user, requiredRole, setLocation, isLoading]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (requiredRole && user.userType !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
