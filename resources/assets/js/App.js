import "bootstrap";
window.Vue = require( 'vue' );

import Hola from './components/Hola.vue';

import Stachebox from "stachebox";

new Vue( {
    el : '#app',

    components : { Hola },

    mounted : function() {
        if ( Vue.config.devtools && console.log ) {
            console.log( 'ColdBox, Vue and Vueify all set to go!' );
            console.log( "Vue Version " + Vue.version );
        }
    }
} );


fetch(
    '/stachebox/api/v1/authentication',
    {
        method: 'HEAD'
    }
).then(
    ( response ) => {

        let authToken = response.headers.get( "x-auth-token" );

        if( authToken ){
            window.StacheboxLogger = new Stachebox( { token : authToken } );

            window.onerror = function( message, source, lineno, colno, error ) {
                if( error ){
                    StacheboxLogger.log( error );
                }
            };
        }
    }
);

var makeErrors = function(){
	fetch(
		'/main/data',
		{
			method: 'get'
		}
	);
}

setInterval(
	function(){
		throw( "Boom goes the javascript" );
	},
	5000
);
setInterval(
	function(){
		throw( "Kapow! Your javascript is buggy" );
	},
	7000
);
setInterval(
	function(){
		makeErrors();
	},
	3000
)

