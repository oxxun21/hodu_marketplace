import { Global } from "@emotion/react";
import reset from "./style/reset";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Main } from "./page/Main";
import { SignIn } from "./page/SignIn";
import { SignUp } from "./page/SignUp";

function App() {
  return (
    <BrowserRouter>
      <Global styles={reset} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
