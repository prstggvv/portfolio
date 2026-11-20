export const clamp = (v: number) => Math.min(Math.max(v, 0), 1);

export const smoothstep = (v: number) => {
  const x = clamp(v);
  return x * x * (3 - 2 * x);
};

export const VK_LINK = 'https://vk.ru/id138932826';
export const VK_LABEL = 'VK';
export const TG_LINK = 'https://t.me/tennis1coachmoscow';
export const TG_LABEL = 'Telegram';
export const MAIL_LINK = 'mailto:Chorea@bk.ru';
export const MAIL_LABEL = 'Chorea@bk.ru';
export const PHONE_LINK = 'tel:+79161234567';
export const PHONE_LABEL = '+7 916 123-45-67';