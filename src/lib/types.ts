import VexRpcShape from "$components/VexRPCShape.svelte";
import type { FlintBundle } from "@oogaboogagames/flint";

export type CavemanPackage = {
  id: string;
  bundle: FlintBundle;
};

export type CavemanContext = {
  packages: CavemanPackage[];
};

export type VexcriptShape = [VexcriptShapeType, RectangleProps | GroupProps];

export type VexRPCContext = {
  canvas_height: number;
  canvas_width: number;
  shapes: VexcriptShape[];
  socket: URL;
};

export enum VexcriptShapeType {
  Rectangle,
  Group,
  // More to come, this is a demo.
}

export type RectangleProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type GroupProps = {
  name: string;
  svg: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  children: VexcriptShape[];
};
