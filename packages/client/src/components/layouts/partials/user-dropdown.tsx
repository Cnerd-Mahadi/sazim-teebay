"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { Power, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export const UserDropdown = () => {
	const router = useRouter();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserCircle
					size={30}
					className="text-slate-600 hover:text-violet-500"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => {
							Cookies.remove("token");
							router.push("/signin");
						}}
						className="cursor-pointer">
						<Power size={15} className="mr-2" />
						LogOut
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
