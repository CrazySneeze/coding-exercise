import React, { useEffect, useState } from "react";
import { CountriesData, descriptions, Fields, formatData } from "../types/fields";
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

                                <div>{descriptions[Fields.tld]} : {data[Fields.tld]}</div>
                                <div>{data[Fields.independent] ? `${data[Fields.name].common} is an independent state` : `${data[Fields.name].common} is not an independent state`}</div>
                                <div>{data[Fields.unMember] ? `${data[Fields.name].common} is a un memeber` : `${data[Fields.name].common} is not a un memeber`}</div>
                                <div>{descriptions[Fields.status]} : {data[Fields.status]}</div>
                                <div>
                                    <div>{descriptions[Fields.currencies]} : {formatData(data[Fields.currencies], Fields.currencies)}</div>
                                </div>
                                <div>{descriptions[Fields.idd]} : {formatData(data[Fields.idd], Fields.idd)}</div>
                                <div>{descriptions[Fields.altSpellings]} : {formatData(data[Fields.altSpellings], Fields.altSpellings)}</div>
                                <div>{descriptions[Fields.region]} : {data[Fields.region]}</div>
                                <div>{descriptions[Fields.languages]} : {formatData(data[Fields.languages], Fields.languages)}</div>
                                {/* <div>{descriptions[Fields.translations]} : {formatData(data[Fields.translations], Fields.translations)}</div> */}
                                <div>{descriptions[Fields.latlng]} : {formatData(data[Fields.latlng], Fields.latlng)}</div>
                                <div>{data[Fields.landlocked] ? `${data[Fields.name].common} is land locked` : `${data[Fields.name].common} is not land locked`}</div>
                                <div>{descriptions[Fields.area]} : {formatData(data[Fields.area], Fields.area)} (km^2)</div>
                                <div>{descriptions[Fields.demonyms]} : {formatData(data[Fields.demonyms], Fields.demonyms)}</div>
                                <div>{descriptions[Fields.flag]} : {data[Fields.flag]}</div>
                                <div>{descriptions[Fields.maps]} : {formatData(data[Fields.maps], Fields.maps)}</div>
                                <div>{descriptions[Fields.population]} : {formatData(data[Fields.population], Fields.population)}</div>
                                <div>{descriptions[Fields.car]} : {formatData(data[Fields.car], Fields.car)}</div>
                                <div>{descriptions[Fields.timezones]} : {formatData(data[Fields.timezones], Fields.timezones)}</div>
                                <div>{descriptions[Fields.flags]} : {formatData(data[Fields.flags], Fields.flags)}</div>
                                <div>{descriptions[Fields.coatOfArms]} : {formatData(data[Fields.coatOfArms], Fields.coatOfArms)}</div>
                                <div>{descriptions[Fields.startOfWeek]} : {formatData(data[Fields.startOfWeek], Fields.startOfWeek)}</div>
                            </div>
                        )}
                        <button onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    )
}