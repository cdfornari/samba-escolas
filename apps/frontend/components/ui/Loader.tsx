import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const Loader = () => {
  return (
    <div className="z-20 flex justify-center items-center w-full">
      <div className="text-carnival_blue text-4xl fixed">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    </div>
  );
};

export default Loader;
