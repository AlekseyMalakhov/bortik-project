import React from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import MenuButton from "./MenuButton";
import { useLocation, useNavigate } from "react-router";
import HeaderBackButton from "./HeaderBackButton";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsButton from "./ThreeDotsButton";
import Search from "./Search";
import { useSelector, useDispatch } from "react-redux";
import { setUser, cleanHistory } from "../store/manage";
import SearchButton from "./SearchButton";
import SelectLang from "./SelectLang";
import { useTranslation } from "react-i18next";
import Form from "react-bootstrap/Form";
import { setShowInStockOnly } from "../store/manage";
import { Outlet } from "react-router-dom";

const HeaderStyled = styled.div({
    borderRadius: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.primaryColor,
    height: "50px",
});

const RightCornerPanel = styled.div({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

const BrandName = styled.div({
    color: "white",
    fontSize: "20px",
    cursor: "pointer",
});

const Check = styled(Form.Check)({
    width: "100%",
});

function Header() {
    const { t } = useTranslation();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const search = useSelector((state) => state.manage.search);
    const showInStockOnly = useSelector((state) => state.manage.showInStockOnly);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const user = useSelector((state) => state.manage.user);

    const logout = () => {
        dispatch(setUser(null));
        dispatch(cleanHistory());
        localStorage.removeItem("user");
        navigate("/");
    };

    const handleShowInStock = (e) => {
        dispatch(setShowInStockOnly(e.target.checked));
    };

    const toggleCheckBox = () => {
        if (showInStockOnly) {
            dispatch(setShowInStockOnly(false));
        } else {
            dispatch(setShowInStockOnly(true));
        }
    };

    return (
        <React.Fragment>
            <HeaderStyled>
                {location.pathname === "/home" ? <MenuButton /> : <HeaderBackButton />}
                {mobileScreen && search ? null : <BrandName onClick={() => navigate("/")}>5a.by</BrandName>}
                <Search show={search && location.pathname === "/home"} />
                <RightCornerPanel>
                    {search ? null : <SearchButton />}
                    <Dropdown align="end">
                        <Dropdown.Toggle as={ThreeDotsButton} id="dropdown-basic" />
                        <Dropdown.Menu style={{ width: "230px" }}>
                            {location.pathname !== "/home" ? <Dropdown.Item onClick={() => navigate("/")}>{t("???? ??????????????")}</Dropdown.Item> : null}
                            <Dropdown.Item onClick={() => navigate("/about")}>{t("?? ????????????????")}</Dropdown.Item>
                            <Dropdown.Divider />
                            {user ? (
                                <React.Fragment>
                                    <Dropdown.Item onClick={() => navigate("/account")} style={{ fontWeight: 500 }}>
                                        {user.name}
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={logout}>{t("??????????")}</Dropdown.Item>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <Dropdown.Item onClick={() => navigate("/login")}>{t("???????? ?? ???????????? ??????????????")}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => navigate("/register")}>{t("??????????????????????")}</Dropdown.Item>
                                </React.Fragment>
                            )}
                            {/* <Dropdown.Item onClick={() => window.tidioChatApi.open()}>{t("??????")}</Dropdown.Item> */}
                            <Dropdown.Item>{t("??????")}</Dropdown.Item>
                            <SelectLang />
                            <Dropdown.Item style={{ whiteSpace: "normal" }} onClick={toggleCheckBox}>
                                <Check
                                    id="my_check_box"
                                    key={Math.random()}
                                    type="checkbox"
                                    checked={showInStockOnly}
                                    onChange={handleShowInStock}
                                    label={t("???????????????????? ???????????? ???????????? ?? ??????????????")}
                                />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </RightCornerPanel>
            </HeaderStyled>
            <Outlet />
        </React.Fragment>
    );
}

export default Header;
