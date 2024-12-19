import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { restClient } from '@polygon.io/client-js';

import { CChart } from "@coreui/react-chartjs";

const client = restClient(await invoke("get_env"));

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  const [dates, setDates] = useState("");
  const [closing_prices, setClosingPrices] = useState("");

  client.stocks.aggregates("AAPL", 1, "week", "2023-01-01", "2023-02-14").then((data) => {
    const chart_data = data["results"].map((obj) => {
      return {"close_price": obj["c"], "timestamp": new Date(obj["t"])};
    });

    setDates(
      chart_data.map((obj) => {
        return obj["timestamp"].toDateString();
      })
    );

    setClosingPrices(
      chart_data.map((obj) => {
        return obj["close_price"]
      })
    );
  }).catch(e => {
    console.error('An error happened:', e);
  });

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container">
      <h1>Welcome to Tauri & Stuff</h1>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>
      <p>{greetMsg}</p>

      <CChart
        type="line"
        data={{
          labels: dates,
          datasets: [
            {
              label: "AAPL Closing Prices",
              backgroundColor: "rgba(151, 187, 205, 0.2)",
              borderColor: "rgba(151, 187, 205, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#fff",
              data: closing_prices
            },
          ],
        }}
        options={{}}
      />
    </main>
  );
}

export default App;
