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
        document.querySelector("h4").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true" id="caret"></span>';
        setTimeout(function () {
            typeWriter(text, i + 1)
        }, 50); 
    }
}

function StartTextAnimation(text) {
    typeWriter(text, 0)
}





var params = {},
    watson = 'Watson',
    context;


function userMessage(message) {

    params.text = message;
    if (context) {
        params.context = context;
    }
    var xhr = new XMLHttpRequest();
    var uri = '/api/watson';
    xhr.open('POST', uri, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        // Verify if there is a success code response and some text was sent
        if (xhr.status === 200 && xhr.responseText) {
            var response = JSON.parse(xhr.responseText);
            text = response.output.text; // Only display the first response
            context = response.context; // Store the context for next round of questions
            console.log("Got response from Ana: ", JSON.stringify(response));


            if (context.catalog) {
                $('#main').removeClass('animate-main-out');
                $('#bot').removeClass('animate-bot-out');
                $('#main').addClass('animate-main-in');
                $('#bot').addClass('animate-bot-in');
                setTimeout(function () {
                    $('#container-info1').removeClass('hide');
                    $('#containerinfo1').addClass('animated bounceInUp');
                }, 2000);
                setTimeout(function () {
                    $('#row-info2').removeClass('hide');
                    $('#row-info2').addClass('animated bounceInUp');
                }, 4000);
            }

            for (var txt in text) {
                displayMessage(text[txt], watson);
            }

        } else {
            console.error('Server error for Conversation. Return status of: ', xhr.statusText);
            displayMessage("Um erro ocorreu.Tente novamente mais tarde.", watson);
        }
    };
    xhr.onerror = function () {
        console.error('Network error trying to send message!');
        displayMessage("Meu servidor está offline. Espere alguns instantes para continuar por favor.", watson);
    };
    // console.log(JSON.stringify(params));
    xhr.send(JSON.stringify(params));
}


function newEvent(event) {
    // Only check for a return/enter press - Event 13
    if (event.which === 13 || event.keyCode === 13) {
        var userInput = document.getElementById('chatInput');
        text = userInput.value; // Using text as a recurring variable through functions
        text = text.replace(/(\r\n|\n|\r)/gm, ""); // Remove erroneous characters
        // If there is any input then check if this is a claim step
        // Some claim steps are handled in newEvent and others are handled in userMessage
        if (text) {
            // Display the user's text in the chat box and null out input box
            //            userMessage(text);
            // displayMessage(text, 'user');
            userInput.value = '';
            userMessage(text);
        } else {
            // Blank user message. Do nothing.
            console.error("No message.");
            userInput.value = '';
            return false;
        }
    }
}

function displayMessage(text, user) {
    // var chat_body = document.getElementById('chat-body');
    // var bubble = document.createElement('div');
    // bubble.setAttribute("class", "bubble");
    // if (user == "user") {
    // bubble.className += " user";
    // } else {
    // bubble.className += " watson";
    // }
    // bubble.innerHTML = text;
    // chat_bo/dy.appendChild(bubble);
    // chat_body.scrollTop = chat_body.scrollHeight;
    StartTextAnimation(text);
}



userMessage('');