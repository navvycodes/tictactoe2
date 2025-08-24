import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Home/Home";
import { SinglePlayer } from "./SinglePlayer/SinglePlayer";
import { MultiPlayerWrapper } from "./MultiPlayer/MultiPlayerWrapper";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single-player" element={<SinglePlayer />} />
        <Route path="/multi-player" element={<MultiPlayerWrapper />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
