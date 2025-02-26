from flask import Flask, jsonify, make_response, request
import sqlite3
import os

api = Flask(__name__)

def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

@api.before_request
def handle_preflight():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
        return response

@api.after_request
def after_request(response):
    return add_cors_headers(response)

def ConnectDB():
    try:
        current_dir = os.path.dirname(os.path.abspath(__file__))
        db_path = os.path.join(current_dir, '..', 'db', 'ospedale.db')
        if not os.path.exists(db_path):
            raise Exception(f"Database file not found at {db_path}")
        return sqlite3.connect(db_path)
    except Exception as e:
        print(f"Database connection error: {str(e)}")
        raise

# Endpoint per ottenere tutti i medici
@api.route('/api/medici', methods=['GET'])
def get_medici():
    try:
        connection = ConnectDB()
        cursor = connection.cursor()
        query = "SELECT * FROM medico;"
        cursor.execute(query)
        medici = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(medici)
    except Exception as e:
        print(f"Errore in get_medici: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Endpoint per ottenere tutti i pazienti
@api.route('/api/pazienti', methods=['GET'])
def get_pazienti():
    try:
        connection = ConnectDB()
        cursor = connection.cursor()
        query = "SELECT * FROM paziente;"
        cursor.execute(query)
        pazienti = cursor.fetchall()
        cursor.close()
        connection.close()
        return jsonify(pazienti)
    except Exception as e:
        print(f"Errore in get_pazienti: {str(e)}")
        return jsonify({'error': str(e)}), 500

# Endpoint per la ricerca per nome o cognome in medici e pazienti
@api.route('/api/cerca/<query>', methods=['GET'])
def cerca_persona(query):
    try:
        connection = ConnectDB()
        cursor = connection.cursor()

        # Ricerca nei medici
        query_medici = "SELECT nome, cognome, specializzazione FROM medico WHERE nome LIKE ? OR cognome LIKE ?;"
        cursor.execute(query_medici, (f"%{query}%", f"%{query}%"))
        medici = cursor.fetchall()

        # Ricerca nei pazienti
        query_pazienti = "SELECT nome, cognome, data_nascita FROM paziente WHERE nome LIKE ? OR cognome LIKE ?;"
        cursor.execute(query_pazienti, (f"%{query}%", f"%{query}%"))
        pazienti = cursor.fetchall()

        cursor.close()
        connection.close()

        # Formattazione dei risultati
        results = {
            'medici': [{'nome': m[0], 'cognome': m[1], 'specializzazione': m[2]} for m in medici],
            'pazienti': [{'nome': p[0], 'cognome': p[1], 'data_nascita': p[2]} for p in pazienti]
        }

        return jsonify(results)
    except Exception as e:
        print(f"Errore in cerca_persona: {str(e)}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    api.run(host="127.0.0.1", port=8080, debug=True)
