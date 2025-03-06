// Establecer fecha y hora actuales por defecto
document.addEventListener('DOMContentLoaded', function () {
    // Fecha actual
    const hoy = new Date();
    const fechaHoy = hoy.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    document.getElementById('fecha-evaluacion').value = fechaHoy;

    // Hora actual
    const horaActual = hoy.toTimeString().slice(0, 5); // Formato HH:MM
    document.getElementById('hora-evaluacion').value = horaActual;
});

// Definición de descriptores por nivel
const descripcionesNivel = {
    A1: "Nivel inicial. El alumno comprende y utiliza expresiones cotidianas muy básicas y frases sencillas orientadas a la satisfacción de necesidades concretas.",
    A2: "Nivel elemental. El alumno puede comunicarse en tareas sencillas que requieren un intercambio simple de información sobre temas cotidianos y actividades habituales.",
    B1: "Nivel intermedio. El alumno puede comprender los puntos principales cuando se usa un lenguaje claro y puede producir textos sencillos sobre temas familiares.",
    B2: "Nivel intermedio alto. El alumno puede entender las ideas principales de textos complejos y puede interactuar con hablantes nativos con un grado suficiente de fluidez."
};

// Temas por nivel para el cálculo de tiempo
const temasPorNivel = {
    A1: 9,
    A2: 9,
    B1: 10,
    B2: 12
};

// Temario de Aula Internacional por niveles
const temarioAulaInternacional = {
    A1: [
        { unidad: 1, titulo: "Nosotros", temas: ["Saludar y despedirse", "Dar y pedir datos personales", "Recursos para memorizar y para preguntar sobre el idioma"] },
        { unidad: 2, titulo: "Quiero aprender español", temas: ["Expresar intenciones", "Explicar motivos", "Hablar de lo que sabemos hacer en distintos idiomas"] },
        { unidad: 3, titulo: "¿Dónde está Santiago?", temas: ["Describir lugares", "Expresar existencia y ubicación", "Hablar del clima"] },
        { unidad: 4, titulo: "¿Cuál prefieres?", temas: ["Identificar objetos", "Expresar necesidad", "Comprar: preguntar por productos, pedir precios"] },
        { unidad: 5, titulo: "Tus amigos son mis amigos", temas: ["Hablar de hábitos", "Hablar de relaciones personales", "Expresar frecuencia"] },
        { unidad: 6, titulo: "Día a día", temas: ["Hablar de hábitos", "Hablar de horarios", "Expresar frecuencia"] },
        { unidad: 7, titulo: "¡A comer!", temas: ["Desenvolverse en bares y restaurantes", "Pedir y dar información sobre comida", "Hablar de hábitos alimentarios"] },
        { unidad: 8, titulo: "El barrio ideal", temas: ["Describir una ciudad", "Expresar gustos y preferencias", "Hablar del tiempo atmosférico"] },
        { unidad: 9, titulo: "¿Sabes conducir?", temas: ["Hablar de habilidades y aptitudes", "Hablar de cualidades y defectos de las personas", "Expresar gustos y preferencias"] }
    ],
    A2: [
        { unidad: 1, titulo: "El español y tú", temas: ["Hablar de experiencias de aprendizaje", "Expresar finalidad", "Describir sentimientos"] },
        { unidad: 2, titulo: "Una vida de película", temas: ["Relatar y relacionar acontecimientos pasados", "Hablar del inicio y de la duración de una acción", "Localizar una acción en el tiempo"] },
        { unidad: 3, titulo: "Hogar, dulce hogar", temas: ["Describir una casa", "Comparar y expresar coincidencia", "Ubicar objetos en el espacio"] },
        { unidad: 4, titulo: "¿Cómo va todo?", temas: ["Desenvolverse en situaciones cotidianas", "Expresar estados de ánimo", "Hablar de estados físicos y de salud"] },
        { unidad: 5, titulo: "Guía del ocio", temas: ["Hablar de gustos y aficiones", "Explicar cómo hacemos cosas", "Hablar de sentimientos"] },
        { unidad: 6, titulo: "No como carne", temas: ["Hablar de gustos y hábitos alimentarios", "Explicar como se prepara un plato", "Valorar la comida"] },
        { unidad: 7, titulo: "Nos gustó mucho", temas: ["Hablar de experiencias y valorarlas", "Expresar el desconocimiento", "Hacer recomendaciones y expresar prohibiciones"] },
        { unidad: 8, titulo: "Estamos muy bien", temas: ["Hablar de estados de ánimo", "Expresar cambios", "Hablar de dolores, molestias y síntomas"] },
        { unidad: 9, titulo: "Antes y ahora", temas: ["Hablar de hábitos, costumbres y circunstancias en el pasado", "Situar acciones en el pasado y en el presente", "Argumentar y debatir"] }
    ],
    B1: [
        { unidad: 1, titulo: "Volver a empezar", temas: ["Hablar de hábitos en el presente", "Relatar experiencias pasadas", "Hablar del inicio y de la duración de una acción"] },
        { unidad: 2, titulo: "Antes y ahora", temas: ["Hablar de hábitos, costumbres y circunstancias en el pasado", "Situar acciones en el pasado y en el presente", "Argumentar y debatir"] },
        { unidad: 3, titulo: "Prohibido prohibir", temas: ["Expresar prohibición", "Expresar obligatoriedad", "Hablar de hábitos"] },
        { unidad: 4, titulo: "Busque y compare", temas: ["Valorar y comparar", "Describir objetos", "Expresar preferencias"] },
        { unidad: 5, titulo: "Mensajes", temas: ["Desenvolverse por teléfono", "Tomar y dejar recados telefónicos", "Transmitir mensajes"] },
        { unidad: 6, titulo: "El turista accidental", temas: ["Relatar anécdotas", "Hacer hipótesis sobre el pasado", "Hacer valoraciones sobre hechos pasados"] },
        { unidad: 7, titulo: "Tenemos que hablar", temas: ["Aconsejar y sugerir", "Dar instrucciones", "Describir el carácter"] },
        { unidad: 8, titulo: "De diseño", temas: ["Describir las características y el funcionamiento de algo", "Opinar sobre objetos", "Expresar gustos y preferencias"] },
        { unidad: 9, titulo: "Un mundo mejor", temas: ["Valorar situaciones y hechos", "Opinar sobre acciones y conductas", "Expresar acuerdo y desacuerdo"] },
        { unidad: 10, titulo: "Lugares con encanto", temas: ["Describir poblaciones y lugares", "Hablar de cualidades y defectos de un lugar", "Pedir y dar información para llegar a un sitio"] }
    ],
    B2: [
        { unidad: 1, titulo: "Buenas noticias", temas: ["Hablar de cambios", "Contar la historia de una empresa", "Hablar de hábitos en el pasado y en el presente"] },
        { unidad: 2, titulo: "¿Y tú que opinas?", temas: ["Expresar opiniones", "Valorar ideas o situaciones", "Argumentar opiniones"] },
        { unidad: 3, titulo: "Yo nunca lo haría", temas: ["Expresar deseos", "Opinar sobre acciones y conductas", "Expresar prohibiciones y permisos"] },
        { unidad: 4, titulo: "Maneras de vivir", temas: ["Describir actitudes y hábitos", "Hablar de relaciones personales", "Dar consejos"] },
        { unidad: 5, titulo: "Lugares con carácter", temas: ["Describir ciudades y sus características", "Hablar de ventajas e inconvenientes de vivir en un lugar", "Hacer comparaciones"] },
        { unidad: 6, titulo: "Se valorará la experiencia", temas: ["Describir requisitos para un puesto de trabajo", "Hablar de habilidades y aptitudes", "Hablar del proceso de selección laboral"] },
        { unidad: 7, titulo: "Mañana", temas: ["Hacer predicciones", "Expresar condiciones", "Hablar de situaciones hipotéticas"] },
        { unidad: 8, titulo: "El turista accidental", temas: ["Relatar experiencias de viaje", "Hablar de causas y consecuencias", "Contar anécdotas"] },
        { unidad: 9, titulo: "Tenemos que hablar", temas: ["Expresar la causa de algo", "Hablar de problemas de comunicación", "Hacer reproches"] },
        { unidad: 10, titulo: "De diseño", temas: ["Describir el diseño de objetos", "Valorar el diseño de objetos", "Comparar diferentes modelos de objetos"] },
        { unidad: 11, titulo: "Un mundo mejor", temas: ["Opinar sobre temas sociales", "Expresar deseos de cambio", "Proponer soluciones"] },
        { unidad: 12, titulo: "Noticias", temas: ["Transmitir la información de otros", "Referirse a palabras u opiniones propias o de otros", "Relacionar informaciones"] }
    ]
};

// Recomendaciones por nivel y aspecto
const recomendacionesPorNivelYAspecto = {
    A1: {
        "Información personal básica": "Practicar presentaciones y hacer preguntas simples sobre información personal",
        "Presente de verbos básicos": "Reforzar conjugación de verbos regulares y los principales irregulares (ser, estar, ir, tener)",
        "Vocabulario cotidiano": "Ampliar vocabulario con temas de la vida diaria: comidas, familia, números, colores"
    },
    A2: {
        "Descripción de rutinas": "Practicar expresiones de frecuencia y verbos reflexivos",
        "Pasado reciente": "Trabajar el pretérito perfecto con actividades sobre experiencias recientes",
        "Narración básica": "Reforzar el pretérito indefinido con ejercicios narrativos simples",
        "Expresión de planes": "Practicar estructuras de futuro con 'ir a + infinitivo'"
    },
    B1: {
        "Expresión de opiniones": "Ampliar expresiones para dar opiniones y manifestar acuerdo/desacuerdo",
        "Justificación de ideas": "Practicar estructuras causales y construcciones para justificar ideas",
        "Uso de conectores": "Incorporar conectores discursivos más variados en expresión escrita y oral",
        "Expresión de deseos": "Trabajar estructuras con subjuntivo presente para expresar deseos",
        "Subjuntivo en contexto": "Practicar diversos usos del subjuntivo en contextos comunicativos"
    },
    B2: {
        "Expresión de hipótesis": "Reforzar construcciones condicionales y expresiones de probabilidad",
        "Uso del condicional": "Practicar el condicional simple y compuesto en diversos contextos",
        "Vocabulario avanzado": "Ampliar léxico especializado y expresiones idiomáticas"
    }
};

// Función para obtener el valor de un radio button seleccionado
function getRadioValue(name) {
    const radioButtons = document.getElementsByName(name);
    for (let i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return parseInt(radioButtons[i].value);
        }
    }
    return 0; // Si ninguno está seleccionado
}

// Asignación de aspectos a sus niveles
const aspectosPorNivel = {
    A1: ["info-personal", "presente-basico", "vocabulario-basico"],
    A2: ["rutinas", "pasado-reciente", "narracion-basica", "planes"],
    B1: ["opiniones", "justificacion", "conectores", "deseos", "subjuntivo"],
    B2: ["hipotesis", "condicional", "vocabulario-avanzado"]
};

// Nombres descriptivos de los aspectos para mostrar en resultados
const nombresAspectos = {
    "info-personal": "Información personal básica",
    "presente-basico": "Presente de verbos básicos",
    "vocabulario-basico": "Vocabulario cotidiano",
    "rutinas": "Descripción de rutinas",
    "pasado-reciente": "Pasado reciente (pretérito perfecto)",
    "narracion-basica": "Narración básica (pretérito indefinido)",
    "planes": "Expresión de planes (ir a + infinitivo)",
    "opiniones": "Expresión de opiniones",
    "justificacion": "Justificación de ideas",
    "conectores": "Uso de conectores",
    "deseos": "Expresión de deseos",
    "subjuntivo": "Subjuntivo en contexto",
    "hipotesis": "Expresión de hipótesis",
    "condicional": "Uso del condicional",
    "vocabulario-avanzado": "Vocabulario avanzado"
};

// Función principal para evaluar al alumno
function evaluarAlumno() {
    // Estructura para almacenar puntuaciones por nivel
    let puntuaciones = {
        A1: { total: 0, items: 0, aspectos: {} },
        A2: { total: 0, items: 0, aspectos: {} },
        B1: { total: 0, items: 0, aspectos: {} },
        B2: { total: 0, items: 0, aspectos: {} }
    };

    // Recopilar puntuaciones
    for (const nivel in aspectosPorNivel) {
        for (const aspecto of aspectosPorNivel[nivel]) {
            const valor = getRadioValue(aspecto);
            if (valor > 0) { // Solo contar aspectos evaluados
                puntuaciones[nivel].total += valor;
                puntuaciones[nivel].items++;
                puntuaciones[nivel].aspectos[aspecto] = valor;
            }
        }
    }

    // Calcular porcentajes por nivel (solo si hay items evaluados)
    let porcentajes = {};
    for (const nivel in puntuaciones) {
        if (puntuaciones[nivel].items > 0) {
            porcentajes[nivel] = (puntuaciones[nivel].total / (puntuaciones[nivel].items * 5)) * 100;
        } else {
            porcentajes[nivel] = 0;
        }
    }

    // Determinar nivel principal
    let nivelPrincipal = 'A1';
    let maxPorcentaje = porcentajes.A1;

    const niveles = ['A1', 'A2', 'B1', 'B2'];

    // En primer lugar, vamos a evaluar nivel por nivel desde el más alto
    // Un nivel se considera como principal si tiene al menos 70% de dominio
    for (let i = niveles.length - 1; i >= 0; i--) {
        const nivel = niveles[i];
        if (porcentajes[nivel] >= 70 && puntuaciones[nivel].items > 0) {
            nivelPrincipal = nivel;
            maxPorcentaje = porcentajes[nivel];
            break;
        }
    }

    // Caso especial: si no se ha evaluado ningún aspecto de un nivel, 
    // no podemos considerarlo como dominado
    if (puntuaciones[nivelPrincipal].items === 0) {
        nivelPrincipal = 'A1';
        maxPorcentaje = porcentajes.A1;
        // Buscar el nivel más alto evaluado
        for (let i = 1; i < niveles.length; i++) {
            if (puntuaciones[niveles[i]].items > 0 && porcentajes[niveles[i]] > 0) {
                nivelPrincipal = niveles[i];
                maxPorcentaje = porcentajes[niveles[i]];
            }
        }
    }

    // Determinar si el nivel está consolidado y preparado para avanzar
    let nivelConsolidado = false;
    let siguienteNivel = null;

    if (maxPorcentaje >= 85) {
        nivelConsolidado = true;
        // Definir el siguiente nivel si no estamos en B2
        if (nivelPrincipal !== 'B2') {
            const idxActual = niveles.indexOf(nivelPrincipal);
            siguienteNivel = niveles[idxActual + 1];
        }
    }

    // Identificar fortalezas y debilidades en el nivel actual
    let fortalezas = [];
    let debilidades = [];

    for (const aspecto in puntuaciones[nivelPrincipal].aspectos) {
        const valor = puntuaciones[nivelPrincipal].aspectos[aspecto];
        if (valor >= 4) {
            fortalezas.push(nombresAspectos[aspecto]);
        } else if (valor <= 2) {
            debilidades.push(nombresAspectos[aspecto]);
        }
    }

    // Si el nivel está consolidado, buscar debilidades en el siguiente nivel
    let nivelParaDebilidades = nivelPrincipal;
    if (nivelConsolidado && siguienteNivel) {
        nivelParaDebilidades = siguienteNivel;
        // Limpiar las debilidades del nivel actual si está consolidado
        debilidades = [];
    }

    // Buscar debilidades en el nivel correspondiente
    if (nivelParaDebilidades !== 'B2') {
        const nivelSuperior = niveles[niveles.indexOf(nivelParaDebilidades) + 1];
        for (const aspecto in puntuaciones[nivelSuperior].aspectos) {
            const valor = puntuaciones[nivelSuperior].aspectos[aspecto];
            if (valor <= 2 && valor > 0) { // Solo si se ha evaluado
                debilidades.push(nombresAspectos[aspecto]);
            }
        }
    }

    // Calcular tiempo estimado
    let temasNecesarios, nivelEstimacion;

    if (nivelConsolidado && siguienteNivel) {
        // Si está consolidado, calculamos el tiempo para el siguiente nivel
        nivelEstimacion = siguienteNivel;
        // Usamos el porcentaje del siguiente nivel para calcular el tiempo
        const porcentajeSiguiente = porcentajes[siguienteNivel] || 0;
        temasNecesarios = Math.ceil(temasPorNivel[siguienteNivel] * (1 - porcentajeSiguiente / 100));
    } else {
        // Si no está consolidado, calculamos el tiempo para completar el nivel actual
        nivelEstimacion = nivelPrincipal;
        temasNecesarios = Math.ceil(temasPorNivel[nivelPrincipal] * (1 - maxPorcentaje / 100));
    }

    const sesionesNecesarias = temasNecesarios * 2; // 2 sesiones por tema
    const semanasNecesarias = Math.ceil(sesionesNecesarias / 2); // 2 sesiones por semana
    const mesesNecesarios = Math.ceil(semanasNecesarias / 4); // Aproximadamente 4 semanas por mes

    // Generar recomendaciones
    let recomendaciones = [];

    // Añadir recomendaciones basadas en debilidades
    debilidades.forEach(debilidad => {
        // Buscar en qué nivel está esta debilidad
        for (const nivel in recomendacionesPorNivelYAspecto) {
            if (recomendacionesPorNivelYAspecto[nivel][debilidad]) {
                recomendaciones.push(recomendacionesPorNivelYAspecto[nivel][debilidad]);
                break;
            }
        }
    });

    // Si está consolidado y no hay debilidades, agregar recomendación general
    if (nivelConsolidado && recomendaciones.length === 0 && siguienteNivel) {
        recomendaciones.push(`El alumno está listo para avanzar a nivel ${siguienteNivel}. Recomendamos empezar con los temas básicos de este nivel.`);
    }

    // Eliminar duplicados de recomendaciones
    recomendaciones = [...new Set(recomendaciones)];

    return {
        nivelPrincipal,
        porcentajeCompletado: Math.round(maxPorcentaje),
        nivelConsolidado,
        siguienteNivel,
        fortalezas,
        debilidades,
        estimacionTiempo: {
            nivelEstimacion,
            temas: temasNecesarios,
            sesiones: sesionesNecesarias,
            semanas: semanasNecesarias,
            meses: mesesNecesarios
        },
        recomendaciones,
        porcentajes // Exportamos los porcentajes calculados para usarlos fuera
    };
}

// Funciones para actualizar la interfaz
document.getElementById('evaluar-btn').addEventListener('click', function () {
    const resultado = evaluarAlumno();

    // Actualizar la interfaz con los resultados
    document.getElementById('nivel-principal').textContent = resultado.nivelPrincipal;

    // Descripción del nivel
    let descripcionTexto = '';
    if (resultado.nivelConsolidado) {
        if (resultado.siguienteNivel) {
            descripcionTexto = `${resultado.nivelPrincipal} CONSOLIDADO (${resultado.porcentajeCompletado}%). Alumno preparado para avanzar a ${resultado.siguienteNivel}.`;
        } else {
            descripcionTexto = `${resultado.nivelPrincipal} CONSOLIDADO (${resultado.porcentajeCompletado}%). Alumno con nivel avanzado.`;
        }
    } else {
        descripcionTexto = `${descripcionesNivel[resultado.nivelPrincipal]} (${resultado.porcentajeCompletado}% completado)`;
    }
    document.getElementById('nivel-descripcion').textContent = descripcionTexto;

    // Fortalezas
    const fortalezasContainer = document.getElementById('fortalezas-container');
    fortalezasContainer.innerHTML = '';
    if (resultado.fortalezas.length > 0) {
        resultado.fortalezas.forEach(fortaleza => {
            const tag = document.createElement('span');
            tag.className = 'tag tag-fortaleza';
            tag.textContent = fortaleza;
            fortalezasContainer.appendChild(tag);
        });
    } else {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'El alumno necesita trabajar más en todos los aspectos de este nivel.';
        fortalezasContainer.appendChild(mensaje);
    }

    // Debilidades
    const debilidadesContainer = document.getElementById('debilidades-container');
    debilidadesContainer.innerHTML = '';
    if (resultado.debilidades.length > 0) {
        resultado.debilidades.forEach(debilidad => {
            const tag = document.createElement('span');
            tag.className = 'tag tag-debilidad';
            tag.textContent = debilidad;
            debilidadesContainer.appendChild(tag);
        });
    } else if (resultado.nivelConsolidado) {
        const mensaje = document.createElement('p');
        mensaje.textContent = resultado.siguienteNivel
            ? `El alumno ha consolidado el nivel ${resultado.nivelPrincipal} y está listo para avanzar a ${resultado.siguienteNivel}.`
            : 'El alumno ha consolidado este nivel completamente.';
        debilidadesContainer.appendChild(mensaje);
    } else {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No se han detectado debilidades específicas.';
        debilidadesContainer.appendChild(mensaje);
    }

    // Tiempo estimado
    const nivelTiempo = resultado.estimacionTiempo.nivelEstimacion;
    let textoNivelTiempo = '';

    if (resultado.nivelConsolidado && resultado.siguienteNivel) {
        textoNivelTiempo = `Tiempo estimado para completar nivel ${resultado.siguienteNivel}:`;
    } else {
        textoNivelTiempo = `Tiempo estimado para completar nivel ${resultado.nivelPrincipal}:`;
    }

    document.getElementById('nivel-tiempo-container').textContent = textoNivelTiempo;
    document.getElementById('temas-valor').textContent = resultado.estimacionTiempo.temas;
    document.getElementById('sesiones-valor').textContent = resultado.estimacionTiempo.sesiones;
    document.getElementById('semanas-valor').textContent = resultado.estimacionTiempo.semanas;
    document.getElementById('meses-valor').textContent = resultado.estimacionTiempo.meses;

    // Generar recomendaciones de temas y unidades de Aula Internacional
    let unidadesRecomendadas = [];
    const nivelRecomendado = resultado.nivelConsolidado && resultado.siguienteNivel ? resultado.siguienteNivel : resultado.nivelPrincipal;

    // Si el nivel está consolidado pero no hay siguiente nivel (B2 completado)
    if (resultado.nivelConsolidado && !resultado.siguienteNivel) {
        // No necesitamos mostrar unidades recomendadas
    } else {
        // Obtener todas las unidades del nivel recomendado
        const todasUnidades = temarioAulaInternacional[nivelRecomendado];

        // Calcular cuántas unidades necesita completar
        let porcentajeRelevante;
        if (resultado.nivelConsolidado && resultado.siguienteNivel) {
            porcentajeRelevante = resultado.porcentajes[resultado.siguienteNivel] || 0;
        } else {
            porcentajeRelevante = resultado.porcentajeCompletado;
        }

        const unidadesNecesarias = Math.ceil(todasUnidades.length * (1 - porcentajeRelevante / 100));

        // Seleccionar las primeras unidades necesarias
        unidadesRecomendadas = todasUnidades.slice(0, unidadesNecesarias);
    }

    // Mostrar las unidades recomendadas
    const unidadesContainer = document.getElementById('unidades-recomendadas-container');
    unidadesContainer.innerHTML = '';

    if (unidadesRecomendadas.length > 0) {
        const nivel = resultado.nivelConsolidado && resultado.siguienteNivel ? resultado.siguienteNivel : resultado.nivelPrincipal;
        const mensajeIntro = document.createElement('p');
        mensajeIntro.innerHTML = `Las siguientes unidades de <strong>Aula Internacional ${nivel}</strong> son recomendadas según la evaluación:`;
        unidadesContainer.appendChild(mensajeIntro);

        unidadesRecomendadas.forEach(unidad => {
            const unidadEl = document.createElement('div');
            unidadEl.className = 'unidad-recomendada';

            const header = document.createElement('div');
            header.className = 'unidad-header';

            const numero = document.createElement('div');
            numero.className = 'unidad-numero';
            numero.textContent = `Unidad ${unidad.unidad}`;

            const titulo = document.createElement('div');
            titulo.className = 'unidad-titulo';
            titulo.textContent = unidad.titulo;

            header.appendChild(numero);
            header.appendChild(titulo);

            const contenido = document.createElement('div');
            contenido.className = 'unidad-contenido';

            const temasTitle = document.createElement('div');
            temasTitle.textContent = 'Temas principales:';
            temasTitle.style.fontWeight = 'bold';

            const temasContainer = document.createElement('div');
            temasContainer.className = 'unidad-temas';

            unidad.temas.forEach(tema => {
                const temaEl = document.createElement('div');
                temaEl.className = 'unidad-tema';
                temaEl.textContent = tema;
                temasContainer.appendChild(temaEl);
            });

            contenido.appendChild(temasTitle);
            contenido.appendChild(temasContainer);

            unidadEl.appendChild(header);
            unidadEl.appendChild(contenido);

            unidadesContainer.appendChild(unidadEl);
        });
    } else if (resultado.nivelConsolidado && !resultado.siguienteNivel) {
        const mensaje = document.createElement('p');
        mensaje.innerHTML = '<strong>¡Felicidades!</strong> El alumno ha completado todos los niveles disponibles en Aula Internacional. Puede profundizar en temas específicos según sus necesidades e intereses.';
        unidadesContainer.appendChild(mensaje);
    } else {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay unidades específicas recomendadas. El alumno tiene un buen dominio de los contenidos de este nivel.';
        unidadesContainer.appendChild(mensaje);
    }

    // Recomendaciones
    const recomendacionesContainer = document.getElementById('recomendaciones-container');
    recomendacionesContainer.innerHTML = '';

    if (resultado.recomendaciones && resultado.recomendaciones.length > 0) {
        resultado.recomendaciones.forEach(recomendacion => {
            const item = document.createElement('div');
            item.className = 'recomendacion-item';
            item.textContent = recomendacion;
            recomendacionesContainer.appendChild(item);
        });
    } else {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'No hay recomendaciones específicas para este alumno.';
        recomendacionesContainer.appendChild(mensaje);
    }

    // Actualizar la información del alumno para impresión
    const nombreAlumnoInput = document.getElementById('nombre-alumno');
    const nombreAlumnoImpresion = document.getElementById('nombre-alumno-impresion');
    if (nombreAlumnoInput && nombreAlumnoImpresion) {
        nombreAlumnoImpresion.textContent = nombreAlumnoInput.value || "No especificado";
    }

    // Formatear fecha para impresión
    const fechaEvalInput = document.getElementById('fecha-evaluacion');
    const fechaImpresion = document.getElementById('fecha-impresion');
    if (fechaEvalInput && fechaImpresion) {
        const fechaEval = fechaEvalInput.value;
        const fechaFormateada = fechaEval ? new Date(fechaEval).toLocaleDateString() : new Date().toLocaleDateString();
        fechaImpresion.textContent = fechaFormateada;
    }

    // Formatear hora para impresión
    const horaEvalInput = document.getElementById('hora-evaluacion');
    const horaImpresion = document.getElementById('hora-impresion');
    if (horaEvalInput && horaImpresion) {
        horaImpresion.textContent = horaEvalInput.value || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    // Mostrar resultados
    document.getElementById('resultados').style.display = 'block';

    // Scroll a resultados
    document.getElementById('resultados').scrollIntoView({ behavior: 'smooth' });
});

// Reiniciar formulario
document.getElementById('reset-btn').addEventListener('click', function () {
    // Desmarcar todos los radio buttons
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
    });

    // Limpiar áreas de texto
    const textareas = document.querySelectorAll('textarea');
    textareas.forEach(textarea => {
        textarea.value = '';
    });

    // Ocultar resultados
    document.getElementById('resultados').style.display = 'none';
});

// JsonBin.io API

// Función para guardar evaluación
document.getElementById('guardar-btn').addEventListener('click', function () {
    // Verificar si ya se ha evaluado
    if (document.getElementById('resultados').style.display !== 'block') {
        alert('Primero debes evaluar al alumno');
        return;
    }

    // Obtener los datos de la evaluación
    const evaluacion = {
        alumno: document.getElementById('nombre-alumno').value || 'Sin nombre',
        fecha: document.getElementById('fecha-evaluacion').value,
        hora: document.getElementById('hora-evaluacion').value,
        observaciones: document.getElementById('observaciones-generales').value,
        resultado: evaluarAlumno() // Esta función ya existe en tu código
    };

    // Guardar en JSONBin
    guardarEnJSONBin(evaluacion);
});

// Función para guardar en JSONBin
function guardarEnJSONBin(datos) {
    // Mostrar indicador de carga
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.innerHTML = 'Guardando evaluación...';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '50%';
    loadingDiv.style.left = '50%';
    loadingDiv.style.transform = 'translate(-50%, -50%)';
    loadingDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
    loadingDiv.style.color = 'white';
    loadingDiv.style.padding = '20px';
    loadingDiv.style.borderRadius = '5px';
    loadingDiv.style.zIndex = '9999';
    document.body.appendChild(loadingDiv);

    // Llamada a la API de JSONBin para guardar la evaluación
    fetch('https://api.jsonbin.io/v3/b', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': '$2a$10$xEj0uqDpnUAU2sQT0S4oGuHUTA943b6Pjgd9ml1NFSfzD1w7t1eey', 
            'X-Bin-Private': 'false'
        },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al guardar la evaluación');
        }
        return response.json();
    })
    .then(data => {
        // Crear referencia para la lista
        const binId = data.metadata.id;
        const urlCompartir = `${window.location.origin}${window.location.pathname}?eval=${binId}`;
        
        // Crear un registro simple para la lista
        const registroLista = {
            alumno: datos.alumno,
            fecha: datos.fecha,
            binId: binId,
            nivel: datos.resultado.nivelPrincipal,
            url: urlCompartir
        };
        
        // ID del bin que contendrá la lista
        const listaBinId = '67c9d1e3ad19ca34f817a8ba';
        
        // Obtener la lista actual
        fetch(`https://api.jsonbin.io/v3/b/${listaBinId}`, {
            method: 'GET',
            headers: {
                'X-Master-Key': '$2a$10$xEj0uqDpnUAU2sQT0S4oGuHUTA943b6Pjgd9ml1NFSfzD1w7t1eey'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de evaluaciones');
            }
            return response.json();
        })
        .then(listaData => {
            // Obtener el objeto con la lista o crear uno si no existe
            const listaObj = listaData.record || { evaluaciones: [] };
            
            // Añadir la nueva evaluación al array
            listaObj.evaluaciones.push(registroLista);
            
            // Actualizar el bin de la lista
            return fetch(`https://api.jsonbin.io/v3/b/${listaBinId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Master-Key': '$2a$10$xEj0uqDpnUAU2sQT0S4oGuHUTA943b6Pjgd9ml1NFSfzD1w7t1eey'
                },
                body: JSON.stringify(listaObj)
            });
        })
        .catch(error => {
            console.error('Error al actualizar lista:', error);
        });

        // Eliminar indicador de carga
        document.getElementById('loading-indicator').remove();

        // Mostrar la URL al usuario (esta parte permanece igual)
        mostrarURLCompartir(urlCompartir);
    })
    .catch(error => {
        // Eliminar indicador de carga
        if (document.getElementById('loading-indicator')) {
            document.getElementById('loading-indicator').remove();
        }

        alert('Error: ' + error.message);
        console.error('Error:', error);
    });
}

// Función para mostrar la URL compartible
function mostrarURLCompartir(url) {
    // Verificar si ya existe un diálogo y eliminarlo
    if (document.querySelector('.dialogo-compartir')) {
        document.querySelector('.dialogo-compartir').remove();
    }

    // Crear el diálogo
    const dialogoURL = document.createElement('div');
    dialogoURL.className = 'dialogo-compartir';
    dialogoURL.innerHTML = `
        <div class="dialogo-header">
            <h3>Evaluación guardada exitosamente</h3>
            <span class="cerrar-dialogo">&times;</span>
        </div>
        <p>Comparte esta URL con el estudiante para que pueda ver su evaluación:</p>
        <div class="url-container">
            <input type="text" readonly value="${url}" class="url-input">
            <button class="copiar-btn">Copiar</button>
        </div>
    `;

    // Añadir estilos
    dialogoURL.style.position = 'fixed';
    dialogoURL.style.top = '50%';
    dialogoURL.style.left = '50%';
    dialogoURL.style.transform = 'translate(-50%, -50%)';
    dialogoURL.style.backgroundColor = 'white';
    dialogoURL.style.padding = '20px';
    dialogoURL.style.borderRadius = '8px';
    dialogoURL.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
    dialogoURL.style.zIndex = '1000';
    dialogoURL.style.maxWidth = '500px';
    dialogoURL.style.width = '90%';

    // Estilos internos
    const header = dialogoURL.querySelector('.dialogo-header');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    header.style.marginBottom = '15px';

    const cerrar = dialogoURL.querySelector('.cerrar-dialogo');
    cerrar.style.cursor = 'pointer';
    cerrar.style.fontSize = '24px';
    cerrar.style.color = '#999';

    const urlContainer = dialogoURL.querySelector('.url-container');
    urlContainer.style.display = 'flex';
    urlContainer.style.margin = '15px 0';

    const urlInput = dialogoURL.querySelector('.url-input');
    urlInput.style.flexGrow = '1';
    urlInput.style.padding = '8px';
    urlInput.style.border = '1px solid #ddd';
    urlInput.style.borderRadius = '4px 0 0 4px';

    const copiarBtn = dialogoURL.querySelector('.copiar-btn');
    copiarBtn.style.backgroundColor = '#3498db';
    copiarBtn.style.color = 'white';
    copiarBtn.style.border = 'none';
    copiarBtn.style.padding = '8px 15px';
    copiarBtn.style.borderRadius = '0 4px 4px 0';
    copiarBtn.style.cursor = 'pointer';

    // Añadir al DOM
    document.body.appendChild(dialogoURL);

    // Funcionalidad de copiar
    copiarBtn.addEventListener('click', function () {
        urlInput.select();
        document.execCommand('copy');
        this.textContent = '¡Copiado!';
        setTimeout(() => this.textContent = 'Copiar', 2000);
    });

    // Funcionalidad de cerrar
    cerrar.addEventListener('click', function () {
        dialogoURL.remove();
    });
}

// Verificar si hay un ID de evaluación en la URL
const params = new URLSearchParams(window.location.search);
const evalId = params.get('eval');

if (evalId) {
    // Hay un ID de evaluación, cargar la vista de resultados
    cargarEvaluacionPorId(evalId);
} else {
    // Continuar con la inicialización normal
    // (El código que ya tienes aquí se ejecutará normalmente)
}
// Función para cargar evaluación por ID
function cargarEvaluacionPorId(id) {
    // Ocultar la interfaz de evaluación
    document.querySelectorAll('.conversation-section, .datos-alumno, .actions.no-print').forEach(el => {
        el.style.display = 'none';
    });
    // Ocultar la interfaz de evaluación y cualquier elemento con clase "puntaje"
document.querySelectorAll('.conversation-section, .datos-alumno, .actions.no-print, .puntaje').forEach(el => {
    el.style.display = 'none';
});
    // Mostrar mensaje de carga
    const cargando = document.createElement('div');
    cargando.id = 'cargando-evaluacion';
    cargando.innerHTML = '<p style="text-align: center; margin-top: 50px; font-size: 18px;">Cargando tu evaluación...</p>';
    document.body.insertBefore(cargando, document.getElementById('resultados'));
    
    // Cargar desde JSONBin
    fetch(`https://api.jsonbin.io/v3/b/${id}`, {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo encontrar la evaluación');
        }
        return response.json();
    })
    .then(data => {
        // Eliminar mensaje de carga
        document.getElementById('cargando-evaluacion').remove();
        
        // Asegurarnos que los resultados son visibles
        const resultadosEl = document.getElementById('resultados');
        resultadosEl.style.display = 'block';
        
        // Crear e insertar datos del estudiante al principio
        // Este paso es crucial - creamos un nuevo elemento con los datos
        const infoDatos = document.createElement('div');
        infoDatos.className = 'datos-alumno-resultado';
        infoDatos.style.marginBottom = '20px';
        infoDatos.style.padding = '15px';
        infoDatos.style.backgroundColor = '#f9f9f9';
        infoDatos.style.borderRadius = '8px';
        infoDatos.style.borderLeft = '4px solid #3498db';
        
        infoDatos.innerHTML = `
            <h2 style="margin-top:0; color:#2c3e50;">Datos del Estudiante</h2>
            <p><strong>Nombre:</strong> ${data.record.alumno || "Sin nombre"}</p>
            <p><strong>Fecha de evaluación:</strong> ${data.record.fecha ? new Date(data.record.fecha).toLocaleDateString() : "No disponible"}</p>
            <p><strong>Hora:</strong> ${data.record.hora || "No disponible"}</p>
        `;
        
        // Insertar al principio de los resultados
        resultadosEl.insertBefore(infoDatos, resultadosEl.firstChild);
        
        // Actualizar el título para que refleje que es una evaluación
        document.querySelector('h1').textContent = 'Evaluación de Nivel de Español';
        
        // Mostrar los resultados completos
        mostrarResultadosCompletos(data.record.resultado);
        
        // Añadir botón de imprimir
        const botonesContainer = document.createElement('div');
        botonesContainer.className = 'actions no-print';
        botonesContainer.style.display = 'flex';
        botonesContainer.style.justifyContent = 'center';
        botonesContainer.style.marginTop = '30px';
        
        const imprimirBtn = document.createElement('button');
        imprimirBtn.textContent = 'Imprimir Informe';
        imprimirBtn.onclick = function() { window.print(); };
        imprimirBtn.style.padding = '10px 20px';
        imprimirBtn.style.backgroundColor = '#3498db';
        imprimirBtn.style.color = 'white';
        imprimirBtn.style.border = 'none';
        imprimirBtn.style.borderRadius = '4px';
        imprimirBtn.style.cursor = 'pointer';
        
        botonesContainer.appendChild(imprimirBtn);
        resultadosEl.appendChild(botonesContainer);
    })
    .catch(error => {
        if (document.getElementById('cargando-evaluacion')) {
            document.getElementById('cargando-evaluacion').innerHTML = `
                <p style="text-align: center; margin-top: 50px; color: #e74c3c; font-size: 18px;">
                    Error: ${error.message}
                </p>
                <p style="text-align: center; color: #666;">
                    La evaluación solicitada no existe o no está disponible.
                </p>
            `;
        }
    });
}

// Función para mostrar resultados completos (como en la versión impresa)
function mostrarResultadosCompletos(resultado) {
    // 1. Nivel principal y descripción
    const nivelHeader = document.querySelector('.resultado-header');
    if (nivelHeader) {
        const nivelPrincipalEl = nivelHeader.querySelector('#nivel-principal');
        if (nivelPrincipalEl) {
            nivelPrincipalEl.textContent = resultado.nivelPrincipal;
            // Aplicar estilo similar al del PDF
            nivelPrincipalEl.style.fontSize = '2rem';
            nivelPrincipalEl.style.fontWeight = 'bold';
            nivelPrincipalEl.style.color = '#3498db';
        }
        
        const nivelDescripcionEl = nivelHeader.querySelector('#nivel-descripcion');
        if (nivelDescripcionEl) {
            // Descripción del nivel
            let descripcionTexto = '';
            if (resultado.nivelConsolidado) {
                if (resultado.siguienteNivel) {
                    descripcionTexto = `${resultado.nivelPrincipal} CONSOLIDADO (${resultado.porcentajeCompletado}%). Alumno preparado para avanzar a ${resultado.siguienteNivel}.`;
                } else {
                    descripcionTexto = `${resultado.nivelPrincipal} CONSOLIDADO (${resultado.porcentajeCompletado}%). Alumno con nivel avanzado.`;
                }
            } else {
                descripcionTexto = `${descripcionesNivel[resultado.nivelPrincipal]} (${resultado.porcentajeCompletado}% completado)`;
            }
            nivelDescripcionEl.textContent = descripcionTexto;
        }
    }
    
    // 2. Fortalezas
    const fortalezasContainer = document.getElementById('fortalezas-container');
    if (fortalezasContainer) {
        fortalezasContainer.innerHTML = '';
        if (resultado.fortalezas && resultado.fortalezas.length > 0) {
            resultado.fortalezas.forEach(fortaleza => {
                const tag = document.createElement('span');
                tag.className = 'tag tag-fortaleza';
                tag.textContent = fortaleza;
                fortalezasContainer.appendChild(tag);
            });
        } else {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'El alumno necesita trabajar más en todos los aspectos de este nivel.';
            fortalezasContainer.appendChild(mensaje);
        }
    }
    
    // 3. Debilidades
    const debilidadesContainer = document.getElementById('debilidades-container');
    if (debilidadesContainer) {
        debilidadesContainer.innerHTML = '';
        if (resultado.debilidades && resultado.debilidades.length > 0) {
            resultado.debilidades.forEach(debilidad => {
                const tag = document.createElement('span');
                tag.className = 'tag tag-debilidad';
                tag.textContent = debilidad;
                debilidadesContainer.appendChild(tag);
            });
        } else {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No se han detectado debilidades específicas.';
            debilidadesContainer.appendChild(mensaje);
        }
    }
    
    // 4. Tiempo estimado
    const tiempoContainer = document.getElementById('nivel-tiempo-container');
    if (tiempoContainer) {
        // Texto del nivel para el tiempo estimado
        const nivelEstimacion = resultado.estimacionTiempo.nivelEstimacion;
        tiempoContainer.textContent = `Tiempo estimado para completar nivel ${nivelEstimacion}:`;
        tiempoContainer.style.color = '#3498db';
        tiempoContainer.style.fontWeight = 'bold';
        
        // Valores de tiempo
        document.getElementById('temas-valor').textContent = resultado.estimacionTiempo.temas;
        document.getElementById('sesiones-valor').textContent = resultado.estimacionTiempo.sesiones;
        document.getElementById('semanas-valor').textContent = resultado.estimacionTiempo.semanas;
        document.getElementById('meses-valor').textContent = resultado.estimacionTiempo.meses;
    }
    
    // 5. Unidades recomendadas
    const unidadesContainer = document.getElementById('unidades-recomendadas-container');
    if (unidadesContainer) {
        unidadesContainer.innerHTML = '';
        
        // Si hay unidades recomendadas en el resultado
        if (resultado.unidadesRecomendadas && resultado.unidadesRecomendadas.length > 0) {
            // Utilizar las unidades guardadas en el resultado
            mostrarUnidadesRecomendadas(resultado.unidadesRecomendadas, resultado.nivelPrincipal, unidadesContainer);
        } else {
            // Calcular unidades según el nivel
            const nivel = resultado.nivelConsolidado && resultado.siguienteNivel ? resultado.siguienteNivel : resultado.nivelPrincipal;
            
            // Mensaje con el nivel
            const mensajeIntro = document.createElement('p');
            mensajeIntro.innerHTML = `Las siguientes unidades de <strong>Aula Internacional ${nivel}</strong> son recomendadas según la evaluación:`;
            unidadesContainer.appendChild(mensajeIntro);
            
            // Obtener todas las unidades del nivel
            const todasUnidades = temarioAulaInternacional[nivel];
            
            // Calcular unidades necesarias
            let porcentajeRelevante;
            if (resultado.nivelConsolidado && resultado.siguienteNivel) {
                porcentajeRelevante = resultado.porcentajes[resultado.siguienteNivel] || 0;
            } else {
                porcentajeRelevante = resultado.porcentajeCompletado;
            }
            
            const unidadesNecesarias = Math.ceil(todasUnidades.length * (1 - porcentajeRelevante/100));
            const unidadesRecomendadas = todasUnidades.slice(0, unidadesNecesarias);
            
            // Mostrar las unidades
            unidadesRecomendadas.forEach(unidad => {
                crearUnidadUI(unidad, unidadesContainer);
            });
        }
    }
    
    // 6. Recomendaciones personalizadas
    const recomendacionesContainer = document.getElementById('recomendaciones-container');
    if (recomendacionesContainer) {
        recomendacionesContainer.innerHTML = '';
        
        if (resultado.recomendaciones && resultado.recomendaciones.length > 0) {
            resultado.recomendaciones.forEach(recomendacion => {
                const item = document.createElement('div');
                item.className = 'recomendacion-item';
                item.textContent = recomendacion;
                recomendacionesContainer.appendChild(item);
            });
        } else {
            const mensaje = document.createElement('p');
            mensaje.textContent = 'No hay recomendaciones específicas para este alumno.';
            recomendacionesContainer.appendChild(mensaje);
        }
    }
}

// Función auxiliar para crear UI de unidad
function crearUnidadUI(unidad, container) {
    const unidadEl = document.createElement('div');
    unidadEl.className = 'unidad-recomendada';
    
    const header = document.createElement('div');
    header.className = 'unidad-header';
    
    const numero = document.createElement('div');
    numero.className = 'unidad-numero';
    numero.textContent = `Unidad ${unidad.unidad}`;
    
    const titulo = document.createElement('div');
    titulo.className = 'unidad-titulo';
    titulo.textContent = unidad.titulo;
    
    header.appendChild(numero);
    header.appendChild(titulo);
    
    const contenido = document.createElement('div');
    contenido.className = 'unidad-contenido';
    
    const temasTitle = document.createElement('div');
    temasTitle.textContent = 'Temas principales:';
    temasTitle.style.fontWeight = 'bold';
    
    const temasContainer = document.createElement('div');
    temasContainer.className = 'unidad-temas';
    
    unidad.temas.forEach(tema => {
        const temaEl = document.createElement('div');
        temaEl.className = 'unidad-tema';
        temaEl.textContent = tema;
        temasContainer.appendChild(temaEl);
    });
    
    contenido.appendChild(temasTitle);
    contenido.appendChild(temasContainer);
    
    unidadEl.appendChild(header);
    unidadEl.appendChild(contenido);
    
    container.appendChild(unidadEl);
}

// Función auxiliar para mostrar unidades recomendadas
function mostrarUnidadesRecomendadas(unidades, nivel, container) {
    const mensajeIntro = document.createElement('p');
    mensajeIntro.innerHTML = `Las siguientes unidades de <strong>Aula Internacional ${nivel}</strong> son recomendadas según la evaluación:`;
    container.appendChild(mensajeIntro);
    
    unidades.forEach(unidad => {
        crearUnidadUI(unidad, container);
    });
}

// Función para adaptar la interfaz para visualización
function adaptarInterfazParaVisualizacion() {
    // Cambiar el título
    document.querySelector('h1').textContent = 'Resultados de Evaluación ELE';

    // Asegurarnos que los resultados son visibles
    document.getElementById('resultados').style.display = 'block';

    // Añadir un mensaje para el estudiante
    const mensajeEstudiante = document.createElement('div');
    mensajeEstudiante.className = 'mensaje-estudiante';
    mensajeEstudiante.innerHTML = `
        <p style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #3498db; margin-bottom: 20px;">
            Esta es tu evaluación de nivel de español. Aquí puedes ver tu nivel asignado, 
            fortalezas, aspectos a mejorar y recomendaciones para continuar tu aprendizaje.
        </p>
    `;

    document.getElementById('resultados').insertBefore(
        mensajeEstudiante,
        document.querySelector('.resultado-header')
    );
}

// Función para mostrar resultados guardados
function mostrarResultadosGuardados(resultado) {
    // Nivel principal
    document.getElementById('nivel-principal').textContent = resultado.nivelPrincipal;

    // Descripción del nivel
    let descripcionTexto = '';
    if (resultado.nivelConsolidado) {
        if (resultado.siguienteNivel) {
            descripcionTexto = `${resultado.nivelPrincipal} CONSOLIDADO (${resultado.porcentajeCompletado}%). Alumno preparado para avanzar a ${resultado.siguienteNivel}.`;
        } else {
            descripcionTexto = `${resultado.nivelPrincipal} CONSOLIDADO (${resultado.porcentajeCompletado}%). Alumno con nivel avanzado.`;
        }
    } else {
        descripcionTexto = `${descripcionesNivel[resultado.nivelPrincipal]} (${resultado.porcentajeCompletado}% completado)`;
    }
    document.getElementById('nivel-descripcion').textContent = descripcionTexto;

    // Fortalezas
    const fortalezasContainer = document.getElementById('fortalezas-container');
    fortalezasContainer.innerHTML = '';
    if (resultado.fortalezas.length > 0) {
        resultado.fortalezas.forEach(fortaleza => {
            const tag = document.createElement('span');
            tag.className = 'tag tag-fortaleza';
            tag.textContent = fortaleza;
            fortalezasContainer.appendChild(tag);
        });
    } else {
        const mensaje = document.createElement('p');
        mensaje.textContent = 'Es necesario trabajar más en todos los aspectos de este nivel.';
        fortalezasContainer.appendChild(mensaje);
    }

    // Debilidades
    const debilidadesContainer = document.getElementById('debilidades-container');
    debilidadesContainer.innerHTML = '';
    if (resultado.debilidades.length > 0) {
        resultado.debilidades.forEach(debilidad => {
            const tag = document.createElement('span');
            tag.className = 'tag tag-debilidad';
            tag.textContent = debilidad;
            debilidadesContainer.appendChild(tag);
        });
    } else {
        const mensaje = document.createElement('p');
        mensaje.textContent = resultado.nivelConsolidado
            ? `Se ha consolidado el nivel ${resultado.nivelPrincipal}.`
            : 'No se han detectado debilidades específicas.';
        debilidadesContainer.appendChild(mensaje);
    }

    // Tiempo estimado
    const tiempoEstimado = resultado.estimacionTiempo;
    document.getElementById('nivel-tiempo-container').textContent =
        `Tiempo estimado para completar nivel ${tiempoEstimado.nivelEstimacion}:`;
    document.getElementById('temas-valor').textContent = tiempoEstimado.temas;
    document.getElementById('sesiones-valor').textContent = tiempoEstimado.sesiones;
    document.getElementById('semanas-valor').textContent = tiempoEstimado.semanas;
    document.getElementById('meses-valor').textContent = tiempoEstimado.meses;

    // Completar el resto de secciones según corresponda
    // Ya tienes código para esto en tu función de evaluación original
}

