
import React from 'react';

const InitialState: React.FC = () => {
  return (
    <div className="text-center max-w-3xl mx-auto bg-black/20 p-8 rounded-xl backdrop-blur-sm">
      <h2 className="text-5xl font-bold text-white mb-4">Welcome, Looter!</h2>
      <p className="text-2xl text-gray-300">
        Ready to see your stats? Enter your Epic Games username above to get started. See how you stack up in Solos, Duos, and Squads.
      </p>
       <p className="text-xl text-gray-400 mt-6">
        Hint: Try searching for a well-known player like "Ninja" to see a demo!
      </p>
    </div>
  );
};

export default InitialState;
