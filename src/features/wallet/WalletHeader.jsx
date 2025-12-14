import React from 'react';
import { Wallet } from 'lucide-react';

const WalletHeader = () => {
  return (
    <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-8 flex items-center gap-3">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full">
         <Wallet className="text-blue-600 dark:text-blue-400" size={24} />
      </div>
      My Wallet
    </h1>
  );
};

export default WalletHeader;  