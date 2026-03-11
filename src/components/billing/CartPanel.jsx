import React from "react";
import {
    FaPlus,
    FaMinus,
    FaTrash,
    FaMoneyBillWave,
    FaGooglePay,
    FaCheckCircle
} from "react-icons/fa";

import "../../styles/billing/cart-panel.css";

function CartPanel({
    cart,
    setCart,
    paymentType,
    setPaymentType,
    onCheckout
}) {

    const increaseQty = (index) => {
        const newCart = [...cart];
        newCart[index].quantity++;
        setCart(newCart);
    };

    const decreaseQty = (index) => {
        const newCart = [...cart];
        if (newCart[index].quantity > 1) {
            newCart[index].quantity--;
        }
        setCart(newCart);
    };

    const removeItem = (index) => {
        const newCart = cart.filter((_, i) => i !== index);
        setCart(newCart);
    };

    const calculateTotal = () => {
        return cart.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    return (
        <div className="cart-panel">

            <div className="cart-header">
                <strong>Cart ({cart.length})</strong>
            </div>

            <div className="cart-items">

                {cart.length === 0 && (
                    <div className="cart-empty">
                        No items added
                    </div>
                )}

                {cart.map((item, index) => (
                    <div key={item.id} className="cart-item">

                        <div className="cart-item-row">
                            <span className="cart-item-name">
                                {item.name}
                            </span>
                            <span className="cart-item-price">
                                ₹{item.price * item.quantity}
                            </span>
                        </div>

                        <div className="cart-controls">

                            <button
                                className="cart-btn"
                                onClick={() => decreaseQty(index)}
                            >
                                <FaMinus size={8} />
                            </button>

                            <span className="cart-qty">
                                {item.quantity}
                            </span>

                            <button
                                className="cart-btn"
                                onClick={() => increaseQty(index)}
                            >
                                <FaPlus size={8} />
                            </button>

                            <button
                                className="cart-delete"
                                onClick={() => removeItem(index)}
                            >
                                <FaTrash size={8} />
                            </button>

                        </div>

                    </div>
                ))}

            </div>

            <div className="cart-total">
                <strong>Total</strong>
                <strong className="cart-total-value">
                    ₹{calculateTotal()}
                </strong>
            </div>

            <div className="payment-buttons">

                <button
                    className={`payment-btn ${paymentType === "CASH" ? "active" : ""}`}
                    onClick={() => setPaymentType("CASH")}
                >
                    <FaMoneyBillWave size={12} />
                    CASH
                    {paymentType === "CASH" && <FaCheckCircle size={10} />}
                </button>

                <button
                    className={`payment-btn ${paymentType === "UPI" ? "active" : ""}`}
                    onClick={() => setPaymentType("UPI")}
                >
                    <FaGooglePay size={12} />
                    UPI
                    {paymentType === "UPI" && <FaCheckCircle size={10} />}
                </button>

                <button
                    className={`payment-btn ${paymentType === "SPLIT" ? "active" : ""}`}
                    onClick={() => setPaymentType("SPLIT")}
                >
                    <FaMoneyBillWave size={12} />
                    CASH + UPI
                    {paymentType === "SPLIT" && <FaCheckCircle size={10} />}
                </button>

            </div>

            <button
                className="checkout-btn"
                onClick={onCheckout}
                disabled={cart.length === 0}
            >
                COMPLETE BILL
            </button>

        </div>
    );
}

export default CartPanel;