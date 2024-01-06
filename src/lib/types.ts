import VexRpcShape from "$components/VexRPCShape.svelte";
import type { FlintBundle } from "@oogaboogagames/flint";

export type CavemanPackage = {
  id: string;
  bundle: FlintBundle;
};

export type CavemanContext = {
  packages: CavemanPackage[];
};

export type CavemanImageProps = {
  packageid: string;
  assetid: string;
};

export type VexcriptShape = [
  VexcriptShapeType,
  RectangleProps | GroupProps | ImageProps
];

export type VexRPCContext = {
  canvas_height: number;
  canvas_width: number;
  shapes: VexcriptShape[];
  socket: URL;
};

export enum VexcriptShapeType {
  Rectangle,
  Group,
  Image,
  // More to come, this is a demo.
}

export type RectangleProps = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type ImageProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  src: URL | CavemanImageProps;
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
