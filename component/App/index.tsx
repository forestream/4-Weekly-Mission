import "./App.css";
import Navigation from "../NavBar";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

function App() {
	return (
		<>
			<div className="App">
				<Navigation />
				<Outlet />
				<Footer />
			</div>
		</>
	);
}

export default App;
