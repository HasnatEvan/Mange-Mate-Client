import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { data: role = '', isLoading } = useQuery({
        queryKey: ['role', user?.email],
        queryFn: async () => {
            if (!user?.email) return ''; 
            const { data } = await axiosSecure.get(`/users/role/${user.email}`);
            return data?.role || ''; 
        },
        enabled: !!user?.email
    });

    return [role, isLoading];
};

export default useRole;