import React, { useEffect, useState, useRef } from "react";
import Axios from "axios";
import Backdrop from "./Backdrop";
function InfinteScroll() {
	const bottomDiv = useRef(null);
	const [data, setData] = useState([{}]);
	const [loading, setLoading] = useState(false);
	const [page, setPage] = useState(1);

	useEffect(() => {
		setLoading(true);
		Axios.get(
			`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=2`
		).then(({ data }) => {
			setLoading(false);
			setData((previousData) => {
				return [...previousData, ...data];
			});
		});
	}, [page]);

	useEffect(() => {
		let observer = new IntersectionObserver(
			(entries, _observer) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setPage((previousPage) => {
							return previousPage + 1;
						});
					}
				});
			},
			{ threshold: 0, rootMargin: "500px" }
		);
		observer.observe(bottomDiv.current);
	}, []);

	return (
		<div>
			<Backdrop open={loading} />
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					width: "100%",
					alignItems: "center",
				}}
			>
				{data.map(({ id, url, title }, index) => {
					return index > 1 ? (
						<img
							key={id * index}
							src={url}
							alt={title}
							width="100%"
							height={window.innerHeight || "100%"}
						/>
					) : null;
				})}
			</div>
			<div ref={bottomDiv}></div>
		</div>
	);
}

export default InfinteScroll;
