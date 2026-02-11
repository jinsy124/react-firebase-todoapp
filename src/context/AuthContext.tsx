"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Models } from "appwrite";

type AuthContextType = {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  reloadUser: () => Promise<void>;
  
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  reloadUser: async () => {},
  
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] =
    useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 THIS WAS MISSING
  const loadUser = async () => {
    setLoading(true);
    try {
      const currentUser = await account.get();
      setUser(currentUser);
    } catch {
      setUser(null); // 👈 logout detected here
    } finally {
      setLoading(false);
    }
  };

  // 🔥 runs once when app loads
  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, reloadUser: loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);