import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Get session with proper header passing
    const session = await auth.api.getSession({
      headers: headersList,
    });

    const user = session?.user;

    if (!user || !user.id) {
      return NextResponse.json({ error: "Unauthorized - Please log in first" }, { status: 401 });
    }

    // Create Stripe checkout session for premium upgrade
    const stripeSession = await stripe.checkout.sessions.create({
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 999, // $9.99 in cents
            product_data: {
              name: "Premium Membership - Lifetime",
              description: "Unlimited recipe uploads and exclusive features",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user.id,
        type: "premium",
      },
      mode: "payment",
      success_url: `${origin}/dashboard/premium/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/dashboard/premium`,
    });

    return NextResponse.redirect(stripeSession.url, 303);
  } catch (err) {
    console.error("Premium payment error:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}
