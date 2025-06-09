const module = {
    id: 123, 
    name: "Rocket Propulsion",
    description: "This course provides an in-depth study of the fundamentals of rocket propulsion, covering topics such as propulsion theory, engine types, fuel chemistry, and the practical applications of rocket technology. Designed for students with a strong background in physics and engineering, the course includes both theoretical instruction and hands-on laboratory work",
    course: "RS 101",
    score: 0,
    completed: false,

};
export default function ModuleObject(app) {
    app.get("/lab5/module", (req, res) => {
    res.json(module);
});
    app.get("/lab5/module/name", (req, res) => {
    res.json(module.name);
});
app.get("/lab5/module/name/:newName",
    (req, res) => {
    const { newName } = req.params;
    module.name = newName;
    res.json(module);
  });

  app.get("/lab5/module/score", (req, res) => {
    res.json(module.score);
  })
  app.get("/lab5/module/score/:newScore",
    (req, res) => {
    const { newScore } = req.params;
    module.score = parseInt(newScore);
    res.json(module);
  });
  app.get("/lab5/module/completed/:newCompleted", (req, res) => {
  const { newCompleted } = req.params;
  module.completed = newCompleted === "true";
  res.json(module);
});

  app.get("/lab5/module/completed", (req, res) => {
    res.json(module.completed);
  })

  app.get("/lab5/module/description", (req, res) => {
    res.json(module.description);
});
app.get("/lab5/module/description/:newDescription",
    (req, res) => {
    const { newDescription } = req.params;
    module.description = decodeURIComponent(newDescription);
    res.json(module);
  });



};