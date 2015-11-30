/* jshint browser: true */

var app = {
    initialize: function() {
        this.bindEvents();
        this.server_url = 'http://192.168.1.35:9030';
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        app.notif_config = {
            'android': {'senderID': '575303166705'},
            'ios': {'alert': 'true', 'badge': 'true', 'sound': 'true'},
            'windows': {}
        };

        app.htreq = new plugin.HttpRequest();
        app.push = PushNotification.init(app.notif_config);

        // app.push.on('registration', function(data) {
        //     app.push_token = data.registrationId;

        //     $('.push_token').val(app.push_token);
        //     app.send_push_token();
        // });

        $('.send_token').click(function() {
            app.send_push_token();
        });

        $('.button-collapse').sideNav();

        app.send_push_token = function() {
            app.htreq.post(app.server_url + '/add-token', {
                my_token: app.push_token
            }, function(err, data) {
                if (err) {
                    alert( JSON.stringify(err) );
                }

                alert(data);
            });
        };

        app.push.on('notification', function(data) {
            alert( JSON.stringify(data.additionalData) );
        });

        app.push.on('error', function(e) {
            alert(e.message);
        });
    }
};

app.initialize();
