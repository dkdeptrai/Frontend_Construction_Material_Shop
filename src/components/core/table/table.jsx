import { DataGrid } from "@mui/x-data-grid";
import "./table.css";

function Table(props) {
  const columns = props.columns;
  const rows = props.rows;

  return (
    <div>
      <DataGrid
        className="table"
        rows={rows}
        columns={columns}
        checkboxSelection
        onRowSelectionModelChange={(ids) => {
          console.log(ids);
        }}
      />
    </div>
  );
}

export default Table;
