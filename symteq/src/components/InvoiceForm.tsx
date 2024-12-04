import React, { useState } from "react";

interface Item {
  name: string;
  quantity: number;
  amount: number;
}

interface InvoiceFormData {
  invoiceNumber: string;
  client: string;
  items: Item[];
  dueDate: string;
}

const InvoiceForm = () => {
  const [formData, setFormData] = useState<InvoiceFormData>({
    invoiceNumber: "",
    client: "",
    items: [],
    dueDate: "",
  });

  const [submittedData, setSubmittedData] = useState<InvoiceFormData | null>(null);

  const getTotal = () =>
    formData.items.reduce((total, item) => total + item.quantity * item.amount, 0);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string | number
  ) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 0, amount: 0 }],
    }));
  };

  const removeItem = (index: number) => {
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, items: updatedItems }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedData({ ...formData });
  };

  const handleEdit = () => {
    setFormData({ ...submittedData! }); 
    setSubmittedData(null);
  };

  const handleRemove = () => {
    setSubmittedData(null); 
  };

  return (
    <div>
     {/* FORMS HEADER */}
      <form onSubmit={handleSubmit} className="invoice-form">
        <div>
          <label>Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            value={formData.invoiceNumber}
            onChange={handleFormChange}
            required
            disabled={submittedData !== null} 
          />
        </div>
        <div>
          <label>Client</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleFormChange}
            required
            disabled={submittedData !== null} 
          />
        </div>

      {/* MAP ITEMS  */}
        <div>
          <h3>Items</h3>
          {formData.items.map((item, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Item Name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, "name", e.target.value)
                }
                required
                disabled={submittedData !== null} 
              />
              <input
                type="number"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
                min="1"
                required
                disabled={submittedData !== null} 
              />
              <input
                type="number"
                placeholder="Amount"
                value={item.amount}
                onChange={(e) =>
                  handleItemChange(index, "amount", Number(e.target.value))
                }
                min="0"
                required
                disabled={submittedData !== null} 
              />
              <button type="button" onClick={() => removeItem(index)}>
                Remove Item
              </button>
            </div>
          ))}
          <button type="button" onClick={addItem} disabled={submittedData !== null}>
            Add Item
          </button>
        </div>

     
        <div>
          <label>Total Amount</label>
          <input type="number" value={getTotal()} readOnly />
        </div>

      
        <div>
          <label>Due Date</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleFormChange}
            required
            disabled={submittedData !== null} 
          />
        </div>
        <button type="submit" disabled={submittedData !== null}>
          Submit Invoice
        </button>
      </form>

      {/* SHOWING SUBMITTEDDATA */}
      {submittedData && (
        <div className="centered-text">
          <h3>Invoice Submitted</h3>
          <div className="submited-data">
            <p>
              <strong>Invoice Number:</strong> {submittedData.invoiceNumber}
            </p>
            <p>
              <strong>Client:</strong> {submittedData.client}
            </p>
            <p>
              <strong>Due Date:</strong> {submittedData.dueDate}
            </p>
            <h4>Items:</h4>
            <ul>
              {submittedData.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x ${item.amount} = ${" "}
                  {item.quantity * item.amount}
                </li>
              ))}
            </ul>
            <p>
              <strong>Total Amount:</strong> ${getTotal()}
            </p>
          </div>

        {/* BTN SECTION EDIT or Remove Invoice */}
          <div className="styled-btns">
            <button type="button" onClick={handleEdit}>
              Edit Invoice
            </button>
            <button type="button" onClick={handleRemove}>
              Remove Invoice
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
