//*-------------------------CARROUSEL***************************************/

// Seleccionamos todos los bloques de slides completos
const slides = document.querySelectorAll('.slide');
let posicion = 0;

function activarSlide(index) {
    // Quitamos la clase active de todos los bloques
    slides.forEach((slide) => slide.classList.remove('active'));
    // Se la sumamos únicamente al bloque actual
    slides[index].classList.add('active');
}

function siguiente() {
    posicion = posicion + 1;
    if (posicion >= slides.length) {
        posicion = 0;
    }
    activarSlide(posicion);
}

function anterior() {
    posicion = posicion - 1;
    if (posicion < 0) {
        posicion = slides.length -1;
    }
    activarSlide(posicion);
}
/************CONTACTO************* */
        // Seleccionamos el formulario del HTML
        const form = document.querySelector('form');
if (form) {
         form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evita que la página se recargue y se pierdan los datos

            // Capturamos la información de los inputs
            const formData = new FormData(form);
            const datos = Object.fromEntries(formData.entries());

            // 1. Esto lo ves apretando F12 en la consola del navegador
            console.log('Datos enviados:', datos);

            // 2. Feedback visual: Cartelazo para que el usuario sepa que funcionó
            alert(`¡Gracias ${datos.nombre}! Recibimos tus datos correctamente.`);
            
            // 3. Limpiamos el formulario para que quede vacío otra vez
            form.reset(); 
        });
}
        // Escuchamos el momento en que el usuario hace click en enviar


/*---------------------------DONAR-----------------------------------*/
    // ---- Lógica del modal ----
    function abrirModal() {
      document.getElementById('modalOverlay').classList.add('abierto');
      document.body.style.overflow = 'hidden';
    }

function cerrarModal() {
      document.getElementById('modalOverlay').classList.remove('abierto');
      document.body.style.overflow = '';
      // Reset
      setTimeout(() => {
        document.getElementById('calculadoraScreen').style.display = 'block';
        document.getElementById('graciasScreen').classList.remove('visible');
        document.getElementById('resultadoImpacto').classList.remove('visible');
        document.getElementById('inputMonto').value = '';
        document.querySelectorAll('.monto-btn').forEach(b => b.classList.remove('seleccionado'));
        montoActual = 0;
      }, 300);
    }

    // Cerrar al hacer click en el overlay
    const modalOverlay = document.getElementById('modalOverlay');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) cerrarModal();
      });
    }

    let montoActual = 0;

    function seleccionarMonto(monto, btn) {
      montoActual = monto;
      document.getElementById('inputMonto').value = monto;
      document.querySelectorAll('.monto-btn').forEach(b => b.classList.remove('seleccionado'));
      btn.classList.add('seleccionado');
      calcularImpacto();
    }

    function sincronizarInput(val) {
      montoActual = parseInt(val) || 0;
      document.querySelectorAll('.monto-btn').forEach(b => b.classList.remove('seleccionado'));
      // Resaltar botón si coincide
      document.querySelectorAll('.monto-btn').forEach(b => {
        if (parseInt(b.dataset.monto) === montoActual) b.classList.add('seleccionado');
      });
    }

    function calcularImpacto() {
      const val = parseInt(document.getElementById('inputMonto').value) || montoActual;
      if (!val || val <= 0) return;
      montoActual = val;

      let texto = '';
      const fmt = (n) => n.toLocaleString('es-AR');

      if (val < 1000) {
        texto = `Con <strong>$${fmt(val)}</strong> aportás insumos de limpieza y mantenimiento para equipos en reparación.`;
      } else if (val < 2500) {
        const kits = Math.floor(val / 500);
        texto = `Con <strong>$${fmt(val)}</strong> cubrís ${kits} kit${kits > 1 ? 's' : ''} de limpieza y cable de alimentación para computadoras reacondicionadas.`;
      } else if (val < 5000) {
        const pcs = (val / 2500).toFixed(1);
        texto = `Con <strong>$${fmt(val)}</strong> financiás la reparación completa de <strong>${pcs} computadora${pcs != 1 ? 's' : ''}</strong>, listas para ser redistribuidas.`;
      } else if (val < 12000) {
        const talleres = Math.floor(val / 5000);
        const extra = val - talleres * 5000;
        texto = `Con <strong>$${fmt(val)}</strong> financiás <strong>${talleres} taller${talleres > 1 ? 'es' : ''} de formación digital</strong>${extra > 0 ? ` y cubrís $${fmt(extra)} de materiales adicionales` : ''}.`;
      } else {
        const aulas = (val / 12000).toFixed(1);
        texto = `Con <strong>$${fmt(val)}</strong> equipás <strong>${aulas} aula${aulas != 1 ? 's' : ''}</strong> escolar completa con computadoras reacondicionadas.`;
      }

      document.getElementById('textoImpacto').innerHTML = texto;
      document.getElementById('resultadoImpacto').classList.add('visible');
    }

    function hacerDonacion() {
      const val = parseInt(document.getElementById('inputMonto').value) || montoActual;
      if (!val || val <= 0) {
        document.getElementById('inputMonto').focus();
        document.getElementById('inputMonto').style.borderColor = '#ef4444';
        setTimeout(() => document.getElementById('inputMonto').style.borderColor = '', 1500);
        return;
      }
      const fmt = (n) => n.toLocaleString('es-AR');
      document.getElementById('graciasTexto').textContent =
        `Tu donación de $${fmt(val)} hace posible que alguien que nunca tuvo acceso a una computadora pueda estudiar, trabajar y proyectarse. ¡Gracias!`;
      document.getElementById('calculadoraScreen').style.display = 'none';
      document.getElementById('graciasScreen').classList.add('visible');
    }
    /* menu hamburguesa*/
    // Función para el menú hamburguesa
function toggleMenu() {
    const links = document.querySelector('.nav-links');
    links.classList.toggle('active');
}
