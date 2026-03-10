import { Provider } from "react-redux";
import { store } from "../../ReduxStore/UserStore.tsx";
import ReduxPageContent from "./ReduxPageContent.tsx";

const ReduxPage = () => {
  return (
    <Provider store={store}>
      <ReduxPageContent />
    </Provider>
  );
};

export default ReduxPage;