import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Home/Home";
import { MultiPlayerWrapper } from "./MultiPlayer/MultiPlayerWrapper";
import { SinglePlayerWrapper } from "./SinglePlayer/SinglePlayerWrapper";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single-player" element={<SinglePlayerWrapper />} />
        <Route path="/multi-player" element={<MultiPlayerWrapper />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
