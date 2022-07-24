db = connect("mongodb://mongo/admin");
db.auth("root", passwordPrompt());
db = db.getSiblingDB("blog");

db.authors.insertMany([
  {
    name: "Max Cat",
    email: "max@cats.cat",
  },
  {
    name: "Mini Kitten",
    email: "mini@kittens.cat",
  },
]);
