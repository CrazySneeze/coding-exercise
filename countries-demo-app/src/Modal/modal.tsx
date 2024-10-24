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
                        width: '90%',
                        height: '75%',
                        right: '5%',
                        top: '10%',
                        position: 'absolute',
                        background: '#1c1c1c',
                        color: 'white',
                        padding: '16px',
                        border: '2px solid #a3a2a2',
                        borderRadius: '5px',   
                    }}>
                        {data && (
                            <div style={{gap: '16px'}}>
                                <div style={{display: 'flex', gap: '10px', justifyContent: 'center', alignItems: 'end', margin: '10px'}}>
                                    <div style={{fontWeight: 'bold', fontSize: '20px'}}>
                                        {data[Fields.name].common}
                                    </div>
                                    <div>
                                        ({data[Fields.name].official})
                                    </div>
                                </div>
                                <div>
                                    <div>Native Names</div>
                                    <div style={{
                                        display: 'flex',
                                        gap: '10px',
                                        justifyContent: 'center'
                                    }}>
                                        {Object.keys(data[Fields.name].nativeName).map(
                                            (key) => (
                                                <div key={key} style={{display: 'flex', gap: '10px', alignItems: 'center', justifyContent: 'center', borderRight: '1px solid white', padding:'0px 20px 0px 0px'}}>
                                                    {key}
                                                    <div>
                                                        <div>
                                                            official: {data[Fields.name].nativeName[key].official}
                                                        </div>
                                                        <div>
                                                            common: {data[Fields.name].nativeName[key].common}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div style={{display: 'flex', alignItems: "center", justifyContent: 'center', gap: '8px'}}>
                                    <div style={{fontWeight: 'bold', fontSize: '14px'}}>Capital: </div>
                                    <div>
                                        {data[Fields.capital].map(
                                            (key, index) => (
                                                <div key={index}>
                                                    {key}
                                                </div>
                                            )
                                        )}
                                    </div>
                                    {
                                        formatData(data[Fields.capitalInfo], Fields.capitalInfo)
                                    }
                                </div>

                                <div>tld</div>
                                <div>independent</div>
                                <div>status</div>
                                <div>unMember</div>
                                <div>currencies</div>
                                <div>idd</div>
                                <div>altSpellings</div>
                                <div>region</div>
                                <div>languages</div>
                                <div>translations</div>
                                <div>latlng</div>
                                <div>landlocked</div>
                                <div>area</div>
                                <div>demonym</div>
                                <div>flag</div>
                                <div>maps</div>
                                <div>population</div>
                                <div>car</div>
                                <div>timezones</div>
                                <div>flags</div>
                                <div>coat of arms</div>
                                <div>startOfWeek</div>
                            </div>
                        )}
                        <button onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}