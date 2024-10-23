import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from './grid-components/grid-container';
import { SearchWithDropDown } from './search-components/search-bar';
import { Fields } from './types/fields';

function App() {
  const [selectedFields, setSelectedFields] = React.useState<Fields[]>([]);
  const [searchFieldOpen, setSearchFieldOpen] = React.useState<boolean>(false);

  const updateSearchFieldOpen = (open: boolean, event: React.MouseEvent) => {
    if ((event.target as HTMLElement).id != 'remove') {
      setSearchFieldOpen(open);
    }
  }

  console.log(selectedFields);

  return (
    <div className="App">
      <div style={{height: '100vh'}}>
        <SearchWithDropDown
          selectedFields={selectedFields}
          setSelectedFields={setSelectedFields}
          searchFieldOpen={searchFieldOpen}
          setSearchFieldOpen={updateSearchFieldOpen}
        />
        <div
          onClick={() => setSearchFieldOpen(false)}
          style={{height: '100%'}}
        >
          <Grid
            selectedFields={selectedFields}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
