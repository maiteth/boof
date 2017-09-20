(function () {
    ctrl.popup = function (header) {
        console.log('popup', arguments);
        const popup = $element.find('boof-popup');
        console.log('popup', popup);
        if (ctrl.isPopupVisible) {
            ctrl.isPopupVisible = false;
            popup.css({
                display: 'none',
            });
        } else {
            ctrl.isPopupVisible = true;
            popup.css({
                display: 'block',
            });
        }
    };
    
})();