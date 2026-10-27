import { BLANCO, CREDITO_EDICION, fontFamily, ROJO } from "./brand";

// Créditos que van en todos los cierres (grandes y destacados)
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
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 18,
      opacity: opacidad,
      transform: `translateY(${(1 - opacidad) * 20}px)`,
    }}
  >
    <div
      style={{
        color: BLANCO,
        fontWeight: 900,
        fontSize: 30,
        letterSpacing: 3,
        textTransform: "uppercase",
        textShadow: "0 2px 8px rgba(0,0,0,0.6)",
      }}
    >
      {credito}
    </div>
    {PERSONAS_CREDITOS.map((p) => (
      <div
        key={p.nombre}
        style={{
          display: "flex",
          alignItems: "stretch",
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
        }}
      >
        <div style={{ width: 8, backgroundColor: ROJO }} />
        <div style={{ padding: "12px 30px 14px", textAlign: "center" }}>
          <div
            style={{
              color: BLANCO,
              fontWeight: 800,
              fontSize: 40,
              lineHeight: 1.15,
            }}
          >
            {p.nombre}
          </div>
          <div
            style={{
              color: ROJO,
              fontWeight: 700,
              fontSize: 25,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginTop: 4,
              filter: "brightness(1.25)",
            }}
          >
            {p.cargo}
          </div>
        </div>
      </div>
    ))}
  </div>
);
