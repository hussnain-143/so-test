import useApi from "../../apiHook";

export const useGetDashboardStats = () => {
    const { request, loading, error, data, clearError } = useApi();
    const getDashboardStats = async () => {
        const res = await request({
            url: "/stats",
            method: "GET",
            withCredentials: true,
        });
        return res;
    };
    return { getDashboardStats, loading, error, data, clearError };
}


export const useGetRevenueStats = () => {
    const { request, loading, error, data, clearError } = useApi();
    const getRevenueStats = async (range: string) => {
        const res = await request({
            url: `/revenue-stats?range=${range}`,
            method: "GET",
            withCredentials: true,
        });
        return res;
    };
    return { getRevenueStats, loading, error, data, clearError };
}

export const useGetJobsChart = () => {
    const { request, loading, error, data, clearError } = useApi();
    const getJobsChart = async (range: string) => {
        const res = await request({
            url: `/jobs-chart?range=${range}`,
            method: "GET",
            withCredentials: true,
        });
        return res;
    };
    return { getJobsChart, loading, error, data, clearError };
}

export const useGetFeesTrend = () => {
    const { request, loading, error, data, clearError } = useApi();
    const getFeesTrend = async (range: string) => {
        const res = await request({
            url: `/fees-trend?range=${range}`,
            method: "GET",
            withCredentials: true,
        });
        return res;
    };
    return { getFeesTrend, loading, error, data, clearError };
}