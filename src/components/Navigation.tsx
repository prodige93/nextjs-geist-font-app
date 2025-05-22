"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? "text-black" : "text-gray-500 hover:text-black";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link 
              href="/" 
              className="flex items-center font-['Inter'] font-semibold text-black"
            >
              Labwear Studios
            </Link>
          </div>

          <div className="flex items-center space-x-8">
            {session ? (
              <>
                <Link 
                  href="/dashboard/drafts" 
                  className={`font-['Inter'] ${isActive('/dashboard/drafts')}`}
                >
                  Drafts
                </Link>
                <Link 
                  href="/dashboard/profile" 
                  className={`font-['Inter'] ${isActive('/dashboard/profile')}`}
                >
                  Profile
                </Link>
                <button
                  onClick={() => signOut()}
                  className="font-['Inter'] text-gray-500 hover:text-black"
                >
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className={`font-['Inter'] ${isActive('/login')}`}
                >
                  Sign in
                </Link>
                <Link 
                  href="/register" 
                  className={`font-['Inter'] ${isActive('/register')}`}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
