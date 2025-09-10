import { Provider } from "react-redux";

import BaseRoutes from "./layout/BaseRoutes";
import { store } from "./redux/store";

function App() {
	return (
		<Provider store={store}>
			<BaseRoutes />;
		</Provider>
	);
}

export default App;
