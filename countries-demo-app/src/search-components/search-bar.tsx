import React, {useEffect, useRef, useState} from 'react';
import { descriptions, Fields } from '../types/fields';
import { Grid } from '../grid-components/grid-container';

type SearchBarProps = {
    searchText: string;
    setSearchText: (text: string) => void;
    filterField: Fields | undefined;
    setFielterField: (field: Fields) => void;
}

export const SearchWithDropDown = ({
    searchText,
    setSearchText,
    filterField,
    setFielterField,
}: SearchBarProps) => {

    return (
        <div style={{
            display: 'flex',
            gap: '8px',
            margin: '8px',
            padding: '4px',
            borderBottom: '1px solid #a3a2a2',
            borderRadius: '3px',
        }}>
            <select onChange={(event) => setFielterField(event.target.value as Fields)} value={filterField}>
                <option value={undefined}>Select a field to filter</option>
                {
                    Object.keys(Fields).map((field) => (
                        <option value={field}>{descriptions[field as Fields]}</option>
                    ))
                }
            </select>
            <input type='text' placeholder='Search...' onChange={(event) => {setSearchText(event.target.value)}} value={searchText}/>
            {/* <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    margin: '8px',
                    padding: '4px',
                    border: '1px solid #a3a2a2',
                    borderRadius: '3px',
                    cursor: 'text'
                }}
            >
                <div style={{display: 'flex', gap: '8px'}}>

                    <span style={{display: 'flex', gap: '2px', padding: '0px 4px 0px 4px', border: '1px solid #a3a2a2',
                        borderRadius: '3px',}}>
                        <div

                        >x</div>
                    </span>
                </div>
            </div>
            <div style={{zIndex: 1, position: 'absolute', background: 'white', width: '20%', left: '5%', gap: '16px'}}>

            </div> */}
        </div>
    )
}