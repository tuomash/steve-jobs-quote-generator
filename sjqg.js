// functions

function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");

	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");

		if(pair[0] == variable) {
			return pair[1];
		}
	}

	return null;
}

function loadNewQuote() {
	window.location.replace(location.pathname);
}

function copyToClipboard() {
	window.prompt("Copy to clipboard: Ctrl+C, Enter", url);
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';

	for (var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && n > 0) {
			context.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	context.fillText(line, x, y);
}

// program flow

var twitter = false;

if (getQueryVariable("twitter") != null) {
	twitter = true;
}

var quoteParam = getQueryVariable("quote");
var quote;

if (quoteParam != null && quoteParam.length > 0) {
	quote = decodeURIComponent(quoteParam);
}
else {
	var generator = new MarkovTweet();
	var quotes = [];
	quotes.push("Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma - which is living with the results of other people's thinking. Don't let the noise of others' opinions drown out your own inner voice. And most important, have the courage to follow your heart and intuition.");
	quotes.push("You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something - your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.");
	quotes.push("Be a yardstick of quality. Some people aren't used to an environment where excellence is expected.");
	quotes.push("Design is not just what it looks like and feels like. Design is how it works.");
	quotes.push("Stay hungry, stay foolish.");
	quotes.push("This is what customers pay us for - to sweat all these details so it's easy and pleasant for them to use our computers. We're supposed to be really good at this. That doesn't mean we don't listen to customers, but it's hard for them to tell you what they want when they've never seen anything remotely like it.");
	quotes.push("I want to put a ding in the universe.");
	quotes.push("Design is the fundamental soul of a man-made creation that ends up expressing itself in successive outer layers of the product or service. The iMac is not just the color or translucence or the shape of the shell. The essence of the iMac is to be the finest possible consumer computer in which each element plays together.");
	quotes.push("But innovation comes from people meeting up in the hallways or calling each other at 10:30 at night with a new idea, or because they realized something that shoots holes in how we've been thinking about a problem.");
	quotes.push("I'm convinced that about half of what separates successful entrepreneurs from the non-successful ones is pure perseverance.");
	quotes.push("My favorite things in life don't cost any money. It's really clear that the most precious resource we all have is time.");
	quotes.push("My model for business is The Beatles. They were four guys who kept each other's kind of negative tendencies in check. They balanced each other, and the total was greater than the sum of the parts. That's how I see business: Great things in business are never done by one person, they're done by a team of people.");
	quotes.push("Sometimes when you innovate, you make mistakes. It is best to admit them quickly, and get on with improving your other innovations.");
	quotes.push("Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work. And the only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle. As with all matters of the heart, you'll know when you find it.");
	quotes.push("Innovation distinguishes between a leader and a follower.");
	quotes.push("That's been one of my mantras - focus and simplicity. Simple can be harder than complex; you have to work hard to get your thinking clean to make it simple.");
	quotes.push("Quality is much better than quantity. One home run is much better than two doubles.");
	quotes.push("When you're a carpenter making a beautiful chest of drawers, you're not going to use a piece of plywood on the back, even though it faces the wall and nobody will see it. You'll know it's there, so you're going to use a beautiful piece of wood on the back. For you to sleep well at night, the aesthetic, the quality, has to be carried all the way through.");
	quotes.push("Creativity is just connecting things. When you ask creative people how they did something, they feel a little guilty because they didn't really do it, they just saw something. It seemed obvious to them after a while.");
	quotes.push("What a computer is to me is the most remarkable tool that we have ever come up with. It's the equivalent of a bicycle for our minds.");
	quotes.push("Here's to the crazy ones, the misfits, the rebels, the troublemakers, the round pegs in the square holes... The ones who see things differently - they're not fond of rules... You can quote them, disagree with them, glorify or vilify them, but the only thing you can't do is ignore them because they change things... They push the human race forward, and while some may see them as the crazy ones, we see genius, because the ones who are crazy enough to think that they can change the world, are the ones who do.");
	quotes.push("It's better to be a pirate than to join the navy.");
	quotes.push("Real artists ship.");
	quotes.push("You've got to start with the customer experience and work back toward the technology - not the other way around.");
	quotes.push("I was worth about over a million dollars when I was twenty-three and over ten million dollars when I was twenty-four, and over a hundred million dollars when I was twenty-five and it wasn't that important because I never did it for the money.");
	quotes.push("The only problem with Microsoft is they just have no taste. They have absolutely no taste. And I don't mean that in a small way, I mean that in a big way, in the sense that they don't think of original ideas, and they don't bring much culture into their products.");
	quotes.push("I am saddened, not by Microsoft's success - I have no problem with their success. They've earned their success, for the most part. I have a problem with the fact that they just make really third-rate products.");
	quotes.push("I found that there were these incredibly great people at doing certain things, and that you couldn't replace one of these people with 50 average people. They could just do things that no number of average people could do.");
	quotes.push("It's rare that you see an artist in his 30s or 40s able to really contribute something amazing.");
	quotes.push("It is hard to think that a $2 billion company with 4,300-plus people couldn't compete with six people in blue jeans.");
	quotes.push("I feel like somebody just punched me in the stomach and knocked all my wind out. I'm only 30 years old and I want to have a chance to continue creating things. I know I've got at least one more great computer in me. And Apple is not going to give me a chance to do that.");
	quotes.push("Do you want to spend the rest of your life selling sugared water or do you want a chance to change the world?");
	quotes.push("You can't just ask customers what they want and then try to give that to them. By the time you get it built, they'll want something new.");
	quotes.push("When you grow up you tend to get told that the world is the way it is and your life is just to live your life inside the world. Try not to bash into the walls too much. Try to have a nice family, have fun, save a little money. That's a very limited life. Life can be much broader once you discover one simple fact: Everything around you that you call life was made up by people that were no smarter than you and you can change it, you can influence it, you can build your own things that other people can use.");
	quotes.push("The desktop computer industry is dead. Innovation has virtually ceased. Microsoft dominates with very little innovation. That's over. Apple lost. The desktop market has entered the dark ages, and it's going to be in the dark ages for the next 10 years, or certainly for the rest of this decade.");
	quotes.push("We have always been shameless about stealing great ideas.");
	quotes.push("We made the buttons on the screen look so good you'll want to lick them.");
	quotes.push("It will go down in history as a turning point for the music industry. This is landmark stuff. I can't overestimate it!");
	quotes.push("Because I'm the CEO, and I think it can be done.");
	quotes.push("Click. Boom. Amazing!");
	quotes.push("Remembering that I'll be dead soon is the most important tool I've ever encountered to help me make the big choices in life. Because almost everything - all external expectations, all pride, all fear of embarrassment or failure - these things just fall away in the face of death, leaving only what is truly important. Remembering that you are going to die is the best way I know to avoid the trap of thinking you have something to lose. You are already naked. There is no reason not to follow your heart.");
	generator.addData(quotes);
	quote = generator.buildTweet();
}

var url = window.location.href + "?quote=" + quote;
url = encodeURI(url);

var c = document.getElementById("c");
var ctx = c.getContext("2d");
var img = new Image();
img.onload = function() {
	var quote2 = "\"" + quote + "\"";
	ctx.drawImage(img, 0, 0);

	if (twitter)
	{
		ctx.font = "16px Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif";
		wrapText(ctx, quote2, 55, 120, 380, 20);
		ctx.font = "bold 24px Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif";
		ctx.fillText("-Steve Jobs", 50, 280);
		ctx.font = "bold 12px Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif";
		ctx.fillText("stevejobsquotegenerator.com", 50, 480);
		console.log(quote2);
	}
	else
	{
		ctx.font = "16px Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif";
		wrapText(ctx, quote2, 55, 120, 400, 20);
		ctx.font = "bold 24px Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif";
		ctx.fillText("-Steve Jobs", 50, 280);
		ctx.font = "bold 12px Lucida Grande,Lucida Sans Unicode,Lucida Sans,Geneva,Verdana,sans-serif";
		ctx.fillText("stevejobsquotegenerator.com", 40, 480);
	}
};

if (twitter)
{
	img.src = 'steve-jobs-twitter-2.png';
}
else
{
	img.src = 'steve-jobs.png';
}