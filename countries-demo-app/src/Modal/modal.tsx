import React, { useEffect, useState } from "react";
import { CountriesData, Fields, formatData } from "../types/fields";
import { getByCode, getCountries } from "../API/Countries";

type modalProps = {
    ccn3: string;
    open: boolean;
    setOpen: (open: boolean) => void;
}

export const Modal = ({ccn3, open, setOpen}: modalProps) => {
    const [data, setData] = useState<CountriesData>();
    useEffect(() => {
        setData(undefined);
        getByCode(ccn3).then(
            (response) => {
                console.log(response);
                console.log(response.response[0][Fields.name]);
                if (response.error.length === 0) {
                    setData(response.response[0]);
                } else {
                    console.log(response.error);
                }
            }
        ).catch((error) => {
            console.log(error);
        });
    }, [ccn3]);

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
                        {data && (
                            <div>
                                <div>
                                    {data[Fields.name].common}
                                </div>
                                <div>
                                    <div>Name info</div>
                                    <div>{data[Fields.name].official}</div>
                                    <div>{Object.keys(data[Fields.name].nativeName).map(
                                        (key) => (
                                            <div key={key}>
                                                {key}
                                                <div>
                                                    {data[Fields.name].nativeName[key].official}
                                                    {data[Fields.name].nativeName[key].common}
                                                </div>
                                            </div>
                                        )
                                    )}</div>

                                </div>
                                <div>
                                    <div>Capital</div>
                                    <div>
                                        {data[Fields.capital].map(
                                            (key, index) => (
                                                <div key={index}>
                                                    {key}
                                                </div>
                                            )
                                        )}
                                        {
                                            formatData(data[Fields.capitalInfo], Fields.capitalInfo)
                                        }
                                    </div>
                                    <div>Car</div>
                                    
                                </div>
                            </div>
                        )}
                        <button onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}