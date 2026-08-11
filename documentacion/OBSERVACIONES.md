# Observaciones

Contradicciones que encontré, cosas que la especificación no resuelve, y decisiones que
tomé por mi cuenta con su razón. Ninguna de estas es una queja: son las cosas que solo
aparecen cuando uno construye.

Ningún documento de investigación fue modificado.

---

## 1. Contradicción — el tamaño mínimo de texto

**Dónde está.**
`PROTOTIPO-SPEC.md` §5, restricción 2: *"Ningún texto por debajo de 18px."*
`COMPONENTES.md` §11: la etiqueta de la barra de navegación va *"a 16px"*.
`tokens.css`, ámbito `.lo-justo`: `--bc-txt-nota: 16px`.

Tres documentos, dos reglas incompatibles. Y el token, que es la fuente de verdad, estaba
del lado de la que la especificación prohíbe.

**Qué hice.** Subí `--bc-txt-nota` a `18px` en el ámbito `.lo-justo`, con el comentario
del cambio dentro del propio token. Gana la restricción, por dos razones: es la que el goal
repite como no negociable, y es la que responde al hallazgo (31% de discapacidad visual entre
personas mayores certificadas, MinSalud, citado en `COMPONENTES.md`).

**Qué cuesta.** Todo creció: horas de bitácora, notas al pie, etiquetas de nav, marbetes.
Es una de las causas de la observación 3.

---

## 2. Contradicción — el turquesa no pasa contraste

`PROTOTIPO-SPEC.md` §3, P6 pide *"borde izquierdo turquesa"* para la lista "Lo hago solo".
El turquesa de marca es `#66DBB8`, que contra blanco da **1.69:1**.

Ese borde no es decoración: es lo único que distingue visualmente las dos listas. Un elemento
gráfico que carga significado necesita 3:1 (WCAG 1.4.11). No llega ni cerca.

**Qué hice.** Agregué `--bc-turquesa-oscuro: #1F8F6B` (el mismo valor que `--bc-exito`, que ya
existía como turquesa oscurecido para contraste). Da **4.04:1**. Mismo lenguaje de color, misma
familia, contraste real. Y además la lista lleva un título de texto, así que la información
nunca depende solo del color.

---

## 3. Hallazgo de aritmética — las pantallas no caben

Este no lo esperaba y creo que es el más importante de los técnicos.

Con los mínimos que el propio sistema define — cuerpo 18px, notas 18px, área táctil 56px,
cifras de dinero 32px o más, tarjetas de acción de 72px — **las pantallas conceptualmente
más importantes no caben en un teléfono de 390 × 844.**

| Pantalla | Alto en v1a | Sobra sobre el viewport de 824px |
|---|---|---|
| P1 · La vuelta después de la ausencia | 948px | +124 |
| P2 · El límite de canal | 1005px | +181 |
| P4 · Confirmación | 922px | +98 |
| P3 · Inicio | 831px | +7 (cabe) |

Y en v1b, con la lectura generosa, **empeora**: P1 pasa a 966px aunque le fundí dos bloques en uno.

**Por qué importa.** El modo "Lo justo" se justifica en que la app actual tiene 21 elementos
interactivos en la primera vista. La respuesta fue "menos cosas, más grandes". Pero *más grandes*
tiene un costo que nadie contabilizó: **desplaza contenido fuera de la pantalla**. Y lo que se
va abajo es sistemáticamente lo mismo: el sello de identidad, las salidas alternas, el enlace
secundario. O sea, lo que sostiene la confianza.

**Qué hice.** Tres cosas y ninguna resuelve el fondo:
- Los arcos de marca pasaron a `position: absolute`. Son decorativos, así que ahora no cobran
  espacio vertical. Recuperé 64px.
- "Guardado" en el inicio pasó de tarjeta a fila, como pedía la especificación. Recuperé 80px.
- Quité un `padding-bottom` que contaba dos veces el alto de la barra de navegación.

Con eso el inicio cabe. P1 y P2 siguen sin caber.

**Lo que pasó después.** La corrección de concepto del 10 de agosto (observación 4) resolvió
esto de rebote: al dejar de haber un código enviado, **el bloque de éxito de P1 desapareció**.
No había nada que confirmar. P1 bajó de 948px a caber en pantalla. La medición está en la
sección de v1a del changelog.

No es mérito de la calibración: fue el concepto corrigiéndose el que devolvió el espacio.

---

## 4. La contradicción de fondo — el WhatsApp · RESUELTA

**Era la contradicción más seria del proyecto. Ya no está abierta.**

**Qué encontré.** H7 dice que el canal proactivo está capturado por el fraude, y de ahí sale
una prohibición explícita: el agente no inicia contacto por un canal indistinguible del fraude
(`CONCEPTO.md` §6, no negociable 4).

Pero la demostración estrella de la agencia, P1, era exactamente eso: mientras la persona no
estaba, el agente **le mandó un código por WhatsApp**.

WhatsApp es el canal donde Persona 6 recibe *"muchas cosas de que me pueden recoger la deuda,
de que me llaman del banco, y me dicen el nombre y todo"*. Un mensaje del banco que llega sin
que ella lo pidiera, tres días después, con un código adentro, **es indistinguible de la estafa
que ella ya sabe rechazar.** Su heurística — que el proyecto reconoce como correcta — la haría
ignorarlo. La propuesta se mordía la cola.

**Cómo quedó.** `PROTOTIPO-SPEC.md` §3 P1 se corrigió el 10 de agosto con una regla sin
excepciones: **el agente diagnostica, prepara y deja lista la ruta, pero nunca envía ni escribe
primero.** El envío lo dispara la persona desde dentro de la app.

**Qué cambié en el código.** No construí las dos variantes: ya no hay dos.

| Archivo | Antes | Ahora |
|---|---|---|
| `v1a-base.html` P1 | "Cambié la ruta: ahora te llega por WhatsApp" + bloque de éxito "Tu código ya está en WhatsApp" | "Dejé lista otra ruta: sale por WhatsApp cuando tú lo pidas" + botón "Mándamelo por WhatsApp" |
| `v1a-base.html` P1b | no existía | Pantalla nueva: el acuse **después** de que ella lo pide |
| `v1b-base.html` P1 | igual | igual |
| `v2-casos-limite.html` A1 | "Te lo mandé por WhatsApp hace un minuto" | "Lo dejé listo. Sale cuando toques el botón" |
| `v2-casos-limite.html` A2 | "Ya te mandé uno nuevo. No tuviste que pedirlo" | El código nuevo se muestra **dentro de la app**. No sale ningún mensaje |
| `v2-casos-limite.html` P5 | "Cambié el envío del código a WhatsApp" | "Dejé lista otra ruta para el código: WhatsApp" |
| `v2-casos-limite.html` D3 | "Lo que sí te mandé" | "Lo que te mandé, y tú lo pediste" |

**Lo que gana y lo que pierde.**

Pierde el golpe de efecto: "ya está hecho" es más contundente que "está listo para cuando digas".
Gana algo más importante: deja de pedirle a la persona que haga justo lo que su experiencia le
enseñó a no hacer. Y la agencia sigue intacta — detectar el abandono, diagnosticar la causa y
tener la solución lista antes de que la pidan es algo que ningún asistente reactivo hace.
Lo único que cambia es de quién es la última acción.

**Una desviación de la letra de la especificación.** El texto corregido propone *"te lo puedo
mandar por WhatsApp cuando quieras"*. Escribí *"sale por WhatsApp cuando tú lo pidas"* porque
"te lo puedo mandar" es literalmente el patrón que la regla de escritura prohíbe — es la misma
forma que "puedo ayudarte a transferir". Mismo significado, sin voz de asistente.

---

## 5. Lo que la especificación no resuelve — cómo se entera si no vuelve

`GOAL-CLAUDE-CODE.md`, invitación 3, lo plantea directo: *"¿cómo se entera?"*, y admite que
*"hoy la respuesta es cuando abre la app"*.

Trabajé sobre esto y **no le encontré una salida buena**. Todo lo que construí supone que ella
vuelve a abrir. Persona 3 no volvió. La propuesta entera está diseñada para ella y depende
justo de lo único que ella no hizo.

Lo que sí construí, como respuestas parciales:
- Que la vuelta, cuando ocurra, valga la pena: P1 y E2 (volver después de siete semanas).
- Que existan rutas que no pasan por la app: E4 deja el turno preparado para la sucursal.

Es el límite estructural del concepto y está desarrollado en `VEREDICTO.md` §2.

---

## 6. Decisiones que tomé por mi cuenta

| # | Decisión | Por qué |
|---|---|---|
| 1 | `tokens.css` se **enlaza**, no se copia dentro del HTML | "Autocontenido" y "tokens.css importado, nunca colores en duro" son incompatibles al pie de la letra. Enlazar mantiene una sola fuente de verdad y hace imposible que un prototipo se desvíe. Cada versión es autocontenida en todo lo demás |
| 2 | Cada versión **congela su CSS** | Si compartieran un `componentes.css`, editar v3 cambiaría v1a y dejarían de ser comparables. Es una herramienta de decisión, no un producto |
| 3 | La **barra de navegación no cuenta** como acción visible | Es chrome persistente, como el header. El conteo se hace sobre el contenido. Queda dicho para que sea auditable |
| 4 | Agregué **P3b (a quién y cuánto)** y **P4b (comprobante)** | Sin P3b, P4 no es alcanzable. El comprobante es el componente 6 y la invitación 1 del goal |
| 5 | La tercera pestaña de la nav se llama **"Seguridad"** | La especificación pide 3 destinos pero solo nombra dos. "Seguridad" es donde viven los límites de autonomía, la palabra, el bloqueo preventivo y la salida a sucursal |
| 6 | El fallo se muestra con **tres etiquetas fijas** — Qué pasó / De quién fue / Qué sigue | La especificación pide las tres partes pero no que se vean. Hacerlas visibles y siempre iguales las vuelve verificables de un vistazo y aprendibles. Alternativa en prosa construida en v4 |
| 7 | Nombre de ejemplo: **"Marta"** | La especificación pide saludo personalizado. Es un marcador de posición, **no** una persona entrevistada. Los seis participantes se identifican solo por número, siempre |
| 8 | El error de código equivocado **no usa rojo** | La especificación lo pide ("sin alarma, sin rojo") y `COMPONENTES.md` §9 lo razona: un fallo del banco no es una alarma para el usuario. Uso `--bc-gris-fondo-2` con ícono y texto |
| 9 | La alerta antifraude usa **amarillo claro con texto carbón** | Es el único momento donde el amarillo no señala una acción sino un peligro. Es defendible porque el amarillo es el color de la atención en esta marca, y porque la restricción de "un solo amarillo por pantalla" habla de **botones** |

---

## 7. Cosas menores que encontré construyendo

- **Bug de especificidad en mi propio CSS**: `.lo-justo p` (0,1,1) ganaba sobre `.cifra` (0,1,0)
  y aplastaba **todas** las cifras de dinero a 18px, violando la restricción de 32px sin que se
  notara a simple vista. Lo atrapó la medición, no el ojo. Es un buen recordatorio de por qué la
  lista de verificación tiene que correrse con script.

- **La nav `sticky` ya ocupa espacio en el flujo.** Le había puesto además `padding-bottom: 96px`
  al contenedor. 76px de aire fantasma en todas las pantallas con navegación.

- **`COMPONENTES.md` §5 pide la cifra de saldo a `40px` y §14 también dice `40px`, pero
  `PROTOTIPO-SPEC.md` §3 P3 la pide a `36px`.** Usé 40px, que es el valor del sistema de
  componentes y el más grande de los dos. Diferencia menor, la anoto por completitud.

- **`PROTOTIPO-SPEC.md` §3 P1 dice que el bloque del agente va sobre `--bc-gris-fondo-2`,
  pero `COMPONENTES.md` §9 dice que la variante "explica el fallo" va sobre `--bc-alerta-fondo`.**
  P1 *es* una explicación de fallo. Usé `--bc-alerta-fondo`, que es la regla más específica.

- **La especificación pide "$ 300.000" con espacio después del peso** (formato real de la app,
  auditoría móvil §2) pero en `PROTOTIPO-SPEC.md` §5 restricción 8 el ejemplo es "$150.000"
  sin espacio. Usé el formato de la app, que es el verificado con capturas.

---

## 8. Verificación de los casos límite — causa, responsable y siguiente paso

Cada mensaje de fallo de `v2-casos-limite.html`, revisado uno por uno.

| Caso | Causa | Responsable | Siguiente paso |
|---|---|---|---|
| A1 · El código no llega | Tres envíos, ninguno entró | **Nuestro** — el operador bloquea | Ruta cambiada a WhatsApp, ya enviado · o llamada |
| A2 · Llegó expirado | Vencía a los 10 min y llegó tarde | **Nuestro** — la demora fue del envío | Uno nuevo, ya mandado sin pedirlo |
| A3 · Código equivocado | Los dígitos no coinciden | De nadie | Quedan dos intentos · o pedir otro código |
| A4 · Tercer intento | Tres códigos equivocados seguidos | De nadie — es la regla de seguridad | Tres salidas: esperar 30 min · sucursal · línea |
| A5 · Sesión por expirar | 9 minutos sin actividad | De nadie — es la regla | Aviso con 58 segundos y botón "Sigo aquí" |
| A6 · Volvió tras expirar | La sesión se cerró a las 9:13 | De nadie — se avisó antes | Paso 3 guardado completo, se retoma |
| A7 · Teléfono nuevo | Dispositivo no reconocido | De nadie — comprobación de rutina | Dos caminos: código al número viejo · sucursal |
| B1 · Excede el límite | El monto supera el límite del canal | **Tuyo** — tú pusiste ese límite | Tres salidas: enviar el tope · sucursal · subir el límite |
| B2 · Subir el límite | — | — | Espera de 12 h, explicada como protección, no como trámite |
| B3 · Espera en curso | — | — | Contador visible, cancelar es inmediato |
| B4 · Saldo insuficiente | La cuenta no alcanza | De nadie | Faltan **$ 12.400**, cifra exacta · enviar menos · pasar plata en cajero |
| B5 · Destinatario nuevo | Primera vez a esa cuenta | — | Confirmación reforzada con casilla explícita |
| B6 · Se cayó la conexión | Corte al confirmar | **Nuestro** — el corte fue del banco | **La plata NO salió.** Comprobado contra la cuenta |
| B7 · Se cayó, pero salió | Corte después del envío | **Nuestro** | **La plata SÍ salió.** No la mandes otra vez |
| C1 · Sin internet | El teléfono no tiene conexión | De nadie | Tres cosas que sí funcionan sin conexión |
| C2 · Conexión lenta | El banco no ha contestado | — | Qué se espera, cuánto lleva, qué pasa si cierra, corte a los 60 s |
| C3 · Teléfono lento | Rendimiento bajo detectado | — | Animaciones apagadas, cambios instantáneos |
| D1 · Llamada sospechosa | — | — | Colgar y llamar al número de la tarjeta · o bloquear 24 h |
| D2 · Bloqueo preventivo | — | — | Límite en $ 0 hasta mañana, se quita solo en sucursal |
| D3 · Verificar un mensaje | — | — | La palabra + el registro de lo que sí se mandó |
| E2 · Volvió tras semanas | — | — | Estado completo: nada cambió, nada se movió |
| E4 · Prefiere la sucursal | — | — | Turno preparado con lo que va a hacer y qué llevar |

**Ninguno queda sin siguiente paso. Ninguno dice "ocurrió un error".**

Los casos marcados con "—" en responsable no son fallos: son situaciones donde no hay culpa
que asignar y forzarla sonaría raro. En esos, el bloque no usa el formato de tres partes.
