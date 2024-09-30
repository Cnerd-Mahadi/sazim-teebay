"use client";
import {
	KEY_TYPE,
	selects,
	useUserSidebar,
} from "@/contexts/user-sidebar-context";
import { Select } from "antd";

const options = selects.map((item) => ({
	label: item.label,
	value: item.key,
}));

export function UserSideBar() {
	const { choice, setChoice } = useUserSidebar();
	const handleChange = (key: KEY_TYPE) => {
		setChoice(key);
	};
	return <Select value={choice} options={options} onChange={handleChange} />;
}
