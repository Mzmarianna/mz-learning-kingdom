import React from "react";
import { OverlayProps as OverlayPropsType } from "../types/ui";

type ConfigType = any; // TODO: replace with your real config type or import it

export interface OverlayProps extends OverlayPropsType {}

/**
 * InteractiveScene props:
 * - overlayRenderer: preferred, a ComponentType to render the overlay
 * - renderOverlay: deprecated render-prop signature (kept for compatibility)
 */
export type InteractiveSceneProps = {
  overlayRenderer?: React.ComponentType<OverlayProps>;
  renderOverlay?: (props: OverlayProps) => React.ReactNode;
  config: ConfigType;
  loading?: boolean;
  // ...other props as needed
};

const DefaultOverlay: React.FC<OverlayProps> = ({ config, loading }) => {
  return (
    <div className="interactive-scene__overlay">
      {loading ? "Loading..." : "Overlay"}
    </div>
  );
};

export const InteractiveScene: React.FC<InteractiveSceneProps> = ({
  overlayRenderer,
  renderOverlay,
  config,
  loading = false,
  ...rest
}) => {
  // Prefer a component prop. If only a render-prop exists, wrap it into a function component so
  // consumers that use hooks inside their overlay will work correctly.
  const ResolvedOverlay: React.ComponentType<OverlayProps> =
    overlayRenderer ??
    (renderOverlay
      ? ((props: OverlayProps) => <>{renderOverlay(props)}</>)
      : DefaultOverlay);

  const mergedConfig = config; // adjust merging logic if needed

  return (
    <div className="interactive-scene" {...(rest as any)}>
      {/* main scene rendering goes here */}

      {/* Render overlay as a component so Hooks in overlay implementations are valid */}
      <ResolvedOverlay config={mergedConfig} loading={loading} />
    </div>
  );
};

export default InteractiveScene