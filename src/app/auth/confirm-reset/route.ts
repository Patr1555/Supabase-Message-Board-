import { createClient } from "@/utills/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request:Request){
    const{searchParams, origin }=new URL(request.url)
    const code= searchParams.get("code")


    if(code){
        const supabase= await createClient();
        const{error}=await supabase.auth.exchangeCodeForSession(code)
    
    if (!error){
         // Redirect to the actual page where they type the new password
         return NextResponse.redirect(`${origin}/update-password`)

    }
    }
    return NextResponse.redirect(`${origin}/login?error=Invalid reset link`)
}