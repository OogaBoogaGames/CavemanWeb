<script lang="ts">
  import VexRpcShape from "$components/VexRPCShape.svelte";
  import { Group, VexRpcRenderer } from "$lib/index.js";
  import { VexcriptShapeType, type VexcriptShape } from "$lib/types.js";

  const notypecheck = (x: any) => x;

  let socket = new URL("ws://localhost:8080");

  let addShape: (shape: VexcriptShape) => VexcriptShape;
  let updateShape: (
    old_shape: VexcriptShape,
    new_shape: VexcriptShape
  ) => VexcriptShape;

  let lastid: string;

  let width: number = 750;
  let height: number = 750;

  let group: VexcriptShape = [
    VexcriptShapeType.Group,
    {
      name: "group",
      x: Math.random() * width,
      y: Math.random() * height,
      width: 250,
      height: 250,
      children: [],
    },
  ];

  let group_button: HTMLButtonElement;

  function addRectangle() {
    let new_group: VexcriptShape = [
      VexcriptShapeType.Group,
      {
        height: group[1].height,
        width: group[1].width,
        x: group[1].x,
        y: group[1].y,
        // @ts-ignore
        name: group[1].name,
        children: [
          // @ts-ignore
          ...group[1].children,
          [
            VexcriptShapeType.Rectangle,
            {
              x: Math.random() * 250,
              y: Math.random() * 250,
              width: Math.random() * 25 + 25,
              height: Math.random() * 25 + 25,
            },
          ],
        ],
      },
    ];
    group = updateShape(group, new_group);
  }
</script>

<button
  bind:this={group_button}
  on:click={() => {
    addShape(group);
    group_button.remove();
  }}>Add Group</button
>

<button on:click={addRectangle}>Add Rectangle</button>

<VexRpcRenderer bind:addShape bind:updateShape {socket} {width} {height} />
