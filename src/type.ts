export type ProductType = {
  id: number;
  name: string;
  lgCtgryId?: string;
  lgCtgry?: string;
  mdCtgry: string;
  price: number;
  link: string;
  imgLink: string | undefined;
  cntWish: number;
};

export type NoticeType = {
  isSad: boolean;
  title: string;
  text: string;
  nav?: string;
  btnName?: string;
};
