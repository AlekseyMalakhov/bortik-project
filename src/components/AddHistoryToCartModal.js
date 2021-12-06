import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function AddHistoryToCartModal({ onHide, show, notFound, ...otherProps }) {
    const getText = () => {
        if (notFound.length === 0) {
            return <p style={{ textAlign: "center", fontWeight: "500" }}>Товары добавлены в корзину!</p>;
        } else {
            return (
                <div>
                    <p style={{ fontWeight: "500" }}>Следующие товары не были добавлены в корзину, т.к. данные артикулы отсутствуют в продаже:</p>
                    {notFound.map((item, index) => (
                        <p key={item.id}>
                            {index + 1}) {item.title}
                        </p>
                    ))}
                </div>
            );
        }
    };

    return (
        <React.Fragment>
            <Modal show={show} {...otherProps} size="sm" centered>
                <Modal.Body>{getText()}</Modal.Body>
                <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
                    <Button onClick={() => onHide()}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

export default AddHistoryToCartModal;
