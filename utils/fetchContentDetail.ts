const getContentDetail = async (id: string) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/content/${id}`
	);

	const data = res.json();
	return data;
};

export default getContentDetail;
