import { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder: string;
}

export default function SearchBar({ onSearch, placeholder }: SearchBarProps) {
    const [query, setQuery] = useState('');
  
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      onSearch(query);
    };
  
    return (
        <form onSubmit={handleSubmit} className="relative w-full max-w-lg m-1">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 rounded-full text-black bg-white shadow-md border focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button type="submit" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600">
          <img src='/search.png' alt='Bouton Rechercher'/>
        </button>
      </form>
    );
  }
  
