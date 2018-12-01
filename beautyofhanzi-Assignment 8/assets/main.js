window.onload = function() {
    //Adding ScrollReveal animation effect to every character.
    ScrollReveal().reveal('.character');
};

//This function will add a modal box to the webpage when users click a particular hanzi. This is achieved by adding code to the DOM.
function showModal(num) {
    var container = document.getElementById("hanzi");
    var content = '<div id="mb" class="modal-background" onclick="closeModal()"></div>' +
            '<div id="mc" class="modal-content">' +
            '<button class="close" onclick="closeModal()"><i class="fas fa-times" style=""></i></button>' +
            '<div class="modal-left">' +
            '<div class="hanzi">' + hanziDict[num].string + '</div>' +
            '</div>' +
            '<div class="modal-upright">' +
            '<p>' + hanziDict[num].string +'<span>' + hanziDict[num].kMandarin + '</span></p>' +
            '</div>' +
            '<div class="modal-bottomright">' +
            '<p>' +
            '<span>Defination:<br></span>' + hanziDict[num].kDefinition +
            '</p>' +
            '</div>' +
            '</div>';
    container.innerHTML += content;
}

//This function will remove the modal box from the webpage when users click the close button or click on the background. This is achieved by removing code from the DOM.
function closeModal() {
    var modalBackground = document.getElementById("mb");
    var modalContent = document.getElementById("mc");
    var modalAbout = document.getElementById("about");
    if (modalBackground !== null) {modalBackground.remove();}
    if (modalContent !== null) {modalContent.remove();}
    if (modalAbout !== null) {modalAbout.remove();}
}

//This function will add "about" information to the site when users click the about button by adding code to the DOM.
function showAbout() {
    var container = document.getElementById("hanzi");
    var content = '<div id="mb" class="modal-background" onclick="closeModal()"></div>' +
        '<div id="about" class="about-content">' +
        '<button class="close" onclick="closeModal()"><i class="fas fa-times" style=""></i></button>' +
        '<p>' +
        '<span>The Beauty of Hanzi</span> is an indepandent project <br>designed and developed by <a href="https://portfolio.ericguo.me" target="_blank">Eric Guo</a>.' +
        '</p>' +
        '<p id="attribution">' +
        'Fonts: <a href="https://source.typekit.com/source-han-serif/" target="_blank">Source Han Serif</a><br>' +
        'Data: <a href="http://ccdb.hemiola.com" target="_blank">Chinese Character Web API</a>' +
        '</p>' +
        '</div>';
    container.innerHTML += content;
}