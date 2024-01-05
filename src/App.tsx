import { Global } from "@emotion/react";
import reset from "./style/reset";

function App() {
  return (
    <div>
      <Global styles={reset} />
    </div>
  );
}

export default App;
