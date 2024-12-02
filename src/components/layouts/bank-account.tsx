'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';
import React from 'react';
import { useEventStore } from '@/store/eventStore';

export function BankAccountComponent() {
  const bankAccountDetails = useEventStore((state) => state.bankAccountDetails);

  const [copied, setCopied] = useState({
    accountNumber: false,
    accountHolders: false,
  });

  const accountNumber = bankAccountDetails.bankAccountNumber;
  const accountHolders = bankAccountDetails.bankAccountHolders;

  const copyToClipboard = (
    text: string,
    type: 'accountNumber' | 'accountHolders'
  ) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied((prev) => ({ ...prev, [type]: true }));
        setTimeout(
          () => setCopied((prev) => ({ ...prev, [type]: false })),
          2000
        );
      })
      .catch((err) => {
        console.error('Error copying to clipboard: ', err);
      });
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent>
        <div className="flex flex-col items-center space-y-2 mb-4">
          <p className="mb-2">Número de cuenta:</p>
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-pretty">{accountNumber}</p>
            <Button
              size="icon"
              variant="outline"
              onClick={() => copyToClipboard(accountNumber, 'accountNumber')}
              aria-label="Copy account number"
              className="size-6 grid place-content-center p-4"
            >
              {copied.accountNumber ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-2">
          <p className="">Titulares de la cuenta:</p>
          <div className="flex items-center justify-between gap-2">
            <p className="font-semibold text-pretty">
              {accountHolders.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </p>
            <Button
              size="icon"
              variant="outline"
              className="size-6 grid place-content-center p-4"
              onClick={() => copyToClipboard(accountHolders, 'accountHolders')}
              aria-label="Copy account holders' names"
            >
              {copied.accountHolders ? (
                <CheckIcon className="h-4 w-4" />
              ) : (
                <CopyIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
