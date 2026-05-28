function BillingForm({
  billNo,
  setBillNo,
  customer,
  setCustomer,
  discountPercent,
  setDiscountPercent,
}) {
  return (
    <>
      <input
        placeholder="Bill No"
        value={billNo}
        onChange={(e) =>
          setBillNo(e.target.value)
        }
      />

      <input
        placeholder="Customer Name"
        value={customer}
        onChange={(e) =>
          setCustomer(e.target.value)
        }
      />

      <input
        type="number"
        placeholder="Discount %"
        value={discountPercent}
        onChange={(e) =>
          setDiscountPercent(
            Number(e.target.value)
          )
        }
      />
    </>
  );
}

export default BillingForm;