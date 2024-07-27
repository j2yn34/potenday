export type ProductCard = {
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
