export const checkDomainSuffixDetail = async (
  baseDomain: string,
  tailDomain: string,
): Promise<any> => {
  const url = `https://system.gofiber.vn/api/v1/cart-item/check-domain-more?search=${baseDomain}&tailDomain=${tailDomain}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('API error');
  }
  return response.json();
};
