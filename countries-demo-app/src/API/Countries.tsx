import axios from "axios";
import { CountriesResponse } from "../types/fields";

type getCountriesRequest = {
    service: string;
    fields: Array<string>;
}

export const getCountries = ({ service, fields }: getCountriesRequest): Promise<CountriesResponse> => {
    const url = `https://restcountries.com/v3.1/${service}?${fields.length > 0 ? `fields=${fields.join(',')}` : ''}`;
    return axios
        .get(url)
        .then(
            response => {
                return {
                    data: response.data,
                    error: [],
                };
            }
        ).catch((error) => {
            return {
                data: [],
                error: [error.message],
            };
        });
}