import { LocalizationProvider } from "@mui/x-date-pickers";
import { Settings } from "luxon";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { QueryParamProvider } from "use-query-params";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ReactRouter6Adapter } from "use-query-params/adapters/react-router-6";
import { parse, stringify } from "query-string";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
Settings.defaultZone = "utc";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
const queryClient = new QueryClient();

// TODO reactivate <StrictMode> When beautiful dnd will permit it
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <QueryParamProvider
        adapter={ReactRouter6Adapter}
        options={{
          searchStringToObject: parse,
          objectToSearchString: stringify,
        }}
      >
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <App />
        </LocalizationProvider>
      </QueryParamProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
// serviceWorker.register({
//   onUpdate: (registration) => {
//     alert("New version available!  Ready to update?");
//     if (registration && registration.waiting) {
//       registration.waiting.postMessage({ type: "SKIP_WAITING" });
//     }
//     window.location.reload();
//   },
// });
