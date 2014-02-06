/**
 * Created by pelz on 2/6/14.
 */
function bootstrap_alert(elem, message, timeout) {
    $(elem).show().html('<div class="alert"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><span>'+message+'</span></div>');

    if (timeout || timeout === 0) {
        setTimeout(function() {
            $(elem).hide();
        }, timeout);
    }
};