import { Provider } from "react-redux";
import { store } from "./store/UserStore";
import ReduxPageContent from "./ReduxPageContent";

const ReduxPage = () => {
  return (
    <Provider store={store}>
      <ReduxPageContent />
    </Provider>
  );
};

export default ReduxPage;