'use client'

import { useOptimistic } from "react"
import { addMessage, deleteMessage, toggleLike, updateMessage } from "../action"

// Defined the exact shape based on your Supabase query
type Message = {
    id: string;
    content: string | null;
    user_id: string;
    likes: { count: number }[]; // Array of objects from Supabase join
    likes_user: { user_id: string }[];
}

const likingRef = new Set<string>()

export default function MessageList({ messages, userId }: { messages: Message[], userId: string }) {
    const [optimisticMessages, addOptimisticMessage] = useOptimistic<Message[], Message>(
        messages,
        (state, newMessage) => {
            const exists = state.find((m) => m.id === newMessage.id)
            if (exists) {
                return state.map((m) => (m.id === newMessage.id ? newMessage : m))
            }
            return [newMessage, ...state]; // Added new messages to top for better UX
        }
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
        }
    }

    async function action(formData: FormData) {
        const content = formData.get("content") as string
        addOptimisticMessage({
            id: crypto.randomUUID(),
            content,
            user_id: userId,
            likes: [{ count: 0 }],
            likes_user: [],
        })
        await addMessage(formData)
    }

    async function handleUpdate(formData: FormData) {
        await updateMessage(formData)
    }

    async function handleDelete(formData: FormData) {
        await deleteMessage(formData)
    }

    async function handleLike(formData: FormData) {
        const messageId = formData.get("message_id") as string
        if (!messageId) return;
        
        if (likingRef.has(messageId)) return 
        likingRef.add(messageId)

        const current = optimisticMessages.find((m) => m.id === messageId)
        if (!current) {
            likingRef.delete(messageId)
            return
        }

        // Type-safe access to the count without using 'any'
        const currentCount = current.likes[0]?.count ?? 0;
        const likedByMe = current.likes_user.some(l => l.user_id === userId)

        addOptimisticMessage({
            ...current,
            likes: [{ count: likedByMe ? Math.max(0, currentCount - 1) : currentCount + 1 }],
            likes_user: likedByMe 
                ? current.likes_user.filter(l => l.user_id !== userId) 
                : [...current.likes_user, { user_id: userId }]
        });

        try {
            await toggleLike(formData)
        } catch (e) {
            console.error("Like failed", e)
        } finally {
            likingRef.delete(messageId)
        }
    }

    return (
        <div className="w-full space-y-12">
            {/* 1. INPUT FORM - PERMANENTLY AT THE TOP */}
            <form action={action} className="card-soft p-6 md:p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-4 shadow-lg border border-foreground/5 bg-background/60">
                <textarea 
                    name="content" 
                    placeholder="Write a message..." 
                    required 
                    rows={1} 
                    onKeyDown={handleKeyDown} 
                    className="input-bubble min-h-[64px] flex-1 px-8 py-4 text-lg md:text-xl font-medium outline-none w-full resize-none bg-transparent" 
                />
                <button type="submit" className="btn-soft bg-primary text-white w-full md:w-auto px-12 h-16 text-sm font-black uppercase tracking-widest hover:brightness-110 transition-all shrink-0">
                    Send
                </button>
            </form>

            <ul className="space-y-10">
                {optimisticMessages.map((msg) => {
                    // Safe type access
                    const count = msg.likes[0]?.count ?? 0;
                    const isLiked = msg.likes_user.some(l => l.user_id === userId);

                    return (
                        <li key={msg.id} className="card-soft p-6 md:p-14 rounded-[3rem] shadow-xl border border-foreground/5 bg-background/40 transition-all overflow-hidden">
                            <form action={handleUpdate} className="space-y-6">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-col gap-1.5 ml-2 md:ml-5">
                                        <label className="text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] text-foreground/40">
                                            Cloud Message
                                        </label>
                                        <p className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.15em] text-primary/70 italic">
                                            Edit your message content below
                                        </p>
                                    </div>
                                    <textarea 
                                        name="content" 
                                        defaultValue={msg.content ?? ''} 
                                        className="input-bubble p-6 md:p-8 text-xl md:text-2xl font-bold min-h-[120px] md:min-h-[140px] border-foreground/5 focus:ring-2 focus:ring-primary/20 outline-none transition-all w-full bg-transparent break-words" 
                                    />
                                    <input type="hidden" name="id" value={msg.id} />
                                </div>

                                {/* 2. BUTTON SECTION - FORCED STACKING ON MOBILE */}
                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 pt-8 border-t border-foreground/5 mt-4">
                                    <button 
                                        formAction={handleLike} 
                                        className={`btn-soft w-full sm:w-auto px-8 py-5 text-[11px] font-black uppercase tracking-widest sm:mr-auto transition-all ${isLiked ? 'bg-pink-500/10 text-pink-500 shadow-inner' : 'bg-foreground/5 text-foreground/40 hover:bg-pink-500/5'}`}
                                    >
                                        <input type="hidden" value={msg.id} name="message_id" />
                                        {isLiked ? '❤️ Liked' : '🤍 Like'} ({count})
                                    </button>

                                    <div className="flex flex-row gap-3 w-full sm:w-auto">
                                        <button 
                                            formAction={handleDelete} 
                                            className="btn-soft bg-red-500/10 text-red-500 flex-1 sm:flex-none px-6 md:px-8 py-5 text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white"
                                        >
                                            <input type="hidden" name="id" value={msg.id} />
                                            Delete
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn-soft bg-primary text-white flex-1 sm:flex-none px-8 md:px-10 py-5 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg active:scale-95 transition-all"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}