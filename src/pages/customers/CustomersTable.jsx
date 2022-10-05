import React from "react";
import Table from "../../components/common/Table";


const CustomersTable = ({customers, sortColumn}) => {

  const columns = [
    { column: "name", label: "Name"},
    { column: "email", label: "Email" },
    { column: "signup_at_formatted", label: "Sign Up Date" },
  ];

  return ( 

    <Table
        columns={columns}
        data={customers}
        sortColumn={sortColumn}
      />
   );
}
 
export default CustomersTable;
