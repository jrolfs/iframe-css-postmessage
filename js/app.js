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

				if ($.browser.msie) {
					data = JSON.stringify(data);
				}

				$('iframe').get(0).contentWindow.postMessage(data, 'http://remotedomain.dev:8888');
			},
			error: function (jqXHR) {
				console.log('error retrieving css data: ' + jqXHR.toString());
			}
		})
	});

	$(window).bind('message', function (event) {
		var data;

		if (!event.data) {
			if (event.originalEvent.data) {
				event = event.originalEvent;
			} else {
				console.log('error receiving postMessage data from iframe');
				return;
			}
		}

		if ($.browser.msie) {
			data = JSON.parse(event.data);
		} else {
			data = event.data;
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