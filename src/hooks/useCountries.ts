import { useEffect, useState } from "react";

interface Country {
  name: {
    common: string;
  };
}

const useCountries = () => {
  const [countries, setCountries] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const json: Country[] = await response.json();

        const sortedCountries = json
          .map((country) => ({
            value: country.name.common,
            label: country.name.common,
          }))
          .sort((a, b) => a.label.localeCompare(b.label));

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return countries;
};

export default useCountries;
