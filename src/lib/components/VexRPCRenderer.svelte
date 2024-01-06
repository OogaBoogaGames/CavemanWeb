<script lang="ts">
  import { onMount, setContext } from "svelte";
  import { writable, type Writable } from "svelte/store";
  import {
    VexcriptShapeType,
    type VexcriptShape,
    type VexRPCContext,
  } from "$lib/types.js";
  import { VexRpcShape } from "$lib/index.js";
  import Caveman from "./Caveman.svelte";

  export let socket: URL;

  export let mirror: string;

  export let width: number;
  export let height: number;

  let packages: Writable<string[]> = writable([]);

  let ctx: Writable<VexRPCContext> = writable({
    canvas_height: width,
    canvas_width: height,
    shapes: [],
    socket,
  });
  setContext("VexRPCContext", ctx);

  export const importPackage = (pkg: string) => {
    $packages = [...$packages, pkg];
  };

  export const addShape = (shape: VexcriptShape) => {
    $ctx.shapes = [...$ctx.shapes, shape];
    return shape;
  };

  export const updateShape = (
    old_shape: VexcriptShape,
    new_shape: VexcriptShape
  ) => {
    $ctx.shapes = $ctx.shapes.map((s) => (s === old_shape ? new_shape : s));
    return new_shape;
  };

  export const removeShape = (shape: VexcriptShape) => {
    $ctx.shapes = $ctx.shapes.filter((s) => s !== shape);
  };

  async function createCtx() {
    let context: VexRPCContext = {
      canvas_height: width,
      canvas_width: height,
      shapes: [],
      socket,
    };

    return context;
  }

  onMount(async () => {
    $ctx = await createCtx();
  });
</script>

<slot />

<div style="width: {width}px; height: {height}px;"></div>
<p>{$packages}</p>
<Caveman packages={$packages} {mirror}>
  {#each $ctx.shapes as [shape_type, shape_props]}
    <VexRpcShape {shape_type} {shape_props} />
  {/each}
</Caveman>
