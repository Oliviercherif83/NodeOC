const http = require('http');
const fs = require('fs');

const hostname = "127.0.0.1";
const port = 8080;

const users = [{ name: "Sonia" }, { name: "Antoine" }];

const server = (req, res) => {
    const url = req.url.replace("/", "");

    // pas de favicon pour l'instant
    if (url === "favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });

        res.end();
        return;
    }

    // renvoyer le fichier bootstrap.min.css se trouvant dans index.html
    if (url === "bootstrap") {
        // header de la réponse pour le client
        res.writeHead(200, { "Content-Type": "text/css" });
        const cssFile = fs.readFileSync('./assets/css/bootstrap.min.css', 'utf-8');
        res.write(cssFile);
        res.end();

        return;
    }

    // pour traiter les données POST du formulaire
    if (url === '' && req.method === 'POST') {
        let body = '';
        req.on("data", (data) => {
            // On peut caster les data qui arrivent en binaire en toString pour les traiter dans l'application sous forme d'une chaine de caractères
            //console.log(data.toString())
            body += data;
        });

        // tous les data ont été reçu
        req.on('end', () => {
            // On prépare une regex permettant de remplacer tous les + 
            // cette syntaxe permet juste de repérer tous les + dans la chaine de caractères
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

            users.push({ ...sanitize[0], ...sanitize[1] });

            // 302 redirection non permanente pour retourner la page d'accueil
            res.writeHead(302, {
                Location: `http://${hostname}:${port}`
            });

            res.end();

            // const home = fs.readFileSync('./views/home.html', 'utf-8');
            // res.writeHead(200, { "Content-Type": "text/html" });
            // res.write(home);
            // res.end();

            return;
        });

    }

    if (url === '' && req.method === 'GET') {
        const home = fs.readFileSync('./views/home.html', 'utf-8');
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(home);
        res.end();

        return;
    }

    if (url === 'users') {
        let html = "<ul>";
        // dans la syntaxe for of vous pouvez assigner par composition
        for (const { name } of users) {
            html += `<li>${name}</li>`;
        }

        html += "</ul>";

        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(`
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Ajoutez un utilisateur</title>
    <link href="/bootstrap" rel="stylesheet" type="text/css" />
</head>
<body>
    <div class="container">
        <div class="row">
            <div class="col-12">
                ${html}
                <p><a href="http://${hostname}:${port}">Home</a></p>
            </div>
        </div>
    </div>
    </div>
</body>
</html>
        `);
        res.end();

        return;
    }
}

const app = http.createServer(server);

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});