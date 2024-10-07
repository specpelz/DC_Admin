import { useEffect, useState } from "react";

const useLGAs = (selectedState: string | null) => {
  const [lgas, setLgas] = useState<{ value: string; label: string }[]>([]);

  useEffect(() => {
    const fetchLGAs = async () => {
      if (!selectedState) return; // Skip fetching if no state is selected

      try {
        const response = await fetch(
          `https://nga-states-lga.onrender.com/?state=${selectedState}`
        );
        const json: string[] = await response.json();
        console.log("Fetched LGA:", json);

        if (Array.isArray(json)) {
          const mappedLGAs = json.map((lga) => ({
            value: lga,
            label: lga,
          }));

          setLgas(mappedLGAs);
        } else {
          console.error("Fetched data is not an array:", json);
        }
      } catch (error) {
        console.error("Error fetching LGAs:", error);
      }
    };

    fetchLGAs();
  }, [selectedState]);

  return lgas;
};

export default useLGAs;
