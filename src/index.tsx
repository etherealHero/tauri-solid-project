/* @refresh reload */
import { render } from "solid-js/web";
import { Routes } from "@generouted/solid-router";
import "./index.css";

render(() => <Routes />, document.getElementById("root") as HTMLElement);
