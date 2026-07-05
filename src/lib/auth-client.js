import { jwtClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// 1. Create the client instance once
export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, 
    plugins:[
        jwtClient()
    ]
});

// 2. Destructure the functions from the 'authClient' instance
export const { signIn, signUp, signOut, useSession } = authClient;