import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Home/Home";
import { SinglePlayer } from "./SinglePlayer/SinglePlayer";
import { MultiPlayer } from "./MultiPlayer/MultiPlayer";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/single-player" element={<SinglePlayer />} />
        <Route path="/multi-player" element={<MultiPlayer />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
