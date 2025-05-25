// src/contexts/LayoutContext.tsx
"use client";
import { createContext, useContext } from "react";

interface LayoutContextType {
  adminName?: string;
  setAdminName: (adminName: string) => void;
  adminAvatar?: string;
  setAdminAvatar: (adminAvatar: string) => void;
}

export const LayoutContext = createContext<LayoutContextType | null>(null);

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
}