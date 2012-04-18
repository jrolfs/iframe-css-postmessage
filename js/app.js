$(function () {
	$('a.load-iframe-css').click(function () {
		$.ajax({
			url: 'css/iframe.css',
			dataType: 'text',
			success: function (css) {
				var data = {
					messageType: 'applyStyle',
					css: css
				};
				$('iframe').get(0).contentWindow.postMessage(data, 'http://remotedomain.dev:8888');
			},
			error: function (jqXHR) {
				console.log('error retrieving css data: ' + jqXHR.toString());
			}
		})
	});

	$(window).bind('message', function (event) {
		if (!event.data) {
			if (event.originalEvent.data) {
				event = event.originalEvent;
			} else {
				console.log('error receiving postMessage data from iframe');
				return;
			}
		}

		switch (event.data.messageType) {
			case 'applyStyleResponse':
				$('div.iframe-response').html('Response from iframe: ' + event.data.content);
				break;
			default:
				console.log('unknown postMessage from iframe');
				break;
		}
	});
});