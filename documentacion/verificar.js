/* ============================================================
   Auditor de la lista de verificación — sección 8 de PROTOTIPO-SPEC.md

   Cómo usarlo: abre cualquier vN.html en el navegador, abre la consola
   y pega el contenido de este archivo. Devuelve un objeto con el
   resultado de cada ítem y el detalle de lo que no pasa.

   Solo audita lo que está DENTRO del marco de teléfono (.tel).
   La barra de mando y los títulos del escenario son andamiaje de
   presentación, no producto.
   ============================================================ */
(function () {
  'use strict';

  var TEL = document.querySelector('.tel');
  var pantallas = Array.prototype.slice.call(document.querySelectorAll('.pantalla'));
  var fallos = [];
  var resultado = {};

  function rgb(c) {
    var m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(c || '');
    return m ? [+m[1], +m[2], +m[3]] : null;
  }
  function lum(c) {
    return c.map(function (v) {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    }).reduce(function (a, b, i) { return a + b * [0.2126, 0.7152, 0.0722][i]; }, 0);
  }
  function contraste(a, b) {
    var l1 = lum(a), l2 = lum(b);
    return ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05));
  }
  function esAmarillo(c) { var r = rgb(c); return r && r[0] > 240 && r[1] > 200 && r[2] < 90; }

  /* Recorre cada pantalla haciéndola visible para poder medir */
  function porPantalla(fn) {
    var previa = document.querySelector('.pantalla[data-activa]');
    pantallas.forEach(function (p) {
      pantallas.forEach(function (q) { delete q.dataset.activa; });
      p.dataset.activa = '';
      fn(p);
    });
    pantallas.forEach(function (q) { delete q.dataset.activa; });
    if (previa) { previa.dataset.activa = ''; }
  }

  /* --- 1. Ninguna pantalla con más de 3 acciones ------------------
     Se cuentan las acciones del contenido. La barra de navegación
     inferior es chrome persistente y no cuenta (decisión registrada
     en ENTENDIMIENTO.md, punto 3). */
  var excesoAcciones = [];
  porPantalla(function (p) {
    var n = p.querySelectorAll(
      '.cuerpo button, .cuerpo a[href], .cuerpo input, .cuerpo select'
    ).length;
    if (n > 3) { excesoAcciones.push(p.id + ': ' + n); }
  });
  resultado['1. Máximo 3 acciones por pantalla'] = excesoAcciones.length ? 'NO — ' + excesoAcciones.join(' · ') : 'sí';

  /* --- 2. Ningún texto por debajo de 18px ------------------------ */
  var chicos = {};
  porPantalla(function (p) {
    p.querySelectorAll('*').forEach(function (el) {
      if (!el.textContent.trim() || el.children.length && !Array.prototype.some.call(el.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); })) { return; }
      var fs = parseFloat(getComputedStyle(el).fontSize);
      if (fs < 18) { chicos[p.id + ' ' + el.tagName.toLowerCase() + '.' + (el.className || '') + ' = ' + fs + 'px'] = true; }
    });
  });
  var listaChicos = Object.keys(chicos);
  resultado['2. Ningún texto por debajo de 18px'] = listaChicos.length ? 'NO — ' + listaChicos.length + ' casos: ' + listaChicos.slice(0, 6).join(' | ') : 'sí';

  /* --- 3. Un solo amarillo por pantalla --------------------------
     Se cuentan superficies amarillas que sean ACCIÓN. La marca del
     agente y los bordes de acento no son acciones. */
  var amarillos = [];
  porPantalla(function (p) {
    var n = 0;
    p.querySelectorAll('.cuerpo button, .cuerpo a').forEach(function (el) {
      if (esAmarillo(getComputedStyle(el).backgroundColor)) { n++; }
    });
    if (n > 1) { amarillos.push(p.id + ': ' + n); }
  });
  resultado['3. Un solo botón amarillo por pantalla'] = amarillos.length ? 'NO — ' + amarillos.join(' · ') : 'sí';

  /* --- 4. Ningún texto blanco sobre amarillo --------------------- */
  var sobreAmarillo = [];
  porPantalla(function (p) {
    p.querySelectorAll('*').forEach(function (el) {
      var e = getComputedStyle(el);
      if (!esAmarillo(e.backgroundColor)) { return; }
      var texto = rgb(e.color);
      if (!texto || !el.textContent.trim()) { return; }
      var fondo = rgb(e.backgroundColor);
      var r = contraste(texto, fondo);
      if (r < 4.5) { sobreAmarillo.push(p.id + ' ' + (el.className || el.tagName) + ' = ' + r.toFixed(2) + ':1'); }
    });
  });
  resultado['4. Ningún texto blanco sobre amarillo'] = sobreAmarillo.length ? 'NO — ' + sobreAmarillo.join(' · ') : 'sí';

  /* --- 5. Contraste general 4.5:1 -------------------------------- */
  function fondoReal(el) {
    var n = el;
    while (n && n !== document.documentElement) {
      var c = rgb(getComputedStyle(n).backgroundColor);
      var a = /rgba?\([^)]*,\s*([\d.]+)\)/.exec(getComputedStyle(n).backgroundColor);
      if (c && (!a || parseFloat(a[1]) > 0.5)) { return c; }
      n = n.parentElement;
    }
    return [255, 255, 255];
  }
  var bajos = [];
  porPantalla(function (p) {
    p.querySelectorAll('*').forEach(function (el) {
      var propio = Array.prototype.some.call(el.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
      if (!propio) { return; }
      var e = getComputedStyle(el);
      var t = rgb(e.color); if (!t) { return; }
      var r = contraste(t, fondoReal(el));
      if (r < 4.5) { bajos.push(p.id + ' ' + (el.className || el.tagName) + ' = ' + r.toFixed(2) + ':1'); }
    });
  });
  resultado['5. Contraste de texto 4.5:1'] = bajos.length ? 'NO — ' + bajos.length + ': ' + bajos.slice(0, 8).join(' | ') : 'sí';

  /* --- 6. Área táctil mínima 56px -------------------------------- */
  var chicasTactiles = [];
  porPantalla(function (p) {
    p.querySelectorAll('button, a[href], input').forEach(function (el) {
      /* El área táctil de un control con etiqueta envolvente es la etiqueta
         entera, no el cuadrito. WCAG 2.5.5 mide el objetivo, no el dibujo. */
      var objetivo = el.closest('label') || el;
      var r = objetivo.getBoundingClientRect();
      if (r.height > 0 && r.height < 56) { chicasTactiles.push(p.id + ' ' + (el.className || el.tagName) + ' = ' + Math.round(r.height) + 'px'); }
    });
  });
  resultado['6. Área táctil mínima 56px'] = chicasTactiles.length ? 'NO — ' + chicasTactiles.join(' · ') : 'sí';

  /* --- 7. No aparece "¿en qué te puedo ayudar?" ni voz de asistente */
  var texto = TEL.innerText.toLowerCase();
  var prohibidas = [
    'en qué te puedo ayudar', 'cómo te puedo ayudar', 'puedo ayudarte',
    'ocurrió un error', 'intenta más tarde', 'intente más tarde',
    '¿quieres que te explique', 'estoy aquí para'
  ];
  var encontradas = prohibidas.filter(function (f) { return texto.indexOf(f) !== -1; });
  resultado['7. Sin frases de asistente reactivo'] = encontradas.length ? 'NO — ' + encontradas.join(' · ') : 'sí';

  /* --- 8. Sin diminutivos ni trato paternalista ------------------ */
  var paternal = ['abuelit', 'tranquilit', 'es muy fácil', 'facilito', 'poquit', 'no te preocupes'];
  var pat = paternal.filter(function (f) { return texto.indexOf(f) !== -1; });
  resultado['8. Sin diminutivos ni trato paternalista'] = pat.length ? 'NO — ' + pat.join(' · ') : 'sí';

  /* --- 9. Sin scroll horizontal ---------------------------------- */
  var lienzo = document.querySelector('.tel__lienzo');
  var hOver = [];
  porPantalla(function (p) {
    if (lienzo.scrollWidth > lienzo.clientWidth + 1) { hOver.push(p.id); }
  });
  resultado['9. Sin scroll horizontal'] = hOver.length ? 'NO — ' + hOver.join(' · ') : 'sí';

  /* --- 10. Cifras nunca abreviadas ------------------------------- */
  var abrev = /\$\s?[\d.,]+\s?(K|M|mil|millones)\b/i.test(TEL.innerText);
  resultado['10. Cifras completas, nunca abreviadas'] = abrev ? 'NO' : 'sí';

  /* --- 11. Todo botón lleva texto -------------------------------- */
  var mudos = [];
  porPantalla(function (p) {
    p.querySelectorAll('button').forEach(function (b) {
      if (!b.innerText.trim() && !b.getAttribute('aria-label')) { mudos.push(p.id + ' ' + b.className); }
    });
  });
  resultado['11. Todo botón lleva texto'] = mudos.length ? 'NO — ' + mudos.join(' · ') : 'sí';

  /* --- 12. Altura de cada pantalla contra el viewport ------------ */
  var alturas = {};
  porPantalla(function (p) { alturas[p.id] = p.scrollHeight; });
  resultado['12. Alto de pantalla (viewport ' + lienzo.clientHeight + 'px)'] = JSON.stringify(alturas);

  /* --- 13. Colores en duro fuera de tokens ----------------------- */
  /* Se excluye el bloque de tokens incrustado por construir.py: ahí los
     hexadecimales SON la fuente de verdad, no colores en duro. Lo que se
     audita es el CSS propio de la versión. */
  var css = Array.prototype.filter.call(document.querySelectorAll('style'), function (s) {
    return s.id !== 'tokens-incrustados';
  }).map(function (s) { return s.textContent; }).join('\n');
  var duros = (css.match(/#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)/g) || []).filter(function (c) {
    return !/^rgba?\(0,\s*0,\s*0,\s*0\)$/.test(c);
  });
  resultado['13. Colores en duro en el <style> de esta versión'] = duros.length ? 'NO — ' + duros.join(' ') : 'sí, ninguno';

  console.table(resultado);
  window.__verificacion = resultado;
  return resultado;
})();
