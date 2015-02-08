# sodimm_engine

Getting Started
---------------

sodimm-vagrant-chef is used for development

```
$ npm install

$ node app.js
```

**Note:** I highly recommend installing [Nodemon](https://github.com/remy/nodemon).
It watches for any changes in your  node.js app and automatically restarts the
server. Once installed, instead of `node app.js` use `nodemon app.js`. It will
save you a lot of time in the long run, because you won't need to manually
restart the server each time you make a small change in code. To install, run
`sudo npm install -g nodemon`.

## Environment vars
*Harry* - we added `dotenv` to this project. You can specify environment
variables by including a .env file in the root of your project. Don't put it
under version control!

```
./.env
MONGODB=mongodb://user:pass@foo.mongolab.com:bar/databaseName
LINKEDIN_ID=foo
LINKEDIN_SECRET=bar
#LINKEDIN_CALLBACK_URL=
```

### What is this Rails 3.1-style asset pipeline that you mentioned under Features?
This is how you typically define static files inside HTML, Jade or any template
for that matter:

```jade
link(href='/css/styles.css', rel='stylesheet')
script(src='/js/lib/jquery-2.1.0.min.js')
script(src='/js/lib/bootstrap.min.js')
script(src='/js/main.js')
```

Simple enough right? But wouldn't it be nice to have it just like that in
development mode, but when you deploy your app to production, have it minified
and concatenated into a single file automatically without any extra effort on
your part?

```jade
link(href='/css/styles.css', rel='stylesheet')
script(src='/js/application.js')
```

As soon as you start bringing in more JavaScript libraries, the benefits of
concatenating and minifying JavaScript files will be even greater. Using
**connect-assets** library, it is  as as simple as declaring these two lines:

```
!= css('styles')      // expects public/css/styles.less
!= js('application')  // expects public/js/application.js
```

**Tip:** We can use `css` and `js` functions in Jade templates because in
**connect-assets** middleware options we have added this line: `helperContext: app.locals`.

The only thing you need to remember is to define your JavaScript files inside
`public/js/application.js` using this strange syntax notation (Sprockets-style)
borrowed from Rails. I know it's an extra thing to learn for someone who has
never seen Rails asset pipeline before, but in this case, I think benefits
outweigh the cost.

```js
//= require lib/jquery-2.1.0.min
//= require lib/bootstrap.min
//= require main
```

Using this approach, when working in development mode, **connect-assets** will
load each file individually, without minifying or concatenating anything.
When you deploy your app, it will run in production mode, and so **connect-assets**
will automatically serve a single concatenated & minified `application.js`.
For more information see [Sprockets-style concatenation](https://github.com/adunkman/connect-assets/#sprockets-style-concatenation)
section.

### How do flash messages work in this project?
Flash messages allow you to display a message at the end of the request and access
it on next request and only next request. For instance, on a failed login attempt, you would
display an alert with some error message, but as soon as you refresh that page or visit a different
page and come back to the login page, that error message will be gone. It is only displayed once.
This project uses *express-flash* module for flash messages. And that
module is built on top of *connect-flash*, which is what I used in
this project initially. With *express-flash* you don't have to
explicity send a flash message to every view inside `res.render()`.
All flash messages are available in your views via `messages` object by default,
thanks to *express-flash*.

Flash messages have a two-step process. You use `req.flash('errors', { msg: 'Error messages goes here' }`
to create a flash message in your controllers, and then display them in your views:
```jade
if messages.errors
  .alert.alert-danger.fade.in
    for error in messages.errors
      div= error.msg
```
In the first step, `'errors'` is the name of a flash message, which should match the
name of the property on `messages` object in your views. You place alert messages
inside `if message.errors` because you don't want to show them flash messages are actually present.
The reason why you pass an error like `{ msg: 'Error messages goes here' }` instead
of just a string - `'Error messages goes here'`, is for the sake of consistency.
To clarify that, *express-validator* module which is used for validating and sanitizing user's input,
returns all errors as an array of objects, where each object has a `msg` property with a message
why an error has occurred. Here is a more general example of what express-validator returns when there are errors present:

```js
[
  { param: "name", msg: "Name is required", value: "<received input>" },
  { param: "email", msg: "A valid email is required", value: "<received input>" }
]
```

To keep consistent with that style, you should pass all flash messages
as `{ msg: 'My flash message' }` instead of a string. Otherwise you will just see an alert box
without an error message. That is because, in **partials/flash.jade** template it will try to output
`error.msg` (i.e. `"My flash message".msg`), in other words it will try to call a `msg` method on a *String* object,
which will return *undefined*. Everything I just mentioned about errors, also applies
to "info" and "success" flash messages, and you could even create a new one yourself, such as:

**Data Usage Controller (Example)**
```
req.flash('warning', { msg: 'You have exceeded 90% of your data usage' });
```

**User Account Page (Example)**
```jade
if messages.warning
  .alert.alert-warning.fade.in
    for warning in messages.warning
      div= warning.msg
```

`partials/flash.jade` is a partial template that contains how flash messages
are formatted. Previously, flash
messages were scattered throughout each view that used flash messages
(contact, login, signup, profile), but now, thankfully it is uses a *DRY* approach.

The flash messages partial template is *included* in the `layout.jade`, along with footer and navigation.
```jade
body
  #wrap
    include partials/navigation
    .container
      include partials/flash
      block content
  include partials/footer
```

If you have any further questions about flash messages,
please feel free to open an issue and I will update this mini-guide accordingly,
or send a pull request if you  would like to include something that I missed.

<hr>

### How do I use Socket.io with Hackathon Starter?
[Dan Stroot](https://github.com/dstroot) submitted an excellent [pull request](https://github.com/dstroot/hackathon-starter/commit/0a632def1ce8da446709d92812423d337c977d75) that adds a real-time dashboard with socket.io.
And as  much as I'd like to add it to the project, I think it violates one of the main
principles of the Hackathon Starter:
> When I started this project, my primary focus was on simplicity and ease of use.
> I also tried to make it as generic and reusable as possible to cover most use cases of
> hackathon web apps, **without being too specific**.

When I need to use socket.io, I **really** need it, but most of the time - I don't. But more
importantly, websockets support is still experimental on most hosting providers. As of October 2013,
Heroku supports websockets, but not until you opt-in by running this command:

```js
heroku labs:enable websockets -a myapp
```

And what if you are deploying to OpenShift? They do support websockets, but it is currently in a
preview state. So, for OpenShift you would need to change the socket.io connect URI to the following:

```js
var socket = io.connect('http://yoursite-namespace.rhcloud.com:8000');
```

Wait, why is it on port 8000? Who knows, and if I didn't run across this [blog post](http://velin-georgiev-blog.appspot.com/blog/set-up-nodejs-express-socketio-application-using-websockets-on-openshift-by-red-hat/)
I wouldn't even know I had to use port 8000.

I am really glad that Heroku and OpenShift at least
have a websockets support, because many other PaaS providers still do not support it.
Due to the aforementioned issues with websockets, I cannot include socket.io as part of the Hackathon Starter. *For now...*
If you need to use socket.io in your app, please continue reading.

First you need to install socket.io:
```js
npm install socket.io --save
```

Replace `var app = express();` with the following code:

```js
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
```

I like to have the following code organization in `app.js` (from top to bottom): module dependencies,
import controllers, import configs, connect to database, express configuration, routes,
start the server, socket.io stuff. That way I always know where to look for things.

Add the following code at the end of `app.js`:

```js
io.on('connection', function(socket) {
  socket.emit('greet', { hello: 'Hey there browser!' });
  socket.on('respond', function(data) {
    console.log(data);
  });
  socket.on('disconnect', function() {
    console.log('Socket disconnected');
  });
});
```

One last thing left to change:
```js
app.listen(app.get('port'), function() {
```
to
```js
server.listen(app.get('port'), function() {
```

At this point we are done with the back-end.

You now have a choice - to include your JavaScript code in Jade templates or have all your client-side
JavaScript in a separate file - in `main.js`. I will admit, when I first started out with Node.js and JavaScript in general,
I placed all JavaScript code inside templates because I have access to template variables passed in from Express
right then and there. It's the easiest thing you can do, but also the least efficient and harder to maintain. Since then I
almost never include inline JavaScript inside templates anymore.

But it's also understandable if you want take the easier road.
Most of the time you don't even care about performance during hackathons, you just
want to [*"get shit done"*](http://www.startupvitamins.com/media/products/13/aaron_levie_poster_black.jpg) before the time runs out.
Well, either way, use whichever approach makes more sense to you. At the end of the day,
it's **what** you build that matters, not **how** you build it.

If you want to stick all your JavaScript inside templates, then in `layout.jade` -
your main template file, add this to `head` block.

```jade
script(src='/socket.io/socket.io.js')
script.
    var socket = io.connect(window.location.href);
    socket.on('greet', function (data) {
      console.log(data);
      socket.emit('respond', { message: 'Hey there, server!' });
    });
```

**Note:** Notice the path of the `socket.io.js`, you don't actually
have to have `socket.io.js` file anywhere in your project; it will be generated
automatically at runtime.

If you want to have JavaScript code separate from templates, move that inline
script code into `main.js`, inside the `$(document).ready()` function:

```js
$(document).ready(function() {

  // Place JavaScript code here...
  var socket = io.connect(window.location.href);
  socket.on('greet', function (data) {
    console.log(data);
    socket.emit('respond', { message: 'Hello to you too, Mr.Server!' });
  });

});
```

And that's it, we are done!

If you want to see a really cool real-time dashboard check out this
[live example](http://hackathonstarter.herokuapp.com/dashboard). Refer to the
[pull request #23](https://github.com/sahat/hackathon-starter/pull/23/files) to
see how it is implemented.

