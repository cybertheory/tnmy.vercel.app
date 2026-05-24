import Link from "next/link";
import { RiMenu4Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
const Nav = ({
  setMenuOpen,
  isMenuOpen,
}: {
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <nav className="flex justify-between items-center py-5 sm:py-8 w-full z-20">
      <Link href="/" className="font-medium text-base sm:text-lg">
        humanSystems
      </Link>
      <button
        onClick={() => {
          setMenuOpen((prev) => {
            return !prev;
          });
        }}
        className="h-9 w-9 flex items-center justify-center rounded-md bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 transition"
      >
        {isMenuOpen ? <IoMdClose /> : <RiMenu4Fill />}
      </button>
    </nav>
  );
};
export default Nav;
