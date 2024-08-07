"use client";

import NextTopLoader from "nextjs-toploader";
import { createContext, useContext, useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { getCurrentUser } from "@/utils/db/apiAuth";
import { Loader } from "lucide-react";
import { usePathname } from "next/navigation";

const AuthContext = createContext<any | null>(null);

export default function AuthProvider({ children }: ILayout) {
  const pathname = usePathname();

  const [credentials, setCredentials] = useState<any>(null);
  const [isFetchingUser, setIsFetchingUser] = useState(false);

  const { open } = useWeb3Modal();
  const { isConnecting, address, isConnected } = useAccount();

  const getCurrentUserFn = async () => {
    setIsFetchingUser(true);
    try {
      const user = await getCurrentUser();
      if (user) {
        setCredentials(user);
      } else {
        setCredentials(null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetchingUser(false);
    }
  };

  const isAuthenticated: boolean = credentials?.role === "authenticated";

  useEffect(() => {
    getCurrentUserFn();
    if (pathname === "/" || pathname === "/about" || pathname === "/buy")
      return;
    if (!isConnected) open();
  }, []);

  useEffect(() => {
    if (pathname === "/" || pathname === "/about" || pathname === "/buy")
      return;
    if (!isConnected) open();
  }, [isConnected, address, pathname]);

  const authProps = {
    credentials,
    isFetchingUser,
    getCurrentUserFn,
    isAuthenticated,
    openWallet: open,
    address: address,
    isConnected,
    isConnecting,
  };

  return (
    <AuthContext.Provider value={authProps}>
      <SonnerToaster richColors theme="dark" />
      <NextTopLoader showSpinner={false} color="hsl(var(--initial))" />
      {isFetchingUser && (
        <div
          className="fixed top-0 left-0 size-full bg-background/50 backdrop-blur-xl flex items-center justify-center"
          style={{
            zIndex: 9999,
          }}>
          <Loader size={22} className="animate-spin" />
        </div>
      )}
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): any => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};
