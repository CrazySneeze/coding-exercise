import { ColDef } from "ag-grid-community";
import { descriptions, Fields, formatData } from "../types/fields";

export const getColumnDefinitions = (selectedFields: Array<Fields>, favourites: Array<string>): Array<ColDef> => {
    const field = selectedFields.map((field) => field);
    const columnDefs: ColDef[] = [
        {
            headerName: 'Favourite',
            field: 'favourite',
            valueGetter: (params) => favourites.includes(params.data.ccn3) ? '❤️' : '🤍',
        },
        ...field.map((field) => {
            if (field === Fields.flags) {
                return {
                    headerName: descriptions[field],
                    field: field,
                    cellRenderer: (params: { value: any; }) => <img src={params.value.svg} alt={params.value.alt} width="70"/>
                };
            }
            return {
                headerName: descriptions[field],
                field: field,
                valueFormatter: (params: { value: any; }) =>
                    formatData(params.value, field),
            };
        }),
        {field: 'ccn3', headerName: 'ccn3', hide: true},
    ];
    return columnDefs;
}
