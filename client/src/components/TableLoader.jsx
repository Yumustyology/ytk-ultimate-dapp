import React from 'react'
import { Oval } from "react-loader-spinner"

function TableLoader() {
  
        return(
          <Oval
          height="50"
          width="50"
          radius="50"
          color="#ddd"
          ariaLabel="watch-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
          secondaryColor="#191c2f"
        />
        )
}

export default TableLoader