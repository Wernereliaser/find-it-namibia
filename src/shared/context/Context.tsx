import { createContext, useContext } from "react";
import AppStore from "../store/AppStore";
import AppApi from "../api/AppApi";
import UiStore from "../store/UiStore";

interface AppContextType {
  api: AppApi;
  store: AppStore;
  ui: UiStore;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  return context as AppContextType;
};

export const AppContext = createContext<null | AppContextType>(null);
