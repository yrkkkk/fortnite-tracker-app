import React, { useState } from 'react';

interface SearchFormProps {
  onSearch: (username: string, platform: string, region: string) => void;
  isLoading: boolean;
}

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
  </svg>
);


const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading }) => {
  const [username, setUsername] = useState('');
  const [platform, setPlatform] = useState('pc');
  const [region, setRegion] = useState('NAE');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(username, platform, region);
  };

  const selectStyles = "bg-gray-800/50 border-2 border-cyan-400 rounded-full text-white text-lg py-2 pl-4 pr-8 focus:outline-none focus:border-cyan-300 focus:ring-0 appearance-none";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex items-center bg-gray-800/50 border-2 border-cyan-400 rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 focus-within:shadow-cyan-400/50 focus-within:border-cyan-300">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Epic Games Username..."
          className="w-full bg-transparent text-white text-2xl py-4 pl-6 pr-4 rounded-full focus:outline-none placeholder-gray-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-gray-900 font-bold p-4 m-2 rounded-full transition-colors duration-300"
          disabled={isLoading}
        >
          <SearchIcon className="h-8 w-8"/>
        </button>
      </div>
      <div className="flex justify-center gap-4 mt-4">
         <select value={platform} onChange={e => setPlatform(e.target.value)} disabled={isLoading} className={selectStyles}>
            <option value="pc">PC</option>
            <option value="console">Console</option>
            <option value="mobile">Mobile</option>
        </select>
        <select value={region} onChange={e => setRegion(e.target.value)} disabled={isLoading} className={selectStyles}>
            <option value="NAE">NA East</option>
            <option value="NAW">NA West</option>
            <option value="EU">Europe</option>
            <option value="BR">Brazil</option>
            <option value="ASIA">Asia</option>
            <option value="OCE">Oceania</option>
            <option value="ME">Middle East</option>
        </select>
      </div>
    </form>
  );
};

export default SearchForm;