'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CopyIcon, CheckIcon } from "lucide-react"

export function BankAccountComponent() {
  const [copied, setCopied] = useState({ accountNumber: false, accountHolders: false })

  const accountNumber = "ES12 3456 7890 1234 5678 9012"
  const accountHolders = "María Maggioni Martínez and Gonzalo Fidalgo Martínez-Merello"

  const copyToClipboard = (text: string, type: 'accountNumber' | 'accountHolders') => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(prev => ({ ...prev, [type]: true }))
      setTimeout(() => setCopied(prev => ({ ...prev, [type]: false })), 2000)
    }).catch(err => {
      console.error('Error copying to clipboard: ', err)
    })
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Bank Account</h2>
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>For monetary gifts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">If you prefer to make a cash gift, you can use the following bank account:</p>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <p className="font-bold">{accountNumber}</p>
              <Button 
                size="icon" 
                variant="destructive" 
                onClick={() => copyToClipboard(accountNumber, 'accountNumber')}
                aria-label="Copy account number"
              >
                {copied.accountNumber ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
              </Button>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <p className="font-semibold">Account Holders:</p>
              <div className="flex items-center justify-center space-x-2">
                <p>{accountHolders}</p>
                <Button 
                  size="icon" 
                  variant="destructive" 
                  onClick={() => copyToClipboard(accountHolders, 'accountHolders')}
                  aria-label="Copy account holders' names"
                >
                  {copied.accountHolders ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}