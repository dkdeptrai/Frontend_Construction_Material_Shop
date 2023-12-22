import "./AddSaleOrderPage.css";

//pages and components
import InputComponent from "../../../InputComponent/InputComponent";
import BackButton from "../../../layouts/backButton/backButton";
import NewButton from "../../../layouts/newButton/newButton";
import DeleteButton from "../../../layouts/deleteButton/deleteButton";
import Table from "../../../core/table/table";
import InlineInputComponent from "../../../InlineInputComponent/InlineInputComponent";

function AddSaleOrderPage() {
  const options = ["productName", "productAmount", "productTotal"];

  const fetchProducts = async () => {
    console.log("fetching products");
  };

  const productRows = [
    {
      id: 1,
      productName: "brick",
      amount: 10,
      total: 0,
    },
    {
      id: 2,
      productName: "brick",
      amount: 5,
      total: 0,
    },
    {
      id: 3,
      productName: "brick",
      amount: 8,
      total: 0,
    },
  ];

  const productColumns = [
    { field: "index", headerName: "No.", width: 50 },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 0.7,
      renderCell: (params) => (
        <div className="productNameCell">
          <img className="productImage" src={params.row.image} />
          <span>{params.value}</span>
        </div>
      ),
    },
    { field: "productAmount", headerName: "Amount", flex: 0.4 },
    {
      field: "productTotal",
      headerName: "Total",
      flex: 0.4,
    },
  ];

  return (
    <div className="adding-page">
      <BackButton content="Add Order" />
      <div className="customer-info">
        <InputComponent
          label="Customer's phone number"
          type="text"
        ></InputComponent>
        <InputComponent label="Customer's name" type="text"></InputComponent>
      </div>
      <NewButton text="Add Customer" className="add-customer-button" />
      <div className="tool-bar">
        <label>List of products</label>
        <div className="button-container">
          <DeleteButton onClick={() => {}} />
          <NewButton text="New Product" onClick={() => fetchProducts()} />
        </div>
      </div>
      <Table className="table" columns={productColumns} rows={productRows} />
      <div className="price-calculation-input-container">
        <div className="left-inputs">
          <InlineInputComponent
            label="Discount:"
            type="number"
            min="0"
            max="100"
          />
          <InlineInputComponent label="Old debt:" type="number" />
          <InlineInputComponent label="Deposit:" type="number" />
        </div>
        <div className="right-inputs">
          <InlineInputComponent label="Total:" type="number" />
          <InlineInputComponent label="Debt:" type="number" />
        </div>
      </div>
      <div className="payment-button-container">
        <button style={{backgroundColor: "green", color: "white"}}>Deposit</button>
        <button style={{backgroundColor: "red", color: "white"}}>Debt</button>
      </div>
    </div>
  );
}

export default AddSaleOrderPage;
