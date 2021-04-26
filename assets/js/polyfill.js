// Onderstaande functie is een polyfill voor het afhandelen van een 'keydown' event.
// Aangezien event.keyCode DEPRECATED is, moeten we uitgaan van event.key, met een "terugval-optie".
// We noemen zo'n "terugval-optie" ook wel een 'polyfill'. Functionaliteit toevoegen, indien het niet 
// door de browser wordt ondersteund. Je voorkomt daar een mogelijke "breach" in je code mee!

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented)  return;    // Should do nothing if the default action has been cancelled
    
    var handled = false;
    if (event.key !== undefined) {
        dispatchEvent( new CustomEvent('KEY_DOWN', {detail: event.key}) );
        handled = true;        
    } else if (event.keyCode !== undefined) {
        dispatchEvent( new CustomEvent('KEY_DOWN', {detail: event.keyCode}) );
        handled = true;
    }
    
    if (handled)  event.preventDefault(); // Suppress "double action" if event handled
}, true);

window.addEventListener("keyup", function (event) {
    if (event.defaultPrevented)  return;    // Should do nothing if the default action has been cancelled
    
    var handled = false;
    if (event.key !== undefined) {
        dispatchEvent( new CustomEvent('KEY_UP', {detail: event.key}) );
        handled = true;        
    } else if (event.keyCode !== undefined) {
        dispatchEvent( new CustomEvent('KEY_UP', {detail: event.keyCode}) );
        handled = true;
    }
    
    if (handled)  event.preventDefault(); // Suppress "double action" if event handled
}, true);

// Een ander voorbeeld van een plek waar we een polyfill in kunnen zetten is de functie 'requestAnimationFrame'. 
// In principe wordt deze functie door alle moderne browsers ondersteund. Toch kan het voorkomen dat een wat 
// oudere browser het niet ondersteund. Met name in de tijd dat deze functie nog erg nieuw was en niet overal 
// werd ondersteund, was een polyfill vanzelfsprekend opgenomen in je code. Onderstaande functie-definitie is 
// dus een functie die de beste optie zal uitkiezen voor 'window.requestAnimFrame' en is afhankelijk van de 
// browser die de gebruiker heeft.

window.requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60)
};

// Onderstaande functie hebben we in object 'game' en object 'ball' nodig. Ik kies er daarom voor nu maar even 
// voor om de functie in 'polyfill' op te nemen, zodat de functie globaal beschikbaar is.

window.getRandomNumBetween = function(min, max) {
    return Math.floor(Math.random()*(max-min + 1))+min;
}