import { makeAutoObservable, toJS } from "mobx";
import AppStore from "../store/AppStore";

export const defaultUser: IUser = {
  uid: "",
  displayName: "",
  email: "",
  role: "Landlord",
  phoneNumber: "",
  photoURL: null,
  emailVerified: false,
  userVerified: false,
  createdAt: Date.now(),
  updatedAt: Date.now(),
  town: "",
  gender: "Male",
  favorites: [],
  documents: []
};

export interface IUser {
  uid: string;
  displayName: string;
  email: string;
  password?: string;
  role: "Landlord" | "Tenant" | "Admin";
  phoneNumber: string;
  photoURL: string | null;
  emailVerified: boolean;
  userVerified: boolean;
  createdAt: number;
  updatedAt: number;
  town: string;
  gender: string;
  favorites: string[];
  documents: string[]
}

export class UserModel {
  private user: IUser;

  constructor(private store: AppStore, user: IUser) {
    makeAutoObservable(this);
    this.user = user;
  }

  get asJson(): IUser {
    return toJS(this.user);
  }
}