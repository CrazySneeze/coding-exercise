import React, {useRef, useState} from 'react';
import { Fields } from '../types/fields';
import { Grid } from '../grid-components/grid-container';

export const SearchWithDropDown = () => {
    const [selectedFields, setSelectedFields] = useState<Fields[]>([]);

    const handleSelect = (field: Fields) => {
        setSelectedFields([...selectedFields, field]);
    };

    const handleRemove = (field: Fields) => {
        setSelectedFields(selectedFields.filter((selectedField) => selectedField !== field));
    };

    const [searchFieldOpen, setSearchFieldOpen] = useState(false);

    return (
        <div>
            <div>
                <div style={{display: 'flex', gap: '8px'}} onClick={() => setSearchFieldOpen(true)}>
                    {
                        selectedFields.length === 0 ? (
                            <div>Please select a field</div>
                        ) : selectedFields.map((field) => (
                            <div key={field} style={{display: 'flex', gap: '2px'}}>
                                {field}
                                <div style={{color: 'red', fontSize: 12, cursor: 'pointer'}} onClick={() => handleRemove(field)}>x</div>
                            </div>
                        ))
                    }
                </div>
                {
                    searchFieldOpen &&
                    (
                        <div>
                            {Object.keys(Fields).map((field) => (
                                <div onClick={() => handleSelect(Fields[field as keyof typeof Fields])}>
                                    {Fields[field as keyof typeof Fields]}
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
            <div onClick={() => setSearchFieldOpen(false)} style={{width: '100%', height: '100%'}}>
                <Grid />
            </div>
        </div>
    )
}