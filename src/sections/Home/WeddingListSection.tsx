'use client';

import { Link } from 'react-router-dom';
import { BankAccountComponent } from '@/components/layouts/bank-account';

export function WeddingListSection() {
  return (
    <section className="py-16 bg-white px-4">
      <div className="max-w-lg mx-auto container text-center mb-10">
        <h2 className="text-3xl font-bold mb-8">Lista de bodas</h2>
        <p className="mb-2">
          Nos hace muy felices celebrar nuestro amor con vosotros. Si queréis
          ayudarnos en nuestra nueva etapa, os dejamos esta opción :
        </p>
        <BankAccountComponent />
      </div>
      <div className="max-w-lg mx-auto container text-center">
        <p className="mb-2">
          Si la transferencia no os convence, hemos preparado una pequeña lista
          de regalos
        </p>
        <Link
          to="/gifts"
          className="rounded-md block bg-transparent px-6 py-2 w-max mx-auto mt-8 text-black border-2 border-black hover:bg-black hover:text-white"
        >
          Lista de regalos
        </Link>
      </div>
    </section>
  );
}
