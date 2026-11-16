import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { products } from "../src/lib/data";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        category: product.category,
        shortDescription: product.shortDescription,
        description: product.description,
        price: product.price,
        mrp: product.mrp,
        rating: product.rating,
        reviewCount: product.reviewCount,
        stock: product.stock,
        images: JSON.stringify(product.images),
        tags: JSON.stringify(product.tags),
        seller: product.seller,
        deliveryDays: product.deliveryDays,
        specs: JSON.stringify(product.specs),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
