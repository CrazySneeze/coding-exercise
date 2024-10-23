import React from "react";
import { CountriesData, Fields, formatData } from "../types/fields";

export const Modal = (data: CountriesData, open: boolean) => {
    return (
        <div>
            {open && (
                <div style={{zIndex: 999, width: '100%', height: '100%', position: 'absolute'}}>
                    <div style={{width: '50%', height: '75%', right: '25%'}}>
                        {
                            Object.keys(data).map((key) => {
                                return (
                                    <div>
                                        <div>{key}</div>
                                        <div>{formatData(data[key as keyof CountriesData], key as keyof CountriesData)}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            )}
        </div>
    )
}