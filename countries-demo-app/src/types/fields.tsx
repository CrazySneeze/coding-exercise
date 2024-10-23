import React from "react";

export enum Fields {
    name = "Name",
    tld = "Top Level Domain",
    cca2 = "ISO 3166-1 alpha-2 two-letter country codes",
    ccn3 = "ISO 3166-1 numeric code (UN M49)",
    cca3 = "ISO 3166-1 alpha-3 three-letter country codes",
    independent = "Independence status",
    status = "ISO 3166-1 assignment status",
    unMember = "UN Member Status",
    currencies = "Currencies",
    idd = "International dialing codes",
    capital = "Capital",
    altSpellings = "Alternate spellings",
    region = "UN demographic regions",
    languages = "Languages",
    translations = "Country name translations",
    latlng = "Latitude and longitude",
    landlocked = "Landlocked",
    area = "Area",
    demonyms = "Inhabitants of the country",
    flag = "Flag",
    maps = "Maps",
    population = "Population",
    car = "car",
    timezones = "Timezones",
    flags = "Flags",
    coatOfArms = "Coat Of Arms",
    startOfWeek = "Start Of Week",
    capitalInfo = "Capital Info"
}

export type CountriesData = {
    [Fields.name]: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            }
        }
    };
    [Fields.tld]: Array<string>;
    [Fields.cca2]: string;
    [Fields.ccn3]: string;
    [Fields.cca3]: string;
    [Fields.independent]: boolean;
    [Fields.status]: string;
    [Fields.unMember]: boolean;
    [Fields.currencies]: {
        [key: string]: {
            name: string;
            symbol: string;
        }
    };
    [Fields.idd]: {
        root: string;
        suffixes: Array<string>;
    };
    [Fields.capital]: Array<string>;
    [Fields.altSpellings]: Array<string>;
    [Fields.region]: string;
    [Fields.languages]: {
        [key: string]: string;
    };
    [Fields.translations]: {
        [key: string]: {
            official: string;
            common: string;
        }
    };
    [Fields.latlng]: Array<number>;
    [Fields.landlocked]: boolean;
    [Fields.area]: number;
    [Fields.demonyms]: {
        [key: string]: {
            f: string;
            m: string;
        }
    };
    [Fields.flag]: string;
    [Fields.maps]: {
        googleMaps: string;
        openStreetMaps: string;
    };
    [Fields.population]: number;
    [Fields.car]: {
        signs: Array<string>;
        side: string;
    };
    [Fields.timezones]: Array<string>;
    [Fields.flags]: Array<string>;
    [Fields.coatOfArms]: {
        png: string;
        svg: string
    };
    [Fields.startOfWeek]: string;
    [Fields.capitalInfo]: {
        latlng: Array<number>;
    };

}

export type CountriesResponse = {
    data: Array<CountriesData>;
    error: Array<string>;
}