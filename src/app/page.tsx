"use client";

import React, { useState } from 'react';
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react';
import QRCode from 'qrcode';

export default function Home() {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const generateQRCode = async () => {
    try {
      const restaurantId = 'Watercress'; // In a real app, this would be dynamically generated
      const url = `${window.location.origin}/${restaurantId}`;
      const qrCodeDataUrl = await QRCode.toDataURL(url);
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="flex justify-center">
          <h1 className="text-2xl font-bold">QR Code Review Generator</h1>
        </CardHeader>
        <CardBody className="flex flex-col items-center">
          <Button onClick={generateQRCode} color="primary" className="mb-4">
            Generate QR Code
          </Button>
          {qrCodeUrl && <img src={qrCodeUrl} alt="QR Code" className="mt-4" />}
        </CardBody>
      </Card>
    </div>
  );
}
