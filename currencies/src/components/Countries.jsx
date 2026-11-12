import Weather from "./Weather";

const Country = ({ country }) => {
  const {
    name: {common: countryName},
    area,
    capital: capitals,
    languages,
    flags
  } = country

  return (
      <div>
        <h1>{countryName}</h1>
        {capitals.map(capital => <div key={capital}>{capital}</div>)}
        <div>Area {area}</div>
        <h2>Languages</h2>
        <ul>
          {Object.entries(languages).map(([code, lang]) =>
              <li key={code}>{lang}</li>
          )}
        </ul>
        <img src={flags.png} alt={flags.alt}/>
      </div>
  )
}

const CountryPreview = ({ name, onShowCountry }) => (
    <div>
      {name} <button onClick={() => onShowCountry(name)}>show</button>
    </div>
)

const Countries = ({ countries, onShowCountry }) => {
  if (countries.length === 0) {
    return null
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return countries.map(country => (
        <CountryPreview
            key={country.cca2}
            name={country.name.common}
            onShowCountry={onShowCountry}
        />
    ))
  } else {
    const country = countries[0]
    return (
        <>
          <Country country={country} />
          <Weather
              location={country.capital[0]}
              geolocation={country.capitalInfo.latlng}
          />
        </>
    )
  }
}

export default Countries
