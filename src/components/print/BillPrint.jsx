import React from "react";

const BillPrint = React.forwardRef(({ bill, cart }, ref) => {

  if (!bill) return null;

  const formatDate = () => {
    return new Date().toLocaleString();
  };

  return (

    <div
      ref={ref}
      style={{
        width: "300px",
        padding: "10px",
        fontFamily: "monospace",
        fontSize: "12px",
        color: "#000",
        background: "#fff"
      }}
    >

      {/* HEADER */}

      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>
          STAR Tea Park
        </div>

        <div style={{ fontSize: "10px" }}>
          Premium Coffee & Snacks
        </div>
      </div>

      <div style={{ borderTop: "1px dashed #000", margin: "8px 0" }} />

      {/* BILL INFO */}

      <div style={{ fontSize: "11px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Bill No</span>
          <span>{bill.billNumber}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Date</span>
          <span>{formatDate()}</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>Payment</span>
          <span>{bill.paymentType}</span>
        </div>
      </div>

      <div style={{ borderTop: "1px dashed #000", margin: "8px 0" }} />

      {/* TABLE HEADER */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 40px 60px 60px",
          fontWeight: "bold",
          fontSize: "11px"
        }}
      >
        <div>Item</div>
        <div style={{ textAlign: "center" }}>Qty</div>
        <div style={{ textAlign: "right" }}>Price</div>
        <div style={{ textAlign: "right" }}>Total</div>
      </div>

      <div style={{ borderTop: "1px dashed #000", margin: "6px 0" }} />

      {/* ITEMS */}

      {cart.map((item, index) => (

        <div
          key={index}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 40px 60px 60px",
            fontSize: "11px",
            marginBottom: "4px"
          }}
        >

          <div style={{ wordBreak: "break-word" }}>
            {item.name}
          </div>

          <div style={{ textAlign: "center" }}>
            {item.quantity}
          </div>

          <div style={{ textAlign: "right" }}>
            ₹{item.price}
          </div>

          <div style={{ textAlign: "right" }}>
            ₹{item.price * item.quantity}
          </div>

        </div>

      ))}

      <div style={{ borderTop: "1px dashed #000", margin: "8px 0" }} />

      {/* TOTAL */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: "bold",
          fontSize: "13px"
        }}
      >
        <span>Total</span>
        <span>₹{bill.totalAmount}</span>
      </div>

      <div style={{ borderTop: "1px dashed #000", margin: "8px 0" }} />

      {/* FOOTER */}

      <div
        style={{
          textAlign: "center",
          fontSize: "11px"
        }}
      >
        Thank You ❤️ Visit Again
      </div>

    </div>

  );

});

export default BillPrint;