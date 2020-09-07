var express     = require("express"),
	app         = express(),
	bodyParser  = require("body-parser"),
	mongoose    = require("mongoose"),
	dotenv		= require("dotenv"),
	TodoTask    = require("./models/TodoTask");
	
// dotenv.config();

app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

let uri = process.env.DATABASEURL;
mongoose.set("useFindAndModify", false);
mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, () => {
	console.log("Connected to db!");
});

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

app.listen(process.env.PORT, process.env.IP, () => console.log("Server Has Started!"));