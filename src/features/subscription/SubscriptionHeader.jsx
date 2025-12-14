import React from 'react';

const SubscriptionHeader = () => {
  return (
    <div className="text-center mb-16 space-y-4">
      <span className="text-blue-600 dark:text-blue-400 font-bold tracking-wider uppercase text-sm">
        Upgrade your lifestyle
      </span>
      <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white">
        Choose Your Experience
      </h1>
      <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
        Unlock exclusive perks, priority support, and unbeatable VIP prices with our premium membership.
      </p>
    </div>
  );
};

export default SubscriptionHeader;