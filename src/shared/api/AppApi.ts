import AppStore from "../store/AppStore";
import AuthApi from "./AuthApi";
import PropertyApi from "./PropertyApi";
import UserApi from "./UserApi";
export default class AppApi {
  auth: AuthApi;
  user: UserApi;
  property: PropertyApi;

  constructor(private store: AppStore) {
    this.auth = new AuthApi(this, this.store);
    this.user = new UserApi(this, this.store);
    this.property = new PropertyApi(this, this.store)
  }
}
