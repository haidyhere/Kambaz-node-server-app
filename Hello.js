export default function Hello(app) {    
    const hello = (req, res) => {
    res.send('Hello World!')
    };
    const good = (req, res) => {
    res.send('Life is good!')
    };
    const index = (req, res) => {
    res.send('Welcome to Full Stack Development!')
    };
    app.get("/hello", hello);
    app.get("/good", good);
    app.get("/", index);
}


