
$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) {
        window.location.reload(); 
    }
});

$(document).ready(function(){
	$('.hamburger').click(function(){
		$(this).toggleClass('cross').stop();
		$('aside').toggleClass('collapsed-book').stop();
		$('aside').toggleClass('non-collapsed').stop();



	});
});



$(document).ready(function(){

  $('.simple-button').click(function(){
    $(this).css("border","none");
    $('#heart').toggleClass('far fa-heart').stop();
    $('#heart').toggleClass('fas fa-heart').stop();



  });
});


var count= 1;
var chars= 100;
$('#myText').keydown(function() {
        var v = $(this).val();
        var vl = v.replace(/(\r\n|\n|\r)/gm,"").length;   
    if (parseInt(vl/count) == chars) {
        $(this).val(v + '\n');
    count++;
    }
});


$(".risk").click(function(){
    
    
    if(confirm("voulez vous confirmer vortre action")){
            
            
            
        }
        else{
        
            return false;
           
        }
})


function setup(){
tinymce.init({ selector:'textarea' })

}
function do_resize(textbox) {

 var maxrows=10; 
  var txt=textbox.value;
  var cols=textbox.cols;

 var arraytxt=txt.split('\n');
  var rows=arraytxt.length; 

 for (i=0;i<arraytxt.length;i++) 
  rows+=parseInt(arraytxt[i].length/cols);

 if (rows>maxrows) textbox.rows=maxrows;
  else textbox.rows=rows;
 }
   

function wordCount(str) {
     return str.split(' ')
            .filter(function(n) { return n != '' })
            .length;
}

 



$(document).ready(function() {
    
    $('.name a').on('click', function(e) {
    e.preventDefault();
    var num = $($(this).attr('href')).offset().top;
    num = num-60;
    
    $('html,body').animate({ scrollTop: num }, 500, 'linear');
    
  });
  });