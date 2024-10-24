import React, { useEffect, useState, useRef, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { CellClickedEvent, ColDef, RowClickedEvent, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from "ag-grid-community";
import { getCountries } from "../API/Countries";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { CountriesData, descriptions, Fields, formatData } from "../types/fields";
import { Modal } from "../Modal/modal";
import { getColumnDefinitions } from "./column-definitions";

type gridProps = {
    selectableFields: Array<Fields>;
    data: Array<CountriesData>;
    setData: (data: Array<CountriesData>) => void;
    favourites: Array<string>;
    setFavourites: (favourites: Array<string>) => void;
};

export const Grid = ({selectableFields, data, setData, favourites, setFavourites}: gridProps) => {
    const columnDefs = getColumnDefinitions(selectableFields, favourites);

    const [modalCode, setModalCode] = useState<string>();
    const [modalopen, setModalOpen] = useState<boolean>(false);

    const onRowClicked = (event: CellClickedEvent) => {
        setModalCode(event.data.ccn3);
        setModalOpen(true);
    }

    const autoSizeStrategy = useMemo<
        | SizeColumnsToFitGridStrategy
        | SizeColumnsToFitProvidedWidthStrategy
        | SizeColumnsToContentStrategy
    >(() => {
        return {
            type: "fitGridWidth",
            defaultMinWidth: 50,
            ignoreColumnsFit: [],
        };
    }, []);
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
                        autoSizeStrategy={autoSizeStrategy}
                        onCellClicked={(event) => {
                            if (event.column.getColId() === 'favourite') {
                                setFavourites(favourites.includes(event.data.ccn3)
                                    ? favourites.filter((ccn3) => ccn3 !== event.data.ccn3)
                                    : [...favourites, event.data.ccn3]);
                            } else {
                                onRowClicked(event)
                            }
                        }}
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