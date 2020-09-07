var express     = require("express"),
	app         = express(),
	bodyParser  = require("body-parser"),
	mongoose    = require("mongoose"),
	dotenv		= require("dotenv"),
	TodoTask    = require("./models/TodoTask");
	
dotenv.config();

app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.urlencoded({ extended: true }));

mongoose.set("useFindAndModify", false);
const uri = "mongodb+srv://todoapp:EzEeiCiMeD3ZzjrA@cluster0.s4obv.gcp.mongodb.net/todo_db?retryWrites=true&w=majority";
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
	console.log("Connected to db!");
});

// const MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb+srv://todo_app:Ltgf6XeNPOdkId6f@cluster0.s4obv.gcp.mongodb.net/todo_db?retryWrites=true&w=majority;"
// const client = new MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });/

app.get("/", (req, res) => {
	TodoTask.find({}, (err, tasks) => {
		res.render('todo', { todoTasks: tasks });
	});
});

app.post('/',async (req, res) => {
	const todoTask = new TodoTask({
		content: req.body.content
	});
	try {
		await todoTask.save();
		res.redirect("/");
	} catch (err) {
		res.redirect("/");
	}
});

app.post('/',async (req, res) => {
	const todoTask = new TodoTask({
		content: req.body.content
	});
	try {
		await todoTask.save();
		res.redirect("/");
	} catch (err) {
		res.redirect("/");
	}
});

app.route("/remove/:id").get((req, res) => {
	const id = req.params.id;
	TodoTask.findByIdAndRemove(id, err => {
		if (err) return res.send(500, err);
		res.redirect("/");
	});
});


app.listen(4080, function(){
	console.log("APP.JS START");
});