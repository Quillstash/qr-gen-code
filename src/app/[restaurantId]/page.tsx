"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody, CardHeader, Button } from '@nextui-org/react';
import { Restaurant } from '../types';
import resImag from "../assets/hotel.jpg"
import Image from 'next/image';

// Mock data (replace with actual data fetching in a real app)
const restaurant: Restaurant = {
  id: 'Watercress',
  name: 'Watercress hotel',
  logo: "resImag",
};

export default function LandingPage({ params }: { params: { restaurantId: string } }) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="flex flex-col items-center">
          <Image src={resImag} alt={restaurant.name} className="w-42 h-42 mb-4 object-contain" />
          <h1 className="text-2xl font-bold">{restaurant.name}</h1>
        </CardHeader>
        <CardBody className="flex flex-col items-center space-y-4">
          <Button 
            color="primary" 
            className="w-full"
            onPress={() => router.push(`/${params.restaurantId}/menu`)}
          >
            Menu
          </Button>
          <Button 
            color="secondary" 
            className="w-full"
            onPress={() => router.push(`/${params.restaurantId}/review`)}
          >
            Review
          </Button>
          <Button 
            color="warning" 
            className="w-full"
            onPress={() => router.push(`/${params.restaurantId}/complaint`)}
          >
            Complaint
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}
