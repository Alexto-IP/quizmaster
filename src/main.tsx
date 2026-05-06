import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";
import { initYandexMetrika } from "./app/utils/yandexMetrika";

initYandexMetrika();

createRoot(document.getElementById("root")!).render(<App />);