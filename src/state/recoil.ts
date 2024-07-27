import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { UserInfoState } from "./recoilType";

const { persistAtom } = recoilPersist({
  key: "user",
  storage: sessionStorage,
});

export const accessTokenState = atom<string>({
  key: "accessToken",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const userInfoState = atom<UserInfoState>({
  key: "userInfo",
  default: {
    id: 0,
    nickname: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const keywordListState = atom<string[]>({
  key: "keywordListState",
  default: [],
});
