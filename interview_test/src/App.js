import { useState } from 'react';
import './App.css';
import Searchbox from './Component/SearchBox/Searchbox';
import Table from './Component/SearchBox/Table.js/Table';


function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
   <>
   <Searchbox onSearch={handleSearch} />
   <Table searchQuery={searchQuery} />
   </>
  );
}

export default App;
