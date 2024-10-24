import React from "react";

export enum Fields {
    name = "name",
    tld = "tld",
    cca2 = "cca2",
    ccn3 = "ccn3",
    cca3 = "cca3",
    independent = "independent",
    status = "status",
    unMember = "unMember",
    currencies = "currencies",
    idd = "idd",
    capital = "capital",
    altSpellings = "altSpellings",
    region = "region",
    languages = "languages",
    translations = "translations",
    latlng = "latlng",
    landlocked = "landlocked",
    area = "area",
    demonyms = "demonyms",
    flag = "flag",
    maps = "maps",
    population = "population",
    car = "car",
    timezones = "timezones",
    flags = "flags",
    coatOfArms = "coatOfArms",
    startOfWeek = "startOfWeek",
    capitalInfo = "capitalInfo"
}

export enum descriptions {
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
        alt: string;
        png: string;
        svg: string;
    };
    [Fields.startOfWeek]: string;
    [Fields.capitalInfo]: {
        latlng: Array<number>;
    };

}

export type CountriesResponse = {
    response: CountriesData[];
    error: Array<string>;
}

export const formatData = (value: any, field: Fields) => {
    if (!value) {
        return '-';
    } else {
        switch (field) {
            case Fields.name:
                return value?.common;
            case Fields.tld:
                return value?.join(', ');
            case Fields.cca2:
                return value;
            case Fields.ccn3:
                return value;
            case Fields.cca3:
                return value;
            case Fields.independent:
                return value;
            case Fields.status:
                return value;
            case Fields.unMember:
                return value;
            case Fields.currencies:
                return Object.keys(value).filter(
                    (currency) => value[currency].name && value[currency].symbol
                ).map(
                    (currency) => `${value[currency].name} (${value[currency].symbol})`
                ).join(', ');
            case Fields.idd:
                return `${value?.root} ${value?.suffixes?.join(', ')}`;
            case Fields.capital:
                return value?.join(', ');
            case Fields.altSpellings:
                return value?.join(', ');
            case Fields.region:
                return value;
            case Fields.languages:
                return Object.keys(value).map((language) => `${value[language]}`).join(', ');
            case Fields.translations:
                return Object.keys(value).filter(
                    (translation) => value[translation].common && value[translation].official
                ).map(
                    (translation) => `${value[translation].common} (${value[translation].official})`
                ).join(', ');
            case Fields.latlng:
                return value?.join(', ');
            case Fields.landlocked:
                return value;
            case Fields.area:
                return value;
            case Fields.demonyms:
                return Object.keys(value).filter(
                    (demonym) => value[demonym].f && value[demonym].m
                ).map(
                    (demonym) => `${value[demonym].f} (f), ${value[demonym].m} (m)`
                ).join(', ');
            case Fields.flag:
                return value;
            case Fields.maps:
                return `${value?.googleMaps}, ${value?.openStreetMaps}`;
            case Fields.population:
                return value;
            case Fields.car:
                return `${value?.signs?.join(', ')} (${value?.side})`;
            case Fields.timezones:
                return value?.join(', ');
            case Fields.flags:
                return <img src={value.svg} alt={value.alt}/>;
            case Fields.coatOfArms:
                return `${value?.png}, ${value?.svg}`;
            case Fields.startOfWeek:
                return value;
            case Fields.capitalInfo:
                return value?.latlng?.join(', ');
            default:
                return value;
        };
    };
};