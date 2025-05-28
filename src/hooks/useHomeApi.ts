import {domainsTrend} from './data/domains';
import {promotions} from './data/promotions';
import {services} from './data/services';

export const useDashboardHomeApi = () => {
  return {
    data: [
      {
        id: 1,
        type: 'service',
        title: 'Dịch vụ của Nhân Hoà',
        items: services,
      },
      {
        id: 2,
        type: 'promotions',
        title: 'Chương trình khuyến mãi',
        items: promotions,
      },
      {
        id: 3,
        title: 'Tên miền',
        description: 'Giá cập nhật 24h',
        type: 'domain',
        items: domainsTrend,
      },
    ],
    isSuccess: true,
    isLoading: false,
    isRefetching: false,
    refetch: () => {},
    isError: false,
  };
};
