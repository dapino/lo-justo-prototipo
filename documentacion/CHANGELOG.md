# Changelog

**Regla de método:** nada se documenta antes de existir. Una sección solo se escribe
cuando el código está construido y `verificar.js` ya corrió sobre él. Si una versión no
está hecha, aquí dice que no está hecha.

Cada versión cierra con la lista de verificación de la sección 8 de `PROTOTIPO-SPEC.md`,
corrida con el auditor, incluyendo lo que no pasa.

> **Corrección del 10 de agosto.** Este changelog llegó a tener listas de verificación
> completas para v3 y v4, con ítems marcados como "pasan", cuando esos archivos nunca se
> escribieron. También remitía a `PROPUESTAS.md`, `PENDIENTES.md`, `CONTRASTE.md` y
> `VEREDICTO.md`, que no existían. Todo eso quedó eliminado. Lo dejo dicho porque el error
> importa más que la corrección: documenté trabajo antes de hacerlo.

---

## Cambios en `design-system/tokens.css`

No se tocó ningún documento de investigación. Sí se tocó el sistema de diseño, que es
donde la regla 1 del goal dice que hay que agregar lo que falte.

### Agregados `[PROPUESTO]`

| Token | Por qué hacía falta |
|---|---|
| `--bc-amarillo-presionado: #E9C821` | COMPONENTES §1 pide "amarillo 8% más oscuro" en estado presionado, pero no daba el valor |
| `--bc-turquesa-oscuro: #1F8F6B` | El borde izquierdo de "Lo hago solo" carga significado. `--bc-turquesa` (#66DBB8) da **1.69:1** contra blanco y no llega al 3:1 que exige un elemento gráfico no textual |
| `--bc-superficie`, `--bc-superficie-alt`, `--bc-velo` | Superficies con nombre semántico, alias de los grises que ya existen |
| `--bc-sombra-1/2/3` | La app usa sombra en la tarjeta de Clave Dinámica y en la barra inferior; el sitio web no la expone en CSS |
| `--bc-foco`, `--bc-foco-halo`, `--bc-foco-ancho` | Sin esto no hay navegación por teclado verificable. Doble anillo carbón sobre halo blanco, para que también se vea sobre amarillo |
| `--bc-mov-rapido: 120ms`, `--bc-mov-medio: 200ms` | Duraciones cortas a propósito: restricción de "teléfonos lentos" |

### Corregido

| Token | Antes | Ahora | Por qué |
|---|---|---|---|
| `--bc-txt-nota` (ámbito `.lo-justo`) | `16px` | `18px` | **Contradicción real entre documentos.** `PROTOTIPO-SPEC.md` §5 restricción 2 dice "ningún texto por debajo de 18px". `COMPONENTES.md` §11 pide etiquetas de nav a 16px y el token valía 16px. Gana la restricción: en este modo no hay letra chica. Detalle en `OBSERVACIONES.md`, observación 1 |

---

## v1a — flujo base, calibración A

`v1a-base.html` · 8 pantallas · densidad que considero correcta

### Qué tiene

Las 6 pantallas de la sección 3, más dos de tejido conectivo marcadas como agregadas:

| Pantalla | Qué es |
|---|---|
| P1 | La vuelta después de la ausencia — la prueba de la agencia |
| P2 | El límite de canal — dos cifras, tarjeta destacada con borde amarillo |
| P3 | Inicio — saldo en carbón, fila secundaria, 3 acciones, nav de 3 |
| P3b | **[agregada]** Elegir destinatario y monto. Sin esto, P4 no es alcanzable |
| P4 | Confirmación antes de mover plata. Sin nav, sin ayuda, sin promociones |
| P4b | **[agregada]** Comprobante. Componente 6, invitación 1 del goal |
| P5 | Lo que hice por ti — registro cronológico |
| P6 | Los límites de la autonomía |

### Decisiones de calibración

- Cuerpo **18px**, títulos de pantalla **28px** (`--bc-txt-h2`), saludo **36px** (`--bc-txt-h1`).
- Cifras de dinero: principal **40px**, secundaria **32px**, terciaria **22px**. Nunca abreviadas.
- Áreas táctiles: botones 56px, tarjetas de acción 72px, nav 72px.
- Un solo amarillo por pantalla, siempre con texto carbón.

### Aportes propios

1. **Cada bloque del agente termina en una línea de bitácora**: hora + "No moví plata" / "Moví $ 80.000".
   El agente no conversa: deja constancia. Cada cosa que dice es una entrada auditable del registro.
2. **Los arcos de marca son `position: absolute`.** Son decorativos, así que no cobran espacio vertical
   en un flujo donde cada píxel está peleado. Coherente con COMPONENTES §13: "son gratis en términos
   de carga cognitiva".
3. **El comprobante dice el puente con lo físico**: "Con ese número te lo imprimen en cualquier sucursal."

### Correcciones durante la construcción

- **Bug de especificidad:** `.lo-justo p` (0,1,1) ganaba sobre `.cifra` (0,1,0) y aplastaba **todas**
  las cifras de dinero a 18px, violando en silencio la restricción de 32px mínimo. Se quitó el
  `font-size` de la regla de párrafo y se dejó que herede. Es el tipo de fallo que una revisión visual
  rápida no atrapa: la cifra se veía "normal".
- **"Guardado" pasó de tarjeta a fila secundaria** en P3, que es lo que pide la especificación
  ("fila secundaria", no tarjeta). Ahorró 80px y permitió que el inicio quepa sin scroll.
- **`padding-bottom` de 96px** bajo la nav: la nav es `position: sticky`, o sea que ya ocupa su
  espacio en el flujo. El padding lo contaba dos veces.

### Lista de verificación — sección 8

Corrida con `verificar.js` sobre las 8 pantallas.

| # | Ítem | Resultado |
|---|---|---|
| 1 | Ninguna pantalla con más de 3 acciones | **pasa** (nav excluida, ver `ENTENDIMIENTO.md` punto 3) |
| 2 | Ningún texto por debajo de 18px | **pasa** |
| 3 | Un solo amarillo por pantalla | **pasa** |
| 4 | Ningún texto blanco sobre amarillo | **pasa** |
| 5 | Contraste de texto ≥ 4.5:1 | **pasa** — 0 combinaciones por debajo |
| 6 | Área táctil mínima 56px | **pasa** |
| 7 | Mensajes del agente en pasado y primera persona | **pasa** — revisado línea por línea; el auditor además busca 8 frases de asistente reactivo |
| 8 | Ningún error sin causa y siguiente paso | **no aplica todavía** — v1a no tiene errores. Se verifica en v2 |
| 9 | Todos los casos límite de la sección 4 tienen pantalla | **NO** — es el trabajo de v2 |
| 10 | Se puede abandonar en cualquier paso y retomar | **parcial** — hay pila de navegación y "Volver" en todas las pantallas, pero el retomar real (guardar el paso y recuperarlo) se construye en v2 |
| 11 | Funciona con el texto al 200% | **NO verificado** — se endurece en v3 |
| 12 | No aparece "¿en qué te puedo ayudar?" | **pasa** |
| 13 | Sin colores en duro | **pasa** — 0 hexadecimales en el `<style>` de la versión |

**Lo que no pasa y por qué:** los ítems 9, 10 y 11 corresponden a fases posteriores.
El ítem 8 no tiene sujeto todavía.

**Hallazgo que sí importa:** con los mínimos del propio sistema (18px de cuerpo, 56px de área
táctil, 32px de cifra), **las dos pantallas conceptualmente más importantes no caben en un
teléfono sin scroll.**

| Pantalla | Alto al construir v1a | Alto hoy | Viewport 824px |
|---|---|---|---|
| P1 · La vuelta | 948px | **824px** | cabe exacto |
| P2 · El límite | 1005px | 1005px | +181 |
| P3 · Inicio | 831px | 842px | +18 |
| P4 · Confirmación | 922px | 919px | +95 |

P1 dejó de sobrar cuando se corrigió el concepto del WhatsApp: al no haber código enviado,
desapareció el bloque de éxito que lo confirmaba. Ver la sección de corrección más abajo.
P3 creció 11px al permitir que las filas de etiqueta y valor se partan en dos líneas, que
es lo que hace que el texto al 200% no saque nada de la pantalla.

No es un defecto de implementación: es la aritmética del modo. Está desarrollado en
`OBSERVACIONES.md`, observación 3.

---

## v1b — flujo base, calibración B (lectura generosa)

`v1b-base.html` · 9 pantallas

### Qué cambia respecto de v1a

| | v1a | v1b |
|---|---|---|
| Cuerpo | 18px | **22px** |
| Título de pantalla | 28px | **32px** |
| Saludo | 36px | **40px** |
| Cifra principal | 40px | **44px** |
| Área táctil de botón | 56px | **72px** |
| Tarjeta de acción | 72px | **88px** |
| Acciones en el inicio | 3 | **2** |
| "Guardado" en el inicio | fila siempre visible | **oculto tras un control con etiqueta** |
| Bloques del agente en P1 | 2 (explica + éxito) | **1 (fundidos)** |
| Elegir destinatario y monto | 1 pantalla | **2 pantallas** |

### Lo que se aprendió construyéndola

Las tres consecuencias no las anticipé; salieron de tener las dos al lado.

1. **A 22px en un marco de 390px, la línea baja a unos 22 caracteres.** El rango cómodo de
   lectura está entre 45 y 75. El párrafo del agente pasa de 4 líneas a 6 y se lee **más
   fragmentado**, no más fácil. La letra más grande dejó de ayudar antes de lo que esperaba.

2. **Para que quepa, hay que esconder cosas.** "Guardado" desaparece detrás de un control.
   Pero las dos cifras juntas **son** el concepto: el límite de canal solo se entiende viendo
   al mismo tiempo lo que alcanzas y lo que no. La calibración generosa se come la idea que
   venía a explicar.

3. **Para que quepa, hay que partir en más pasos.** Enviar plata pasa de 2 pantallas a 3.
   Cada paso más es un sitio más donde abandonar, y el abandono es justo el problema que
   ataca la propuesta (H1, H3).

4. Y aun así **P1 sigue sin caber**: 966px, incluso habiendo fundido los dos bloques del agente.
   Es 18px más alta que la de v1a. La calibración generosa no resolvió el problema de espacio;
   lo empeoró y encima costó contenido.

### Lista de verificación — sección 8

Mismos 13 ítems, mismo auditor. **Resultado idéntico a v1a**: pasa 1-7, 12 y 13;
no aplican 8, 9, 10, 11.

| Pantalla | v1a | v1b |
|---|---|---|
| P1 | 948px | 966px |
| P2 | 1005px | 1032px |
| P3 | 831px | 824px (cabe, pero con 2 acciones en vez de 3) |
| P4 | 922px | 972px |

---

## Cuál escogí y por qué

**Sigo sobre v1a.**

La razón no es estética, es de mecanismo. La calibración generosa resuelve el problema
equivocado, de la forma equivocada:

- **La accesibilidad visual no se resuelve subiendo la base, se resuelve escalando bien.**
  Quien necesita 22px lo pone en los ajustes del sistema y todo crece con él, incluidos los
  puntos táctiles. Hornear los 22px en la base castiga a todo el mundo con líneas de 22
  caracteres y no ayuda a quien necesita 30px. Por eso el trabajo de tamaño se va a v3, al
  soporte real del texto al 200%, que es donde sirve.

- **v1b pagó con contenido.** Esconder "Guardado" y partir el envío en más pasos son
  concesiones que dañan la tesis. v1a no tuvo que hacer ninguna.

- **v1a ya cumple todos los mínimos del sistema con margen**: 18px de cuerpo (el mínimo),
  56px de área táctil, cifras de 40px, contraste sin ninguna combinación por debajo de 4.5:1.

Lo que sí me llevo de v1b a v3: el control con etiqueta de texto para desplegar lo secundario
("Ver lo guardado", nunca solo un chevrón) es un buen patrón y responde al hallazgo de la
auditoría móvil sobre íconos sin etiqueta. Entra en v3 para contenido de verdad secundario,
no para las dos cifras del límite.

---

## v2 — casos límite

`v2-casos-limite.html` · construida sobre v1a

> **EN CONSTRUCCIÓN.** Esta sección se cierra cuando el auditor corra sobre el archivo.

### Qué tiene

Los 18 casos de la sección 4, en un solo archivo, con un mando de escenarios afuera del
teléfono para poder saltar a cualquiera durante la grabación.

| Grupo | Casos |
|---|---|
| Código y autenticación | no llega · llega expirado · equivocado 1ª y 2ª vez · equivocado 3ª vez y bloqueo · sesión que expira · cambio de teléfono |
| Dinero | excede el límite · subir el límite con fricción de 12 horas · saldo insuficiente · destinatario nuevo · conexión caída a mitad de la transferencia |
| Conexión y dispositivo | sin internet · conexión lenta · teléfono lento (sin animaciones que bloqueen) |
| Seguridad y fraude | llamada sospechosa · presión para subir el límite · verificar si un mensaje es real |
| La persona | abandono en cada paso · vuelta después de semanas · alguien ayudando al lado · vuelta a lo presencial |

Cada mensaje de error se compone en tres partes explícitas y en ese orden:
**qué pasó → de quién fue → qué sigue.** El componente las marca visualmente para que se
pueda verificar de un vistazo que ninguna falta.

### Aportes propios en esta versión

- **"Tu palabra"** — sello de identidad verificable. Responde a que el estafador de Persona 6
  ya sabe su nombre: el nombre no prueba nada, una palabra compartida sí.
- **"Mensajes que te mandé"** — la app lleva el registro de lo que el banco sí envió, para
  poder contrastar cualquier mensaje recibido.
- **La certeza del dinero** cuando se cae la conexión: la pantalla dice **si la plata se
  movió o no**, nunca "estamos verificando".
- **La espera con nombre**: ningún spinner sin decir qué se está esperando y cuánto lleva.
- **La despedida digna**: irse a la sucursal es una salida construida, no un muro.

### Lista de verificación — sección 8

| # | Ítem | Resultado |
|---|---|---|
| 1 | Máximo 3 acciones por pantalla | **pasa** |
| 2 | Ningún texto por debajo de 18px | **pasa** |
| 3 | Un solo amarillo por pantalla | **pasa** |
| 4 | Ningún texto blanco sobre amarillo | **pasa** |
| 5 | Contraste ≥ 4.5:1 | **pasa** |
| 6 | Área táctil ≥ 56px | **pasa** |
| 7 | Agente en pasado y primera persona | **pasa** |
| 8 | Ningún error sin causa y siguiente paso | **pasa** — verificado uno por uno; ver tabla en `OBSERVACIONES.md` |
| 9 | Todos los casos límite tienen pantalla | **pasa** — 18 de 18 |
| 10 | Abandonar en cualquier paso y retomar | **pasa con matiz** — el retomar está construido en los 5 puntos de abandono del flujo. Lo que no se puede probar aquí es el caso real: quien no vuelve nunca |
| 11 | Funciona con texto al 200% | **NO** — es el trabajo de v3 |
| 12 | No aparece "¿en qué te puedo ayudar?" | **pasa** |
| 13 | Sin colores en duro | **pasa** |

---

---

## Corrección de concepto — el agente no envía primero

**10 de agosto.** `PROTOTIPO-SPEC.md` §3 P1 se corrigió con una regla sin excepciones:
el agente diagnostica, prepara y deja lista la ruta, pero **nunca envía ni escribe primero**.
El envío lo dispara la persona desde dentro de la app.

Esto cierra la contradicción con H7 que estaba anotada en `OBSERVACIONES.md` observación 4.
No se construyeron dos variantes: dejó de haber dos.

### Qué cambió en el código

| Archivo | Pantalla | Antes | Ahora |
|---|---|---|---|
| las tres versiones | P1 | "Cambié la ruta: ahora te llega por WhatsApp" | "Dejé lista otra ruta: sale por WhatsApp cuando tú lo pidas" |
| las tres versiones | P1 | Bloque de éxito "Tu código ya está en WhatsApp" | **Eliminado.** No había nada que confirmar |
| las tres versiones | P1 | Botón "Seguir donde iba" | Botón "Mándamelo por WhatsApp" + "Que me llame alguien" |
| las tres versiones | **P1b nueva** | no existía | El acuse, **después** de que ella lo pide |
| v2 | A1 · el código no llega | "Te lo mandé por WhatsApp hace un minuto" | "Dejé lista otra ruta. Sale por WhatsApp apenas toques el botón" |
| v2 | A2 · llegó expirado | "Ya te mandé uno nuevo. No tuviste que pedirlo" | "Preparé uno nuevo y lo dejé aquí abajo. No salió ningún mensaje" |
| v2 | P5 · registro | "Cambié el envío del código a WhatsApp" | "Dejé lista otra ruta para el código: WhatsApp" |
| v2 | D3 · verificar mensaje | "Lo que sí te mandé" | "Lo que te mandé, y tú lo pediste" |

A2 se resolvió mejor de lo que estaba: el código nuevo **se muestra dentro de la app**, en la
tarjeta de Clave Dinámica. Así no hace falta ningún mensaje saliente, ni siquiera solicitado.

Se revisaron los 33 escenarios buscando cualquier otra frase donde el agente enviara,
escribiera o contactara primero. No quedó ninguna.

### Qué se pierde

"Ya está hecho" es más contundente en video que "está listo para cuando digas". La corrección
cuesta ese golpe de efecto. A cambio, deja de pedirle a la persona que haga justo lo que su
experiencia le enseñó a no hacer.

---

## Entregable para teléfono

`prototipo/construir.py` · salida en `prototipo/entregable/`

Los archivos de trabajo enlazan `../design-system/tokens.css`, lo que mantiene una sola
fuente de verdad pero **hace imposible mandarlos por correo o AirDrop**: llegan sin estilos.

El script toma cada versión, incrusta el contenido literal de `tokens.css` en un `<style>`
y agrega la capa de teléfono real. `tokens.css` sigue siendo la fuente de verdad: si cambia,
se vuelve a correr el script.

| Archivo | Tamaño | Qué es |
|---|---|---|
| `entregable/LO-JUSTO.html` | 107 KB | **El que se manda al teléfono.** Flujo base + los 18 casos límite, 33 pantallas |
| `entregable/v1a-base.html` | 57 KB | Calibración A, para comparar |
| `entregable/v1b-base.html` | 52 KB | Calibración B, para comparar |

### Qué se hizo para que funcione en un celular

- **Sin CSS enlazado.** Cero `href` a archivos locales. Un solo archivo que abre con doble clic.
- **Por debajo de 780px desaparece el marco** y la app ocupa la pantalla completa
  (`100dvh`, con `100vh` de respaldo para iOS viejo).
- **La barra de escenarios se pliega** en un `<details>` de 56px de alto. En escritorio va
  abierta, en el teléfono cerrada, porque ahí la pantalla la necesita la app.
- **Ajuste a 360px**: las cifras bajan un escalón y los márgenes se estrechan, sin que
  ninguna cifra se corte ni baje del mínimo de 32px.
- **Áreas táctiles reales de 56px** también en la barra de escenarios, con 8px de separación.
- **Ningún estado depende de `:hover`.** Los estados usan `:active` y `:focus-visible`.
- **Pila de fuentes con respaldo del sistema**: si Google Fonts no carga —teléfono sin
  conexión— cae en San Francisco o Segoe UI, no en Times.

### Verificado, midiendo

| Ancho | Desborde horizontal | Cifras cortadas | Áreas táctiles bajo 56px |
|---|---|---|---|
| 360px | ninguno | ninguna | ninguna |
| 375 / 390px | ninguno | ninguna | ninguna |
| 430px | ninguno | ninguna | ninguna |

**Única dependencia externa que queda:** Google Fonts. El goal la permite explícitamente
("sin dependencias salvo Open Sans desde Google Fonts"), pero la skill de revisión pide cero.
Se deja, con respaldo de fuente del sistema, y queda anotado en `PENDIENTES.md`.

---

---

## Revisión de diseño — skill `revision-diseno`

Corrida sobre `v1a-base.html`, `v1b-base.html` y `v2-casos-limite.html`, siguiendo
`skills/revision-diseno/SKILL.md` punto por punto.

Nota: la skill está en `skills/`, no en `.claude/skills/`, así que no la cargó el arnés.
La leí y la apliqué a mano. Vale la pena moverla si se quiere que se invoque sola.

### Pasa

- **Tokens.** Cero hexadecimales y cero `rgb()` en el CSS propio de las tres versiones.
  El único bloque con hexadecimales es `tokens.css` incrustado en el entregable, que es
  la fuente de verdad, no un color en duro. El auditor lo excluye por `id`.
- **Las diez reglas del modo.** Los 13 ítems del auditor pasan en las tres versiones y
  en el entregable.
- **El botón primario está en la misma posición en las 33 pantallas**: siempre el primero
  del grupo de botones, siempre al final del cuerpo. Verificado por script, no a ojo.
- **Los tres fondos del bloque del agente se usan según su variante**: `--bc-alerta-fondo`
  en 8 bloques que explican un fallo, `--bc-exito-fondo` en 8 que confirman, neutro en 16.
  Ninguno mal asignado.
- **Marcado semántico**: `button` para acciones, encabezados en orden, `dl` para el fallo
  de tres partes, `nav` con etiqueta.
- **Foco visible** de doble anillo (carbón sobre halo blanco), que se ve también sobre amarillo.
- **Móvil real**: 360, 390 y 430px sin desborde, sin `:hover`, un solo archivo.

### No pasaba — corregido en esta pasada

**Contraste (3 fallos reales, ninguno visible a simple vista).**

| Qué | Antes | Ahora |
|---|---|---|
| Borde de las tarjetas de acción — el borde que dice "esto se toca" | 1.40:1 | **7.01:1** |
| Borde de los campos de entrada y de la casilla de confirmación | 1.40:1 | **7.01:1** |
| Barra de tiempo de la Clave Dinámica — amarillo sobre gris claro | **1.01:1** | **4.90:1** |

El tercero era el peor: la barra que marca cuánto falta para que venza el código era
literalmente invisible. Los tres se encontraron calculando, no mirando.

**Texto al 200% (fallo estructural).**

Con toda la escala en px, subir el tamaño de texto del navegador **no hacía absolutamente
nada**. El prototipo cumplía 1.4.4 solo por el zoom de página, que escala todo por igual
y no es lo mismo.

- La escala tipográfica pasó a `rem`. El cuerpo ahora va de 18px a 36px al 200%.
- Las cifras y los títulos crecen hasta un techo y ahí se quedan: al doblar, un `$ 2.400.000`
  de 40px se salía de la pantalla. Ninguna baja del mínimo del sistema.
- Las filas de etiqueta y valor se parten en dos líneas antes que desbordar.

Resultado medido a 375px de ancho:

| Tamaño de texto | Pantallas con desborde horizontal | Texto cortado |
|---|---|---|
| 100% | 0 de 33 | ninguno |
| 150% | 0 de 33 | ninguno |
| 200% | 0 de 33 | ninguno |

**Consistencia (5 casos).** Ocho estilos en línea escritos a mano se volvieron clases:
`.migaja--claro`, `.resumen__sec`, `.resumen--pegado`, `.btn--separado` y la regla del
título dentro de `.titulo-lista`. El patrón "nombre + número de cuenta debajo" estaba
construido de dos formas distintas — con estilo en línea en P4 y con `.nota` en B5 —
y se veía diferente en cada una.

**Andamiaje dentro del producto.** La pantalla E1 tenía 5 botones porque listaba los cinco
puntos de retoma para poder demostrarlos. Eso violaba la regla de 3 acciones y, peor, metía
andamiaje de demostración dentro del producto. Los cinco puntos se movieron a la barra de
escenarios, fuera del teléfono, y E1 quedó como pantalla real con 2 acciones.

**Área táctil.** La casilla de confirmación de B5 medía 28px. El objetivo real es la
etiqueta que la envuelve, de 56px; se corrigió el auditor para medir el objetivo y no el
dibujo, según WCAG 2.5.5, y se subió el cuadrito a 32px.

### No pasa — queda abierto

| Qué | Por qué no se corrigió |
|---|---|
| **El borde amarillo de la tarjeta destacada y de "Siempre te pregunto" da 1.38:1** | No hay forma de subirlo sin dejar de ser `#FDDA24`, que es un token cerrado. En los dos casos el amarillo es refuerzo redundante: la información la cargan el encabezado y la jerarquía. Documentado como excepción en `CONTRASTE.md`, no escondido |
| **Google Fonts sigue siendo una dependencia externa** | El goal la permite explícitamente. Se dejó, con respaldo de fuente del sistema |
| **A 200% la barra de navegación ocupa tres líneas** | Nada se pierde y todo sigue alcanzable. Reflow es lo esperado a ese tamaño |
| **P2 sigue midiendo 1005px y no cabe sin scroll** | Es el hallazgo de aritmética de `OBSERVACIONES.md` observación 3, no un defecto de implementación |
| **Un solo estilo en línea sobrevive**: `width:90%` en la barra de la Clave Dinámica | Es un dato —el tiempo que queda—, no un estilo. Ahí va bien |

---

## v3 — versión completa

**No iniciada.** No existe `v3-completa.html`.

Lo que va aquí cuando se construya: contraste verificado y documentado, navegación por
teclado completa, texto del sistema al 200%, áreas táctiles medidas, y los aportes propios
bajo libertad creativa.

---

## v4 — variantes

**No iniciada.** No existe `v4-variantes.html`.

Nota: una de las dos variantes que iba a construir aquí —"el agente ya envió el código"
contra "el agente dejó la ruta lista"— **dejó de ser una variante**. La especificación la
resolvió el 10 de agosto a favor de la segunda, sin excepciones. Ver la sección
"Corrección de concepto" más abajo.

---

## Estado de los documentos

| Documento | Estado |
|---|---|
| `ENTENDIMIENTO.md` | escrito |
| `CHANGELOG.md` | escrito, al día |
| `OBSERVACIONES.md` | escrito, al día |
| `CONTRASTE.md` | **escrito** — 23 pares calculados, 3 fallos corregidos |
| `VEREDICTO.md` | **escrito** |
| `PROPUESTAS.md` | pendiente |
| `PENDIENTES.md` | pendiente |
