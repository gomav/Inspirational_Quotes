$(document).on('ready', function() {

});

var Quote = function(title, description){
  this.title = title;
  this.description = description;

  this.render();
};

Quote.prototype.render = function (){
  if(this.el === undefined){

    this.el = $('#quote-tpl')
    .clone()
    .attr('id', null);
  }

  this.el.find('.quote-title').html('<a href="http://en.wikipedia.org/wiki/' + this.title.split(' ').join('_') + '">'+ this.title + '</a>' );
  this.el.find('.quote-description').text(this.description);

  return this.el;
};

var QuoteLibrary = function(name){

  this.name = name;

  this.quotes = [];

  this.render();
};

QuoteLibrary.prototype.addQuote = function(quote) {

  this.quotes.push(quote);

  this.render();
};

QuoteLibrary.prototype.render = function () {
  if(this.el === undefined){

    this.el = $('#quote-library-tpl')
      .clone()
      .attr('id', null);

    this.el.find('.new-quote-form').on('submit', this.onFormSubmit.bind(this));
  }

  this.el.find('.library-name').text(this.name);

  var quoteElements = this.quotes.map(function(quote){
    return quote.render();
  });

  this.el.find('.quote-list').append(quoteElements);

  return this.el;

};
QuoteLibrary.prototype.onFormSubmit = function(e){
  e.preventDefault();


  var quoteTitle = $(e.currentTarget).find('[name=quote-title]').val();
  var quoteDescription = $(e.currentTarget).find('[name=quote-description]').val();

  var newQuote = new Quote(quoteTitle, quoteDescription);

  this.addQuote(newQuote);
};

var inspirational = new Quote('William Shakespeare', 'We know what we are, but know not what we may be.' );
var inspirational2 = new Quote('Anais Nin', 'Age does not protect you from love. But love, to some extent, protects you from age.');
var inspirational3 = new Quote('Elizabeth Wurtzel', 'Insanity is knowing that what you\'re doing is completely idiotic, but still, somehow, you just can\'t stop it.');
var inspirational4 = new Quote('Norman Vincent Peale', 'Change your thoughts and you change the world');
var inspirational5 = new Quote('Ann Frank', 'Whoever is happy will make others happy too');

var myLibrary = new QuoteLibrary('Inspirational Quotes');

myLibrary.addQuote(inspirational);
myLibrary.addQuote(inspirational2);
myLibrary.addQuote(inspirational3);
myLibrary.addQuote(inspirational4);
myLibrary.addQuote(inspirational5);

$('body').append(myLibrary.render());
