import { createClient } from "@/app/utils/supabase/server";
import Link from "next/link";
import CreateCourseButton from "./CreateCourseButton";
import LogOutButton from "./LogOutButton";
import Hamburger from "./hamburgermenu";

async function Navbar() {
  //const [open, setOpen] = useState(false);
  //const pathname = usePathname();
  const supabase = createClient();

  /*

  useEffect(() => {
    open
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");

    return () => {};
  }, [open]);

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 1024
  );

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }

    if (typeof window !== "undefined") {
      handleResize();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      // remove event listener when the component is unmounted to not cause any memory leaks
      // otherwise the event listener will continue to be active
      window.removeEventListener("resize", handleResize);
    };
    // add `isMobile` state variable as a dependency so that
    // it is called every time the window is resized
  }, [isMobile]);
  */

  // const authModal = useAuthModal();

  const { data, error } = await supabase.auth.getSession();

  return (
    <>
      <nav className="flex justify-between z-[3000] text-black fixed w-screen h-[10vh] ">
        <h1 className="mix-blend-difference text-white justify-self-start self-center z-50 p-6 text-3xl font-bold">
          <Link className="mix-blend-difference " href={"/"}>
            courseapp
          </Link>
        </h1>
        <div className="flex items-center">
          <h1 className="hidden md:flex p-6 text-xl align-baseline text-white font-bold  gap-4">
            <CreateCourseButton session={data} />
          </h1>
          {data.session ? (
            <div className="hidden text-nowrap items-center md:flex p-6 text-xl align-baseline text-white font-bold  gap-4">
              <Link href={"/profile"}>My Profile</Link>

              <LogOutButton />
            </div>
          ) : (
            <div className="hidden items-center md:flex p-6 text-xl align-baseline text-white font-bold  gap-4">
              <Link href={"/login"}>Log in</Link>
              <Link
                className="bg-white py-2 px-4 text-offblack text-lg "
                href={"/login"}
              >
                Sign Up
              </Link>
            </div>
          )}
          <div className="md:hidden fixed left-0 top-0">
            <Hamburger />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
