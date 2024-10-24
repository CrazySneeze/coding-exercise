import React, { useEffect, useState } from "react";
import { CountriesData, Fields, formatData } from "../types/fields";
import { getByCode, getCountries } from "../API/Countries";

type modalProps = {
    ccn3: string;
    open: boolean;
}

export const Modal = ({ccn3, open}: modalProps) => {
    const [data, setData] = useState<CountriesData>();
    useEffect(() => {
        getByCode(ccn3).then(
            (response) => {
                console.log(response.response[0]);
                if (response.error.length === 0) {
                    setData(response.response[0]);
                } else {
                    console.log(response.error);
                }
            }
        ).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <div>
            {open && (
                <div style={{zIndex: 999, width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, background: 'rgba(0,0,0, 0.3)'}}>
                    <div style={{
                        width: '50%',
                        height: '75%',
                        right: '25%',
                        top: '10%',
                        position: 'absolute',
                        background: '#1c1c1c',
                        color: 'white',
                        padding: '16px',
                        border: '2px solid #a3a2a2',
                        borderRadius: '5px',
                    }}>
                        
                        {data ? Object.keys(data).map(
                            (key) => 
                                <div key={key}>
                                    <h3>{key}</h3>
                                    <p>{formatData(data[key as Fields], key as Fields).toString()}</p>
                                </div> 
                        ) : ''}
                    </div>
                </div>
            )}
        </div>
    )
}