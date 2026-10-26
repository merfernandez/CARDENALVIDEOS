import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import type { ZoomClave } from "./tipos";

// Punch-in / punch-out suaves hacia la cara de quien habla
export const Zoom: React.FC<{
  zooms: ZoomClave[];
  children: React.ReactNode;
}> = ({ zooms, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const ox = (z: ZoomClave) => z.x ?? 0.5;
  const oy = (z: ZoomClave) => z.y ?? 0.3;
  let escala = zooms[0].escala;
  let x = ox(zooms[0]);
  let y = oy(zooms[0]);
  for (let i = 1; i < zooms.length; i++) {
    const p = spring({
      frame,
      fps,
      delay: Math.round((zooms[i].ms / 1000) * fps),
      durationInFrames: 9,
      config: { damping: 200 },
    });
    escala += (zooms[i].escala - zooms[i - 1].escala) * p;
    x += (ox(zooms[i]) - ox(zooms[i - 1])) * p;
    y += (oy(zooms[i]) - oy(zooms[i - 1])) * p;
  }

  return (
    <AbsoluteFill
      style={{
        transform: `scale(${escala})`,
        transformOrigin: `${x * 100}% ${y * 100}%`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
