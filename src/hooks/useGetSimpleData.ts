import { useState } from "react";
import axios, { AxiosResponse } from "axios";

function useGetData() {
  const [donnes, setDonnes] = useState<any[]>([]);

  async function getData(url: string): Promise<void> {
    try {
      const response: AxiosResponse<any[]> = await axios.get(url);
      setDonnes(response.data);
    } catch (error) {
      alert("Erreur de chargement des données...");
    }
  }
  

  return { donnes, getData };
}

export default useGetData;
