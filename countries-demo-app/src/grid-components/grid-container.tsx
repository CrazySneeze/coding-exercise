import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { getCountries } from "../API/Countries";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Fields } from "../types/fields";

export const Grid = () => {
    const [rowData, setRowData] = useState<Array<any>>();
    const [error, setError] = useState<string>();
    const service = "all";
    const field = Object.keys(Fields).map((key) => key);
    const columnDefs: ColDef[] = [
        ...field.map((field) => {
            return {
                headerName: field,
                field: field,
            };
        }),
    ];
    
    useEffect(() => {
        getCountries({service, fields: field}).then(
            (response) => {
                if (response.error.length === 0) {
                    const countries = response.data;
                    setRowData(countries);
                } else {
                    setRowData([]);
                    console.log(response.error);
                }
            }
        );
    }, []);

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {rowData &&
            <div style={{ height: '95%', width: '100%' }}>
                <div className="ag-theme-alpine ag-grid-wrapper" style={{ height: '100%', width: '100%' }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{
                            sortable: true,
                            filter: true,
                            minWidth: 50,
                        }}
                    />
                </div>
                </div>
            }
            {
                !rowData &&
                <div>
                    Loading ...
                </div>
            }
            {
                error &&
                <div>
                    {error}
                </div>
            }
            </div>
    );
}