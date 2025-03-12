// ---------------DefConfig--------------------------------
// import { defineConfig } from "@lynx-js/rspeedy";

// import { pluginQRCode } from "@lynx-js/qrcode-rsbuild-plugin";
// import { pluginReactLynx } from "@lynx-js/react-rsbuild-plugin";

// export default defineConfig({
// 	plugins: [
// 		pluginQRCode({
// 			schema(url) {
// 				// We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
// 				return `${url}?fullscreen=true`;
// 			},
// 		}),
// 		pluginReactLynx(),
// 	],
// });

// ---------------NewConfig--------------------------------

// lynx.config.ts
import { defineConfig } from "@lynx-js/rspeedy";
import { pluginQRCode } from "@lynx-js/qrcode-rsbuild-plugin";
import { pluginReactLynx } from "@lynx-js/react-rsbuild-plugin";
import os from "os";

function getLocalIP() {
	const interfaces = os.networkInterfaces();
	for (const name of Object.keys(interfaces)) {
		for (const iface of interfaces[name]) {
			if (iface.family === "IPv4" && !iface.internal) {
				return iface.address;
			}
		}
	}
	return "localhost";
}

const localIP = getLocalIP();

export default defineConfig({
	plugins: [
		pluginQRCode({
			schema(url) {
				return `http://${localIP}:3001/main.lynx.bundle?fullscreen=true`;
			},
		}),
		pluginReactLynx(),
	],
	server: {
		host: "0.0.0.0", // Слушаем все интерфейсы
		port: 3001, // Фиксируем порт
	},
	output: {
		filename: "[name].lynx.bundle",
	},
});

