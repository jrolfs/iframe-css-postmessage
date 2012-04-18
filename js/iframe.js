function respond(event, message) {
	event.source.postMessage(message, event.origin);
}

$(function () {
	$(window).bind('message', function (event) {
		if (!event.data) {
			if (event.originalEvent.data) {
				event = event.originalEvent;
			} else {
				console.log('error receiving postMessage data from parent application');
				return;
			}
		}

		switch (event.data.messageType) {
			case 'applyStyle':
				try {
					$('head').append($('<style></style>').html(event.data.css));
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