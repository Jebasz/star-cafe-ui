import Header from "../layout/Header";
import { useRef, useState, useEffect } from "react";

import CategoryPanel from "../components/billing/CategoryPanel";
import FilterPanel from "../components/billing/FilterPanel";
import ProductPanel from "../components/billing/ProductPanel";
import CartPanel from "../components/billing/CartPanel";

import CustomModal from "../components/common/CustomModal";
import BillPrint from "../components/print/BillPrint";

import { createBill } from "../services/billService";
import { getShop } from "../services/shopService";

import "../styles/billing/BillingPage.css";

function BillingPage() {

const printRef = useRef();

const [selectedCategory, setSelectedCategory] = useState(null);
const [selectedPrice, setSelectedPrice] = useState(null);
const [selectedSubProduct, setSelectedSubProduct] = useState(null);
const [resetSignal, setResetSignal] = useState(0);

const [filterType, setFilterType] = useState(null);

const [cart, setCart] = useState([]);
const [paymentType, setPaymentType] = useState(null);
const [loading, setLoading] = useState(false);

const [configLoaded, setConfigLoaded] = useState(false);

const [showSplitPopup, setShowSplitPopup] = useState(false);
const [cashAmount, setCashAmount] = useState("");

const [modal, setModal] = useState({
    show: false,
    type: "",
    title: "",
    message: ""
});

const [billData, setBillData] = useState(null);
const [printCart, setPrintCart] = useState([]);
const [pendingBillPayload, setPendingBillPayload] = useState(null);

useEffect(() => {
    loadShopConfig();
}, []);

const loadShopConfig = async () => {

    try {

        const response = await getShop(1);

        const type =
            response.data?.filterType
                ?.toUpperCase()
                ?.trim();

        setFilterType(type || "PRICE");

    } catch (error) {

        console.error("Shop config load failed", error);
        setFilterType("PRICE");

    } finally {

        setConfigLoaded(true);

    }

};

const handleCategorySelect = (category) => {

    setSelectedCategory(category);

    setSelectedPrice(null);
    setSelectedSubProduct(null);

    setResetSignal(prev => prev + 1);

};

const handlePriceSelect = (price) => {

    setSelectedPrice(price);
    setSelectedSubProduct(null);

};

const addToCart = (product) => {

    setCart(prevCart => {

        const existing = prevCart.find(
            item => item.id === product.id
        );

        if (existing) {
            return prevCart.map(item =>
                item.id === product.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
            );
        }

        return [
            ...prevCart,
            {
                ...product,
                quantity: 1
            }
        ];

    });

};

const calculateTotal = () => {
    return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );
};

const checkout = () => {

    if (loading) return;

    if (cart.length === 0) {
        setModal({
            show: true,
            type: "warning",
            title: "Cart Empty",
            message: "Please add items before billing."
        });
        return;
    }

    if (!paymentType) {
        setModal({
            show: true,
            type: "warning",
            title: "Payment Required",
            message: "Please select payment type."
        });
        return;
    }

    if (paymentType === "SPLIT") {
        setShowSplitPopup(true);
        return;
    }

    const billPayload = {
        shopId: 1,
        paymentType: paymentType,
        items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }))
    };

    setPendingBillPayload(billPayload);

    setModal({
        show: true,
        type: "success",
        title: "Ready to Print",
        message: `Total: ₹${calculateTotal()}`
    });

};

const confirmSplitPayment = () => {

    const total = calculateTotal();
    const cash = Number(cashAmount);

    if (!cash || cash <= 0 || cash > total) {

        setModal({
            show: true,
            type: "warning",
            title: "Invalid Cash Amount",
            message: "Cash must be greater than 0 and less than total."
        });

        return;

    }

    const billPayload = {
        shopId: 1,
        paymentType: "SPLIT",
        cashAmount: cash,
        upiAmount: total - cash,
        items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
        }))
    };

    setPendingBillPayload(billPayload);

    setShowSplitPopup(false);
    setCashAmount("");

    setModal({
        show: true,
        type: "success",
        title: "Ready to Print",
        message: `Total: ₹${total}`
    });

};

const handlePrint = async () => {

    if (!pendingBillPayload || loading) return;

    try {

        setLoading(true);

        const response = await createBill(pendingBillPayload);
        const bill = response.data;

        setBillData(bill);
        setPrintCart(cart);

        setTimeout(() => {

            const printContents = printRef.current.innerHTML;

            const printWindow = window.open("", "", "width=400,height=600");

            printWindow.document.write(`
                <html>
                <head>
                    <title>Print Bill</title>
                </head>
                <body>
                    ${printContents}
                </body>
                </html>
            `);

            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();

            setCart([]);
            setPaymentType(null);
            setSelectedCategory(null);
            setSelectedPrice(null);
            setSelectedSubProduct(null);
            setPendingBillPayload(null);

            setResetSignal(prev => prev + 1);

            setModal({ ...modal, show: false });

            setLoading(false);

        }, 200);

    } catch (error) {

        setLoading(false);

        setModal({
            show: true,
            type: "error",
            title: "Billing Failed",
            message: "Something went wrong. Please try again."
        });

    }

};

return (

    <div className="billing-page">

        <Header />

        <div className="container-fluid p-4">

            <div className="row g-4 billing-row">

                <div className="col-2 billing-panel">
                    <CategoryPanel
                        onCategorySelect={handleCategorySelect}
                        resetSignal={resetSignal}
                    />
                </div>

                <div className="col-7 billing-panel">

                    {configLoaded &&
                     selectedCategory?.id !== "search" &&
                     selectedCategory?.id !== "favourites" && (

                        <div className="mb-4">

                            <FilterPanel
                                filterType={filterType}
                                shopId={1}
                                category={selectedCategory}

                                selectedPrice={selectedPrice}
                                onPriceSelect={handlePriceSelect}

                                selectedSubProduct={selectedSubProduct}
                                onSubProductSelect={setSelectedSubProduct}

                                resetSignal={resetSignal}
                            />

                        </div>
                    )}

                    <div className="product-scroll">

                        <ProductPanel
                            shopId={1}
                            category={selectedCategory}
                            price={selectedPrice}
                            subProduct={selectedSubProduct}
                            filterType={filterType}
                            onProductSelect={addToCart}
                            resetSignal={resetSignal}
                        />

                    </div>

                </div>

                <div className="col-3 billing-panel">

                    <CartPanel
                        cart={cart}
                        setCart={setCart}
                        paymentType={paymentType}
                        setPaymentType={setPaymentType}
                        onCheckout={checkout}
                        loading={loading}
                    />

                </div>

            </div>

        </div>

        {showSplitPopup && (
            <CustomModal
                show={true}
                type="info"
                title="Split Payment"
                message={
                    <div>
                        <p>Total: ₹{calculateTotal()}</p>

                        <input
                            type="number"
                            placeholder="Enter Cash Amount"
                            value={cashAmount}
                            onChange={(e) => setCashAmount(e.target.value)}
                        />

                        <p>
                            UPI: ₹{calculateTotal() - (Number(cashAmount) || 0)}
                        </p>

                        <button onClick={confirmSplitPayment}>
                            Confirm Payment
                        </button>

                    </div>
                }
                onClose={() => setShowSplitPopup(false)}
            />
        )}

        <CustomModal
            show={modal.show}
            type={modal.type}
            title={modal.title}
            message={modal.message}
            loading={loading}
            onClose={() =>
                setModal({ ...modal, show: false })
            }
            onPrint={modal.type === "success" ? handlePrint : null}
        />

        <div style={{ display: "none" }}>
            <BillPrint
                ref={printRef}
                bill={billData}
                cart={printCart}
            />
        </div>

    </div>

);

}

export default BillingPage;