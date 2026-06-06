import { Link } from "react-router-dom";

const Unauthorized = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center px-4">
			<h1 className="text-6xl mb-4">🚫</h1>
			<h2 className="text-3xl font-bold text-gray-800 mb-2">
				Oops! Access Denied
			</h2>
			<p className="text-gray-600 mb-6 max-w-md">
				Looks like you don’t have permission to view this page.
				<br />
				Don’t worry, you can always head back to your dashboard.
			</p>

			<Link
				to="/dashboard"
				className="px-6 py-3 bg-primary-purple text-white rounded-lg transition"
			>
				Go to Dashboard
			</Link>
		</div>
	);
};

export default Unauthorized;
