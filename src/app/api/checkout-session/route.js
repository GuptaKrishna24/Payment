import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(
  "sk_test_51LaHT0A6u1us1yHEwOgLglI4rcqYfluFXijxqpVXo2IIvsXumtCvmD2VDclhEK4gqKTvpNqyK4cbMCqbIIm3ZaLS0085lIFgCs"
);
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log("BASE URL : ", BASE_URL);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Test Product",
            },
            unit_amount: 2000, // $20.00 in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${BASE_URL}/payment/success`,
      cancel_url: `${BASE_URL}/payment/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
