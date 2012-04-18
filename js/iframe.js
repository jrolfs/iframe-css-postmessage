function respond(event, message) {
	if ($.browser.msie) {
		message = JSON.stringify(message);
	}

	event.source.postMessage(message, event.origin);
}

$(function () {
	$(window).bind('message', function (event) {
		var data;

		if (!event.data) {
			if (event.originalEvent.data) {
				event = event.originalEvent;
			} else {
				console.log('error receiving postMessage data from parent application');
				return;
			}
		}

		if ($.browser.msie) {
			data = JSON.parse(event.data);
		} else {
			data = event.data;
		}

		switch (data.messageType) {
			case 'applyStyle':
				try {
					$('head').append($('<style class="applied-css"></style>').html(data.css));
					if ($.browser.msie) {
						$('.applied-css').clone().appendTo('head');
					}
					var message = {
						success: true,
						messageType: 'applyStyleResponse',
						content: 'Successfully applied stylesheet'
					}
					respond(event, message);
				} catch (error) {
					var message = {
						success: false,
						messageType: 'applyStyleResponse',
						content: error
					}
					respond(event, message);
				}
				break;
			default:
				console.log('unknown postMessage from parent application');
				break;
		}
	});
});