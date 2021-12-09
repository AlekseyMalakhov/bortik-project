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
import { setUser } from "../store/manage";
import SearchButton from "./SearchButton";

const HeaderStyled = styled.div({
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

function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const search = useSelector((state) => state.manage.search);
    const mobileScreen = useSelector((state) => state.manage.mobileScreen);
    const user = useSelector((state) => state.manage.user);

    const logout = () => {
        dispatch(setUser(null));
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <HeaderStyled>
            {location.pathname === "/" ? <MenuButton /> : <HeaderBackButton />}
            {mobileScreen && search ? null : <BrandName onClick={() => navigate("/")}>Bortik Project</BrandName>}
            <Search show={search && location.pathname === "/"} />
            <RightCornerPanel>
                {search ? null : <SearchButton />}
                <Dropdown align="end">
                    <Dropdown.Toggle as={ThreeDotsButton} id="dropdown-basic" />
                    <Dropdown.Menu>
                        {location.pathname !== "/" ? <Dropdown.Item onClick={() => navigate("/")}>На главную</Dropdown.Item> : null}
                        <Dropdown.Item onClick={() => navigate("/about")}>О компании</Dropdown.Item>
                        <Dropdown.Divider />
                        {user ? (
                            <React.Fragment>
                                <Dropdown.Item onClick={() => navigate("/account")} style={{ fontWeight: 500 }}>
                                    {user.name}
                                </Dropdown.Item>
                                <Dropdown.Item onClick={logout}>Выход</Dropdown.Item>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Dropdown.Item onClick={() => navigate("/login")}>Вход в личный кабинет</Dropdown.Item>
                                <Dropdown.Item onClick={() => navigate("/register")}>Регистрация</Dropdown.Item>
                            </React.Fragment>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
            </RightCornerPanel>
        </HeaderStyled>
    );
}

export default Header;
