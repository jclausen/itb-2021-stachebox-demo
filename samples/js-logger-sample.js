import Stachebox from "stachebox";

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
