import Link from "next/link";
import { Logo } from "./logo";
import { UserDropdown } from "./user-dropdown";

export const Navbar = () => {
	return (
		<div className="flex flex-row justify-between items-center px-10 py-8">
			<Logo />
			<div className="flex flex-row justify-center items-center gap-4 font-semibold text-slate-800">
				<Link href={"/"} className="hover:text-violet-500">
					Home
				</Link>
				<Link href={"/profile"} className="hover:text-violet-500">
					Profile
				</Link>
			</div>
			<UserDropdown />
		</div>
	);
};
