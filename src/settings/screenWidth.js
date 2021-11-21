import { store } from "../store/store";
import { setScreenWidth, changeSideBarOpened, setMobileScreen } from "../store/manage";

const handleScreenSize = () => {
    const getScreenWidth = () => {
        let width;
        if (window.screen.width < window.innerWidth) {
            // for moble browsers
            width = window.screen.width;
        } else {
            width = window.innerWidth;
        }
        return width;
    };
    const screenWidth = getScreenWidth();
    store.dispatch(setScreenWidth(screenWidth));

    const adjustSidebar = () => {
        const width = getScreenWidth();
        if (width < 650) {
            //store.dispatch(changeSideBarOpened(false));
            store.dispatch(setMobileScreen(true));
        } else {
            //store.dispatch(changeSideBarOpened(true));
            store.dispatch(setMobileScreen(false));
        }
    };
    adjustSidebar();

    window.onresize = () => {
        adjustSidebar();
        const screenWidth = getScreenWidth();
        store.dispatch(setScreenWidth(screenWidth));
    };
};

export default handleScreenSize;
