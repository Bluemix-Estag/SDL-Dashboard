
$(document).ready(function () {
    
    $('#btn').click(function () {
         $('#main').removeClass('animate-main-out');
        $('#bot').removeClass('animate-bot-out');
        $('#main').addClass('animate-main-in');
        $('#bot').addClass('animate-bot-in');
    })
     $('#btn-out').click(function () {
        
        $('#main').removeClass('animate-main-in');
        $('#bot').removeClass('animate-bot-in');
         $('#main').addClass('animate-main-out');
        $('#bot').addClass('animate-bot-out');
    })
})





function typeWriter(text, i) {
    if (i < (text.length)) {
        document.querySelector("h4").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        setTimeout(function () {
            typeWriter(text, i + 1)
        }, 100);
    }
}

function StartTextAnimation(text) {

    typeWriter(text, 0)
}
StartTextAnimation('Hello world asdja sdklj asdklaj lkdjaskldjalk sjdakls djlka');

