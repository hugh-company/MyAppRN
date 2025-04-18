import {getListUserPremium} from '@services';
import {useQuery} from '@tanstack/react-query';

export const usePremiumUsers = () => {
  return useQuery({
    queryKey: ['premiumUsers'],
    queryFn: async () => {
      const response: any = await getListUserPremium();
      return response?.data?.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
