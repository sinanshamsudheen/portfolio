/**
* PHP Email Form Validation - v3.6
* URL: https://bootstrapmade.com/php-email-form/
* Modified for use with Formspree
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach( function(e) {
    e.addEventListener('submit', function(event) {
      event.preventDefault();

      let thisForm = this;
      
      let action = thisForm.getAttribute('action');
      
      if(!action) {
        displayError(thisForm, 'The form action property is not set!');
        return;
      }

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      fetch(action, {
        method: 'POST',
        body: new FormData(thisForm),
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if(response.ok) {
          return response.json().catch(() => {
            // Formspree might not return JSON for all responses
            return {};
          });
        } else {
          throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
        }
      })
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
    });
  });

  function displayError(thisForm, error) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
