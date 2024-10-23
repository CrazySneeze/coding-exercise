import React, {useRef, useState} from 'react';
import { Fields } from '../types/fields';
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
    const handleSelect = (field: Fields) => {
        setSelectedFields([...selectedFields, field]);
    };

    const handleRemove = (field: Fields) => {
        setSelectedFields(selectedFields.filter((selectedField) => selectedField !== field));
    };

    return (
        <div>
            <div style={{display: 'flex', gap: '8px'}} onClick={(event) => setSearchFieldOpen(true, event)}>
                {
                    selectedFields.length === 0 ? (
                        <div>Please select a field</div>
                    ) : selectedFields.map((field) => (
                        <span key={field} style={{display: 'flex', gap: '2px'}}>
                            {field}
                            <div
                                style={{color: 'red', fontSize: 12, cursor: 'pointer', zIndex: 2}}
                                onClick={(event) => {
                                    handleRemove(field)
                                }}
                                id='remove'
                            >x</div>
                        </span>
                    ))
                }
            </div>
            {
                searchFieldOpen &&
                (
                    <div style={{zIndex: 1, position: 'absolute', background: 'white', width: '20%', left: '5%', gap: '16px'}}>
                        {Object.keys(Fields).map((field) => (
                            <div onClick={() => handleSelect(field as Fields)}>
                                {Fields[field as keyof typeof Fields]}
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    )
}