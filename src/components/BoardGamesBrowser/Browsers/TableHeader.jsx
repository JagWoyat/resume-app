import styles from "./BoardGamesBrowser.module.css";

export default function TableHeader({
	obj,
	orderBy,
	setOrderBy,
	orderTarget,
	setOrderTarget,
}) {
	function getOrderArrow(apiHandle) {
		let char = "";
		if (apiHandle === orderTarget) {
			if (orderBy === "default") {
				char = "\u2191";
			} else if (orderBy === "desc") {
				char = "\u2193";
			}
		}
		return char;
	}

	return (
		<th
			className={!obj.returnsObject && styles.tableHeader}
			onClick={() => {
				if (!obj.returnsObject) {
					if (orderTarget !== obj.apiHandle) {
						setOrderBy("default");
					} else {
						setOrderBy((prevValue) => {
							if (prevValue === "none") {
								return "default";
							} else if (prevValue === "default") {
								return "desc";
							} else if (prevValue === "desc") {
								return "none";
							}
						});
					}
					setOrderTarget(obj.apiHandle);
				}
			}}
		>
			{obj.name}{" "}
			<span style={{ fontSize: "1.5rem" }}>{getOrderArrow(obj.apiHandle)}</span>
		</th>
	);
}
