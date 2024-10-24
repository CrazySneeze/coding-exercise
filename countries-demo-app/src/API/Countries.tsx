import axios from "axios";
import { CountriesResponse, Fields } from "../types/fields";

type getCountriesRequest = {
    service: string;
    fields: Array<string>;
    filterValue: string;
}

export const getCountries = ({ service, fields, filterValue }: getCountriesRequest): Promise<CountriesResponse> => {
    const url = `https://restcountries.com/v3.1/${service}${filterValue? `/${filterValue}` : ''}${fields.length > 0 ? `?fields=${fields.join(',')}` : ''}`;
    return axios
        .get(url)
        .then(
            response => {
                return {
                    response: response.data,
                    error: [],
                };
            }
        ).catch((error) => {
            return {
                response: [],
                error: [error.message],
            };
        });
}

export const getByCode = (code: string): Promise<CountriesResponse> => {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    return axios
        .get(url)
        .then(
            response => {
                return {
                    response: response.data,
                    error: [],
                };
            }
        ).catch((error) => {
            return {
                response: [],
                error: [error.message],
            };
        });
}