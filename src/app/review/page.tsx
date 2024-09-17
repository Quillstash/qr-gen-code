"use client";
import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardHeader, Input, Textarea, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';

import { Product,  Review as ReviewType, SubmittedReview } from '../types';

export default function Review() {
  const [product, setProduct] = useState<Product | null>(null);
  const [review, setReview] = useState<ReviewType>({ rating: '', comment: '' });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [submittedReview, setSubmittedReview] = useState<SubmittedReview | null>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch('/api/product');
      const data: Product = await response.json();
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (product) {
      console.log('Submitting review:', review);
      setSubmittedReview({ ...review, product: product });
      setIsModalOpen(true);
      setReview({ rating: '', comment: '' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReview(prev => ({ ...prev, [name]: value }));
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold">Review for {product.name}</h1>
        </CardHeader>
        <CardBody>
          <p className="mb-2">Price: ${product.price}</p>
          <p className="mb-4">Description: {product.description}</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Rating (1-5)"
              type="number"
              min="1"
              max="5"
              name="rating"
              value={review.rating}
              onChange={handleInputChange}
              className="max-w-xs"
            />
            <Textarea
              label="Comment"
              name="comment"
              value={review.comment}
              onChange={handleInputChange}
              className="w-full"
            />
            <Button type="submit" color="primary" className="w-full">
              Submit Review
            </Button>
          </form>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Review Submitted</ModalHeader>
              <ModalBody>
                {submittedReview && (
                  <>
                    <p><strong>Product:</strong> {submittedReview.product.name}</p>
                    <p><strong>Rating:</strong> {submittedReview.rating}</p>
                    <p><strong>Comment:</strong> {submittedReview.comment}</p>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}