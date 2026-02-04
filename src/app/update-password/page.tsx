'use client'

import { useState } from "react"
import {updatePasswordAction} from "../action";
import Link from "next/link";


export default function UpdatePassword(){
const[isSuccess, setIsSuccess]=useState(false);

async function handleSubmit(formData:FormData){
     try{
        await updatePasswordAction(formData);
        setIsSuccess(true);

     }catch(e){
      alert(e instanceof Error ? e.message : "Update failed")
     }

}

if(isSuccess){
    return (
            <main className="flex min-h-[85vh] items-center justify-center px-4">
                <div className="card-soft w-full max-w-md rounded-[2.5rem] p-10 md:p-14 shadow-xl text-center">
                    <h2 className="text-3xl font-black tracking-tight mb-6">Success! ✅</h2>
                    <p className="text-foreground/50 mb-10 font-medium">Your password has been updated. You can now sign in with your new password.</p>
                    <Link href="/login" className="btn-soft bg-primary text-white w-full py-5 block font-black uppercase tracking-widest">
                        Go to Login
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="flex min-h-[85vh] items-center justify-center px-4 py-8">
            <div className="card-soft w-full max-w-md rounded-[2.5rem] p-8 md:p-14 shadow-xl border border-foreground/5 text-center">
                <div className="mb-10">
                    <h1 className="text-3xl font-black tracking-tight">New Password</h1>
                    <p className="text-foreground/50 mt-3 font-medium italic">Enter your new secure password</p>
                </div>

                <form action={handleSubmit} className="space-y-8">
                    <div className="flex flex-col gap-3 text-left">
                        <label className="text-sm font-black ml-3 text-foreground/70 uppercase tracking-widest">
                            New Password
                        </label>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="••••••••"
                            className="input-bubble h-16 w-full text-lg px-8 outline-none" 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn-soft bg-primary text-white w-full py-5 text-lg font-black uppercase tracking-[0.2em]">
                        Update Password
                    </button>
                </form>
            </div>
        </main>
    )
}



