<script lang="ts">
  import { getContext, onMount } from "svelte";

  export let width: number;
  export let height: number;
  export let x: number;
  export let y: number;

  let group = getContext("__group");

  let in_svg: boolean = false;
  if (group) {
    let group_props: { svg: boolean } = getContext(`__group::${group}`);
    if (group_props) {
      let { svg } = group_props;
      in_svg = svg;
    }
  }
</script>

{#if in_svg}
  <rect {width} {height} x={x - width / 2} y={y - height / 2}></rect>
{:else}
  <!-- Create new SVG -->
  <svg
    {width}
    {height}
    style="position: absolute; left: {x - width / 2}px; top: {y -
      height / 2}px;"
    viewBox={`0 0 ${width} ${height}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect {width} {height}></rect>
  </svg>
{/if}
