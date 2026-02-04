'use server'

import { createClient } from "@/utills/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



export async function toggleLike(formData:FormData){
    const supabase= await createClient()
    const message_id= formData.get("message_id") as string
    if (!message_id) return

    const {data:{user}}=await supabase.auth.getUser()
    if (!user) return

    // Check if already liked
    const{data:existing}= await supabase
    .from("likes")
    .select("id")
    .eq("user_id",user.id)
    .eq("message_id", message_id)
    .maybeSingle()

    if(existing){
        // Unlike
        await supabase
        .from("likes")
        .delete()
        .eq("id", existing.id)
    }
    else{
        // Like
        await supabase
        .from("likes")
        .insert({
            user_id:user.id,
            message_id

        })
    }
    revalidatePath('/')
}





export async function addMessage(formData:FormData){

    const supabase= await createClient()
    const content= formData.get('content') as string
    
    const{data:{ user },
}= await supabase.auth.getUser()

if(!user){
    throw new Error("Not authenticated");
    
}
const {error} = await supabase
    .from('messages')
    .insert([{ content,
        user_id: user.id
     }])

    if (!error){
        revalidatePath('/')// This refreshes the page automatically!
    }


}

export async function updateMessage(formData:FormData){

    const supabase= await createClient()
    const id=formData.get("id") as string
    const content=formData.get("content") as string

    if(!id||!content.trim()){
        return
    }

    const{ data:{user},
    }=await supabase.auth.getUser()

    if(!user){
        throw new Error("Not authenticated")
    }
    const{error}= await supabase
    .from("messages")
    .update({content})
    .eq("id",id)
    .eq("user_id", user.id)

    if(error){
        throw new Error(error.message)
    }

    revalidatePath('/')


}

export async function deleteMessage(formData:FormData){
    const supabase= await createClient()
    const id=formData.get("id") as string

    if(!id){
        throw new Error("Message ID was not found")
    }

// 1. Get logged-in user
    const{
        data:{user}
    }=await supabase.auth.getUser()

    if(!user){
        throw new Error("Not authenticated")
    }
// 2. Delete ONLY user's own message
    const{error}= await supabase
    .from("messages")
    .delete()
    .eq("id",id)
    .eq("user_id", user.id)

    if(error){
        throw new Error(error.message)
    }
// 3. Refresh UI
    revalidatePath('/')

    

}

export async function signUp(formData:FormData){
    const email=formData.get("email") as string
    const password=formData.get("password") as string

    const supabase= await createClient()

    const{error}= await supabase.auth.signUp({email, password, 
        // Ensure this matches your Vercel URL + /auth/callback
        options: {emailRedirectTo:`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`}

    })

    if(error){
        throw new Error(error.message)
    }
    // Return success to the UI instead of redirecting
    return{success:true, email}

    


}



export async function signIn(formData:FormData){

    const email=formData.get("email") as string
    const password = formData.get("password") as string

    const supabase= await createClient()

    const{error}= await supabase.auth.signInWithPassword({email, password})

    if (error){
        throw new Error(error.message)

    }

    redirect('/messages')
    }


    export async function signOut(){
        const supabase= await createClient()
        await supabase.auth.signOut()
        redirect('/')
    }


    export async function resendEmail(formData:FormData){
        const supabase= await createClient()
        const email= formData.get("email") as string

        const {error}=await supabase.auth.resend({
            type:"signup",
            email:email,
            options:{emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,},
        })
        if(error){
            throw new Error(error.message)
        }
    }


    export async function resetPasswordRequest(formData:FormData){
        const supabase= await createClient();
        const email= formData.get("email") as string;

        const{error}=await supabase.auth.resetPasswordForEmail(email,{
            redirectTo:`${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm-reset`,
        });

      if(error){
        throw new Error(error.message);
      }
      return{success: true};


    }


    export async function updatePasswordAction(formData:FormData){
       const supabase=await createClient();
       const password= formData.get("password") as string 

       const{error}= await supabase.auth.updateUser({
        password:password
       });
         
       if(error) throw new Error(error.message)

     // Redirect to login with a success parameter
        redirect('/login?message=Password updated successfully! You can now log in.')
}
    