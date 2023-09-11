import { GluestackUIProvider, config } from "@gluestack-ui/themed";
import { StatusBar } from "@gluestack-ui/themed";
import Routes from "./src/routes";
import Providers from "./src/providers";
export default function App() {
  return (
    <GluestackUIProvider config={config.theme}>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"transparent"}
        translucent
      />
      <Providers>
        <Routes />
      </Providers>
    </GluestackUIProvider>
  );
}
