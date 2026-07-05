"use client";

import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { LuLayoutDashboard, LuPlus, LuList, LuBookmark, LuShoppingBag, LuLogOut, LuSun, LuMoon, LuUser } from "react-icons/lu";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function Sidebar({ user }) {
  const { resolvedTheme, setTheme } = useTheme();
  const router = useRouter();

  const handleSignOut = () => {
    console.log("Signing out...");
    router.push("/auth/signin");
  };

  return (
    <div className="flex h-screen w-64 flex-col justify-between border-r border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <div className="space-y-8">
        <h2 className="text-xl font-bold text-black dark:text-white">RecipeHub</h2>

        {/* Profile Section */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gray-200" />
            <div className="text-sm">
              <p className="font-bold text-black dark:text-white">{user?.name || "User"}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="rounded-full p-2 text-gray-600 transition-all hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            {resolvedTheme === "dark" ? <LuSun size={20} /> : <LuMoon size={20} />}
          </button>
        </div>

       {/* Navigation */}
<nav className="space-y-4">
  {[
    { name: "Overview", icon: LuLayoutDashboard, path: "/dashboard" },
    { name: "Add Recipe", icon: LuPlus, path: "/dashboard/new" },
    { name: "My Recipes", icon: LuList, path: "/dashboard/recipes" },
    { name: "Favorites", icon: LuBookmark, path: "/dashboard/favorites" },
    { name: "Purchased", icon: LuShoppingBag, path: "/dashboard/purchased" },
    { name: "Profile", icon: LuUser, path: "/dashboard/premium" },
    { name: "Admin Panel", icon: LuLayoutDashboard, path: "/admin" }
  ].map((item) => (
    <Link
      key={item.name}
      href={item.path}
      className="flex items-center gap-3 text-gray-600 transition-colors hover:text-green-600 dark:text-gray-400 dark:hover:text-green-500"
    >
      <item.icon size={20} /> {item.name}
    </Link>
  ))}
  
          {/* Auth Section */}
          <div className="pt-4">
            {user ? (
              <div className="flex flex-col gap-2">
                <span className="text-sm">Hi, {user.name}!</span>
                <Button 
                  onClick={handleSignOut} 
                  variant="ghost" 
                  className="justify-start px-0 text-red-600 hover:text-red-700"
                >
                  <LuLogOut size={18} /> Sign Out
                </Button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-green-600 transition hover:text-green-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}