import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { auth } from "@/lib/auth";
import { getRecipeById } from "@/lib/api/recipe"; // Import your fetch function

export async function POST(request) {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    const userSession = await auth.api.getSession({
      headers: await headers(),
    });

    const user = userSession?.user;
    const formData = await request.formData();
    const recipeId = formData.get('recipeId');

    // 1. Fetch data from DB to ensure price and title are accurate/secure
    const recipe = await getRecipeById(recipeId);
    
    if (!recipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    // 2. Use the database values, not the form values
    const session = await stripe.checkout.sessions.create({
      customer_email: user?.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            // Stripe requires amount in cents
            unit_amount: Math.round(Number(recipe.price) * 100), 
            product_data: { // FIXED: Was recipe_data, must be product_data
                name: recipe.title,
            }
          },
          quantity: 1,
        },
      ],
      metadata: {
        recipeId: recipe._id,
        userId: user?.id,
      },
      mode: "payment",
      success_url: `${origin}/recips/payment-success?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 },
    );
  }
}