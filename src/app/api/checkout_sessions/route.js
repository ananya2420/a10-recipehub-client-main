// import { NextResponse } from 'next/server'

// import { stripe } from '../../../lib/stripe'

// async function createCheckoutSession(origin) {
//   const successUrl = origin ? `${origin}/recipe/[id]/success?session_id={CHECKOUT_SESSION_ID}` : `http://localhost:3000/recipe/[id]/success?session_id={CHECKOUT_SESSION_ID}`
//   const cancelUrl = origin ? `${origin}/recipe/[id]` : `http://localhost:3000/recipe/[id]`

//   // Create Checkout Sessions from body params.
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, price_1234) of the product you want to sell
//         price: 'price_1TkmNEChEg7gNHiDtuQ1eXi0',
//         quantity: 1,
//       },
//     ],
//     mode: 'subscription',
//     success_url: successUrl,
//     cancel_url: cancelUrl,
//   });
//   return session;
// }

// export async function GET(request) {
//   try {
//     const origin = request.headers.get('origin') || request.headers.get('referer') || `http://localhost:3000`
//     const session = await createCheckoutSession(origin)
//     // Log session for server-side debugging
//     console.log('Created Stripe session:', { id: session?.id, url: session?.url })
//     // Return JSON so browser displays it
//     if (session?.url) {
//       return NextResponse.json({ url: session.url })
//     }
//     // If no URL, return the session object for debugging
//     return NextResponse.json({ session }, { status: 200 })
//   } catch (err) {
//     console.error('Error creating checkout session', err)
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }

// export async function POST(request) {
//   try {
//     const origin = request.headers.get('origin') || request.headers.get('referer') || `http://localhost:3000`
//     const session = await createCheckoutSession(origin)
//     console.log('Created Stripe session (POST):', { id: session?.id, url: session?.url })
//     if (session?.url) {
//       return NextResponse.json({ url: session.url })
//     }
//     return NextResponse.json({ session }, { status: 200 })
//   } catch (err) {
//     console.error('Error creating checkout session (POST)', err)
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     )
//   }
// }