import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular verificação de usuário logado no localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    // Simular call de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulação simples - aceita qualquer email/senha
    const mockUser: User = {
      id: "1",
      name: email.split("@")[0],
      email,
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ) => {
    setIsLoading(true);

    // Simular call de API
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const mockUser: User = {
      id: Date.now().toString(),
      name,
      email,
    };

    setUser(mockUser);
    localStorage.setItem("user", JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
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
    throw new Error(
      "useAuth deve ser usado dentro de um AuthProvider",
    );
  }
  return context;
}