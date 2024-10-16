'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CopyIcon, CheckIcon } from 'lucide-react';

export function BankAccountComponent() {
  const [copied, setCopied] = useState({
    accountNumber: false,
    accountHolders: false,
  });

  const accountNumber = 'ES12 3456 7890 1234 5678 9012';
  const accountHolders =
    'María Maggioni Martínez Gonzalo Fidalgo Martínez-Merello';

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
    <section className="py-16 bg-white px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Lista de bodas</h2>
        <p className="mb-2">
          Nos hace muy felices celebrar nuestro amor con vosotros. Si queréis
          ayudarnos en nuestra nueva etapa, os dejamos esta opción :
        </p>
        <Card className="max-w-md mx-auto">
          <CardContent>
            <div className="flex flex-col items-center space-y-2 mb-4">
              <p className="mb-2">Número de cuenta:</p>
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-pretty">{accountNumber}</p>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() =>
                    copyToClipboard(accountNumber, 'accountNumber')
                  }
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
                <p className="font-semibold text-pretty">{accountHolders}</p>
                <Button
                  size="icon"
                  variant="outline"
                  className="size-6 grid place-content-center p-4"
                  onClick={() =>
                    copyToClipboard(accountHolders, 'accountHolders')
                  }
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
      </div>
    </section>
  );
}
