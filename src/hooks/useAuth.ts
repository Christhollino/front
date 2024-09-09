import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserInfo {
    id: string;
    role: string;
}

const useAuth = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('itatitraToken');
            if (!token) {
                setUserInfo(null);
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get<UserInfo>('/user-info', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserInfo(response.data);
            } catch (error) {
                console.error('Error fetching user info:', error);
                setUserInfo(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    return { userInfo, loading };
};

export default useAuth;
