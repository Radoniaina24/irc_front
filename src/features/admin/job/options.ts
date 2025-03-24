import { useGetAllCategoryQuery } from "@/lib/api/categoryApi";
import { useGetAllSectorQuery } from "@/lib/api/sectorApi";

export const useCategoriesOptions = () => {
  const { data, isLoading } = useGetAllCategoryQuery({ limit: 1000 });

  if (isLoading) return { options: [], isLoading: true };

  const options =
    data?.categories?.map((category: any) => ({
      value: category._id,
      label: category.name,
    })) || [];

  return { options, isLoading };
};
export const useSectorsOptions = () => {
  const { data, isLoading } = useGetAllSectorQuery({ limit: 1000 });

  if (isLoading) return { options: [], isLoading: true };

  const options =
    data?.sectors?.map((sector: any) => ({
      value: sector._id,
      label: sector.name,
    })) || [];

  return { options, isLoading };
};
