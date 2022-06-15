import axios from "axios";
import { useQuery } from "../Hooks/utils";
import { makeAutoObservable, observable, computed } from "mobx";

class Model {
  list = [];
  auth = {};
  count = 1;
  price = 10;

  constructor() {
    makeAutoObservable(this, {
      list: observable.shallow,
      auth: observable,
      count: observable.ref,
      price: observable.ref,
      sum: computed,
    });
  }

  get sum() {
    return this.price * this.count;
  }

  /**
   * ⬇️ `effects`
   */
  getList = (params) => useQuery(() => axios.get("/user/list", { params }));
}

export default new Model();
