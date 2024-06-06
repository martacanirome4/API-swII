 // Añadir un evento para manejar la búsqueda al enviar el formulario
 document.getElementById('searchForm').onsubmit = function(event) {
    event.preventDefault(); // Prevenir el envío del formulario
    const query = document.getElementById('search_query').value; // Obtener el valor de búsqueda
    // Redirigir a la URL correcta con el URI del álbum
    window.location.href = `/api/v1/tracks/${encodeURIComponent(query)}`;
};
