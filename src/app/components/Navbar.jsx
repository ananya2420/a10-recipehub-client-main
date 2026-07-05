"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuLayoutDashboard, LuLogOut, LuSun, LuMoon } from "react-icons/lu";
import { useTheme } from "./ThemeProvider";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/auth/signin");
        },
      },
    });
  };
 
  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Browse Recips", href: "/recips" },
    { name: "Dashboard", href: "/dashboard" },
    { name: "Admin Panel", href: "/admin" },
  ];

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:opacity-90">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-lg" />
          <span className="text-xl font-bold text-black dark:text-white tracking-tight">RecipeHub</span>
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-600 dark:text-gray-300 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="hover:text-green-600 transition-colors">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* User Account / Profile Section */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-all"
          >
            {resolvedTheme === "dark" ? <LuSun size={20} /> : <LuMoon size={20} />}
          </button>

          {/* Auth Links */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm">Hi, {user.name}!</span>
                <Button onClick={handleSignOut} variant="ghost" className="text-red-600 hover:text-red-700">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-green-600 transition hover:text-green-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;