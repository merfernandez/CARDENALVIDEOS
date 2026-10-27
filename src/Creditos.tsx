import { BLANCO, CREDITO_EDICION, fontFamily } from "./brand";

// Créditos que van en todos los cierres
export const PERSONAS_CREDITOS = [
  {
    nombre: "Mercy Edith Fernández Pacheco",
    cargo: "Directora General Sistema Cardenal",
  },
  {
    nombre: "Adaluz Trespalacios",
    cargo: "Asistente Ejecutiva Sistema Cardenal",
  },
];

export const Creditos: React.FC<{ opacidad: number; credito?: string }> = ({
  opacidad,
  credito = CREDITO_EDICION,
}) => (
  <div
    style={{
      fontFamily,
      textAlign: "center",
      opacity: opacidad,
      textShadow: "0 2px 8px rgba(0,0,0,0.6)",
    }}
  >
    <div
      style={{
        color: BLANCO,
        fontWeight: 800,
        fontSize: 26,
        letterSpacing: 3,
        textTransform: "uppercase",
      }}
    >
      {credito}
    </div>
    {PERSONAS_CREDITOS.map((p) => (
      <div key={p.nombre} style={{ marginTop: 18 }}>
        <div style={{ color: BLANCO, fontWeight: 700, fontSize: 26 }}>
          {p.nombre}
        </div>
        <div
          style={{
            color: "rgba(255,255,255,0.65)",
            fontWeight: 500,
            fontSize: 21,
            marginTop: 2,
          }}
        >
          {p.cargo}
        </div>
      </div>
    ))}
  </div>
);
