import React, { useContext } from "react";

import { TransactionContext } from "../context/TransactionContext";
import dummyData from "../utils/dummyData";
import { shortenAddress } from "../utils/shortenAddress";
import DataTable from "react-data-table-component";
import Loader from "./Loader";
import TableLoader from "./TableLoader";
import { customStyles } from "../utils/TableStyles";

const TransactionsCard = ({ transactions }) => {
  const [pending, setPending] = React.useState(true);

  const ExpandedComponent = ({ data }) => (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );

  const columns = [
    {
      name: "S/N",
      selector: (row) => row.sn,
      sortable: true,
      grow: 0.01,
    },
    {
      name: "From",
      selector: (row) => row.from,
      sortable: true,
    },
    {
      name: "To",
      selector: (row) => row.to,
      sortable: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      grow: 2,
    },
    {
      name: "Hash",
      selector: (row) => row.hash,
      sortable: true,
    },
    {
      name: "EtherScan URL",
      selector: (row) => row.etherScanUrl,
      sortable: true,
    },
  ];

  const data = [
    // ...dummyData.map((transaction, i) => ({
    ...transactions.map((transaction, i) => ({
      id: i,
      sn: i + 1,
      from: shortenAddress(transaction.addressFrom),
      to: shortenAddress(transaction.addressTo),
      message: transaction.message,
      date: transaction.timestamp,
      hash: shortenAddress(transaction.hash),
      etherScanUrl: (
        <a
          href={`https://goerli.etherscan.io/tx/${transaction.hash}`}
          className="bg-[#2952e3] p-2 py-10 h-10 rounded-full cursor-pointer hover:bg-[#2546bd]"
          target="_blank"
        >
          view on etherscan
        </a>
      ),
    })),
  ];

  console.log(data && data.length < 11 ? true : false);

  const paginationComponentOptions = {
    noRowsPerPage: data && data.length < 11 ? true : false,
  };


  React.useEffect(() => {
    		const timeout = setTimeout(() => {
    			// setRows(data);
    			setPending(false);
    		}, 2000);
    		return () => clearTimeout(timeout);
    	}, []);

  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={pending}
      progressComponent={<TableLoader />}
      pagination
      rowsPerPage={5}
      // striped={true}
      paginationComponentOptions={paginationComponentOptions}
      customStyles={customStyles}
    />
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4 w-[inherit] mb-12 mt-10">

      <div className="flex-1 flex flex-col justify-center items-center">
          <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient mb-3">
           Latest Transactions
          </h1>
        </div>

        {currentAccount ? (
          <>
            <div className="flex flex-wrap justify-center items-center mt-10">
              <div
                className="bg-[#181918] m-4 flex flex-1 flex-col
                w-full
                
      min-w-full
      p-3 rounded-md hover:shadow-2xl"
              >
                <div className="">
                  {/* {[...transactions].reverse().map((transaction, i) => ( */}
                  <TransactionsCard
                    // key={i}
                    //  {...transaction}
                    transactions={transactions}
                    // i={i}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">
            Connect your account to see the latest transactions
          </h3>
        )}
      </div>
    </div>
  );
};

export default Transactions;
