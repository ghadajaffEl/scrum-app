const express = require("express");
const { MongoClient, ObjectID } = require("mongodb");
const bodyParser = require("body-parser");
const Joi = require("joi");
const assert = require("assert");
const app = express();
//brad traversy
app.use(bodyParser.json());

const mongo_url = "mongodb://localhost:27017";
const database = "Scrum";
//let contact = [];
MongoClient.connect(
  mongo_url,
  (err, client) => {
    assert.equal(err, null, "database connexion failed");
    const db = client.db(database);
    //post
    app.post("/addUser", (req, res) => {
      /*const { error } = validateUser(req.body);
      if (error) res.status(400).send(error.details.message);
      else { */
      console.log(req.body);
      db.collection("user").insertOne(req.body, (err, data) => {
        if (err) console.log("insert failed");
        else res.send(data);
      });
    });
    //get all
    app.get("/listContact", (req, res) => {
      db.collection("contact")
        .find()
        .toArray((err, data) => {
          if (err) console.log("get failed");
          else res.send(data);
        });
    });
    //get contact
    app.get("/contact/:id", (req, res) => {
      db.collection("contact").findOne(
        { _id: ObjectID(req.params.id) },
        (err, data) => {
          if (err) console.log("get failed");
          else {
            if (data == null) res.status(404).send("contact not found");
            else res.send(data);
          }
        }
      );
    });

    //put
    app.put("/updateContact/:id", (req, res) => {
      let modifiedContact = req.body;
      let { error } = validateContact(modifiedContact);
      if (error) {
        res.status(400).send(error.details[0].message);
      } else {
        let id = ObjectID(req.params.id);
        db.collection("contact").findOneAndReplace(
          { _id: id },
          { $set: { ...modifiedContact } },
          (err, data) => {
            if (err) res.send("update failed");
            else res.send("contact was modified");
          }
        );
      }
    });

    //delete contact
    app.delete("/deleteContact/:id", (req, res) => {
      let id = ObjectID(req.params.id);
      db.collection("contact").findOneAndDelete({ _id: id }, (err, data) => {
        if (err) res.send("can't delete contact");
        else {
          if (data.value == null) {
            res.status(404).send("contact not found");
          } else {
            res.send("contact was deleted");
          }
        }
      });
    });
  }
);

function validateUser(user) {
  const schema = Joi.object().keys({
    fullname: Joi.string()
      .alphanum()
      .min(6)
      .max(30)
      .required(),
    email: Joi.string()
      .email({ minDomainAtoms: 2 })
      .required(),

    status: Joi.string()
      .min(5)
      .max(60)
      .required(),
    password: Joi.string()
      .min(6)
      .max(10)
      .required(),
    confirmpassword: Joi.string()
      .min(6)
      .max(10)
      .required()
  });
  return Joi.validate(user, schema);
}

app.listen(5005, err => {
  if (err) console.log("server connexion failed");
  else console.log("server connecting on port 5005");
});
