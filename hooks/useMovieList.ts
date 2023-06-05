import useSwr from "swr";
import fetcher from "@/libs/fetcher";

const useMovieList = () => {
  const { data, isLoading, error } = useSwr("/api/movies/", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  console.log(data);
  return {
    data,
    error,
    isLoading,
  };
};

export default useMovieList;
