import React from "react";
import styled from "@emotion/styled";
import colors from "../settings/colors";
import { useLocation, useNavigate } from "react-router";
import Dropdown from "react-bootstrap/Dropdown";
import ThreeDotsButton from "./ThreeDotsButton";
import { useSelector, useDispatch } from "react-redux";
import { setAdmin } from "../store/manage";
import { Link } from "react-router-dom";

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
    width: "100%",
    textAlign: "center",
});

const LinkDiv = styled.div({
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    width: "130px",
    marginRight: "30px",
    "&:hover": {
        color: "#dbe9ff",
    },
});

function AdminHeader() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const admin = useSelector((state) => state.manage.admin);

    const logout = () => {
        dispatch(setAdmin(null));
        localStorage.removeItem("admin");
        navigate("/admin");
    };

    return (
        <HeaderStyled>
            <BrandName>Панель администратора 5A.com</BrandName>
            <RightCornerPanel>
                {location.pathname === "/admin" ? (
                    <Link to="/admin/barcode_edit">
                        <LinkDiv>База штрихкодов</LinkDiv>
                    </Link>
                ) : (
                    <Link to="/admin">
                        <LinkDiv>Список заказов</LinkDiv>
                    </Link>
                )}
                <Dropdown align="end">
                    <Dropdown.Toggle as={ThreeDotsButton} id="dropdown-basic" />
                    <Dropdown.Menu style={{ width: "230px" }}>
                        <Dropdown.Item style={{ fontWeight: 500 }}>{admin.name}</Dropdown.Item>
                        <Dropdown.Item onClick={logout}>{"Выход"}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </RightCornerPanel>
        </HeaderStyled>
    );
}

export default AdminHeader;
