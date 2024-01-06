<script lang="ts">
  import { getContext, onMount } from "svelte";
  import type { CavemanContext } from "$lib/types.js";
  import type { Writable } from "svelte/store";
  import Caveman from "./Caveman.svelte";

  export let assetid: string;

  export let packageid: string;

  export let width: string | null = null;
  export let height: string | null = null;

  let elem: HTMLImageElement;

  let ctx: Writable<CavemanContext> = getContext("CavemanContext");

  function updateSrc(ctx: CavemanContext) {
    ctx.packages.forEach(async (pkg, index, arr) => {
      if ((pkg.id = packageid)) {
        elem.src = URL.createObjectURL(await pkg.bundle.get_asset(assetid));
      }
    });
  }

  onMount(() => {
    updateSrc($ctx);
  });

  $: updateSrc($ctx);
</script>

<img
  class={$$props.class}
  id={$$props.id}
  style={$$props.style}
  {width}
  {height}
  bind:this={elem}
  alt={assetid}
/>
