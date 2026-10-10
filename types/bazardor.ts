export type MarketPrice = {
  bazar?: string;
  market?: string;
  division?: string;
  name?: string;
  price?: number | string;
  min?: number | string;
  max?: number | string;
  min_price?: number | string;
  max_price?: number | string;
  yesterday?: number | string;
  last_week?: number | string;
  last_month?: number | string;
};

export type Product = {
  id?: number | string;
  _id?: string;
  slug?: string;

  name?: string;
  nameBn?: string;
  title?: string;

  category?: string;
  categoryNameBn?: string;
  category_name?: string;
  categoryIcon?: string;

  unit?: string;
  image?: string;
  emoji?: string;

  price?: number | string;
  today?: number | string;
  yesterday?: number | string;
  lastWeek?: number | string;
  lastMonth?: number | string;

  current_price?: number | string;
  min_price?: number | string;
  max_price?: number | string;
  average_price?: number | string;

  change?: {
    dir?: string;
    pct?: number | string;
  } | number | string;

  change_percent?: number | string;
  description?: string;

  markets?: MarketPrice[];
  bazars?: MarketPrice[];
  market_prices?: MarketPrice[];
};

export type Category = {
  id?: number | string;
  slug?: string;
  name?: string;
  nameBn?: string;
  title?: string;
  icon?: string;
  emoji?: string;
  description?: string;
};