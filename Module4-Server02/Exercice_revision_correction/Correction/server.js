const fs = require('fs');
const dayjs = require('dayjs');
// moteur de templating qui permet de créer des vues dynamiques, dans lesquelles vous insérez des données (passez des données à la vue)
const ejs = require("ejs");
require('dotenv').config();

const { APP_LOCALHOST: hostname, APP_PORT: port } = process.env;
let { students } = require('./Data/students');

exports.server = (req, res) => {
    const url = req.url.replace('/', '');

    if (url === "style") {
        // header de la réponse pour le client
        res.writeHead(200, { "Content-Type": "text/css" });
        const cssFile = fs.readFileSync('./assets/css/style.css', 'utf-8');
        res.write(cssFile);
        res.end();

        return;
    }

    // Favicon
    if (url === "favicon.ico") {
        const favicon = fs.readFileSync('./assets/favicon.ico');

        res.writeHead(200, { "Content-Type": "image/x-icon" });
        res.write(favicon);
        res.end();

        return;
    }

    if (url === '' && req.method === 'GET') {
        const home = fs.readFileSync('./views/home.html', 'utf-8');
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(home);
        res.end();

        return;
    }

    if (url === '' && req.method === 'POST') {
        let body = '';
        req.on("data", (data) => {
            body += data;
        });

        req.on('end', () => {
            const replacer = new RegExp(/\+/, "g");

            const sanitize = body
                .toString()
                .trim()
                .replace(replacer, ' ')
                .split('&')
                .map(data => {
                    // on assigne par décomposition en splittant avec = 
                    const [key, value] = data.split("=");

                    // on retourne un littéral constitué d'une clé, attention pensez à mettre des crochets pour que JS interprété la clé comme une valeur
                    return (
                        { [key]: value.trim() }
                    )
                });
            // vérifiez que l'on a pas un doublon
            const { name } = sanitize[0];

            if (students.filter(user => user.name === name).length > 0) {
                res.end("Attenntion ...");

                return;
            }
            students.push({ id: Math.floor( Math.random() * Date.now() ), ...sanitize[0], ...sanitize[1] });
            console.log(students);

            // 302 redirection non permanente pour retourner la page d'accueil
            res.writeHead(302, {
                Location: `http://${hostname}:${port}`
            });

            res.end();

            return;
        });
    }

    if (url.includes('delete') && req.method === 'POST') {
        const lenDelete = 7;
        const id = url.slice(lenDelete);
        students = students.filter(user => user.id != id);
        console.log(students)

        // 302 redirection non permanente pour retourner la page d'accueil
        res.writeHead(302, {
            Location: `http://${hostname}:${port}`
        });

        res.end();

        return;
    }


    if (url === 'students') {
        res.writeHead(200, { "Content-Type": "text/html" });
        const tpl_students = fs.readFileSync('./views/students.html', 'utf8');

        newStudentsDate = students.map(student => (
            {
                ...student, birth: dayjs(student.birth).format('DD-MM-YYYY')
            }))
        // ejs de créer le template de vue dans lequelle on passe des la données de manière dynamique
        // le render premier paramètre le nom du fichier et les données
        res.write(ejs.render(tpl_students, { students: newStudentsDate }));
        res.end();

        return;
    }
}