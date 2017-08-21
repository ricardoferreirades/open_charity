$(document).ready(function(){
	$( '.owl-carousel' ).owlCarousel({
		autoplay: true,
		items: 5,
		slideBy: 5,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		navElement: 'span',
		lazyLoad: true,
		center: true,
		dotEach: false
	});
});