import { RouteDefinition } from "@solidjs/router";
import { createSignal, For, Match, onMount, Show, Switch } from "solid-js";
import { routes } from "@generouted/solid-router";

type FlattenedRoute = {
  id: string;
  path: string;
  view: string;
  indent: number;
  isNode: boolean;
};

type RouteDefinitionWithId = RouteDefinition & {
  id?: string;
};

function extractPathname(route: RouteDefinition): string {
  let pathname = route.path as string;

  if (pathname.trim() === "/" && !route.children) pathname = "overview";

  if (route.children) pathname += "/";

  return pathname;
}

function flattenRoutes(routes: RouteDefinitionWithId[], indent = 0): FlattenedRoute[] {
  const flattened: FlattenedRoute[] = [];

  for (const route of routes) {
    if (route.path) {
      const id = route.id || route.path; // Приоритет id, если нет - используем path

      flattened.push({
        id,
        path: route.path as string,
        view: extractPathname(route),
        indent,
        isNode: !!route.children
      });
    }

    if (route.children) {
      if (Array.isArray(route.children)) {
        flattened.push(...flattenRoutes(route.children, indent + 1));
      } else {
        flattened.push(...flattenRoutes([route.children], indent + 1));
      }
    }
  }

  return flattened
    .filter((r) => r.path != "*")
    .map((r) => {
      if (r.view === "overview") return { ...r, id: r.id.replace(/index$/, "") };
      return r;
    });
}

export function RoutesViewer() {
  const [isShow, setIsShow] = createSignal<boolean>(false);

  onMount(() => setTimeout(() => setIsShow(true), 100));

  return (
    <Show when={isShow()} fallback={<div>Loading...</div>}>
      <For each={flattenRoutes(routes)} fallback={<div>No items</div>}>
        {(item, index) => (
          <Switch>
            <Match when={item.isNode}>
              <div class="whitespace-pre font-bold" data-index={index()}>{`${"    ".repeat(item.indent - 1)}${
                item.view
              }`}</div>
            </Match>
            <Match when={!item.isNode}>
              <span class="whitespace-pre">{`${"    ".repeat(item.indent - 1)}`}</span>
              <a href={item.id} class="link" data-index={index()}>{`${item.view}`}</a> <br />
            </Match>
          </Switch>
        )}
      </For>
    </Show>
  );
}
