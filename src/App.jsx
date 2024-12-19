import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

import { restClient } from '@polygon.io/client-js';
const rest = restClient(await invoke("get_env"));

import { CChart } from "@coreui/react-chartjs";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    rest.stocks.aggregates("AAPL", 1, "day", "2023-01-01", "2023-04-14").then((data) => {
      console.log(data);
    }).catch(e => {
      console.error('An error happened:', e);
    });

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
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "My First dataset",
              backgroundColor: "rgba(220, 220, 220, 0.2)",
              borderColor: "rgba(220, 220, 220, 1)",
              pointBackgroundColor: "rgba(220, 220, 220, 1)",
              pointBorderColor: "#fff",
              data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
            },
            {
              label: "My Second dataset",
              backgroundColor: "rgba(151, 187, 205, 0.2)",
              borderColor: "rgba(151, 187, 205, 1)",
              pointBackgroundColor: "rgba(151, 187, 205, 1)",
              pointBorderColor: "#fff",
              data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
            },
          ],
        }}
        options={{
        //   plugins: {
        //     legend: {
        //       labels: {
        //         color: getStyle('--cui-body-color'),
        //       }
        //     }
        //   },
        //   scales: {
        //     x: {
        //       grid: {
        //         color: getStyle('--cui-border-color-translucent'),
        //       },
        //       ticks: {
        //         color: getStyle('--cui-body-color'),
        //       },
        //     },
        //     y: {
        //       grid: {
        //         color: getStyle('--cui-border-color-translucent'),
        //       },
        //       ticks: {
        //       color: getStyle('--cui-body-color'),
        //     },
        //   },
        // },
        }}
      />
    </main>
  );
}

export default App;
