import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { getCountries } from "../API/Countries";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Fields, formatData } from "../types/fields";
import { Modal } from "../Modal/modal";

type gridProps = {
    selectedFields: Fields[];
}

export const Grid = ({selectedFields}: gridProps) => {
    const [rowData, setRowData] = useState<Array<any>>();
    const [error, setError] = useState<string>();
    const service = "all";
    const field = selectedFields.map((field) => field);
    const columnDefs: ColDef[] = [
        ...field.map((field) => {
            return {
                headerName: Fields[field as keyof typeof Fields],
                field: field,
                valueFormatter: (params: { value: any; }) =>
                    formatData(params.value, Fields[field as keyof typeof Fields]),
            };
        }),
        {headerName: "Key", field: "my_unique_id", hide: true}
    ];
    
    useEffect(() => {
        getCountries({service, fields: field}).then(
            (response) => {
                if (response.error.length === 0) {
                    const countries = response.response;
                    setRowData(countries);
                } else {
                    setRowData([]);
                    console.log(response.error);
                }
            }
        );
    }, [selectedFields]);

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
                        pagination={true}
                        onCellClicked={(event) => {
                            console.log(event.data);
                            Modal(event.data, true);
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