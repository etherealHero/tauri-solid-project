import { createStorage, defineDriver } from "unstorage";
import { Store as TauriStore } from "@tauri-apps/plugin-store";
import { isTauri } from "@tauri-apps/api/core";

import indexedDbDriver from "unstorage/drivers/indexedb";

const base = "app:";

const tauriStoreDriver = defineDriver((opts: TauriStoreOptions = { base }) => {
  const base = opts.base && opts.base.length > 0 ? `${opts.base}:` : "";
  const makeKey = (key: string) => base + key;

  let store = new TauriStore(opts.base);

  return {
    name: "tauri-plugin-store",
    options: opts,
    async hasItem(key) {
      const item = await store.get(makeKey(key));
      return item === undefined ? false : true;
    },
    async getItem(key) {
      const item = await store.get(makeKey(key));
      return item ?? null;
    },
    async setItem(key, value) {
      await store.set(makeKey(key), value);
      await store.save();
    },
    async removeItem(key) {
      await store.delete(makeKey(key));
      await store.save();
    },
    async getKeys() {
      return await store.keys();
    },
    async clear() {
      await store.clear();
      await store.save();
    }
  };
});

export const storage = createStorage({
  driver: isTauri() ? tauriStoreDriver({ base }) : indexedDbDriver({ base })
});

// TODO: refactor
interface TauriStoreOptions {
  base: string;
  dbName?: string;
  storeName?: string;
}
