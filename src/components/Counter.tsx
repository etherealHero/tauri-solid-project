import { createSignal } from "solid-js";

export const Counter = () => {
  const [count, setCount] = createSignal(1);
  return (
    <button class="btn btn-secondary" onClick={() => setCount(count() + 1)}>
      Counter {count()}
    </button>
  );
};
