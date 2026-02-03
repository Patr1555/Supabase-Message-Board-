import { createClient } from "@/utills/supabase/server";
import { redirect } from "next/navigation";
import { QueryData } from "@supabase/supabase-js";
import MessageList from "../components/messagelist";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const messageQuery = supabase
    .from("messages")
    .select(`id, content, user_id, likes(count), likes_user:likes(user_id)`)
    .eq("user_id", user.id);

  type messageWithLikes = QueryData<typeof messageQuery>;
  const { data: messages, error } = await messageQuery;

  return (
    <main className="flex min-h-screen flex-col items-center px-4 pt-10 md:pt-16 bg-background">
      
      {/* Top Navigation Row */}
      <div className="w-full max-w-6xl mb-8 flex justify-between items-center px-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tighter uppercase">Minimessage</h1>
          <p className="text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold">Secure Dashboard</p>
        </div>
        <Link href="/" className="text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors">
          Home
        </Link>
      </div>

      {/* THE BIG BOX */}
      <div className="card-soft w-full max-w-6xl rounded-[3rem] p-10 md:p-20 shadow-2xl min-h-[70vh]">
        
        <header className="mb-16 border-b border-foreground/5 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-2">
            <span className="text-primary font-black uppercase tracking-tighter text-sm">Verified Session</span>
            <h2 className="text-5xl font-black tracking-tight">Your Messages</h2>
          </div>
          <div className="text-right">
            <p className="text-foreground/40 italic mb-1">Signed in as</p>
            <p className="font-bold text-lg">{user.email}</p>
          </div>
        </header>

        {/* FEED AREA */}
        <div className="relative">
          {error || !messages ? (
            <div className="input-bubble p-20 text-center italic text-foreground/20 text-xl">
              No messages found in your cloud.
            </div>
          ) : (
            <MessageList 
              messages={messages as messageWithLikes} 
              userId={user.id} 
            />
          )}
        </div>
      </div>

      <footer className="mt-12 mb-10">
        <p className="text-[10px] uppercase tracking-[0.5em] text-foreground/20 font-black">
          © 2024 MINIMESSAGE PRIVATE LTD
        </p>
      </footer>
    </main>
  );
}