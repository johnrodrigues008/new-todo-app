import { useRouter } from "next/navigation";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      localStorage.removeItem("user");
      setUser(null);
    }
    setIsLoading(false);
  }, []);


  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: "POST",
        mode: 'cors',         
        credentials: 'include', 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Credenciais inválidas");

      const data = await res.json();
      console.log(data)
      const userObj = { id: data.data.id, email: data.data.email };
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(userObj));
      setUser(userObj);

    } finally {
      setIsLoading(false);
    }
  };


  const register = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: "POST",
        mode: 'cors',         
        credentials: 'include',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Erro ao registrar usuário");

      const data = await res.json();
      console.log(`Conta cadastrada com sucesso!`)
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user_email");
    localStorage.removeItem("token");
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
