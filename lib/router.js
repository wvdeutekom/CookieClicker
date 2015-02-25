Router.route('/', function () {
	this.render('home');
})



Router.route('/squadSelection/:_id', function () {
	  this.render('squadSelection');
  // this.render('squadSelection', {
  //   data: function () {
  //     return Posts.findOne({_id: this.params._id});
  //   }
  // });
});