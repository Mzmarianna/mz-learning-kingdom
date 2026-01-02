export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-calm-bg">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-calm-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading Mz. Marianna's Academy...</p>
      </div>
    </div>
  );
}
