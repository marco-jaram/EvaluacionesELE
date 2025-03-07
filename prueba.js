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

    // Calcular tiempo estimado basado en la dificultad de cada unidad
    let unidadesRecomendadas = [];
    let totalSesiones = 0;
    let totalSemanas = 0;
    let totalMeses = 0;
    let temasNecesarios = 0;
    
    const nivelRecomendado = nivelConsolidado && siguienteNivel ? siguienteNivel : nivelPrincipal;
    
    // Si el nivel está consolidado pero no hay siguiente nivel (B2 completado)
    if (nivelConsolidado && !siguienteNivel) {
        // No necesitamos calcular tiempo para B2 completado
    } else {
        // Obtener todas las unidades del nivel recomendado
        const todasUnidades = temarioAulaInternacional[nivelRecomendado];

        // Calcular cuántas unidades necesita completar basado en el porcentaje
        let porcentajeRelevante;
        if (nivelConsolidado && siguienteNivel) {
            porcentajeRelevante = porcentajes[siguienteNivel] || 0;
        } else {
            porcentajeRelevante = maxPorcentaje;
        }

        // Calcular cuántas unidades necesita (redondeado hacia arriba)
        const unidadesNecesarias = Math.ceil(todasUnidades.length * (1 - porcentajeRelevante / 100));
        temasNecesarios = unidadesNecesarias;
        
        // Seleccionar las primeras unidades necesarias
        unidadesRecomendadas = todasUnidades.slice(0, unidadesNecesarias);
        
        // Calcular tiempo basado en la dificultad de cada unidad
        for (const unidad of unidadesRecomendadas) {
            const semanasPorUnidad = dificultadPorUnidad[nivelRecomendado][unidad.unidad];
            const sesionesPorUnidad = semanasPorUnidad * 2;
            
            totalSemanas += semanasPorUnidad;
            totalSesiones += sesionesPorUnidad;
        }
        
        // Calcular meses (aproximadamente 4 semanas por mes)
        totalMeses = Math.ceil(totalSemanas / 4);
    }

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
            nivelEstimacion: nivelRecomendado,
            temas: temasNecesarios,
            sesiones: totalSesiones,
            semanas: totalSemanas,
            meses: totalMeses
        },
        unidadesRecomendadas,
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

    // Mostrar las unidades recomendadas
    const unidadesContainer = document.getElementById('unidades-recomendadas-container');
    unidadesContainer.innerHTML = '';

    if (resultado.unidadesRecomendadas && resultado.unidadesRecomendadas.length > 0) {
        const nivel = resultado.estimacionTiempo.nivelEstimacion;
        const mensajeIntro = document.createElement('p');
        mensajeIntro.innerHTML = `Las siguientes unidades de <strong>Aula Internacional ${nivel}</strong> son recomendadas según la evaluación:`;
        unidadesContainer.appendChild(mensajeIntro);

        resultado.unidadesRecomendadas