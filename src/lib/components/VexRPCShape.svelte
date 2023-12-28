<script lang="ts">
  import {
    VexcriptShapeType,
    type RectangleProps,
    type GroupProps,
  } from "$lib/types.js";
  import { Rectangle, Group } from "$lib/index.js";
  const notypecheck = (x: any) => x;

  export let shape_type: VexcriptShapeType;

  type ShapeProps<T> = T extends VexcriptShapeType.Rectangle
    ? RectangleProps
    : T extends VexcriptShapeType.Group
      ? GroupProps
      : never;

  export let shape_props: ShapeProps<typeof shape_type>;
</script>

{#if shape_type == VexcriptShapeType.Rectangle}
  <!-- This will always have the correct props because of the enum -->
  <Rectangle {...notypecheck(shape_props)} />
{:else if shape_type == VexcriptShapeType.Group}
  <!-- This will always have the correct props because of the enum -->
  <Group {...notypecheck(shape_props)} />
{/if}
