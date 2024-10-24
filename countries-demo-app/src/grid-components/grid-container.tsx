import React, { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, RowClickedEvent } from "ag-grid-community";
import { getCountries } from "../API/Countries";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CountriesData, descriptions, Fields, formatData } from "../types/fields";
import { Modal } from "../Modal/modal";

type gridProps = {
    selectableFields: Array<Fields>;
    data: Array<CountriesData>;
};

export const Grid = ({selectableFields, data}: gridProps) => {
    const field = selectableFields.map((field) => field);
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

    const [modalCode, setModalCode] = useState<string>();
    const [modalopen, setModalOpen] = useState<boolean>(false);

    const onRowClicked = (event: RowClickedEvent) => {
        setModalCode(event.data.ccn3);
        setModalOpen(true);
    }

    return (
        <div style={{ height: '100%', width: '100%' }}>
            {data &&
            <div style={{ height: '95%', width: '100%' }}>
                <div className="ag-theme-alpine ag-grid-wrapper" style={{ height: '100%', width: '100%' }}>
                    <AgGridReact
                        rowData={data}
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
                !data &&
                <div>
                    Loading ...
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