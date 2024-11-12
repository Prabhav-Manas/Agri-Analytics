import "@mantine/core/styles.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import "./App.css";
import AverageYieldAreaTable from "./Components/AverageYieldAreaTable/AverageYieldAreaTable";
import MaxMinProductionTable from "./Components/MaxMinProductionTable/MaxMinProductionTable";
import "../src/Components/MaxMinProductionTable/MaxMinProductionTable.css";
import Navigation from "./Components/Navigation/Navigation";
import "../src/Components/Navigation/Navigation.css";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Navigation />
        <Routes>
          <Route path="/" element={<MaxMinProductionTable />} />
          <Route
            path="/avgYieldCultivationArea"
            element={<AverageYieldAreaTable />}
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
