import { createSignal } from "solid-js";
import logo from "./assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";

function App() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <div class="flex flex-col gap-5 h-screen items-center justify-center">
      <h1>Welcome to Tauri!</h1>

      <div class="flex">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" class="w-20" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" class="w-20" alt="Tauri logo" />
        </a>
        <a href="https://solidjs.com" target="_blank">
          <img src={logo} class="w-20" alt="Solid logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and Solid logos to learn more.</p>

      <form
        class="join"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          class="join-item input input-accent"
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button class="join-item btn btn-accent" type="submit">
          Greet
        </button>
      </form>

      <p>{greetMsg()}</p>
    </div>
  );
}

export default App;
