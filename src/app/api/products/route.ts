import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
    take: 24,
  });

  const normalized = products.map((product) => ({
    ...product,
    images: JSON.parse(product.images),
    tags: JSON.parse(product.tags),
    specs: JSON.parse(product.specs),
  }));

  return NextResponse.json({ products: normalized });
}
