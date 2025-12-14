import React from 'react';
import { useSubscription } from '../hooks/useSubscription';

// Import UI Components
import SubscriptionHeader from '../features/subscription/SubscriptionHeader';
import StandardPlanCard from '../features/subscription/StandardPlanCard';
import PremiumPlanCard from '../features/subscription/PremiumPlanCard';

const SubscriptionPage = () => {
  // Use Custom Hook for Logic
  const { handleUpgrade, loading, user, PREMIUM_COST } = useSubscription();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors duration-300 flex items-center justify-center">
      <div className="max-w-6xl w-full">
        
        {/* 1. Header Section */}
        <SubscriptionHeader />

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          
          {/* 2. Free Tier */}
          <StandardPlanCard />

          {/* 3. Premium Tier */}
          <PremiumPlanCard 
            cost={PREMIUM_COST} 
            isSubscribed={user?.isSubscribed}
            loading={loading}
            onUpgrade={handleUpgrade}
          />

        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;