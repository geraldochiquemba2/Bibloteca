import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import logoImage from "@assets/image_1763306167272.png";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      return apiRequest("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
      });
    },
    onSuccess: (data) => {
      localStorage.setItem("user", JSON.stringify(data.user));
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo ${data.user.name}`,
      });
      setLocation("/dashboard");
    },
    onError: (error: any) => {
      toast({
        title: "Erro no login",
        description: error.message || "Credenciais inválidas",
        variant: "destructive",
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      toast({
        title: "Erro no login",
        description: "Por favor, preencha todos os campos",
        variant: "destructive",
      });
      return;
    }

    loginMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://images.pexels.com/photos/8199629/pexels-photo-8199629.jpeg" 
          alt="Biblioteca de fundo" 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-start">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back"
            className="gap-2 text-white backdrop-blur-md bg-white/10 border border-white/20"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </div>
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center">
              <img src={logoImage} alt="ISPTEC Logo" className="h-20 w-20 object-contain" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-white">Biblioteca ISPTEC</h1>
            <p className="text-lg text-white mt-2">
              Sistema de Gestão Bibliotecária
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Iniciar Sessão</CardTitle>
            <CardDescription>
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nome de Utilizador</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  data-testid="input-username"
                  disabled={loginMutation.isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                  disabled={loginMutation.isPending}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                data-testid="button-login"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Entrando..." : "Entrar"}
              </Button>
            </form>
            <div className="mt-4 text-sm text-muted-foreground text-center">
              <p>Credenciais padrão:</p>
              <p className="font-mono">admin / admin123</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center space-y-4">
          <div className="text-xs text-white space-y-1">
            <p>Instituto Superior Politécnico de Tecnologias e Ciências</p>
            <p className="font-medium">© 2024 ISPTEC - Todos os direitos reservados</p>
          </div>
        </div>
      </div>
    </div>
  );
}
