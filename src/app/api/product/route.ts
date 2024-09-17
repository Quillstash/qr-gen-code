import { faker } from '@faker-js/faker';
import { NextResponse } from 'next/server';

export async function GET() {
  const product = {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
  };
  console.log(product)
  return NextResponse.json(product);
}