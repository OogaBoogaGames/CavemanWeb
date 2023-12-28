<script lang="ts">
  import { VexRpcShape } from "$lib/index.js";
  import type { VexcriptShape } from "$lib/types.js";
  import { getContext, onMount, setContext } from "svelte";

  export let name: string;

  export let svg: boolean = true;

  export let width: number;
  export let height: number;
  export let x: number;
  export let y: number;

  export let children: VexcriptShape[] = [];

  let outer_group = getContext("__group");

  let group = outer_group ? outer_group + "/" : "";
  group += name;

  let in_svg: boolean = false;
  if (outer_group) {
    let group_props: { svg: boolean } = getContext(`__group::${outer_group}`);
    console.log("group_props", group_props);
    if (group_props) {
      let { svg: sv } = group_props;
      in_svg = sv;
    }
  }

  setContext(`__group::${group}`, {
    svg: in_svg ? true : svg,
  });

  setContext("__group", group);
</script>

{#if in_svg}
  <g>
    {#each children as child}
      <VexRpcShape shape_type={child[0]} shape_props={child[1]} />
    {/each}
  </g>
{:else if svg}
  <svg
    style="position: absolute; left: {x - width / 2}px; top: {y -
      height / 2}px; width: {width}px; height: {height}px;"
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    {#each children as child}
      <VexRpcShape shape_type={child[0]} shape_props={child[1]} />
    {/each}
  </svg>
{:else}
  <div
    style="position: absolute; left: {x - width / 2}px; top: {y -
      height / 2}px; width: {width}px; height: {height}px;"
  >
    {#each children as child}
      <VexRpcShape shape_type={child[0]} shape_props={child[1]} />
    {/each}
  </div>
{/if}
