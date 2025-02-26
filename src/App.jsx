import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card, Navbar, Nav, Form, FormControl, Button, Alert} from 'react-bootstrap';
import './App.css';
import logo from './assets/logo.jpeg';

function App() {
  const [medici, setMedici] = useState([]);
  const [pazienti, setPazienti] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ medici: [], pazienti: [] });
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mediciData = await fetch('http://127.0.0.1:8080/api/medici').then(res => res.json());
        const pazientiData = await fetch('http://127.0.0.1:8080/api/pazienti').then(res => res.json());
        setMedici(mediciData);
        setPazienti(pazientiData);
      } catch (error) {
        console.error('Errore nel caricamento dei dati:', error);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      const response = await fetch(`http://127.0.0.1:8080/api/cerca/${searchQuery}`);
      const data = await response.json();
      setSearchResults(data);
      setActiveSection('search');
    } catch (error) {
      console.error('Errore nella ricerca:', error);
    }
  };

  return (
    <Container fluid className="py-4">
      {/* Navbar per la navigazione */}
      <Navbar bg="light" expand="lg" className="mb-4 shadow-sm">
        <Navbar.Brand href="#" onClick={() => setActiveSection('home')}>
          <img src={logo} alt="Logo Clinica" width="40" height="40" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setActiveSection('home')}>Home</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('medici')}>Medici</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('pazienti')}>Pazienti</Nav.Link>
            <Nav.Link onClick={() => setActiveSection('search')}>Ricerca</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Cerca per nome o cognome..."
              className="me-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-primary" type="submit">Cerca</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      {/* Sezione Home Page */}
      {activeSection === 'home' && (
        <div>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Orari di Apertura</Card.Title>
                  <Card.Text>Lunedì - Venerdì: 08:00 - 20:00<br />Sabato: 09:00 - 13:00</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>I nostri Servizi</Card.Title>
                  <Card.Text>Visite specialistiche, esami diagnostici, assistenza personalizzata.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="shadow-sm">
                <Card.Body>
                  <Card.Title>Contattaci</Card.Title>
                  <Card.Text>Telefono: 0123-456789<br />Email: info@clinica.it</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      )}

      {/* Sezione per Medici */}
      {activeSection === 'medici' && (
        <Row>
          <Col>
            <h2>Medici</h2>
            {medici.map((medico, index) => (
              <Card key={index} className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{medico[1]} {medico[2]}</Card.Title>
                  <Card.Text>Specializzazione: {medico[3]}</Card.Text>
                  <Card.Text>Telefono: {medico[4]}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      )}

      {/* Sezione per Pazienti */}
      {activeSection === 'pazienti' && (
        <Row>
          <Col>
            <h2>Pazienti</h2>
            {pazienti.map((paziente, index) => (
              <Card key={index} className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{paziente[1]} {paziente[2]}</Card.Title>
                  <Card.Text>Data di Nascita: {paziente[3]}</Card.Text>
                  <Card.Text>Telefono: {paziente[4]}</Card.Text>
                  <Card.Text>Indirizzo: {paziente[5]}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      )}

      {/* Sezione per la Ricerca */}
      {activeSection === 'search' && (
        <Row>
          <Col>
            <h2>Risultati Ricerca</h2>
            {searchResults.medici.length === 0 && searchResults.pazienti.length === 0 && (
              <Alert variant="warning">Nessun risultato trovato.</Alert>
            )}
            {searchResults.medici.length > 0 && (
              <div className="mb-4">
                <h3>Medici</h3>
                {searchResults.medici.map((medico, index) => (
                  <Card key={index} className="mb-3 shadow-sm">
                    <Card.Body>
                      <Card.Title>{medico.nome} {medico.cognome}</Card.Title>
                      <Card.Text>Specializzazione: {medico.specializzazione}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
            {searchResults.pazienti.length > 0 && (
              <div>
                <h3>Pazienti</h3>
                {searchResults.pazienti.map((paziente, index) => (
                  <Card key={index} className="mb-3 shadow-sm">
                    <Card.Body>
                      <Card.Title>{paziente.nome} {paziente.cognome}</Card.Title>
                      <Card.Text>Data di Nascita: {paziente.data_nascita}</Card.Text>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default App;
