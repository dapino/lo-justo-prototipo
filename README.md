# Lo justo — prototipo

Un modo simplificado de app bancaria para personas mayores que intentaron usar la app de
su banco, algo falló, nadie les explicó qué pasó, y no volvieron a intentar.

**[Abrir el prototipo →](https://dapino.github.io/lo-justo-prototipo/)**

Arranca en la app de hoy —21 elementos tocables en la primera vista— y de ahí se entra al
modo sencillo. Un solo archivo, sin dependencias. Abre en el celular.

---

> **Aviso.** Esto no es un producto oficial de Bancolombia ni está afiliado a
> Bancolombia S.A. Es un ejercicio de diseño para una prueba técnica. Los valores de
> color y tipografía se extrajeron del sitio web público y de capturas de la app, y
> están marcados con su procedencia en el sistema de diseño. Las marcas y logotipos
> pertenecen a su titular.

---

## La tesis

> El banco le pide a la persona la confianza máxima en el momento en que menos evidencia
> tiene para dársela. Esta propuesta invierte el orden: **primero el banco demuestra que
> es confiable, después pide confianza.**

Dos ideas la sostienen.

**El límite de canal.** Desde el celular solo se alcanza una cantidad que la persona
decide. El resto de su plata no se mueve a ninguna parte: simplemente no es alcanzable
desde ahí. No es una bóveda, es un límite del canal móvil. Si le roban el teléfono, la
pérdida máxima es lo que ella dejó a la mano.

**Un agente que deja constancia.** No es un chat ni un asistente al que hay que ir a
buscar. Detecta que alguien se cayó a mitad de un flujo sin que nadie reporte nada,
diagnostica la causa, nombra al responsable —incluido el banco— y deja la solución lista.
Cada cosa que dice termina en una entrada de bitácora con la hora y si movió plata o no.

Y una regla sin excepciones: **el agente nunca envía ni escribe primero.** Prepara y
espera. Para estas personas, todo lo que llega sin pedirlo es una estafa, y tienen razón.

## Qué hay aquí

| Archivo | Qué es |
|---|---|
| [`deck.html`](https://dapino.github.io/lo-justo-prototipo/deck.html) | **La presentación.** Once diapositivas: el problema, el hallazgo, la propuesta, y a quién todavía no alcanza. Flechas para navegar, `P` para imprimir a PDF |
| [`index.html`](https://dapino.github.io/lo-justo-prototipo/) | **El recorrido.** Nueve pantallas: la app de hoy, la vuelta, el código, el límite, el inicio, confirmar, el comprobante, la bitácora y los límites de la autonomía |
| [`completo.html`](https://dapino.github.io/lo-justo-prototipo/completo.html) | **Los casos límite.** 33 pantallas, 24 de ellas de cosas que salen mal |
| [`v1a-base.html`](https://dapino.github.io/lo-justo-prototipo/v1a-base.html) | Calibración A — la densidad elegida |
| [`v1b-base.html`](https://dapino.github.io/lo-justo-prototipo/v1b-base.html) | Calibración B — lectura más generosa, para comparar |

El recorrido es para ver la idea en dos minutos. Los casos límite son donde se prueba.

En `completo.html` hay una barra lateral para saltar a cualquier escenario. En el celular
el marco desaparece y la app ocupa la pantalla.

## Los casos límite son la prueba, no el relleno

Las 22 situaciones de la especificación, en 24 pantallas — dos de ellas se desdoblan
porque tienen desenlaces opuestos. Cada mensaje de error trae **qué pasó, de quién fue y
qué sigue**, en ese orden y con las etiquetas visibles.

| Grupo | Casos |
|---|---|
| Código y autenticación | no llega · llega expirado · equivocado · bloqueo por tres intentos · sesión que expira · teléfono nuevo |
| Dinero | excede el límite · subir el límite con fricción de 12 horas · saldo insuficiente · destinatario nuevo · **se cae la conexión** (dos desenlaces: la plata salió y no salió) |
| Conexión y dispositivo | sin internet · conexión lenta · teléfono lento |
| Seguridad | llamada sospechosa · bloqueo preventivo · verificar si un mensaje es real |
| La persona | retomar dónde iba · volver después de semanas · alguien ayudando al lado · volver a la sucursal |

## Verificación

Nada se dio por bueno mirándolo. `documentacion/verificar.js` corre 13 comprobaciones
sobre las 33 pantallas: acciones por pantalla, tamaños de texto, contraste calculado,
áreas táctiles medidas, frases prohibidas, colores en duro.

Se abre el prototipo en el navegador, se pega el script en la consola, y devuelve una
tabla. Pasa los 13.

Los tres fallos de contraste que encontró y que ninguna revisión visual había visto están
en [`documentacion/CONTRASTE.md`](documentacion/CONTRASTE.md). El peor daba **1.01:1**.

## Documentación

| Documento | Qué tiene |
|---|---|
| [`VEREDICTO.md`](documentacion/VEREDICTO.md) | **Lo más honesto.** Dónde se sostiene la idea, dónde se rompe, y el caso límite que no pude resolver |
| [`OBSERVACIONES.md`](documentacion/OBSERVACIONES.md) | Contradicciones encontradas al construir y decisiones tomadas por cuenta propia |
| [`CONTRASTE.md`](documentacion/CONTRASTE.md) | 23 pares de color calculados, con la fórmula y las excepciones |
| [`CHANGELOG.md`](documentacion/CHANGELOG.md) | Qué cambió en cada versión y el resultado de cada verificación |
| [`ENTENDIMIENTO.md`](documentacion/ENTENDIMIENTO.md) | Lo que se entendió antes de escribir código |

## El sistema de diseño

Los tokens y componentes salieron de aquí y viven aparte, como paquete instalable:

- **npm** — [`lo-justo-design-kit`](https://www.npmjs.com/package/lo-justo-design-kit)
- **Componentes** — [galería](https://dapino.github.io/lo-justo-design-kit/)
- **Código** — [repositorio](https://github.com/dapino/lo-justo-design-kit)

## Método

Seis entrevistas. **Dan profundidad cualitativa, no validez estadística.** La muestra es
urbana, bancarizada y de ingreso formal. Lo que aportan no es representatividad: es un
mecanismo específico que no encontré descrito en ninguna parte.

Los testimonios no se publican aquí. Son de personas reales y se quedan fuera.
