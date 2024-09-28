import { createSignal } from "solid-js";
import logo from "../assets/logo.svg";
import { invoke } from "@tauri-apps/api/core";
import { Counter } from "../components/Counter";

import { routes } from "@generouted/solid-router";
import RoutesViewer from "../components/RoutesViewer";

export default function Home() {
  const [greetMsg, setGreetMsg] = createSignal("");
  const [name, setName] = createSignal("");

  // const [menu, setMenu] = createSignal([]);
  // createEffect(() => {
  //   setMenu()
  // })

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name: name() }));
  }

  return (
    <div class="h-screen flex items-start justify-center gap-20 flex-wrap pt-20">
      <div>
        <h4 class="mb-5">Navigation</h4>
        <RoutesViewer routes={routes} />
      </div>

      <div class="flex flex-col gap-5 justify-center">
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

        <Counter />

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
    </div>
  );
}
