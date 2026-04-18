/**
 * Seed Stripe with all ForgeLabs products
 * Usage: STRIPE_SECRET_KEY=sk_live_... npx tsx scripts/seed-stripe.ts
 */
import Stripe from "stripe";
import { products } from "../src/data/products";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function main() {
  console.log(`Creating ${products.length} products in Stripe...\n`);

  for (const product of products) {
    try {
      const stripeProduct = await stripe.products.create({
        name: product.name,
        description: product.tagline,
        metadata: {
          slug: product.slug,
          category: product.category,
          biomarker_count: String(product.biomarkerCount),
          forge_id: product.id,
        },
      });

      const price = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: product.price * 100,
        currency: "gbp",
      });

      console.log(
        `✓ ${product.name} — £${product.price} (product: ${stripeProduct.id}, price: ${price.id})`
      );
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      console.error(`✗ Failed: ${product.name}: ${msg}`);
    }
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
