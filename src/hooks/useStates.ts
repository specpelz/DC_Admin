import { useEffect, useState } from "react";

const useStates = (selectedCountry: string | null) => {
  const [states, setStates] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchStates = async () => {
      if (!selectedCountry) return; // Skip fetching if no country is selected

      try {
        const response = await fetch("https://nga-states-lga.onrender.com/fetch");
        const json = await response.json();
        console.log("Fetched states:", json);

        const mappedStates = json.map((state: string) => ({
          value: state,
          label: state,
        }));

        setStates(mappedStates);
        console.log("Mapped states:", mappedStates);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, [selectedCountry]);

  return states;
};

export default useStates;
