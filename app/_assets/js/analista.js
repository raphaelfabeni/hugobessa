var _forEach = require('lodash.foreach');

var analista = {
    init: function() {

        // trackable DOM elements
        var shareButtons = document.querySelectorAll('.js-post-share');
        var newsletterForm = document.querySelector('.js-newsletter-form');
        var twitterHandles = document.querySelectorAll('.js-twitter-handle');

        // Share Buttons tracking
        _forEach(shareButtons, function eachShareButton(shareButton) {
            shareButton.addEventListener('click', function onShareButtonClick(evt) {

                // sends Google Analytics Event
                var socialNetwork = this.getAttribute('data-network');
                ga('send', 'event', 'Post', 'Compartilhar', socialNetwork);

                // removes listener
                this.removeEventListener('click', onShareButtonClick);
            });
        });

        // Newsletter Form tracking
        if (!!newsletterForm) {
            newsletterForm.addEventListener('submit', function onNewsletterFormSubmit(evt) {

                // sends Google Analytics Event
                ga('send', 'event', 'Geral', 'Newsletter', 'Inscrição');

                // removes listener
                this.removeEventListener('submit', onNewsletterFormSubmit);
            });
        }

        // Twitter Handle tracking
        _forEach(twitterHandles, function eachTwitterHandle(twitterHandle) {
            twitterHandle.addEventListener('click', function onTwitterHandleClick(evt) {

                // sends Google Analytics Event
                ga('send', 'event', 'Geral', 'Clique Twitter Handle');

                // removes listener
                this.removeEventListener('click', onTwitterHandleClick);
            });
        });

        // handle for disqus comment
        window.onDisqusComment = function() {
            ga('send', 'event', 'Post', 'Comentário');
        }
    }
}

module.exports = analista;