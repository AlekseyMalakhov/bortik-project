import { store } from "../store/store";
import { setAdminDoneModal } from "../store/manage";

export const showAdminDoneModal = (text) => {
    store.dispatch(setAdminDoneModal(text));
    // setTimeout(() => {
    //     store.dispatch(setAdminDoneModal(""));
    // }, 3000);
};
