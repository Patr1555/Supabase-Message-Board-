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
    <main className="flex min-h-screen flex-col items-center px-4 pt-6 md:pt-16 bg-background">
      
      {/* Top Navigation Row - Stacked on mobile for better space */}
      <div className="w-full max-w-6xl mb-6 md:mb-10 flex flex-row justify-between items-center px-2 md:px-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tighter uppercase">Minimessage</h1>
          <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-foreground/30 font-bold">Secure Dashboard</p>
        </div>
        <Link href="/" className="text-[10px] md:text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors border-b border-primary/20 pb-1">
          Home
        </Link>
      </div>

      {/* THE BIG BOX - Responsive padding is the key here */}
      <div className="card-soft w-full max-w-6xl rounded-[2.5rem] md:rounded-[3rem] p-6 sm:p-10 md:p-20 shadow-2xl min-h-[80vh]">
        
        {/* Header - Stacks on mobile, flows on desktop */}
        <header className="mb-10 md:mb-16 border-b border-foreground/5 pb-8 md:pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-1 md:space-y-2">
            <span className="text-primary font-black uppercase tracking-tighter text-[10px] md:text-sm">Verified Session</span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-none">Your Messages</h2>
          </div>
          <div className="text-left md:text-right w-full md:w-auto pt-4 md:pt-0 border-t md:border-none border-foreground/5">
            <p className="text-[10px] md:text-foreground/40 italic mb-1 uppercase tracking-widest md:normal-case">Signed in as</p>
            <p className="font-bold text-base md:text-lg break-all">{user.email}</p>
          </div>
        </header>

        {/* FEED AREA */}
        <div className="relative">
  
  {/* 1. Show the MessageList ALWAYS (Input form is at the top of this component) */}
  <MessageList 
    messages={messages as messageWithLikes || []} 
    userId={user.id} 
  />

  {/* 2. Show the "No messages" text separately ONLY if the list is empty */}
  {(error || !messages || messages.length === 0) && (
    <div className="input-bubble mt-10 p-12 md:p-20 text-center italic text-foreground/20 text-lg md:text-xl">
      No messages found in your cloud. Start by typing above!
    </div>
  )}
</div>
</div>
      <footer className="mt-auto py-10">
        <p className="text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em] text-foreground/20 font-black text-center">
          © 2024 MINIMESSAGE PRIVATE LTD
        </p>
      </footer>
    </main>
  
);
}