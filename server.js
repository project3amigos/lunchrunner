const express = require("express");
const path = require("path");
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const PORT = process.env.PORT || 3001;
const app = express();

//Require models
const db = require("./models");
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
}, {debug: true});

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.post('/text', (req, res) => {
  // res.send(req.body);
  // console.log(req.body);
  const number = req.body.number;
  const text = req.body.text;
  nexmo.message.sendSms(
    process.env.NUMBER, number, text, { type: 'unicode' },
    (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        console.dir(responseData);
      }
    }
  )
})
//Require routes
const routes = require("./routes");
app.use("/", routes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});
// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
