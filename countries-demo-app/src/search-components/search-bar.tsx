import React, {useEffect, useRef, useState} from 'react';
import { descriptions, Fields } from '../types/fields';
import { Grid } from '../grid-components/grid-container';

type SearchBarProps = {
    selectedFields: Fields[];
    setSelectedFields: (fields: Fields[]) => void;
    searchFieldOpen: boolean;
    setSearchFieldOpen: (open: boolean, event: React.MouseEvent) => void;
}

export const SearchWithDropDown = ({
    selectedFields,
    setSelectedFields,
    searchFieldOpen,
    setSearchFieldOpen,
}: SearchBarProps) => {
    const selectableFields = [
        Fields.name,
        Fields.capital,
        Fields.currencies,
        Fields.languages,
        Fields.population,
        Fields.flags,
        Fields.flag,
        Fields.area,
        Fields.tld,
        Fields.idd,
    ];

    const handleSelect = (field: Fields) => {
        setSelectedFields([...selectedFields, field]);
    };

    const handleRemove = (field: Fields) => {
        setSelectedFields(selectedFields.filter((selectedField) => selectedField !== field));
    };

    const searchFieldRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (searchFieldRef.current && searchFieldRef.current.offsetWidth > window.innerWidth * 0.3) {
            
        }
    }, [selectedFields]);

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    gap: '8px',
                    margin: '8px',
                    padding: '4px',
                    border: '1px solid #a3a2a2',
                    borderRadius: '3px',
                    cursor: 'text'
                }}
                onClick={(event) => setSearchFieldOpen(true, event)}
            >
                <div ref={searchFieldRef} style={{display: 'flex', gap: '8px'}}>
                    {
                        selectedFields.length === 0 ? (
                            <div>Please select a field</div>
                        ) : selectedFields.map((field) => (
                            <span key={field} style={{display: 'flex', gap: '2px', padding: '0px 4px 0px 4px', border: '1px solid #a3a2a2',
                                borderRadius: '3px',}}>
                                {field}
                                <div
                                    style={{color: 'red', cursor: 'pointer', zIndex: 2}}
                                    onClick={() => {handleRemove(field)}}
                                    id='remove'
                                >x</div>
                            </span>
                        ))
                    }
                </div>
            </div>
            {
                searchFieldOpen &&
                (
                    <div style={{zIndex: 1, position: 'absolute', background: 'white', width: '20%', left: '5%', gap: '16px'}}>
                        {selectableFields.map((field) => (
                            <div onClick={() => handleSelect(field)}>
                                {descriptions[field]}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}