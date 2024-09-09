import { useState } from "react";
import axios, { AxiosResponse } from "axios";

export function usePostRequest<T>() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<AxiosResponse<T> | null>(null);

    const postRequest = async (url: string, data: any) => {
        setLoading(true);
        setError(null);

        try {
            const res = await axios.post<T>(url, data);
            setResponse(res);
        } catch (err: any) {
            setError(err.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return { postRequest, loading, error, response };
}
