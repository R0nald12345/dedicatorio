
import { useEffect, useState } from "react";

/**
 * FloresAmarillasPatricia
 * Detalle digital con un RAMO de flores amarillas en estilo 3D,
 * flotando sobre la tarjeta. Dedicado a Patricia Fernandez,
 * de parte de Ronald CP.
 *
 * Uso:
 *   import FloresAmarillasPatricia from "./FloresAmarillasPatricia";
 *   <FloresAmarillasPatricia />
 */

interface Petal {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
}

const NOMBRE = "Patricia Fernández";
const FECHA = "21 de Septiembre";
const DEDICATORIA =
  "Como las flores amarillas, que sin pedir nada a cambio le regalan color al día, quiero que sepas que en este 21 de septiembre te agradezco tanto por iluminar mi mundo con tu alegría, tu ternura y tu cariño. Pase lo que pase, siempre puedes contar conmigo, porque contigo quiero seguir celebrando la vida y cada pequeño momento hermoso.";
const REMITENTE = "Ronald CP";

function generarPetalos(cantidad: number): Petal[] {
  return Array.from({ length: cantidad }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 8,
    size: 10 + Math.random() * 14,
    rotate: Math.random() * 360,
  }));
}

const FloresAmarillasPatricia: React.FC = () => {
  const [petalos] = useState<Petal[]>(() => generarPetalos(16));
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={styles.wrapper}>
      <style>{keyframes}</style>

      {/* Fondo con degradado cálido */}
      <div style={styles.background} />

      {/* Pétalos cayendo suavemente */}
      <div style={styles.petalsLayer} aria-hidden="true">
        {petalos.map((p: Petal) => (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: "-5%",
              width: p.size,
              height: p.size,
              borderRadius: "50% 0 50% 50%",
              background:
                "linear-gradient(135deg, #FFE066 0%, #FFC300 55%, #FFB000 100%)",
              opacity: 0.8,
              animation: `caer ${p.duration}s linear ${p.delay}s infinite`,
              transform: `rotate(${p.rotate}deg)`,
              filter: "drop-shadow(0 2px 3px rgba(180,130,0,0.25))",
            }}
          />
        ))}
      </div>

      {/* Contenedor de la tarjeta + ramo 3D que sobresale */}
      <div style={styles.stage}>
        {/* Ramo flotando, sobresaliendo por encima de la tarjeta */}
        <div style={styles.ramoContenedor}>
          <RamoFloresAmarillas />
        </div>

        {/* Tarjeta principal */}
        <div
          style={{
            ...styles.card,
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(24px) scale(0.97)",
          }}
        >
          <p style={styles.eyebrow}>Un ramo especial para</p>
          <h1 style={styles.nombre}>{NOMBRE}</h1>

          <div style={styles.divider} />

          <p style={styles.dedicatoria}>“{DEDICATORIA}”</p>

          <div style={styles.footerRow}>
            <span style={styles.fecha}>🌼 {FECHA}</span>
            <span style={styles.firma}>De parte de {REMITENTE}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Un girasol individual en estilo 3D: capa trasera de pétalos (grosor),
 * pétalos frontales con degradado de luz/sombra, y centro con textura
 * de semillas. Reutilizado varias veces dentro del ramo.
 */
const Girasol3D: React.FC<{ size?: number; id: string }> = ({
  size = 70,
  id,
}) => {
  const petalCount = 10;

  return (
    <svg width={size} height={size} viewBox="0 0 140 140" style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={`petalo-${id}`} cx="35%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#FFFBEA" />
          <stop offset="35%" stopColor="#FFE066" />
          <stop offset="70%" stopColor="#FFC300" />
          <stop offset="100%" stopColor="#E68A00" />
        </radialGradient>
        <linearGradient id={`petaloSombra-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C97A00" stopOpacity="0" />
          <stop offset="100%" stopColor="#A85F00" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id={`centro-${id}`} cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#B9812F" />
          <stop offset="45%" stopColor="#8C5A1E" />
          <stop offset="100%" stopColor="#4A2E0C" />
        </radialGradient>
      </defs>

      <g transform="translate(70 66) rotate(18)">
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (360 / petalCount) * i;
          return (
            <ellipse
              key={`back-${i}`}
              cx="0"
              cy="-34"
              rx="14"
              ry="30"
              fill="#E6A800"
              opacity={0.9}
              transform={`rotate(${angle})`}
            />
          );
        })}
      </g>

      <g transform="translate(70 66)">
        {Array.from({ length: petalCount }).map((_, i) => {
          const angle = (360 / petalCount) * i;
          return (
            <g key={`front-${i}`} transform={`rotate(${angle})`}>
              <ellipse
                cx="0"
                cy="-32"
                rx="13"
                ry="28"
                fill={`url(#petalo-${id})`}
                stroke="#C97A00"
                strokeOpacity={0.25}
                strokeWidth={0.6}
              />
              <ellipse cx="4" cy="-30" rx="9" ry="24" fill={`url(#petaloSombra-${id})`} />
              <line
                x1="0"
                y1="-8"
                x2="0"
                y2="-56"
                stroke="#FFF3B0"
                strokeOpacity={0.5}
                strokeWidth={1}
              />
            </g>
          );
        })}

        <circle r="22" fill={`url(#centro-${id})`} />
        <circle r="22" fill="none" stroke="#3A230A" strokeOpacity={0.4} strokeWidth={1} />
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (Math.PI * 2 * i) / 24;
          const rr = 6 + (i % 4) * 3.6;
          return (
            <circle
              key={`semilla-${i}`}
              cx={Math.cos(a) * rr}
              cy={Math.sin(a) * rr}
              r={1.4}
              fill="#3A230A"
              opacity={0.55}
            />
          );
        })}
        <ellipse cx="-6" cy="-8" rx="7" ry="4.5" fill="#FFE9A8" opacity={0.55} />
      </g>
    </svg>
  );
};

/** Una hoja verde alargada, con nervadura y sombreado leve para dar volumen. */
const Hoja: React.FC<{
  x: number;
  y: number;
  rotate: number;
  width?: number;
  flip?: boolean;
}> = ({ x, y, width = 46, rotate, flip }) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${flip ? -1 : 1},1)`}>
    <path
      d={`M0,0 C ${width * 0.55},-${width * 0.35} ${width},-${width * 0.05} ${width},0
          C ${width},${width * 0.05} ${width * 0.55},${width * 0.35} 0,0 Z`}
      fill="url(#hojaGrad)"
      stroke="#3E7A2E"
      strokeOpacity={0.35}
      strokeWidth={0.6}
    />
    <path
      d={`M0,0 L ${width},0`}
      stroke="#2F5F22"
      strokeOpacity={0.4}
      strokeWidth={0.8}
    />
  </g>
);

/**
 * Ramo completo: varios girasoles a distinto tamaño/ángulo, tallos
 * convergentes, hojas y envoltorio (papel kraft) con listón/moño,
 * armado en capas para dar sensación de profundidad 3D.
 */
const RamoFloresAmarillas: React.FC = () => {
  // posiciones (x,y) del centro de cada flor dentro del viewBox, y su tamaño
  const flores = [
    { x: 150, y: 108, size: 92, rotate: -6, z: 5, id: "f1" }, // central, la más grande
    { x: 78, y: 132, size: 66, rotate: -18, z: 4, id: "f2" },
    { x: 222, y: 128, size: 66, rotate: 16, z: 4, id: "f3" },
    { x: 46, y: 176, size: 50, rotate: -26, z: 3, id: "f4" },
    { x: 254, y: 172, size: 50, rotate: 24, z: 3, id: "f5" },
    { x: 112, y: 74, size: 46, rotate: -8, z: 6, id: "f6" },
    { x: 190, y: 70, size: 46, rotate: 8, z: 6, id: "f7" },
  ];

  const focal = { x: 150, y: 268 }; // punto donde convergen los tallos, bajo el envoltorio

  return (
    <div style={{ animation: "flotarRamo 5.5s ease-in-out infinite" }}>
      <svg
        width={300}
        height={300}
        viewBox="0 0 300 300"
        style={{ overflow: "visible", filter: "drop-shadow(0 18px 22px rgba(150,100,0,0.35))" }}
      >
        <defs>
          <linearGradient id="hojaGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#8FCB6B" />
            <stop offset="100%" stopColor="#4C8A34" />
          </linearGradient>
          <linearGradient id="papelGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFF7E0" />
            <stop offset="55%" stopColor="#FFE9B8" />
            <stop offset="100%" stopColor="#F4C875" />
          </linearGradient>
          <linearGradient id="listonGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E85D75" />
            <stop offset="50%" stopColor="#F58AA0" />
            <stop offset="100%" stopColor="#E85D75" />
          </linearGradient>
        </defs>

        {/* tallos convergiendo hacia el punto focal */}
        {flores.map((f) => (
          <path
            key={`tallo-${f.id}`}
            d={`M ${f.x} ${f.y + f.size * 0.32} Q ${(f.x + focal.x) / 2} ${
              (f.y + focal.y) / 2
            } ${focal.x} ${focal.y}`}
            fill="none"
            stroke="#5C9A3D"
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.9}
          />
        ))}

        {/* hojas asomando entre los tallos */}
        <Hoja x={95} y={210} rotate={-40} width={44} />
        <Hoja x={205} y={206} rotate={35} width={44} flip />
        <Hoja x={150} y={232} rotate={90} width={38} />

        {/* envoltorio de papel kraft en forma de cono */}
        <path
          d={`M ${focal.x - 78} ${focal.y - 14}
              Q ${focal.x} ${focal.y + 70} ${focal.x} ${focal.y + 92}
              Q ${focal.x} ${focal.y + 70} ${focal.x + 78} ${focal.y - 14}
              Q ${focal.x} ${focal.y - 40} ${focal.x - 78} ${focal.y - 14} Z`}
          fill="url(#papelGrad)"
          stroke="#D9A85A"
          strokeWidth={1.2}
        />
        {/* pliegues del papel */}
        <path
          d={`M ${focal.x - 30} ${focal.y - 6} L ${focal.x - 10} ${focal.y + 78}`}
          stroke="#E0B26E"
          strokeWidth={1.5}
          opacity={0.6}
          fill="none"
        />
        <path
          d={`M ${focal.x + 30} ${focal.y - 6} L ${focal.x + 10} ${focal.y + 78}`}
          stroke="#E0B26E"
          strokeWidth={1.5}
          opacity={0.6}
          fill="none"
        />

        {/* listón / moño */}
        <g transform={`translate(${focal.x} ${focal.y + 6})`}>
          <path d="M0,0 C -26,-14 -30,14 -2,4 Z" fill="url(#listonGrad)" stroke="#C64A63" strokeWidth={0.6} />
          <path d="M0,0 C 26,-14 30,14 2,4 Z" fill="url(#listonGrad)" stroke="#C64A63" strokeWidth={0.6} />
          <circle r="6" fill="#D9506A" stroke="#B93A54" strokeWidth={0.8} />
          <path d="M-3,6 L -10,26 L -2,20 Z" fill="#E85D75" opacity={0.9} />
          <path d="M3,6 L 10,26 L 2,20 Z" fill="#E85D75" opacity={0.9} />
        </g>

        {/* las flores, en orden de z para simular profundidad */}
        {[...flores]
          .sort((a, b) => a.z - b.z)
          .map((f) => (
            <g
              key={f.id}
              transform={`translate(${f.x - f.size / 2} ${f.y - f.size / 2}) rotate(${f.rotate} ${f.size / 2} ${f.size / 2})`}
            >
              <Girasol3D size={f.size} id={f.id} />
            </g>
          ))}
      </svg>
    </div>
  );
};

const keyframes = `
@keyframes caer {
  0%   { transform: translateY(0) rotate(0deg); opacity: 0; }
  10%  { opacity: 0.8; }
  90%  { opacity: 0.8; }
  100% { transform: translateY(115vh) rotate(360deg); opacity: 0; }
}
@keyframes flotarRamo {
  0%, 100% { transform: translateY(0px) rotate(-1.2deg); }
  50%      { transform: translateY(-16px) rotate(1.2deg); }
}
@keyframes fondoMovimiento {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

const styles: { [k: string]: React.CSSProperties } = {
  wrapper: {
    position: "relative",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    padding: "24px",
    boxSizing: "border-box",
  },
  background: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(120deg, #FFF9E5 0%, #FFEFB0 25%, #FFD966 55%, #FFB74D 80%, #FF9F43 100%)",
    backgroundSize: "300% 300%",
    animation: "fondoMovimiento 14s ease-in-out infinite",
    zIndex: 0,
  },
  petalsLayer: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
  },
  stage: {
    position: "relative",
    zIndex: 2,
    maxWidth: 460,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  ramoContenedor: {
    position: "relative",
    zIndex: 4,
    marginBottom: -70, // el ramo sobresale y se superpone a la tarjeta
    pointerEvents: "none",
  },
  card: {
    position: "relative",
    zIndex: 3,
    width: "100%",
    boxSizing: "border-box",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(6px)",
    borderRadius: 24,
    padding: "88px 32px 36px",
    textAlign: "center",
    boxShadow:
      "0 20px 45px rgba(180, 120, 0, 0.25), 0 2px 6px rgba(180,120,0,0.15)",
    border: "1px solid rgba(255, 200, 60, 0.5)",
    transition: "opacity 0.9s ease, transform 0.9s ease",
  },
  eyebrow: {
    margin: 0,
    fontSize: 13,
    letterSpacing: 2,
    textTransform: "uppercase",
    color: "#B9791F",
    fontWeight: 600,
  },
  nombre: {
    margin: "6px 0 0",
    fontSize: 30,
    color: "#7A4E12",
    fontWeight: 800,
    fontFamily: "'Georgia', 'Times New Roman', serif",
  },
  divider: {
    width: 60,
    height: 3,
    margin: "18px auto",
    borderRadius: 3,
    background: "linear-gradient(90deg, #FFD966, #FF9F43)",
  },
  dedicatoria: {
    fontSize: 16.5,
    lineHeight: 1.6,
    color: "#5A3B10",
    fontStyle: "italic",
    margin: "0 0 22px",
  },
  footerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 13.5,
    color: "#A3711F",
    marginTop: 8,
  },
  fecha: {
    fontWeight: 600,
  },
  firma: {
    fontStyle: "italic",
    fontWeight: 600,
  },
};

export default FloresAmarillasPatricia;