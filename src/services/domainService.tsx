import { API_ENDPOINTS, getRequestSystem } from "@api";

export const checkDomainSuffixDetail = async (
  baseDomain: string,
  tailDomain: string,
) => {
  // const url = `https://system.gofiber.vn/api/v1/cart-item/check-domain-more?search=${baseDomain}&tailDomain=${tailDomain}`;
  const url = `${API_ENDPOINTS.CHECK_DOMAIN}?search=${baseDomain}&tailDomain=${tailDomain}`;
  const response: any = await getRequestSystem(url);

  return response?.isAvailable
    ;
}
