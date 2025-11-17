# app.py

from flask import Flask, jsonify
from flask_cors import CORS
from data import CANCIONES_DATA

# Inicialización de la aplicación Flask
app = Flask(__name__)
# Habilitamos CORS para todas las rutas. Esto es crucial para la comunicación entre Front y Back.
CORS(app) 

# Endpoint para obtener todas las canciones
@app.route('/api/canciones', methods=['GET'])
def get_canciones():
    """Devuelve la lista completa de canciones."""
    return jsonify(CANCIONES_DATA)

# Endpoint para obtener una canción por su ID (Opcional, pero bueno tenerlo)
@app.route('/api/canciones/<int:cancion_id>', methods=['GET'])
def get_cancion(cancion_id):
    """Devuelve una canción específica por ID o un error 404."""
    cancion = next((c for c in CANCIONES_DATA if c['id'] == cancion_id), None)
    
    if cancion:
        return jsonify(cancion)
    else:
        return jsonify({"mensaje": "Canción no encontrada"}), 404

# Punto de entrada para la aplicación
if __name__ == '__main__':
    # Ejecutamos la aplicación en el puerto 5000 (puerto estándar para Flask)
    app.run(debug=True, port=5000)