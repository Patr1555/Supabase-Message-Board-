import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative flex flex-col items-center justify-center pt-20 pb-32 px-6 overflow-hidden">
      
      {/* Background Decorative Blur (The "Protecting" Glow) */}
      <div className="absolute top-0 -z-10 h-[400px] w-[600px] bg-primary/5 blur-[120px] rounded-full" />

      <div className="max-w-4xl text-center space-y-8">
        
        {/* The Shy Blue Badge */}
        <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary tracking-wide uppercase border border-primary/20">
          ✨ Welcome to the future of chat
        </div>

        {/* The Massive "Firm" Header */}
        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter text-foreground leading-[0.9]">
          Connect with <br />
          <span className="text-primary">Gentle Power.</span>
        </h1>

        {/* The Calm Subtext */}
        <p className="mx-auto max-w-2xl text-lg md:text-xl text-foreground/50 leading-relaxed font-medium">
          Experience Minimessage—a safe, calm space designed for meaningful 
          conversations. Protected by steel, delivered with silk.
        </p>

        {/* The CTA Action Area */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
          <Link href="/signup" className="btn-soft px-10 py-5 text-xl font-bold tracking-widest uppercase shadow-2xl scale-105 hover:scale-110 active:scale-95 transition-all">
            Get Started Now
          </Link>
          
          <Link href="/login" className="text-lg font-bold text-foreground/40 hover:text-primary transition-colors">
            Already a member?
          </Link>
        </div>

        {/* Fun "Peek-a-boo" Detail */}
        <div className="pt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="card-soft p-6 rounded-[2rem] border-dashed">
                <div className="text-primary font-bold mb-1">Fast</div>
                <p className="text-sm text-foreground/50">Responsive like a quick jab.</p>
            </div>
            <div className="card-soft p-6 rounded-[2rem] border-dashed">
                <div className="text-primary font-bold mb-1">Secure</div>
                <p className="text-sm text-foreground/50">Protected like a tight guard.</p>
            </div>
            <div className="card-soft p-6 rounded-[2rem] border-dashed">
                <div className="text-primary font-bold mb-1">Calm</div>
                <p className="text-sm text-foreground/50">Soft as the gray-blue sky.</p>
            </div>
        </div>
      </div>
    </div>
  );
}