export type UserInfoState = {
  id: number;
  nickname: string;
};

export type ProductCard = {
  id: number;
  name: string;
  lgCtgryId: string;
  mdCtgry: string;
  price: number;
  link: string;
  imgLink: string | undefined;
  cntWish: number;
};
