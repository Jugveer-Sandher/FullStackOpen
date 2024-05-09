const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());
morgan.token('postData', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

let persons =  
[
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get("/api/persons", (req, res) => {
    res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(person => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
})

app.get("/info", (req, res) => {
  const currentDate = new Date();
  res.send(`<h3>Phonebook has info for ${persons.length} people</h5>
            <h3>${currentDate}</h3>`);
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter(person => person.id !== id);

  res.status(204).end();
})

app.post("/api/persons", (req, res) => {
  const person = req.body;

  if (!person || !person.name || !person.number) {
    return res.status(400).json({ error: 'Name or number is missing' });
  }

  const nameExists = persons.some(p => p.name === person.name);
  if (nameExists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newId = Math.floor(Math.random() * 100);
  person.id = newId;

  persons = persons.concat(person);
  res.json(person);
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on part ${PORT}`);
})
