import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useWallet } from '../hooks/useWallet';
import { Loader2 } from 'lucide-react';

// Sub-Components
import WalletHeader from '../features/wallet/WalletHeader';
import DigitalCard from '../features/wallet/DigitalCard';
import WalletActions from '../features/wallet/WalletActions';
import LinkCardModal from '../features/wallet/LinkCardModal';

const WalletPage = () => {
  const { user } = useSelector((state) => state.user);
  
  // Destructure initializing
  const { amount, setAmount, loading, performTransaction, initializing } = useWallet(user);
  
  const [showLinkModal, setShowLinkModal] = useState(false);

  // Derived State
  const isCardLinked = user?.isCardLinked || false;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 transition-colors duration-300">
      
      <WalletHeader />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left: Card (Always visible, looks fine even if loading) */}
        <DigitalCard 
          user={user} 
          isLinked={isCardLinked} 
        />

        {/* Right: Actions Panel (Handles Loading State) */}
        {initializing ? (
          // LOADING STATE: Prevents the "Link Card" flash
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col items-center justify-center h-64">
             <Loader2 className="animate-spin text-blue-600 dark:text-blue-400 mb-4" size={32} />
             <p className="text-slate-500 dark:text-slate-400 text-sm font-medium animate-pulse">Syncing Wallet...</p>
          </div>
        ) : (
          // LOADED STATE: Shows either Inputs or Link Button correctly
          <WalletActions 
            isLinked={isCardLinked}
            amount={amount}
            setAmount={setAmount}
            loading={loading}
            onTransaction={performTransaction}
            onLinkCard={() => setShowLinkModal(true)}
          />
        )}
        
      </div>

      {showLinkModal && (
        <LinkCardModal onClose={() => setShowLinkModal(false)} />
      )}
    </div>
  );
};

export default WalletPage;