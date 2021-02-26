component{
	property name="log" inject="logbox:logger:{this}";
	property name="cache" inject="cachebox:template";

	void function preEvent( event, interceptData, buffer, rc, prc ){

		if( !event.isAjax()
			&& len( getSystemSetting( "STACHEBOX_URL", "" ) )
			&& len( getSystemSetting( "STACHEBOX_USERNAME", "" ) )
			&& len( getSystemSetting( "STACHEBOX_PASSWORD", "" ) )
		){
			prc.stacheboxToken = cache.getOrSet(
				function( prc = prc ){
					var stacheboxToken = "";
					try{
						var baseUrl = getSystemSetting( "STACHEBOX_URL" );
						if( listLast( baseURL, "/" ) == "stachebox" );
						baseUrl &= "/stachebox";

						var request = getInstance( "HyperRequest@hyper" )
										.setURL( baseUrl & "/api/v1/authentication" )
										.setMethod( "HEAD" )
										.withBasicAuth(
											getSystemSetting( "STACHEBOX_USERNAME", "" ),
											getSystemSetting( "STACHEBOX_PASSWORD", "" )
										);

						var response = request.send();

						if( !response.isError() ){
							stacheboxToken = response.getHeader( "x-auth-token" );
						} else {
							variables.log.error( "An error occurred while attempting to obtain a Stachebox authorization token.", response );
						}
					} catch( any e ){
						variables.log.error( "An error occurred while attempting to obtain a Stachebox authorization token.", { "exception" : e } );
					}

					return stacheboxToken;
				}
			)

		}
	}
}