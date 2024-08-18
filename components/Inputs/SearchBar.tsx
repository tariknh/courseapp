import { Button } from "../ui/button";
import { Input } from "../ui/input";

type Props = {};
type SearchVariants = {
  variant: string;
};

const SearchInput = ({ variant }: SearchVariants) => {
  return variant === "Category" ? (
    <div className="">
      <h2 className="text-sm text-offblack">I wanna learn:</h2>
      <Input className="text-xs border-none" placeholder="Enter a category" />
    </div>
  ) : (
    <div className="">
      <h2 className="text-sm text-offblack">In the city of:</h2>
      <Input className="text-xs border-none" placeholder="Enter a City" />
    </div>
  );
};

const SearchBar = (props: Props) => {
  return (
    <div className="bg-white max-w-2xl text-black flex gap-2 flex-col sm:flex-row sm:items-center p-5">
      <SearchInput variant="Category" />
      <SearchInput variant="City" />
      <Button className="w-1/4 sm:mx-auto justify-self-center">Search</Button>
    </div>
  );
};

export default SearchBar;
