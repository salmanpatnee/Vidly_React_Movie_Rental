import React, { useState, useEffect } from "react";
import CustomerService from "../../services/CustomerService";
import CustomersTable from "./CustomersTable";

const Customers = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    async function getCustomers() {
      const response = await CustomerService.getCustomers();
      setCustomers(response.data);
    }

    getCustomers();

  }, [])


  return ( 
    <>
      <h1 className="mb-5">Customers</h1>
      <CustomersTable
        customers={customers}
      />
    </>
   );
}
 
export default Customers;
