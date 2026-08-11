# Veredicto

Mi evaluación del concepto después de haberlo construido. Sin endulzar.

Escrito el 10 de agosto de 2026, con 33 pantallas hechas, los 18 casos límite de la
sección 4 construidos, y el auditor corrido sobre todo.

Lo que sigue no sale de leer los documentos. Sale de haber tenido que escribir cada
frase que el agente dice y cada pantalla donde algo se rompe.

---

## Resumen en cinco líneas

1. **El diagnóstico es correcto y es lo mejor del proyecto.** "El abandono lo causa el silencio" aguanta todo el peso que se le pone encima.
2. **El límite de canal se sostiene solo.** Es la parte más fuerte y la que menos me costó construir.
3. **La agencia se sostiene, pero más débil de lo que se vende.** Al quitarle el envío, lo que queda es detectar, diagnosticar y preparar. Sigue siendo más que Tabot. Es menos que "hace cosas por ti".
4. **Hay un caso límite que no resolví y no creo que tenga solución dentro de esta propuesta:** la persona que no vuelve.
5. **La parte más débil al implementarla fue la escalera de confianza.** Es la que une las dos ideas en el papel y es la única que no supe dibujar.

---

## 1. Dónde se sostiene la idea

### El límite de canal es la mejor parte, y no por la razón que dice el documento

`BOVEDA-Y-AGENCIA.md` lo defiende diciendo que convierte una pérdida catastrófica en una
molestia. Es cierto. Pero construyéndolo descubrí algo más útil: **el límite de canal es lo
único de toda la propuesta que se explica sin explicar.**

Dos cifras, una arriba de la otra. "En el celular $ 300.000. Guardado $ 2.400.000." No hace
falta entender qué es un agente, ni qué es la IA, ni confiar en nada. Se ve y ya está.

Y funciona en las dos direcciones que importan:

- **Hacia la persona:** el miedo de Persona 6 —que si abre la app "se le metan a la cuenta"—
  queda respondido con una restricción real, no con un tono amable.
- **Hacia el banco:** es implementable. Los topes por canal ya existen. Lo nuevo es que sea
  el estado por defecto de entrada y que se vea, no que sea técnicamente posible.

Es también la parte que sobrevivió intacta a la construcción. No tuve que negociar nada,
no encontré ninguna contradicción, no hubo que inventar copy difícil. **Cuando una idea se
construye sin resistencia, casi siempre es porque era buena.**

Lo único que aprendí en contra: en la calibración generosa (v1b) tuve que **esconder** la
segunda cifra detrás de un control para que la pantalla cupiera. Y sin las dos cifras juntas
la idea se cae. O sea que el límite de canal necesita las dos cifras visibles al mismo tiempo,
lo cual pone un piso a cuánto se puede agrandar todo lo demás.

### El diagnóstico del fallo mudo es sólido y bien nombrado

"El abandono lo causa el silencio, no la culpa" es un hallazgo real, bien reformulado desde
una hipótesis que se cayó. Que Persona 3 **no se culpara y desistiera igual** es exactamente
el tipo de detalle que tumba la explicación fácil.

Al construirlo se volvió más fuerte, no más débil. El formato de tres partes —qué pasó,
de quién fue, qué sigue— aguantó los 18 casos límite. En ninguno tuve que escribir algo
vago. Y en tres casos me obligó a diseñar mejor de lo que habría diseñado suelto:

- En B6, la conexión que se cae, la pregunta "de quién fue" me forzó a decir **"nuestro"**
  y a construir dos pantallas distintas —la plata salió y la plata no salió— en vez de una
  sola ambigua que dijera "estamos verificando".
- En A4, el bloqueo por tres intentos, "qué sigue" no dejaba cerrar la pantalla sin tres
  salidas reales. Sin esa casilla obligatoria habría escrito "intenta en 30 minutos" y ya.
- En B1, exceder el límite, la casilla de "responsable" no tenía sentido hasta que entendí
  que la respuesta correcta es **"tuyo, tú pusiste ese límite"**. Eso convirtió un error
  en un recordatorio de una decisión propia. Es el mejor momento del prototipo y salió de
  una restricción de formato, no de una idea.

**Una restricción de escritura terminó produciendo mejor diseño que mis propias ideas.**
Eso es lo más valioso que aprendí construyendo esto.

### La bitácora es la prueba de agencia más barata y más convincente

El aporte que agregué —que cada bloque del agente termine en una línea con la hora y un
"No moví plata" / "Moví $ 80.000"— resultó más fuerte de lo que esperaba.

Convierte cada cosa que el agente dice en una **entrada auditable de un registro**, no en un
mensaje. Un chatbot no puede tener eso porque no toma acciones. Y le da a Persona 6 algo
parecido a lo que va a buscar a la sucursal: constancia de lo que pasó.

Cuesta una línea de 18px. Es lo mejor que hice en todo el prototipo.

---

## 2. Dónde se rompe

### La agencia quedó más chica de lo que el proyecto dice que es

Esto es lo más importante de este documento.

La corrección del WhatsApp era **necesaria y correcta** — H7 tenía razón y la versión
anterior se mordía la cola. Pero hay que decir en voz alta lo que costó.

`CONCEPTO.md` §4 promete cinco cosas: detecta, nombra, recuerda, acota y amplía. Y
`BOVEDA-Y-AGENCIA.md` dice que **"cuatro cosas pasaron sin ella"**: se detectó el abandono,
se diagnosticó la causa, se eligió una alternativa y **se dejó lista**.

Después de la corrección, la cuarta cambió de significado. "Se dejó lista" ya no quiere
decir "el código está en tu WhatsApp". Quiere decir "hay un botón preparado que, si lo
tocas, manda el código". La diferencia entre esas dos frases es la diferencia entre un
agente que actúa y **un agente que deja todo servido y espera**.

Sigue siendo más que Tabot y más que Revolut AIR. Eso no es discutible: ninguno de los dos
detecta que te caíste ni averigua por qué. Pero:

> **Lo que quedó es un agente que hace todo el trabajo cognitivo y nada del trabajo motor.**

Piensa, diagnostica, prepara y explica. No toca nada. Y el proyecto se vende como
"detecta cuando algo falla, explica qué pasó y **actúa sin que se lo pidan**".
Después de la corrección, *actúa* significa *prepara*.

No creo que haya que revertirlo — revertirlo rompe H7 y H7 es correcta. Creo que hay que
**decirlo así en el video** en vez de dejar que se lea como más de lo que es. Un jurado que
lo note y sienta que se lo escondieron va a castigar más que uno al que se lo digan de frente.
El guion actual ya lo hace bien: *"pero no te escribe primero. Nunca."* Esa frase salva el
problema porque lo convierte en decisión, que es lo que es.

### La persona que no vuelve: el caso límite que no resolví

**Este es el que no tiene respuesta convincente, y no es un pendiente menor.**

Toda la propuesta está construida para Persona 3: quiso activar la app, el código no llegó,
nunca supo qué pasó, no volvió a intentar. Es la historia que abre el README, la que sostiene
el HMW y la que se cuenta en el minuto 0:45 del video.

Y todo lo que construí **supone que ella vuelve a abrir la app.**

- P1 —la pantalla más importante, la prueba de la agencia— solo existe cuando ella abre.
- E2 —volver después de siete semanas— solo existe cuando ella abre.
- El registro "Lo que hice por ti" solo se lee cuando ella abre.

Persona 3 no volvió. Ese es el hecho del que sale todo el proyecto.

Las dos salidas posibles están las dos cerradas:

| Salida | Por qué está cerrada |
|---|---|
| Notificación push o mensaje | H7 y la corrección del 10 de agosto. Es indistinguible del fraude, y la heurística de rechazarlo es **correcta** |
| Que alguien la llame | Persona 6: *"me llaman del banco, y me dicen el nombre y todo"* — y ella cuelga. La llamada del banco ya está quemada como canal |

La respuesta que da la especificación corregida es el canal humano: dejar el contexto
preparado para el siguiente contacto en sucursal o corresponsal. **Lo construí (E4) y creo
en él, pero hay que ver qué es exactamente:** es útil el día que ella vaya a la sucursal
por otra cosa. No la alcanza; **la espera**.

Traducido: la propuesta funciona para todo el que vuelve, y para el que no vuelve reduce el
problema de "nunca se entera" a "se entera la próxima vez que vaya al banco por su pensión".
Que no es poco —va todos los meses, es el dato más confiable que tenemos de ella— pero
tampoco es lo que la propuesta promete.

**Cómo lo diría si me preguntan:** el agente no resuelve el abandono. Resuelve la
*reincorporación*. Hace que volver valga la pena y que no haya que empezar de cero. Para que
alguien vuelva la primera vez sigue haciendo falta una persona, y eso está fuera de esta
propuesta.

Si tuviera una semana más, esto es lo único que investigaría: **cuántas de las personas que
abandonan una activación digital vuelven a la sucursal en los 30 días siguientes.** Si el
número es alto, el canal humano cierra el círculo y la propuesta está completa. Si es bajo,
el hueco es estructural. Y ese dato **no existe** — `FUENTES-Y-VERIFICACION.md` ya registra
que nadie mide el abandono en onboarding digital en Colombia.

### La escalera de confianza es la parte más débil, y es la que une todo

`CONCEPTO.md` §2 la pone como el mecanismo que une las dos ideas: se entra por un espacio
pequeño y **cada vez que algo falla y el banco responde bien, el espacio se amplía**.

Es la idea más bonita del proyecto sobre el papel. Es la única que no supe construir.

Los problemas que aparecieron al intentarlo:

1. **No tiene forma visual que no sea gamificación.** Todo lo que se me ocurrió —barra de
   progreso, escalones, niveles— cae en lo que la sección 6 prohíbe explícitamente por
   infantilizar. La única salida que encontré es una lista de hechos con fecha, que es
   correcta pero no se siente una escalera: se siente un historial.

2. **El disparador es perverso.** "Cada vez que algo falla y el banco responde bien" quiere
   decir que **para ganarse más espacio, el banco necesita que las cosas fallen.** Es una
   métrica que premia el fallo bien manejado por encima del sistema que no falla. Nadie va a
   escribir eso en un objetivo de producto, y con razón.

3. **Choca de frente con el límite.** Todo el argumento del límite de canal es que subirlo
   tiene que ser **lento y con fricción deliberada**, porque un límite que sube fácil no
   protege de un estafador que está presionando por teléfono. Pero la escalera dice que el
   espacio se amplía con el uso. Las dos cosas no pueden ser verdad al mismo tiempo sin una
   regla que diga cuándo aplica cada una, y esa regla no está escrita en ninguna parte.

4. **No cabe en tres minutos.** Requiere mostrar el paso del tiempo, que es justo lo que un
   video de tres minutos y un prototipo navegable no pueden mostrar.

**Mi lectura honesta:** la escalera de confianza es un buen argumento conceptual y un mal
mecanismo de producto. En el video funciona como frase. En la implementación, o desaparece
o se convierte en otra cosa. Yo la dejaría fuera del prototipo y la mencionaría como
dirección, no como funcionalidad. Es exactamente lo que `CONCEPTO.md` §9 ya se pregunta
—"si se muestra la escalera completa o solo el primer escalón"— y mi respuesta después de
construir es: **solo el primer escalón, y sin llamarlo escalera.**

### La aritmética del modo: "más grande" tiene un costo que nadie contó

El modo se justifica en un dato bueno: la app actual tiene 21 elementos interactivos en la
primera vista, el modo simple apunta a 5. Eso lo cumplí: el inicio tiene 6 —tres tarjetas y
tres destinos de navegación— y cabe sin scroll.

Pero con los mínimos que el propio sistema define —18px de cuerpo, 18px hasta en las notas,
56px de área táctil, 32px mínimo en las cifras— **las pantallas conceptualmente más
importantes no caben en un teléfono.**

| Pantalla | Alto | Viewport de un iPhone |
|---|---|---|
| P2 · El límite de canal | 1005px | 824px |
| P4 · Confirmación | 919px | 824px |
| D3 · Verificar un mensaje | 1292px | 824px |
| A4 · Bloqueo por tres intentos | 1384px | 824px |

Y lo que se va abajo del pliegue no es aleatorio: **es siempre lo mismo.** El sello de
identidad, las salidas alternas, el enlace secundario. Es decir, exactamente lo que sostiene
la confianza y lo que impide que un error sea un callejón sin salida.

Lo comprobé de la peor manera posible en la calibración generosa (v1b): al subir todo a 22px,
P1 quedó **más alta** que en v1a a pesar de haberle fundido dos bloques en uno. Agrandar no
resolvió nada; empeoró el problema y encima costó contenido.

**La conclusión que me llevo:** "menos cosas, más grandes" está incompleto como principio.
Le falta la segunda mitad: *y lo que sobre, se parte en pasos, no se empuja abajo.* Si el
modo se lleva a producto, esto deja de ser un detalle de maqueta y se vuelve la decisión
central de arquitectura de información.

---

## 3. Las cosas que descubrí construyendo y que no habría descubierto de otra forma

Van sin orden de importancia porque son de tipos distintos.

**El sistema de diseño se contradecía consigo mismo en un punto que importa.**
La restricción decía "ningún texto por debajo de 18px", el documento de componentes pedía
etiquetas de navegación a 16px, y el token valía 16px. Tres documentos, dos reglas. No es
un detalle: la letra chica es exactamente lo que esta población no puede leer, y estaba
autorizada por la fuente de verdad.

**El turquesa de marca no se puede usar para nada que signifique algo.**
`#66DBB8` da 1.69:1 contra blanco. La especificación pide con él el borde que distingue
"lo hago solo" de "siempre te pregunto" — o sea, con un color que casi no se ve.

**Tres bordes invisibles que nadie habría notado mirando.**
El borde de las tarjetas de acción daba 1.40:1. Es el borde que dice "esto se toca". Con
poca visión, las tarjetas eran rectángulos blancos sobre fondo blanco. Y la barra que
marca cuánto falta para que venza la Clave Dinámica daba **1.01:1**: literalmente invisible.
Los tres se encontraron calculando. Ninguno se veía mal.

**El texto al 200% no hacía nada.**
Toda la escala estaba en px. La restricción de accesibilidad estaba escrita, verificada a
ojo, y era falsa. Solo apareció al medirla.

**Un bug de CSS aplastaba todas las cifras de dinero.**
Una regla de párrafo ganaba por especificidad sobre la clase de las cifras y las dejaba en
18px cuando el mínimo es 32px. La pantalla se veía perfectamente normal.

Las cinco tienen la misma moraleja y por eso las junto: **este proyecto tiene reglas de
accesibilidad muy buenas y ninguna forma de saber si se están cumpliendo.** Todas se
verificaban leyendo. Las cinco pasaban la lectura y fallaban la medición.

---

## 4. Qué haría distinto

**1. Empezaría por los casos límite, no por el flujo feliz.**
Construí seis pantallas bonitas y después 18 casos límite. Los casos límite cambiaron
decisiones del flujo feliz —el bloque del agente, el formato del fallo, la posición del
sello— y tuve que volver atrás. El flujo feliz de esta propuesta es trivial: transferir
plata está resuelto desde hace veinte años. **Lo único interesante de este concepto son los
casos límite, y son los que definen la forma de todo lo demás.**

**2. No habría construido la calibración generosa.**
Fue el trabajo menos rentable. La respuesta —que 22px de base fragmenta la línea a 22
caracteres y obliga a esconder contenido— se podía haber sacado midiendo, sin construir
nueve pantallas. Con ese tiempo habría hecho la versión de variantes, que sí decide cosas.

**3. Habría escrito el auditor el primer día.**
Lo escribí después de v1b. Los cinco hallazgos del punto anterior estaban ahí desde la
primera pantalla. Diez minutos de script al principio habrían ahorrado tres rondas de
corrección.

**4. Habría cuestionado el WhatsApp desde el minuto uno.**
Lo detecté leyendo, lo anoté en `ENTENDIMIENTO.md` como duda, y **seguí construyendo encima
igual** durante toda una versión. Anotar una contradicción no es resolverla. Cuando algo
choca con un no negociable, hay que pararse ahí, no dejarlo señalado y seguir.

**5. Documenté trabajo antes de hacerlo, y eso es lo peor que hice.**
Escribí en el changelog las listas de verificación de v3 y v4 —con ítems marcados como
"pasan"— cuando esos archivos no existían. Un changelog que describe lo que uno planea es
peor que no tener changelog, porque parece evidencia. Lo corregí, pero el error importa más
que la corrección: si nadie lo hubiera notado, el documento habría mentido con mi firma.

---

## 5. ¿Sirve la idea?

Sí, con dos recortes.

**Lo que me llevaría a producto sin dudar:**
- El límite de canal como estado por defecto de entrada, con las dos cifras visibles.
- El formato de fallo de tres partes: qué pasó, de quién fue, qué sigue. Aplicado a **toda**
  la app, no solo al modo simple. Es lo más barato y lo que más cambia.
- La bitácora de acciones con la marca de si movió plata o no.
- La detección del abandono a mitad de un flujo, con recuperación del paso exacto.

**Lo que dejaría fuera:**
- La escalera de confianza como funcionalidad. Como dirección, sí. Como pantalla, no.
- Cualquier promesa de que el agente alcanza a quien no vuelve. No la cumple.

**Lo que hay que probar antes de creerse nada:**
Que Persona 6 abra la app después de ver las dos cifras. Todo el concepto descansa en que
un límite visible convierta "abrir una puerta" en "mirar por una ventana". Es una hipótesis
razonable, sale de una frase suya muy clara, y **no está probada**. Seis entrevistas dan el
mecanismo, no la validación.

Y lo diría también así: la parte de este proyecto que más me convence no es el agente.
Es que alguien se haya tomado en serio que **una señora de sesenta años dejó de intentar
porque nadie le dijo qué había pasado**, y haya construido todo alrededor de eso en vez de
alrededor de la tecnología. Esa decisión vale más que cualquiera de las pantallas.
