// https://restcountries.com/v3.1/name/${name}?fields=name.official,capital,population,flags.svg,languages

export function fetchCountries(name){
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        } 
    )
}