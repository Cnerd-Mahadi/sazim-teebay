"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Power, UserCircle } from "lucide-react";
import { useCookies } from "next-client-cookies";
import { useRouter } from "next/navigation";

export const UserDropdown = () => {
	const cookies = useCookies();
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
							cookies.remove("token");
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
