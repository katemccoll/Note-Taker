const fs = require('fs');

let notesData = JSON.parse(fs.readFileSync("./db/db.json"));

function saveNotes() {
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData));

}

module.exports = (app) => {
    app.get('/api/notes', (req, res) => res.json(notesData.notes));

    app.post('/api/notes', (req, res) => {
        req.body.id = notesData.nextId++;

        notesData.notes.push(req.body);
        saveNotes();
        res.json(true);

    });

    app.delete('/api/notes/:id', (req, res) => {
        for (let x = 0; x < notesData.notes.length; x++) {
            if (req.params.id == notesData.notes[x].id) {
                notesData.notes.splice(x);
                saveNotes();
                res.json(true);
                return;
            }
        }

        res.sendStatus(404);
    });

    app.post('/api/clear', (req, res) => {
        notesData.notes = [];
        saveNotes();
        res.json({ ok: true });
    });


};