"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { User, Address } from "@/lib/types";
import { toast } from "sonner";

interface AuthContextValue {
  user: User | null;
  addresses: Address[];
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  addAddress: (address: Omit<Address, "id" | "userId">) => void;
  removeAddress: (addressId: string) => void;
  setDefaultAddress: (addressId: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Simulated users store — replace with real auth backend
const DEMO_USER: User = {
  id: "user-1",
  name: "کاربر نمونه",
  email: "user@example.com",
  phone: "09121234567",
  role: "user",
  createdAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("goldstone-user");
      const savedAddresses = localStorage.getItem("goldstone-addresses");
      if (saved) setUser(JSON.parse(saved));
      if (savedAddresses) setAddresses(JSON.parse(savedAddresses));
    } catch {
      // ignore
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("goldstone-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("goldstone-user");
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem("goldstone-addresses", JSON.stringify(addresses));
  }, [addresses]);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // TODO: Replace with real authentication API
    // For demo, accept any login
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setUser({ ...DEMO_USER, email });
    setIsLoading(false);
    toast.success("ورود موفقیت‌آمیز بود");
    return true;
  }, []);

  const register = useCallback(
    async (name: string, email: string, _password: string, phone: string): Promise<boolean> => {
      setIsLoading(true);
      await new Promise((r) => setTimeout(r, 800));
      const newUser: User = {
        id: `user-${Date.now()}`,
        name,
        email,
        phone,
        role: "user",
        createdAt: new Date().toISOString(),
      };
      setUser(newUser);
      setIsLoading(false);
      toast.success("ثبت‌نام با موفقیت انجام شد");
      return true;
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
    setAddresses([]);
    localStorage.removeItem("goldstone-user");
    localStorage.removeItem("goldstone-addresses");
    toast.success("از حساب خارج شدید");
  }, []);

  const updateProfile = useCallback((data: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
    toast.success("پروفایل بروزرسانی شد");
  }, []);

  const addAddress = useCallback((address: Omit<Address, "id" | "userId">) => {
    const newAddress: Address = {
      ...address,
      id: `addr-${Date.now()}`,
      userId: "user-1",
    };
    setAddresses((prev) => {
      if (newAddress.isDefault) {
        return [...prev.map((a) => ({ ...a, isDefault: false })), newAddress];
      }
      return [...prev, newAddress];
    });
    toast.success("آدرس جدید اضافه شد");
  }, []);

  const removeAddress = useCallback((addressId: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== addressId));
    toast.success("آدرس حذف شد");
  }, []);

  const setDefaultAddress = useCallback((addressId: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === addressId })),
    );
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        addresses,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
