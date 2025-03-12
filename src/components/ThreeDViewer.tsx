import { useEffect, useRef } from "react";

interface ThreeDViewerProps {
  materialType: string;
  colorFinish: string;
  glassPanel: string;
  className?: string;
}

export default function ThreeDViewer({
  materialType,
  colorFinish,
  glassPanel,
  className = "",
}: ThreeDViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for the actual 3D viewer implementation
    // In a real implementation, we would initialize Three.js here
    // and update the model based on the selected options

    const container = containerRef.current;
    if (!container) return;

    // For now, we'll just display a placeholder message
    container.innerHTML = `
      <div class="flex flex-col items-center justify-center h-full">
        <div class="text-center p-4 bg-white bg-opacity-80 rounded-lg">
          <h3 class="text-lg font-semibold mb-2">3D Preview</h3>
          <p class="text-sm text-gray-600 mb-2">Selected options:</p>
          <ul class="text-sm text-left">
            <li><strong>Material:</strong> ${materialType}</li>
            <li><strong>Finish:</strong> ${colorFinish}</li>
            <li><strong>Glass:</strong> ${glassPanel}</li>
          </ul>
        </div>
      </div>
    `;

    // In a real implementation, we would return a cleanup function
    // to dispose of Three.js resources
    return () => {
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [materialType, colorFinish, glassPanel]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full min-h-[300px] bg-gray-200 rounded-lg ${className}`}
      style={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?w=800&q=80)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );
}
