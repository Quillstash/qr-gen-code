"use client";
import React, { useState } from "react";
import {
  Card,
  CardBody,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useParams } from "next/navigation";
import img1 from "../../assets/Cheeseburger.jpg";
import img2 from "../../assets/Chocolate-Lava-Cake-Recipe.jpg";
import img3 from "../../assets/pizza.jpg";
import img4 from "../../assets/sticky-garlic-butter-salmon-9.jpg";
import img5 from "../../assets/salad.jpg";
import { StaticImageData } from "next/image";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | StaticImageData;
}

const staticMenuItems: MenuItem[] = [
  {
    id: "1",
    name: "Classic Cheeseburger",
    description:
      "Juicy beef patty with melted cheddar cheese, lettuce, tomato, and our special sauce",
    price: 12.99,
    image: img1,
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description:
      "Traditional pizza with fresh mozzarella, tomatoes, and basil on a thin crust",
    price: 14.99,
    image: img3,
  },
  {
    id: "3",
    name: "Caesar Salad",
    description:
      "Crisp romaine lettuce, croutons, parmesan cheese, and our homemade Caesar dressing",
    price: 9.99,
    image: img5,
  },
  {
    id: "4",
    name: "Grilled Salmon",
    description:
      "Fresh Atlantic salmon fillet, grilled to perfection, served with seasonal vegetables",
    price: 18.99,
    image: img4,
  },
  {
    id: "5",
    name: "Chocolate Lava Cake",
    description:
      "Warm chocolate cake with a gooey center, served with vanilla ice cream",
    price: 7.99,
    image: img2,
  },
];

export default function MenuPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [menuItems] = useState<MenuItem[]>(staticMenuItems);
  const { restaurantId } = useParams();

  const handleOrder = (itemId: string) => {
    console.log(`Ordered item: ${itemId}`);
    onOpen();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Menu for Restaurant {restaurantId}
      </h1>
      <div className="flex flex-col items-center space-y-4">
        {menuItems.map((item) => (
          <Card key={item.id} className="max-w-md w-full">
            <CardBody className="flex justify-center items-center">
              <div className="flex justify-center items-center">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="mb-2"
                />
                <div className="flex flex-col justify-center items-center space-y-2">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-center">{item.description}</p>
                  <p className="font-bold">${item.price.toFixed(2)}</p>
                  <Button
                    color="primary"
                    size="sm"
                    onPress={() => handleOrder(item.id)}
                  >
                    Order
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Order Confirmation</ModalHeader>
          <ModalBody>Your order will begin shortly.</ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
