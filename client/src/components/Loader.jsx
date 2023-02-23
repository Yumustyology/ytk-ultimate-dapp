import React from "react";
import { Watch,ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <button
    type="button"
    onClick={()=>alert('transaction pending, please wait...')}
    className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer flex items-center justify-center"
  >
      <ThreeDots
        height="30"
        width="25"
        radius="25"
        color="#ddd"
        ariaLabel="watch-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </button>
  );
};

export default Loader;


