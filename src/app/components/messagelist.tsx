'use client'

import { useOptimistic } from "react"
import { addMessage, deleteMessage, toggleLike, updateMessage } from "../action"
import { Database } from "../../../types/supabase"

type Message={
    id: string;
    content: string | null;
    user_id: string;
    likes: { count: number }|{count:number}[]; 
    likes_user:{user_id:string}[];
}

const likingRef = new Set<string>()

export default function MessageList({messages,userId}:{messages:Message[], userId: string}){
    const[optimisticMessages, addOptimisticMessage]=useOptimistic<Message[], Message>(messages,(state, newMessage) => {
    // Check if we are updating an existing message (like a toggle)
    const exists = state.find((m)=> m.id === newMessage.id)
    if (exists) {
      return state.map((m)=> (m.id === newMessage.id? newMessage:m))
    }
    // Otherwise, add the new message to the list
    return [...state, newMessage];
  }
);
const handleKeyDown=(e: React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==="Enter"){
        e.preventDefault();
        e.currentTarget.form?.requestSubmit();
    }
}



    async function action(formData:FormData){
        const content=formData.get("content") as string

        addOptimisticMessage({
            id:crypto.randomUUID(), //temporary key
            content, 
            user_id:userId,
             likes: [{ count: 0 }],
             likes_user:[],
        })

        await addMessage(formData)
    }

    async function handleUpdate(formData:FormData){
     await updateMessage(formData)
    }

    async function handleDelete(formData:FormData){
        await deleteMessage(formData)
    }

    async function handleLike(formData:FormData){
       const messageId=formData.get("message_id") as string
       if(!messageId) return;

// ✅ ADD THIS GUARD (prevents double toggle)
      if(likingRef.has(messageId))return
      likingRef.add(messageId)

      const current= optimisticMessages.find((m)=>m.id === messageId)
      if(!current){
        likingRef.delete(messageId)
        return
      }
        
      // Replace the currentCount line with this safe version:
const currentCount = (Array.isArray(current.likes) ? current.likes[0]?.count : current.likes?.count) ?? 0;

      const likedByMe = current.likes_user.some(
  l => l.user_id === userId
)
      addOptimisticMessage({
        ...current,
        likes:[{count: likedByMe? Math.max(0, currentCount-1):currentCount+1}],
        likes_user: likedByMe ?
        current.likes_user.filter(l=>l.user_id !==userId)
        :[...current.likes_user, {user_id:userId}]

      });
 try{
  await toggleLike(formData)
 }
 catch(e){
  console.error("Like failed", e)
 }
 finally{
  // ✅ RELEASE LOCK
 likingRef.delete(messageId)
 }
  }

    return(
        <div className="w-full space-y-12">
            {/* BIG INPUT BOX */}
            <form action={action} className="card-soft p-8 rounded-[2.5rem] flex flex-col md:flex-row gap-4 shadow-lg border border-foreground/5">
                <input 
                    name="content" 
                    placeholder="Write a message..." 
                    required 
                    className="input-bubble h-16 flex-1 px-8 text-xl font-medium outline-none"
                />
                <button type="submit" className="btn-soft bg-primary text-white px-12 h-16 text-sm font-black uppercase tracking-widest hover:brightness-110 transition-all">
                    Send
                </button>
            </form>

            <ul className="space-y-10">
                {optimisticMessages.map((msg)=> {
                    // Logic for the display label only
                    const count = (Array.isArray(msg.likes) ? msg.likes[0]?.count : msg.likes?.count) ?? 0;
                    const isLiked = msg.likes_user.some(l => l.user_id === userId);

                    return (
                        <li key={msg.id} className="card-soft p-10 md:p-14 rounded-[3rem] shadow-xl border border-foreground/5 bg-background/40 transition-all">
                            
                            {/* UPDATE SECTION */}
                            <form action={handleUpdate} className="space-y-6">
                                <div className="flex flex-col gap-4">
    <div className="flex flex-col gap-1.5 ml-5">
        <label className="text-[12px] font-black uppercase tracking-[0.4em] text-foreground/40">
            Cloud Message
        </label>
        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-primary/70 italic">
            Edit your message content below
        </p>
    </div>
    <input 
        name="content" 
        defaultValue={msg.content ?? ''} 
        onKeyDown={handleKeyDown}
        className="input-bubble p-8 text-2xl font-bold min-h-[140px] border-foreground/5 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
    />
    <input type="hidden" name="id" value={msg.id} />
</div>
                                
                                {/* Pushes the buttons to the bottom of the card */}
                                <div className="flex flex-wrap items-center justify-end gap-4 pt-8 border-t border-foreground/5 mt-4">
                                    
                                    {/* LIKE/UNLIKE BUTTON */}
                                    <button 
                                        formAction={handleLike} 
                                        className={`btn-soft px-8 py-4 text-[10px] font-black uppercase tracking-widest mr-auto transition-all ${isLiked ? 'bg-pink-500/10 text-pink-500 shadow-inner' : 'bg-foreground/5 text-foreground/40 hover:bg-pink-500/5'}`}
                                    >
                                        <input type="hidden" value={msg.id} name="message_id" />
                                        {isLiked ? '❤️ Liked' : '🤍 Like'} ({count})
                                    </button>

                                    {/* DELETE BUTTON */}
                                    <button 
                                        formAction={handleDelete} 
                                        className="btn-soft bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 text-[10px] font-black uppercase tracking-widest transition-all"
                                    >
                                        <input type="hidden" name="id" value={msg.id} />
                                        Delete
                                    </button>

                                    {/* UPDATE BUTTON */}
                                    <button 
                                        type="submit" 
                                        className="btn-soft bg-primary text-white px-10 py-4 text-[10px] font-black uppercase tracking-[0.2em] shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}


