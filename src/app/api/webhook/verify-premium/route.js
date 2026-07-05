import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db(process.env.AUTH_DB_NAME);

export async function POST(request) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 }
      );
    }

    // Retrieve the session from Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    // Check if payment was successful
    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 400 }
      );
    }

    // Get the user ID from metadata
    const userId = session.metadata?.userId;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID not found in session" },
        { status: 400 }
      );
    }

    // Update user premium status in database
    const usersCollection = db.collection("user");
    const result = await usersCollection.updateOne(
      { id: userId },
      { $set: { isPremium: true, premiumUpgradedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      console.warn(`User ${userId} not found or already premium`);
    }

    return NextResponse.json(
      { success: true, message: "Premium status updated" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying premium payment:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
