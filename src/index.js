import React from "react";
import ReactDOM from "react-dom";
import InfinteScroll from "./Components/InfinteScroll";
import "./style.css";
function Index() {
	return (
		<>
			<InfinteScroll />
		</>
	);
}

ReactDOM.render(<Index />, document.querySelector("#root"));
