"use client";

import { useState } from "react";
import {
    Card,
    Button,
    Link,
    TextField,
    Label,
    InputGroup,
    Input,
} from "@heroui/react";
import { Radio, RadioGroup } from "@heroui/react";
import {
    Eye,
    EyeSlash,
    Person,
    At,
    ShieldKeyhole,
} from "@gravity-ui/icons";

// 2. Add LuImage to your existing react-icons import
import { LuHeart, LuFlag, LuShoppingBag, LuBookmark, LuCheck, LuImage, LuChrome } from 'react-icons/lu';

import { signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";


export default function SignupForm({ redirectTo = "/" }) {
    // Form fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imageUrl, setImageUrl] = useState(""); // Added Image URL state
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("seeker");

    // UI States
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectParam = searchParams.get("redirect") || redirectTo;
    const shouldCreateAdmin = redirectParam === "/admin" || redirectParam?.startsWith("/admin");
    const effectiveRole = shouldCreateAdmin ? "admin" : role;

    const toggleVisibility = () => setIsVisible((prev) => !prev);


    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        // Validation
        if (!name.trim()) return setError("Name is required.");
        if (!email.trim()) return setError("Email is required.");

        // Password Rules Validation
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const isMinLength = password.length >= 6;

        if (!isMinLength || !hasUpperCase || !hasLowerCase) {
            setError("Password must be at least 6 characters, include one uppercase and one lowercase letter.");
            return;
        }

        setIsLoading(true);

        const plan = effectiveRole === "admin" ? "premium" : role === "seeker" ? "seeker_free" : "recruiter_free";

        try {
            const { error: authError } = await signUp.email({
                email,
                password,
                name,
                image: imageUrl, // Passing image URL to signup
                role: effectiveRole,
                plan,
                callbackURL: redirectParam || "/"
            });

            if (authError) {
                setError(authError.message || "Something went wrong.");
                return;
            }

            setSuccess("Account created successfully!");
            router.push(redirectParam || "/");
        } catch (err) {
            setError("An unexpected network error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
            <Card className="w-full max-w-md p-6 shadow-sm border border-zinc-200 dark:border-zinc-800">
                <div className="pb-6 mb-6 text-center border-b border-zinc-100 dark:border-zinc-800">
                    <h1 className="text-2xl font-semibold text-zinc-950 dark:text-zinc-50">Create an account</h1>
                </div>

                <form onSubmit={handleSignup} className="flex flex-col gap-5">
                    {/* Name */}
                    <TextField isRequired className="flex flex-col gap-1.5">
                        <Label className="text-black">Name</Label>
                        <InputGroup className="flex items-center gap-2 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900">
                            <Person className="text-zinc-400" size={16} />
                            <Input placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-transparent py-2 text-sm outline-none" />
                        </InputGroup>
                    </TextField>

                    {/* Email */}
                    <TextField isRequired className="flex flex-col gap-1.5">
                        <Label className="text-black">Email Address</Label>
                        <InputGroup className="flex items-center gap-2 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900">
                            <At className="text-zinc-400" size={16} />
                            <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-transparent py-2 text-sm outline-none" />
                        </InputGroup>
                    </TextField>

                    {/* Image URL */}
                    <TextField className="flex flex-col gap-1.5">
                        <Label className="text-black">Image URL (Optional)</Label>
                        <InputGroup className="flex items-center gap-2 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900">
                            <LuImage className="text-zinc-400" size={16} /> 
                            <Input 
                                placeholder="https://example.com/avatar.jpg" 
                                value={imageUrl} 
                                onChange={(e) => setImageUrl(e.target.value)} 
                                className="w-full bg-transparent py-2 text-sm outline-none" 
                            />
                        </InputGroup>
                    </TextField>

                    {/* Password */}
                    <TextField isRequired className="flex flex-col gap-1.5">
                        <Label className="text-black">Password</Label>
                        <InputGroup className="flex items-center gap-2 border rounded-xl px-3 bg-zinc-50 dark:bg-zinc-900">
                            <ShieldKeyhole className="text-zinc-400" size={16} />
                            <Input type={isVisible ? "text" : "password"} placeholder="6+ chars, upper & lower case" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-transparent py-2 text-sm outline-none" />
                            <button type="button" onClick={toggleVisibility} className="text-zinc-400">
                                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
                            </button>
                        </InputGroup>
                    </TextField>

                    {/* Role */}
                   {/* <div className="flex flex-col gap-4">
                        <Label className="text-black">Subscription plan</Label>

                        <RadioGroup
                            name="role"
                            value={role}
                            onChange={setRole}
                            orientation="horizontal"
                        >
                            <Radio value="seeker">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className="text-black">Food Seeker</Label>
                                </Radio.Content>
                            </Radio>

                            <Radio value="recruiter">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label className="text-black">Food Recruiter</Label>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div> */}

                    {/* Error */}
                    {error && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-red-100/60 dark:bg-red-950/50 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-900">
                            <span className="font-semibold">Error:</span> {error}
                        </div>
                    )}

                    {/* Success */}
                    {success && (
                        <div className="p-3.5 text-xs font-medium rounded-xl bg-emerald-100/60 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                            <span className="font-semibold">Success:</span> {success}
                        </div>
                    )}
                    
                    <Button 
                        type="submit" 
                        isLoading={isLoading} 
                        className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold"
                    >
                        Sign Up
                    </Button>


                    {/* Footer Link */}
                    <div className="text-center pt-4 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                        Already have an account?{" "}
                        <Link
                            href={`/auth/signin?redirect=${encodeURIComponent(redirectTo)}`}
                            className="font-medium text-green-600 hover:text-green-700 cursor-pointer underline"
                        >
                            Sign in instead
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}