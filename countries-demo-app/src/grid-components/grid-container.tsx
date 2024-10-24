import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import { getCountries } from "../API/Countries";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { descriptions, Fields, formatData } from "../types/fields";
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
                headerName: descriptions[field],
                field: field,
                valueFormatter: (params: { value: any; }) =>
                    formatData(params.value, field),
            };
        }),
        {field: 'ccn3', headerName: 'ccn3', hide: true},
    ];
    
    useEffect(() => {
        getCountries({service, fields: [...field, 'ccn3']}).then(
            (response) => {
                console.log(response);
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

    const [modalCode, setModalCode] = useState<string>();
    const [modalopen, setModalOpen] = useState<boolean>(false);

    const onRowClicked = (event: RowClickedEvent) => {
        setModalCode(event.data.ccn3);
        setModalOpen(true);
    }

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
                        onRowClicked={onRowClicked}
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
            {
                modalCode &&
                <Modal
                    ccn3={modalCode}
                    open={modalopen}
                    setOpen={setModalOpen}
                />
            }
        </div>
    );
}