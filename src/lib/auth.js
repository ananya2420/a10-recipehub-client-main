import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

const resetJwks = async () => {
  if (!process.env.MONGO_DB_URI) return;

  try {
    await client.connect();
    await db.collection("jwks").deleteMany({});
  } catch (error) {
    console.warn("Failed to reset JWT key store:", error);
  }
};

void resetJwks();

export const auth = betterAuth({
  //...other options
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
      google: { 
       clientId:
          process.env.GOOGLE_CLIENTID,
          clientSecret: process.env.GOOGLE_SECRET
      }
  },
  sessions:{
    cookieCache:{
      enabled:true,
      strategy:"jwt",
      //max 7 days
      maxAge:7*24*60*60
    }
  },
  plugins:[
    jwt({
      jwks: {
        disablePrivateKeyEncryption: true,
      },
    })
  ],
  database: mongodbAdapter(db, {
   
    client
  }),
  user:{
    additionalFields:{
        role:{
            default:"seeker"
        },
        isPremium: {
          type: "boolean",
          default: false,
        }
    }
  }
});