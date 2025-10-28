````markdown
# Changelog

## Unreleased

### Changed
- Replace `renderOverlay` (render-prop) with `overlayRenderer` (component prop).
  - New API: pass a component type: `overlayRenderer={MyOverlay}` where `MyOverlay` is `React.ComponentType<{ config, loading }>`
  - Old API (`renderOverlay`) is still supported temporarily for backward compatibility but is deprecated.
  - Migration examples:
    - Old:
      ```jsx
      <InteractiveScene renderOverlay={({ config, loading }) => <MyOverlay config={config} loading={loading} />} />
      ```
    - New:
      ```jsx
      <InteractiveScene overlayRenderer={MyOverlay} />
      ```
  - If a caller only has a render function, they can wrap it:
    ```jsx
    const OverlayWrapper = (props) => renderOverlay(props);
    <InteractiveScene overlayRenderer={OverlayWrapper} />
    ```
  - Runtime prefers `overlayRenderer` when both `overlayRenderer` and `renderOverlay` are provided.
````