<script lang="ts">
  import CavemanImage from "$components/CavemanImage.svelte";
  import type { CavemanImageProps } from "$lib/types.js";
  import { getContext, onMount } from "svelte";

  export let width: number;
  export let height: number;
  export let x: number;
  export let y: number;
  export let src: URL | CavemanImageProps;

  let srcUrl: string;

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
  <text>Error: VexRPC Image used inside of SVG</text>
{:else if src instanceof URL}
  <img
    src={src.toString()}
    width="{width}px"
    height="{height}px"
    alt="VexRPC"
  />
{:else}
  <CavemanImage
    packageid={src.packageid}
    assetid={src.assetid}
    width="{width}px"
    height="{height}px"
    style="position: absolute; left: {x}px; top: {y}px;"
  />
{/if}
