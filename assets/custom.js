// You can write your custom Javascript here
$(document).ready(function($) {
   
  
/*Fetching country and state*/
    $.getJSON("//www.lennylarry.com/cdn/shop/t/69/assets/countries.json?v=67655105386010789351766421640", function(result){
        $.each(result, function(i, country){
         $("#CustomerFormCountry").append("<option value="+country.iso2+">"+country.name+"</option>")
        });
      });

      $('#CustomerFormCountry').change(function() {
       var selectedCountry=$("#CustomerFormCountry").val();
       $("#CustomerFormState").empty();
       $("#CustomerFormState").append("<option value=''>Select</option>");
       $.getJSON("//www.lennylarry.com/cdn/shop/t/69/assets/states.json?v=145578986197726259351766421640", function(result){
        $.each(result, function(i, state){
            if(state.country_code==selectedCountry)
            {
         $("#CustomerFormState").append("<option >"+state.name+"</option>")
            }
        });
      });
    });
    
    checkSugProd();

    
 setTimeout( function(){
      $( '.spr-form input[name="review[rating]"]' ).attr( 'id', 'review[rating]' );
      console.log('ran');
    }, 2500 );

  setTimeout( function(){
    $( '.footer__aside .subscribe__body input[name="email"]' ).attr( 'id', 'email' );
    $( '.footer__aside .subscribe__body input[name="email"]' ).before( '<label for="email" class="sr-only">Email</label>' );

    $( '.footer__aside .subscribe__body input[type="submit"]' ).attr( 'id', 'hidden-submit' );
    $( '.footer__aside .subscribe__body input[type="submit"]' ).before( '<label for="hidden-submit" class="sr-only">Submit</label>' );
  }, 1200 );

	
	setInterval( function(){
      var fullTotal = 0;
      $('.form-cart tbody tr .table__total span').each(function(){
        var qty = $(this).parent().parent().find('.qty__field').val();
        var priceStr = $(this).parent().parent().find('.table__price .money').text();
        console.log(priceStr);
        var priceInt = priceStr.substring(1);
        priceInt = priceInt / 1;
        var total = qty * priceInt;
        fullTotal += total;
        $(this).text('$'+total.toFixed(2));
      });
      
      $('.subnew span').text('$'+fullTotal.toFixed(2));
      
      if ($('#wholesaleActive').length != 0){
        
        $('.widget__container').find('.cart-item').each(function(){
          var targetRow = $(this).find('.cart-item__row').last();
          var quant = targetRow.find('span').first().text();
          var price = targetRow.find('span').last().text().replace('$', '');
          if (price == '21.95'){
            price = '17.50'
          }
          else if(price == '13.99'){
            price = '10.80'
          }
          else if(price == '14.99'){
            price = '10.20'
          }
          else if(price == '16.99'){
            price = '11.25'
          }
          targetRow.find('span').last().text('$'+price);
          var fullPrice = price * quant;
          
          console.log(price);
        });

        $('.widget__container').find('.sug-prod__price').each(function(){
          var price = $(this).text().replace('$', '');
          if (price == '21.95'){
            price = '17.50'
          }
          else if(price == '13.99'){
            price = '10.80'
          }
          else if(price == '14.99'){
            price = '10.20'
          }
          else if(price == '16.99'){
            price = '11.25'
          }
          $(this).text('$'+price);
        });
      }
      
      var totalPrice = 0;
      $('.widget__container').find('.cart-item').each(function(){
        var targetRow = $(this).find('.cart-item__row').last();
        var quant = targetRow.find('span').first().text();
        var price = targetRow.find('span').last().text().replace('$', '');
        
        var fullPrice = price * quant;
        totalPrice += fullPrice
      });
      var totalPriceString = '$'+totalPrice.toFixed(2)
      
      if ($('.widget__container .wsaio--subtotal span').hasClass('money')){
        $('.widget__container .wsaio--subtotal span').removeClass('money');
        $('.widget__container .wsaio--subtotal span').removeClass('pre-money');
      }
      
      if ($('.widget__container .wsaio--subtotal span').text() != totalPriceString){
        $('.widget__container .wsaio--subtotal span').hide();
        if ($('.widget__container .wsaio--subtotal .loading').length <= 0){
        	$('.widget__container .wsaio--subtotal').append('<div class="loading">Calculating...</div>');
        }
      }
      else{
        $('.widget__container .wsaio--subtotal span').show();
        $('.widget__container .wsaio--subtotal .loading').remove();
      }
      
      $('.widget__container .wsaio--subtotal span').text(totalPriceString);
		
    }, 50 );
/*
$('[href="/cart"]').on('click', function(e){
  if ($('#wholesaleActive').length == 0){
    
  }
  else{
    e.preventDefault();
    window.location.href = "/cart";
  }
});
*/
  // Yotpo Rewards Footer Newsletter Signup
  $( '.footer' ).on( 'click', '.subscribe__body button', function( e ) {

    var customerEmail = $( '.subscribe__body input[type="email"]' ).val();

    var data = { 
      type: 'CustomAction',
      action_name: 'Newsletter Sign Up',
      customer_email: customerEmail
    };

    $.ajax({
      url: 'https://app.swellrewards.com/api/v2/actions',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: { 
        'x-guid': 'qdooTb_IRmRqm2M8AJs9NA',
        'x-api-key': 'YxZW5pIC6x3Flk7aru0cTwtt'
      },
      // async: false,
      success: function(msg) {
          // alert(msg);
      }
    });
  });

   // Yotpo Rewards Modal Newsletter Signup
   $( 'body' ).on( 'click', 'div[role="dialog"] .klaviyo-form button', function( e ) {
    var customerEmail = $( 'div[role="dialog"] .klaviyo-form input[type="email"]' ).val();

    var data = { 
      type: 'CustomAction',
      action_name: 'Newsletter Sign Up',
      customer_email: customerEmail
    };

    $.ajax({
      url: 'https://app.swellrewards.com/api/v2/actions',
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: { 
        'x-guid': 'qdooTb_IRmRqm2M8AJs9NA',
        'x-api-key': 'YxZW5pIC6x3Flk7aru0cTwtt'
      },
      // async: false,
      success: function(msg) {
          // alert(msg);
      }
    });
  });

});

jQuery( window ).on( 'load', function() {
  checkSugProd();
} );

jQuery( '.js-cart-remove' ).on( 'click', function() {
  checkSugProd();
} ) 

function checkSugProd() {

  jQuery( '.sug-product' ).show();

  var cartItems = new Array();

  jQuery( '.cart-item__title a' ).each( function() {
    cartItems.push( jQuery( this ).text() );
  } );

  jQuery( '.sug-prod__title' ).each( function() {
    var prodText = jQuery( this ).text();
    if ( jQuery.inArray(prodText , cartItems ) !== -1 ) {
      jQuery( '.sug-product[data-title="'+prodText+'"]' ).hide();
      console.log( 'hit ' + prodText );
    }
  } );

  console.log( cartItems );

}
document.addEventListener('DOMContentLoaded', function() {
    var sliderSlides = document.querySelectorAll('.slider__slide');

    for (var i = 0; i < sliderSlides.length; i++) {
        var sliderWrapper = sliderSlides[i].querySelector('.slider__details-wrapper');
        
        if (sliderWrapper) {
            sliderSlides[i].classList.add('has-slider-wrapper');
        }
    }
});
// mega menu tabs
$(document).ready(function () {
    $('.tab-button').click(function () {
        // Remove active class from all buttons and contents
        $('.tab-button').removeClass('active');
        $('.tab-content').removeClass('active');

        // Add active class to the clicked button and corresponding content
        $(this).addClass('active');
        const tabId = $(this).data('tab');
        $('#' + tabId).addClass('active');
    });
});
// Remove message_notice if blank
$(document).ready(function() {
  var messageNotice = $('.message_notice');
  
  if (messageNotice.text().trim() === '') {
    messageNotice.css('display', 'none');
  }
});
// Yummy Details Accordion
$(document).ready(function() {
    // Function to handle accordion toggle
    function toggleAccordion() {
        var accordionContent = $(this).next('.accordion-content');
        accordionContent.slideToggle();
        
        // Toggle the active state and SVG icons' visibility
        $(this).toggleClass('active');
    }

    // Attach click event to the accordion triggers
    $('.accordion-trigger').on('click', toggleAccordion);

    // Adjust behavior based on screen size
    function adjustAccordion() {
        if ($(window).width() < 767) {
            $('.accordion-content').hide();
            $('.accordion-trigger').removeClass('active');
            $('.accordion-icon').removeClass('active-icon').addClass('inactive-icon');
        } else {
            $('.accordion-content').show();
            $('.accordion-trigger').addClass('active');
            $('.accordion-icon').removeClass('inactive-icon').addClass('active-icon');
        }
    }

    // Call the adjustAccordion function on page load and window resize
    adjustAccordion();
    $(window).on('resize', adjustAccordion);
});

