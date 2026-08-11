# Entendimiento — contrato de trabajo

Escrito **antes** de tocar código, después de leer `GOAL-CLAUDE-CODE.md`, `README.md`,
`PROTOTIPO-SPEC.md`, `design-system/tokens.css`, `design-system/COMPONENTES.md`,
`CONCEPTO.md`, `BOVEDA-Y-AGENCIA.md`, `design-reference/app-movil.md`,
`respuestas-entrevistas.md` y `FUENTES-Y-VERIFICACION.md`.

Fecha: 10 de agosto de 2026.

---

## 1. Qué entendí que hay que construir

Un prototipo navegable en HTML del modo **"Lo justo"** de la app de Bancolombia: una capa
simplificada donde vive un **agente** que hace cuatro cosas que un chatbot no puede hacer.

1. **Detecta** que alguien se cayó a mitad de un flujo, sin que nadie reporte nada.
2. **Diagnostica** la causa y **nombra al responsable** — incluido el banco.
3. **Actúa** dentro de límites explícitos, sin pedir permiso para lo que no mueve plata.
4. **Deja registro** de todo lo que hizo, en una bitácora que la persona puede auditar.

Sobre eso se monta una segunda idea, que es la condición de entrada: **el límite de canal**.
Desde el celular solo se alcanza una cantidad que la persona decide. El resto de su plata
no se mueve a ninguna parte — simplemente no es alcanzable desde ahí.

Las dos ideas son la misma tesis: **el banco demuestra primero, pide confianza después.**

### El propósito real del entregable

Esto no es un producto. Es un instrumento para decidir si la idea sirve. Dos consecuencias
que cambian cómo trabajo:

- **El entregable obligatorio es un video de 3 minutos.** El prototipo existe para que ese
  video se entienda. Optimizo para que los momentos clave se lean de un vistazo en pantalla,
  no para exhaustividad funcional. Nada que solo se aprecie usándolo veinte minutos.
- **Los casos límite son la prueba, no el relleno.** Si un caso límite no tiene una respuesta
  convincente del agente, eso es un hallazgo y va a `VEREDICTO.md` como tal, no a
  `PENDIENTES.md` como tarea menor.

### Los archivos que voy a producir

| Archivo | Qué es |
|---|---|
| `v1a-base.html` | Flujo base de 6 pantallas, densidad calibrada por mí |
| `v1b-base.html` | El mismo flujo con lectura más generosa: menos elementos, más grandes |
| `v2-casos-limite.html` | Los casos límite de la sección 4, integrados |
| `v3-completa.html` | Accesibilidad endurecida + mis aportes bajo libertad creativa |
| `v4-variantes.html` | Las decisiones discutibles construidas de dos formas |
| `CONTRASTE.md` | Cada par de color verificado contra 4.5:1, con el cálculo |
| `CHANGELOG.md` · `OBSERVACIONES.md` · `PROPUESTAS.md` · `PENDIENTES.md` | En paralelo, no al final |
| `VEREDICTO.md` | Dónde se sostiene la idea y dónde se rompe. El que más importa |

> Esta tabla es el **plan**, no un inventario. Lo que existe en cada momento está en
> `CHANGELOG.md`, y ahí solo se escribe después de construir y de correr el auditor.

---

## 2. Decisiones ya cerradas — no las reabro

Las anoto explícitamente para que quede constancia de que no me desvié.

**De la tesis**

1. El banco demuestra primero, pide confianza después. No se discute.
2. El agente **no es una burbuja de chat** ni un asistente al que hay que ir a buscar.
3. El agente **habla en pasado, en primera persona, sobre cosas que ya hizo.** Si una frase se
   puede reemplazar por "¿en qué te puedo ayudar?", está mal escrita.
4. **No es una bóveda.** La plata no se mueve a ningún lado. Es un límite del canal móvil.
5. El agente **nunca inicia contacto por un canal indistinguible del fraude** (H7).
   Sin notificaciones push.
6. Los pasos de seguridad **se quedan**. No se quitan: se explican. Persona 3 dice que no
   pedir clave "facilita las cosas para la gente que es tramposa".

**De la marca**

7. Amarillo `#FDDA24`, carbón `#2C2A29`, botones pill, arcos de color, bloque amarillo completo
   en el destino activo de la nav. La marca **no se rediseña**. Se conserva lo que hace
   reconocible a Bancolombia y se quita lo que compite por la atención.
8. Formato de dinero exacto de la app: `$ 300.000`, punto de miles, nunca abreviado.
9. La Clave Dinámica se conserva íntegra. Solo se le agrega una explicación la primera vez.

**De las restricciones (sección 5 de la especificación)**

10. Máximo 3 acciones visibles · texto nunca bajo 18px · cifras de dinero mínimo 32px ·
    área táctil 56px · un solo botón amarillo por pantalla · todo botón con texto ·
    sin carruseles · sin scroll horizontal · cifras completas · ningún error sin causa y
    siguiente paso · ninguna sesión expira en silencio.
11. **Nunca texto blanco sobre `#FDDA24`.** Sobre amarillo siempre carbón.
12. Tuteo. Sin emojis. Frases de máximo 15 palabras. Sin diminutivos. Voz activa.
    El banco asume la culpa cuando es suya.

**De lo que no se construye (sección 6)**

13. Sin burbuja flotante, sin asistente que haya que buscar, sin push, sin onboarding largo
    de configuración, sin carruseles de ofertas, sin modo de voz, sin gamificación.

**De la evidencia**

14. Los testimonios son **seis** y están en `respuestas-entrevistas.md`. No invento ninguno más.
15. Ninguna cifra entra si no está en la tabla de VERIFICADAS de `FUENTES-Y-VERIFICACION.md`.
16. No modifico ningún documento de investigación.

---

## 3. Decisiones que tomo yo, y que dejo por escrito

Son cosas que la especificación no cierra. Las tomo, las anoto y sigo. Cada una queda
también en `OBSERVACIONES.md` con su razón.

1. **`tokens.css` se enlaza, no se copia.** La regla dice "un archivo autocontenido por versión"
   y también "tokens.css importado, nunca colores en duro". Son incompatibles al pie de la letra.
   Resuelvo enlazando `../design-system/tokens.css`: la fuente de verdad sigue siendo una sola y
   los prototipos no pueden desviarse de ella. Cada HTML es autocontenido en todo lo demás.
2. **Cada versión congela su CSS.** No extraigo un `componentes.css` compartido entre versiones,
   porque entonces `v1a` cambiaría al editar `v3` y dejarían de ser comparables.
3. **La barra de navegación no cuenta como "acción visible".** Es chrome persistente, igual que
   el header. Cuento las acciones del contenido. Lo digo aquí para que el conteo sea auditable.
4. **Agrego dos pantallas de tejido conectivo** al flujo base — elegir destinatario y monto, y el
   comprobante — porque sin ellas P4 no es alcanzable y el flujo no cierra. Van marcadas.
5. **El borde turquesa de "Lo hago solo" usa `--bc-exito` (#1F8F6B), no `--bc-turquesa` (#66DBB8).**
   El turquesa claro da 1.69:1 contra blanco y no alcanza el 3:1 que necesita un elemento gráfico
   portador de significado. Mismo rol, mismo lenguaje, contraste real.
6. **El copy de los casos límite lo escribo yo.** La especificación da las situaciones, no las
   palabras. Cada mensaje de error lleva causa, responsable y siguiente paso, en ese orden.

---

## 4. Dudas que me quedaron

Las que no pude resolver leyendo. No detengo el trabajo por ninguna: tomo una decisión,
la construyo y la dejo señalada.

1. **La contradicción del WhatsApp.** ~~H7 prohíbe que el agente inicie contacto por un canal
   indistinguible del fraude, pero la solución estrella de P1 era que el agente mandó el código
   por WhatsApp mientras la persona no estaba.~~
   **RESUELTA el 10 de agosto.** `PROTOTIPO-SPEC.md` §3 P1 se corrigió: el agente prepara la
   ruta pero nunca envía primero. No hay dos variantes que comparar. Detalle en
   `OBSERVACIONES.md`, observación 4.

2. **¿Cómo se entera si nunca vuelve a abrir la app?** Sin push, la única forma de que el agente
   la alcance es que ella vuelva. Persona 3 **no volvió**. El agente puede ser perfecto y no
   servirle a la persona que motivó todo el proyecto. No tengo una respuesta buena; tengo tres
   parciales y las construyo, pero esto va a `VEREDICTO.md` como límite estructural del concepto.

3. **Quién define el $300.000 inicial.** El agente dice "empecé con $300.000 porque es lo que
   sueles retirar". Para alguien que **nunca ha usado la app**, el banco no tiene ese historial de
   canal digital — aunque sí tenga el de retiros en cajero. Lo asumo así y lo anoto.

4. **Cuánta plata tiene realmente Persona 6 en el celular.** Las cifras $300.000 / $2.400.000
   vienen de la especificación, no de las entrevistas. Las uso porque están en el documento de
   construcción, pero no las presento como dato de investigación en ninguna parte.

5. **El nombre.** "Lo justo" es nombre de trabajo y `CONCEPTO.md` lo deja abierto. No lo cambio.

6. **Si el modo simple convive con el modo normal.** No está resuelto: no sé si es un interruptor
   en ajustes, una decisión del banco, o una app aparte. Lo trato como un modo de la misma app y
   no construyo el interruptor.

---

## 5. Cómo voy a verificar

Después de **cada** versión corro la lista de la sección 8 de `PROTOTIPO-SPEC.md` y escribo el
resultado en `CHANGELOG.md`, incluyendo lo que no pasa. Diez ítems, uno por línea, con evidencia
de cómo lo comprobé — no con un visto bueno a ojo.

Lo que verifico con script y no con criterio: tamaños de fuente bajo 18px, colores en duro fuera
de tokens, presencia de la frase prohibida, y contraste de cada par de color.
