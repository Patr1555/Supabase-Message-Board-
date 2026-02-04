import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center pt-10 md:pt-20 pb-20 md:pb-32 px-4 md:px-6 overflow-hidden">
      
      {/* Background Decorative Blur (The "Protecting" Glow) */}
      <div className="absolute top-0 -z-10 h-[300px] md:h-[400px] w-[300px] md:w-[600px] bg-primary/5 blur-[80px] md:blur-[120px] rounded-full" />

      <div className="max-w-4xl text-center space-y-6 md:space-y-8">
        
        {/* The Shy Blue Badge - Smaller text on mobile */}
        <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-[10px] md:text-sm font-bold text-primary tracking-wide uppercase border border-primary/20">
          ✨ Welcome to the future of chat
        </div>

        {/* The Massive "Firm" Header - Scaled down for mobile */}
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter text-foreground leading-[0.95] md:leading-[0.9]">
          Connect with <br />
          <span className="text-primary">Gentle Power.</span>
        </h1>

        {/* The Calm Subtext - Balanced width */}
        <p className="mx-auto max-w-2xl text-base md:text-xl text-foreground/50 leading-relaxed font-medium px-4 md:px-0">
          Experience Minimessage—a safe, calm space designed for meaningful 
          conversations. Protected by steel, delivered with silk.
        </p>

        {/* The CTA Action Area - Stacked on tiny screens, wide on desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6 md:pt-8">
          <Link href="/signup" className="btn-soft w-full sm:w-auto px-10 py-5 text-lg md:text-xl font-bold tracking-widest uppercase shadow-2xl hover:scale-105 active:scale-95 transition-all">
            Get Started Now
          </Link>
          
          <Link href="/login" className="text-base md:text-lg font-bold text-foreground/40 hover:text-primary transition-colors">
            Already a member?
          </Link>
        </div>

        {/* Fun "Peek-a-boo" Detail - Optimized grid for mobile */}
        <div className="pt-12 md:pt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 text-left">
            <div className="card-soft p-6 rounded-[2rem] border-dashed border-foreground/10 bg-background/20">
                <div className="text-primary font-bold mb-1 uppercase text-xs tracking-widest">Fast</div>
                <p className="text-sm text-foreground/50">Responsive like a quick jab.</p>
            </div>
            <div className="card-soft p-6 rounded-[2rem] border-dashed border-foreground/10 bg-background/20">
                <div className="text-primary font-bold mb-1 uppercase text-xs tracking-widest">Secure</div>
                <p className="text-sm text-foreground/50">Protected like a tight guard.</p>
            </div>
            {/* Added sm:col-span-2 on mobile so it looks balanced, or md:col-span-1 on desktop */}
            <div className="card-soft p-6 rounded-[2rem] border-dashed border-foreground/10 bg-background/20 sm:col-span-2 md:col-span-1">
                <div className="text-primary font-bold mb-1 uppercase text-xs tracking-widest">Calm</div>
                <p className="text-sm text-foreground/50">Soft as the gray-blue sky.</p>
            </div>
        </div>
      </div>
    </div>
  );
}