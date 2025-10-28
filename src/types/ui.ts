import React from "react";

export type ConfigType = any; // Replace with your actual config type

export interface OverlayProps {
  config: ConfigType;
  loading: boolean;
}

export type OverlayRendererType = React.ComponentType<OverlayProps>;
export type RenderOverlayType = (props: OverlayProps) => React.ReactNode;