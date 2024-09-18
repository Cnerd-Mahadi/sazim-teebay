export default async function PublicLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return <main className="bg-neutral-50">{children}</main>;
}
