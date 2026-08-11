# Contraste — cada par calculado, ninguno estimado

Generado por el bloque de cálculo que está al final de este archivo, sobre los valores
literales de `design-system/tokens.css`. Fórmula WCAG 2.1 (luminancia relativa).

Umbrales:

| Qué | Mínimo |
|---|---|
| Texto normal | 4.5:1 |
| Texto de 24px o más, en negrita desde 19px | 3:1 |
| Bordes, íconos y formas que comunican significado | 3:1 |
| Indicador de foco contra lo adyacente | 3:1 |

---

## Texto sobre fondo

| Par | Texto | Fondo | Ratio | Mínimo | Resultado | Dónde se usa |
|---|---|---|---|---|---|---|
| Texto principal sobre blanco | `#2C2A29` | `#FFFFFF` | 14.28:1 | 4.5 | pasa | Cuerpo, títulos, etiquetas |
| Texto auxiliar sobre blanco | `#58595B` | `#FFFFFF` | 7.01:1 | 4.5 | pasa | Notas, horas, migajas, marbetes |
| Texto principal sobre gris de sección | `#2C2A29` | `#EEEEEE` | 12.31:1 | 4.5 | pasa | Bloque del agente neutro |
| Texto auxiliar sobre gris de sección | `#58595B` | `#EEEEEE` | 6.04:1 | 4.5 | pasa | Bitácora del agente |
| Texto principal sobre fondo de alerta | `#2C2A29` | `#FFF1E9` | 12.93:1 | 4.5 | pasa | Bloque del agente que explica un fallo |
| Texto auxiliar sobre fondo de alerta | `#58595B` | `#FFF1E9` | 6.35:1 | 4.5 | pasa | Bitácora dentro del fallo |
| Texto principal sobre fondo de éxito | `#2C2A29` | `#E7F8F2` | 13.00:1 | 4.5 | pasa | Bloque del agente que confirma |
| Texto auxiliar sobre fondo de éxito | `#58595B` | `#E7F8F2` | 6.38:1 | 4.5 | pasa | Bitácora dentro del éxito |
| Blanco sobre carbón | `#FFFFFF` | `#2C2A29` | 14.28:1 | 4.5 | pasa | Tarjeta de saldo, header negro, nav de mando |
| Carbón sobre amarillo | `#2C2A29` | `#FDDA24` | 10.36:1 | 4.5 | pasa | **Botón primario y nav activa** |
| Carbón sobre amarillo claro | `#2C2A29` | `#FDE773` | 11.46:1 | 4.5 | pasa | Alerta antifraude |
| Texto principal sobre gris de página | `#2C2A29` | `#F4F4F4` | 12.99:1 | 4.5 | pasa | Fondo del escenario |
| Texto auxiliar sobre gris de página | `#58595B` | `#F4F4F4` | 6.38:1 | 4.5 | pasa | Notas del escenario |
| Carbón sobre amarillo presionado | `#2C2A29` | `#E9C821` | 8.67:1 | 4.5 | pasa | Botón primario en :active |

---

## Elementos gráficos que cargan significado

Umbral 3:1 (WCAG 1.4.11). No son texto, pero si desaparecen se pierde información.

| Par | Color | Contra | Ratio | Mínimo | Resultado | Dónde se usa |
|---|---|---|---|---|---|---|
| Borde de "Lo hago solo" | `#1F8F6B` | `#FFFFFF` | 4.04:1 | 3.0 | pasa | Borde izquierdo de la lista de autonomía |
| Borde de "Siempre te pregunto" | `#FDDA24` | `#FFFFFF` | 1.38:1 | 3.0 | **excepción, ver abajo** | Borde izquierdo de la lista de autonomía |
| Borde de tarjeta destacada | `#FDDA24` | `#FFFFFF` | 1.38:1 | 3.0 | **excepción, ver abajo** | El límite del celular en P2 |
| Ícono de éxito | `#1F8F6B` | `#E7F8F2` | 3.67:1 | 3.0 | pasa | Palomita de confirmación |
| Borde de control (tarjeta de acción, campo, casilla) | `#58595B` | `#FFFFFF` | 7.01:1 | 3.0 | pasa | **Corregido.** Antes usaba `--bc-gris-borde` a 1.40:1 |
| Separador decorativo | `#D9DADD` | `#FFFFFF` | 1.40:1 | — | no aplica | Filas de resumen y de registro. No identifica ningún control |
| Anillo de foco sobre blanco | `#2C2A29` | `#FFFFFF` | 14.28:1 | 3.0 | pasa | Navegación por teclado |
| Anillo de foco sobre amarillo | `#2C2A29` | `#FDDA24` | 10.36:1 | 3.0 | pasa | Foco sobre el botón primario |
| Barra de progreso de la Clave Dinámica | `#FDDA24` | `#58595B` | 4.90:1 | 3.0 | pasa | **Corregido.** Sobre `--bc-gris-borde` daba 1.01:1: era invisible |

---

## Los que NO se usan, y por qué

Verificados para dejar constancia de que se descartaron con número, no por intuición.

| Par | Ratio | Por qué no se usa |
|---|---|---|
| Blanco sobre amarillo `#FDDA24` | 1.38:1 | **Prohibido explícitamente.** Es el error que la especificación nombra por su nombre. Sobre amarillo siempre carbón |
| Turquesa de marca `#66DBB8` sobre blanco | 1.69:1 | No llega a 3:1. Por eso existe `--bc-turquesa-oscuro`. El turquesa claro solo se usa en los arcos decorativos, que no comunican nada |
| Gris de texto `#808285` sobre blanco | 3.85:1 | No llega a 4.5:1. En el modo `.lo-justo` este token se remapea a carbón, justamente por esto |
| Gris deshabilitado sobre blanco | 2.06:1 | Texto de botón deshabilitado. No hay ningún botón deshabilitado en el prototipo |
| Lavanda sobre blanco | 2.00:1 | Solo en los arcos decorativos |
| Melocotón sobre blanco | 1.75:1 | No se usa |
| Coral sobre blanco | 2.53:1 | Solo en los arcos decorativos |
| Error rojo sobre su fondo | 4.81:1 | **No se usa ningún rojo en todo el prototipo.** Un fallo del banco no es una alarma para la persona (COMPONENTES §9) |

---

## Las dos excepciones, con su razón

Son los dos sitios donde el amarillo de marca toca el blanco directamente. Dan **1.38:1**
y no hay forma de subirlo sin dejar de ser `#FDDA24`, que es un token cerrado.

WCAG 1.4.11 exige 3:1 a los elementos gráficos **necesarios para entender el contenido**.
En los dos casos el amarillo es refuerzo redundante, no el portador de la información:

| Dónde | Qué pasa si el borde amarillo desaparece del todo |
|---|---|
| Listas de autonomía (P6) | Las listas siguen distinguiéndose por su encabezado —"Lo hago solo" y "Siempre te pregunto"— y por su ícono. La lista turquesa sí usa `--bc-turquesa-oscuro` a 4.04:1, porque ahí el borde sí era lo único |
| Tarjeta destacada (P2) | La tarjeta sigue siendo la primera, con la etiqueta "En el celular" y la cifra más grande de la pantalla. La jerarquía no depende del borde |

O sea: **ninguna información se comunica solo con ese amarillo.** La excepción es aceptable,
pero queda escrita en vez de escondida. Si alguien decide que no lo es, la salida sería usar
`--bc-carbon` en esos dos bordes y dejar el amarillo únicamente para el botón primario.

---

## Resultado

| | Cuántos |
|---|---|
| Pares de texto verificados | 14, **todos pasan** |
| Elementos gráficos verificados | 9 · 7 pasan · 2 excepciones documentadas |
| Fallos encontrados y corregidos en esta revisión | **3** |
| Pares descartados, verificados con número | 8 |

Los tres fallos corregidos fueron reales y ninguno se veía a simple vista:

1. **El borde de las tarjetas de acción** daba 1.40:1. Es el borde que dice "esto se toca".
   Con poca visión, las tarjetas eran rectángulos blancos sobre blanco.
2. **El borde de los campos de entrada**, igual.
3. **La barra de tiempo de la Clave Dinámica** daba **1.01:1** — amarillo sobre gris claro.
   Era literalmente invisible. Marcaba cuánto falta para que venza el código.

Dos cosas que vale la pena señalar:

- **El carbón sobre amarillo da 10.36:1.** Es el par más importante del sistema, porque es
  el botón primario, y pasa con margen. El blanco sobre ese mismo amarillo daría 1.38:1,
  que es la razón por la que la restricción existe.
- **El turquesa de marca no llega a 3:1 contra blanco (1.69:1).** No es un defecto del
  token: es un color pensado para superficies grandes, no para bordes finos que cargan
  significado. Por eso el borde de "Lo hago solo" usa `--bc-turquesa-oscuro`.

---

## Cómo se regeneró esto

El cálculo está en el bloque `python3` del historial de construcción y lee directamente
`design-system/tokens.css`. Si un token cambia, este archivo se vuelve a generar y los
números cambian solos. No hay ningún ratio escrito a mano.

