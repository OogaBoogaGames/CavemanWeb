<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import init, { FlintBundle } from "@oogaboogagames/flint";
  import type { CavemanContext } from "$lib/types.js";

  export let packages: string[];
  export let mirror: string;

  let cavemanContextStore: Writable<CavemanContext> = writable({
    packages: [],
  });
  setContext("CavemanContext", cavemanContextStore);

  async function createCtx(packages: string[]) {
    let context: CavemanContext = {
      packages: [],
    };
    await new Promise<void>((resolve, reject) => {
      packages.forEach(async (pkg, index, arr) => {
        let bundle = new FlintBundle(pkg);
        await bundle.load(mirror);
        context.packages.push({ id: pkg, bundle });
        if (index === arr.length - 1) resolve();
      });
    });

    return context;
  }

  onMount(async () => {
    // @ts-ignore - For whatever reason, the typescript compiler doesn't believe that init() is callable
    await init();
    $cavemanContextStore = await createCtx(packages);
  });
</script>

<slot />
