import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid } from './grid-components/grid-container';
import { SearchWithDropDown } from './search-components/search-bar';
import { Fields } from './types/fields';
import { getCountries } from './API/Countries';

function App() {
  const [filterField, setFielterField] = useState<Fields | undefined>(undefined);
  const [searchText, setSearchText] = useState<string>('');

  const selectableFields = [
    Fields.name,
    Fields.capital,
    Fields.currency,
    Fields.languages,
    Fields.population,
    Fields.flags,
    Fields.flag,
    Fields.area,
    Fields.tld,
    Fields.idd,
  ];

  const [data, setData] = useState<any>();
  const field = selectableFields.map((field) => field);
  useEffect(() => {
    getCountries({service: filterField && searchText ? filterField : 'all', filterValue: searchText, fields: [...field, 'ccn3']}).then(
        (response) => {
            console.log(response);
            if (response.error.length === 0) {
                const countries = response.response;
                setData(countries);
            } else {
                setData([]);
                console.log(response.error);
            }
        }
    );
  }, [searchText, filterField]);

  return (
    <div className="App">
      <div style={{height: '100vh'}}>
        <SearchWithDropDown
          searchText={searchText}
          setSearchText={setSearchText}
          filterField={filterField}
          setFielterField={setFielterField}

        />
        <Grid
          selectableFields={selectableFields}
          data={data}
        /> 
      </div>
    </div>
  );
}

export default App;
