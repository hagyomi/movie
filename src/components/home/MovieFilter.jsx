import { FaSearch } from "react-icons/fa";
import { twMerge } from "tailwind-merge";
import Input from "../ui/Input";

const MovieFilter = ({ query, setQuery, color }) => {
  return (
    <p className="inline-block">
      <Input
        placeholder="SEARCH MOVIES"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-[30vw] min-w-50 px-8 text-base rounded-full placeholder:text-white"
      />
      <FaSearch className={twMerge("absolute text-lg  right-6 top-4", color)} />
    </p>
  );
};

export default MovieFilter;
