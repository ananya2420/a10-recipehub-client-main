"use client";

import { useState } from "react";
import { Card, Button, Link, TextField, Label, InputGroup, Input } from "@heroui/react";
import { Eye, EyeSlash, At, ShieldKeyhole } from "@gravity-ui/icons";
import { LuChrome } from 'react-icons/lu';
import { signIn } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SigninForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn.email({ email, password });
            const authError = result?.error;
            
            if (authError) {
                setError(authError.message || "Invalid email or password");
                setIsLoading(false);
                return;
            }

            router.push(redirectTo);
        } catch (err) {
            setError("Invalid email or password");
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        await signIn.social({ provider: "google", callbackURL: redirectTo });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4">
            <Card className="w-full max-w-md p-8 shadow-sm border border-zinc-200 bg-white">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
                    <p className="text-zinc-600">Please enter your details</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-6">
                    {/* Email Field */}
<TextField isRequired>
    <Label className="text-black font-semibold mb-2 block">Email</Label>
    <InputGroup className="flex items-center gap-2 border border-zinc-200 rounded-xl px-4 bg-white">
        <At size={18} className="text-black" />
        <Input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full py-3 text-black bg-white outline-none" // Added bg-white here
        />
    </InputGroup>
</TextField>

{/* Password Field */}
<TextField isRequired>
    <Label className="text-black font-semibold mb-2 block">Password</Label>
    <InputGroup className="flex items-center gap-2 border border-zinc-200 rounded-xl px-4 bg-white">
        <ShieldKeyhole size={18} className="text-black" />
        <Input 
            type={isVisible ? "text" : "password"} 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full py-3 text-black bg-white outline-none" // Added bg-white here
        />
        <button type="button" onClick={() => setIsVisible(!isVisible)} className="text-black">
            {isVisible ? <EyeSlash size={20} /> : <Eye size={20} />}
        </button>
    </InputGroup>
</TextField>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-green-600 text-white font-bold h-12 rounded-xl hover:bg-green-700 transition" isLoading={isLoading}>
                        Sign In
                    </Button>

                    {/* Divider */}
                    <div className="flex items-center gap-4 text-zinc-400">
                        <div className="h-px flex-1 bg-zinc-200" />
                        <span className="text-xs uppercase font-medium text-black">Or continue with</span>
                        <div className="h-px flex-1 bg-zinc-200" />
                    </div>

                    {/* Google Login */}
                    <Button onClick={handleGoogleLogin} className="w-full flex gap-3 rounded-xl border border-zinc-200 bg-white text-black font-semibold hover:bg-zinc-50">
                        <LuChrome size={20} /> Google
                    </Button>
                </form>

                {/* Footer Link */}
                <div className="text-center mt-8 text-sm text-black">
                    Do not have an account? <Link href="/auth/signup" className="font-bold text-green-600 underline">Sign up</Link>
                </div>
            </Card>
        </div>
    );
}