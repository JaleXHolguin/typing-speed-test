import "@fontsource-variable/sora";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import Header from "./components/Header.tsx";
import History from "./components/History.tsx";
import Main from "./components/Main.tsx";
import NotFound from "./components/NotFound.tsx";
import Shared from "./components/Shared.tsx";

const container = document.getElementById("root");
if (!container) throw new Error("Root element not found");

createRoot(container).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<>
							<Header />
							<Outlet />
						</>
					}
				>
					<Route index element={<Main />} />
					<Route path="s/:data" element={<Shared />} />
					<Route path="history" element={<History />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</BrowserRouter>
	</StrictMode>,
);
