
-- Creazione tabella medico
CREATE TABLE medico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cognome TEXT NOT NULL,
    specializzazione TEXT,
    telefono TEXT
);

-- Creazione tabella paziente
CREATE TABLE paziente (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    cognome TEXT NOT NULL,
    data_nascita DATE,
    telefono TEXT,
    indirizzo TEXT
);


DELETE FROM medico;
DELETE FROM paziente;
 
INSERT INTO medico (nome, cognome, specializzazione, telefono) VALUES 
('Marco', 'Rossi', 'Cardiologia', '1234567890'),
('Luisa', 'Bianchi', 'Dermatologia', '0987654321'),
('Francesco', 'Verdi', 'Ortopedia', '1122334455'),
('Giulia', 'Neri', 'Pediatria', '2233445566'),
('Alessandro', 'Galli', 'Neurologia', '3344556677'),
('Elena', 'Romano', 'Chirurgia', '4455667788'),
('Giovanni', 'Martini', 'Oftalmologia', '5566778899'),
('Sara', 'Conti', 'Ginecologia', '6677889900'),
('Antonio', 'Ruggeri', 'Urologia', '7788990011'),
('Francesca', 'Fabbri', 'Psichiatria', '8899001122'),
('Simone', 'Giorgi', 'Fisiatria', '9900112233'),
('Chiara', 'De Luca', 'Oncologia', '1011121314'),
('Matteo', 'Rinaldi', 'Radiologia', '1213141516'),
('Laura', 'Marini', 'Anestesia', '1314151617'),
('Lorenzo', 'Barbieri', 'Medicina Generale', '1415161718'),
('Giulia', 'Cattaneo', 'Endocrinologia', '1516171819'),
('Alessio', 'Fontana', 'Geriatria', '1617181920'),
('Martina', 'Pellegrini', 'Pneumologia', '1718192021'),
('Nicola', 'Sartori', 'Reumatologia', '1819202122'),
('Valentina', 'Rossi', 'Chirurgia Plastica', '1920212223'),
('Giorgio', 'Gallo', 'Malattie Infettive', '2021222324'),
('Sofia', 'Longo', 'Medicina del Lavoro', '2122232425'),
('Riccardo', 'Riva', 'Cardiologia Pediatrica', '2223242526'),
('Elisa', 'Grassi', 'Nefrologia', '2324252627'),
('Francesco', 'Marchetti', 'Gastroenterologia', '2425262728'),
('Giovanna', 'Cavalli', 'Otorinolaringoiatria', '2526272829'),
('Alberto', 'Rocca', 'Chirurgia Toracica', '2627282930'),
('Silvia', 'Piazza', 'Medicina Sportiva', '2728293031'),
('Daniele', 'Bertolini', 'Medicina Fisica', '2829303132'),
('Martina', 'Ruggeri', 'Medicina Estetica', '2930313233'),
('Giorgio', 'Fiorini', 'Medicina Interna', '3031323334'),
('Claudia', 'Bianchi', 'Medicina Preventiva', '3132333435'),
('Alessandro', 'Giorgi', 'Medicina di Emergenza', '3233343536');


INSERT INTO paziente (nome, cognome, data_nascita, telefono, indirizzo) VALUES 
('Andrea', 'Russo', '1990-05-15', '3456789012', 'Via Roma 10, Milano'),
('Maria', 'Ferrari', '1985-12-20', '4567890123', 'Corso Vittorio 15, Torino'),
('Luca', 'Esposito', '2000-07-08', '5678901234', 'Piazza Dante 8, Napoli'),
('Sofia', 'Bianchi', '1995-03-30', '6789012345', 'Via Garibaldi 20, Firenze'),
('Matteo', 'Conti', '1988-09-14', '7890123456', 'Viale Europa 25, Bologna');
        
