import Link from "next/link";
import { createClient } from "@/utills/supabase/server";
import { signOut } from "../action";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      {/* Reduced px on mobile (px-4) to prevent logo/buttons from hitting screen edges */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        
        {/* Logo - Larger for mobile visibility */}
        <div className="flex items-center gap-2">
          <Link 
            href="/" 
            className="text-lg md:text-xl font-black tracking-tighter text-primary uppercase transition-opacity hover:opacity-80"
          >
            Minimessage
          </Link>
        </div>

        {/* Links & Auth Logic - Gap reduced on mobile */}
        <div className="flex items-center gap-3 md:gap-6">
          {!user ? (
            <div className="flex items-center gap-3 md:gap-4">
              <Link 
                href="/login" 
                className="text-[10px] md:text-sm font-black uppercase tracking-widest text-foreground/70 transition-colors hover:text-primary"
              >
                Login
              </Link>
              {/* "Get Started" text is long, so we use a more compact version on tiny screens */}
              <Link href="/signup" className="btn-soft px-4 md:px-6 py-2 md:py-3 text-[10px] md:text-sm">
                <span className="hidden xs:inline">Get Started</span>
                <span className="xs:hidden">Join</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4 md:gap-6">
              <Link 
                href="/messages" 
                className="text-[10px] md:text-sm font-black uppercase tracking-widest text-foreground/70 transition-colors hover:text-primary"
              >
                Messages
              </Link>
              
              <form action={signOut}>
                <button 
                  type="submit" 
                  /* Larger vertical padding for easier thumb-tapping */
                  className="btn-soft px-4 py-2 md:py-3 text-[10px] md:text-sm shadow-sm active:scale-95"
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