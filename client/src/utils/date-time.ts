import dayjs, { Dayjs } from "dayjs";

export const convertDateToString = (date: Dayjs) => {
	return date.format("YYYY-MM-DD");
};

export const convertStringToDate = (date: string) => {
	return dayjs(date);
};
