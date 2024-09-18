"use client";

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Input, Textarea, Button, Radio, RadioGroup, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { MenuItem, Review } from '../../types';

const menuItems: MenuItem[] = [
  { id: '1', name: 'Burger', description: 'Juicy beef patty with melted cheddar cheese, lettuce, tomato, and our special sauce', price: 9.99 , image: ""},
  { id: '2', name: 'Pizza', description: 'Margherita pizza', price: 12.99 , image: ""},
  { id: '3', name: 'salad', description: 'chef salad', price: 12.99 , image: ""},
  { id: '4', name: 'salmon', description: 'ripe salmon', price: 12.99 , image: ""},
  { id: '5', name: 'cake', description: 'chocolate cake', price: 12.99 , image: ""},
];

export default function ReviewPage() {
  const [reviewType, setReviewType] = useState('general');
  const [selectedItem, setSelectedItem] = useState('');
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedReview, setSubmittedReview] = useState<Review | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review = { reviewType, selectedItem, rating, comment,  };
    setSubmittedReview(review);
    setIsModalOpen(true);
    // Reset form
    setReviewType('general');
    setSelectedItem('');
    setRating('');
    setComment('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold">Leave a Review</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <RadioGroup
              label="Review Type"
              value={reviewType}
              onValueChange={setReviewType}
            >
              <Radio value="general">General Review</Radio>
              <Radio value="menuItem">Menu Item Review</Radio>
            </RadioGroup>

            {reviewType === 'menuItem' && (
              <select
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select a menu item</option>
                {menuItems.map((item) => (
                  <option key={item.id} value={item.id}>{item.name}</option>
                ))}
              </select>
            )}

            <Input
              label="Rating (1-5)"
              type="number"
              min="1"
              max="5"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            <Textarea
              label="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
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
                <p><strong>Review Type:</strong> {submittedReview?.reviewType}</p>
                {submittedReview?.selectedItem && <p><strong>Menu Item:</strong> {submittedReview.selectedItem}</p>}
                <p><strong>Rating:</strong> {submittedReview?.rating}</p>
                <p><strong>Comment:</strong> {submittedReview?.comment}</p>
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