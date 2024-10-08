import { KEY_TYPE, selects } from "@/contexts/user-sidebar-context";
import { trpcClient } from "@/trpc";

export const UserChoiceHooks = ({ choice }: { choice: KEY_TYPE }) => {
	if (choice === selects[0].key) {
		const { data, isLoading } = trpcClient.user.productsUser.useQuery();
		return { data, isLoading };
	} else if (choice === selects[1].key) {
		const { data, isLoading } = trpcClient.user.productsBought.useQuery();
		return { data, isLoading };
	} else if (choice === selects[2].key) {
		const { data, isLoading } = trpcClient.user.productsSold.useQuery();
		return { data, isLoading };
	} else if (choice === selects[3].key) {
		const { data, isLoading } = trpcClient.user.productsRented.useQuery();
		return { data, isLoading };
	} else if (choice === selects[4].key) {
		const { data, isLoading } = trpcClient.user.productsLent.useQuery();
		return { data, isLoading };
	}
};
