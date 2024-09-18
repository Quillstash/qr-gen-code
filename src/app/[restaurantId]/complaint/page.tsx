"use client";

import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Textarea, Button, Radio, RadioGroup, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import { Complaint } from '@/app/types';

export default function ComplaintPage() {
  const [complaintType, setComplaintType] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedComplaint, setSubmittedComplaint] = useState<Complaint | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const complaint = { complaintType, description };
    setSubmittedComplaint(complaint);
    setIsModalOpen(true);
    // Reset form
    setComplaintType('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold">Submit a Complaint</h1>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <RadioGroup
              label="Complaint Type"
              value={complaintType}
              onValueChange={setComplaintType}
            >
              <Radio value="service">Service</Radio>
              <Radio value="food">Food Quality</Radio>
              <Radio value="cleanliness">Cleanliness</Radio>
              <Radio value="other">Other</Radio>
            </RadioGroup>

            <Textarea
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button type="submit" color="primary" className="w-full">
              Submit Complaint
            </Button>
          </form>
        </CardBody>
      </Card>

      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Complaint Submitted</ModalHeader>
              <ModalBody>
                <p><strong>Complaint Type:</strong> {submittedComplaint?.complaintType}</p>
                <p><strong>Description:</strong> {submittedComplaint?.description}</p>
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