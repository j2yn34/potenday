export type ProductType = {
  title: string;
  link: string;
  image: string;
  lprice: number;
  hprice: number | null;
  mallName: string;
  productId: number;
  productType: number;
  brand: string;
  maker: string;
  category1: string;
  category2: string;
  category3: string;
  category4: string;
  wish: boolean;
  insDate: string;
};

export type ProductListType = {
  category: string;
  products: ProductType[];
};

export type HistoryListType = {
  item: ProductType;
  date: string;
  id: number;
  product: ProductType;
  wish: boolean;
};

export type HeartListType = {
  category: string;
  timeList: HeartTimeList[];
};

export type HeartTimeList = {
  insDate: string;
  itemList: ProductType[];
};

export type NoticeType = {
  isSad: boolean;
  title: string;
  text: string;
  nav?: string;
  btnName?: string;
};
