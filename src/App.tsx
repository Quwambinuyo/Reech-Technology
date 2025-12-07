import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import BaseRoutes from "./layout/BaseRoutes";
import { store } from "./redux/store";
import { BrowserRouter } from "react-router-dom";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	BarElement,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	ArcElement,
	BarElement
);

function App() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<BaseRoutes />
			</BrowserRouter>
			<ToastContainer limit={2} autoClose={3000} />
		</Provider>
	);
}

export default App;
