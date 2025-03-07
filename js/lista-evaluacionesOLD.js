document.addEventListener('DOMContentLoaded', function() {
    // ID del bin que contiene la lista
    const listaBinId = '67c9d1e3ad19ca34f817a8ba';
    const container = document.getElementById('evaluaciones-container');
    
    // Mostrar mensaje de carga
    container.innerHTML = '<p>Cargando evaluaciones...</p>';
    
    // Cargar el bin que contiene la lista
    fetch(`https://api.jsonbin.io/v3/b/${listaBinId}`, {
        method: 'GET',
        headers: {
            'X-Master-Key': '$2a$10$xEj0uqDpnUAU2sQT0S4oGuHUTA943b6Pjgd9ml1NFSfzD1w7t1eey'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Datos recibidos:", data);
        
        // Limpiar el contenedor
        container.innerHTML = '';
        
        // Verificar que tenemos datos válidos
        const evaluaciones = data.record && data.record.evaluaciones ? data.record.evaluaciones : [];
        
        if (evaluaciones.length === 0) {
            container.innerHTML = '<p>No hay evaluaciones guardadas todavía.</p>';
            return;
        }
        
        // Crear tabla para mostrar las evaluaciones
        const table = document.createElement('table');
        table.style.width = '100%';
        table.style.borderCollapse = 'collapse';
        table.style.marginTop = '20px';
        
        // Crear encabezado de la tabla
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #ddd; background-color: #f2f2f2;">Alumno</th>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #ddd; background-color: #f2f2f2;">Fecha</th>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #ddd; background-color: #f2f2f2;">Nivel</th>
                <th style="text-align: left; padding: 10px; border-bottom: 2px solid #ddd; background-color: #f2f2f2;">Link</th>
            </tr>
        `;
        table.appendChild(thead);
        
        // Crear cuerpo de la tabla
        const tbody = document.createElement('tbody');
        
        // Ordenar evaluaciones por fecha (más recientes primero)
        evaluaciones.sort((a, b) => {
            const fechaA = a.fecha ? new Date(a.fecha) : new Date(0);
            const fechaB = b.fecha ? new Date(b.fecha) : new Date(0);
            return fechaB - fechaA;
        });
        
        // Añadir cada evaluación a la tabla
        evaluaciones.forEach(registro => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #ddd';
            
            // Formatear fecha
            let fechaFormateada = 'No disponible';
            if (registro.fecha) {
                const fecha = new Date(registro.fecha);
                fechaFormateada = fecha.toLocaleDateString();
            }
            
            tr.innerHTML = `
                <td style="padding: 10px;">${registro.alumno || 'Sin nombre'}</td>
                <td style="padding: 10px;">${fechaFormateada}</td>
                <td style="padding: 10px;">${registro.nivel || 'No disponible'}</td>
                <td style="padding: 10px;">
                    <a href="${registro.url}" target="_blank">Ver evaluación</a>
                </td>
            `;
            
            tbody.appendChild(tr);
        });
        
        table.appendChild(tbody);
        container.appendChild(table);
    })
    .catch(error => {
        console.error("Error completo:", error);
        container.innerHTML = `<p style="color: #e74c3c;">Error al cargar evaluaciones: ${error.message}</p>`;
    });
});