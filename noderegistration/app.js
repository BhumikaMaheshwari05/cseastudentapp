const http = require('http');
const fs = require('fs').promises;
const PORT = 3080;

const server = http.createServer(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === "OPTIONS") {
        res.statusCode = 200;
        return res.end();
    }

    if (req.url === "/register" && req.method === "POST") {
        let body = '';
        req.on('data', chunk => { body += chunk; });

        req.on('end', async () => {
            try {
                const { email, password } = JSON.parse(body);
                let arr = [];

                // Check if file exists, if not create an empty JSON array
                try {
                    const fdata = await fs.readFile('student.json', { encoding: 'utf-8' });
                    arr = JSON.parse(fdata);
                } catch (err) {
                    if (err.code === 'ENOENT') {
                        console.log("student.json not found, creating a new one...");
                        arr = [];
                    } else {
                        throw err;
                    }
                }

                const result = arr.find(ele => ele.email === email);
                if (result) {
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ "message": "Email already exists" }));
                }

                arr.push({ email, password });
                await fs.writeFile('student.json', JSON.stringify(arr, null, 2));

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ "message": "User registered successfully!", "status": 200 }));
            } catch (error) {
                console.error("Error in /register:", error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ "message": "Internal Server Error" }));
            }
        });
    }

    if (req.url === "/login" && req.method === "POST") {
        let body = '';
        req.on('data', chunk => { body += chunk; });

        req.on('end', async () => {
            try {
                const { email, password } = JSON.parse(body);

                const fdata = await fs.readFile('student.json', { encoding: 'utf-8' });
                const arr = JSON.parse(fdata);
                const result = arr.find(ele => ele.email === email && ele.password === password);

                res.setHeader('Content-Type', 'application/json');
                if (result) {
                    return res.end(JSON.stringify({ "message": "Login successful", "status": 200 }));
                } else {
                    return res.end(JSON.stringify({ "message": "Invalid email or password", "status": 401 }));
                }
            } catch (error) {
                console.error("Error in /login:", error);
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ "message": "Internal Server Error" }));
            }
        });
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
