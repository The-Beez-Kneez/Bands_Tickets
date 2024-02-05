import React from "react";

function PaymentForm({ formData, onInputChange, onPurchase }) {
  const handlePurchase = () => {
    if (onPurchase) {
      onPurchase();
    }
  };

  return (
    <div>
      <form>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={onInputChange}
          />
        </label>
        <br />
        <label>
          Credit Card:
          <input
            type="text"
            name="creditCard"
            value={formData.creditCard}
            onChange={onInputChange}
          />
        </label>
        <br />
        <label>
          Expiration Date:
          <input
            type="text"
            name="expirationDate"
            value={formData.expirationDate}
            onChange={onInputChange}
          />
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={onInputChange}
          />
        </label>
      </form>
      <button onClick={handlePurchase}>Purchase Tickets</button>
    </div>
  );
}

export default PaymentForm;
