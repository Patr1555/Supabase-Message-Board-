import Link from "next/link";
import { createClient } from "@/utills/supabase/server";
import { signOut } from "../action";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo - Firm Blue Text */}
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="text-xl font-extrabold tracking-tighter text-primary transition-opacity hover:opacity-80"
          >
            Minimessage
          </Link>
        </div>

        {/* Links & Auth Logic */}
        <div className="flex items-center gap-6">
          {!user ? (
            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                Login
              </Link>
              {/* Using your btn-soft class for Signup */}
              <Link href="/signup" className="btn-soft text-sm">
                Get Started
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <Link 
                href="/messages" 
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
              >
                Messages
              </Link>
              
              {/* Logout Form with Flashy Button */}
              <form action={signOut}>
                <button 
                  type="submit" 
                  className="btn-soft px-4 py-2 text-sm shadow-sm active:scale-95"
                >
                  Logout
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
