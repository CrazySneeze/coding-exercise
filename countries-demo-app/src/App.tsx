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
  const [favourites, setFavourites] = useState<string[]>(() => {
    const localData = localStorage.getItem('favourites');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites])

  const selectableFields = [
    Fields.name,
    Fields.capital,
    Fields.currencies,
    Fields.languages,
    Fields.population,
    Fields.flags,
    Fields.area,
    Fields.tld,
    Fields.idd,
  ];

  const [data, setData] = useState<any>();
  const field = selectableFields.map((field) => field);
  useEffect(() => {
    getCountries({
      service: filterField && searchText ? filterField : 'all',
      filterValue: filterField ? searchText : '', fields: [...field, 'ccn3']
    }).then(
        (response) => {
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
          favourites={favourites}
          setFavourites={setFavourites}
          selectableFields={selectableFields}
          data={data}
          setData={setData}
        /> 
      </div>
    </div>
  );
}

export default App;
