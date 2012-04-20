# HasOffers API Wrapper for Node.js

## This is an incomplete wrapper for the HasOffers API, documented here:

- http://www.hasoffers.com/wiki/Category:API

## Required:

You will need to:

1. set up a HasOffers account
2. get API credentials
3. whitelist your IP address (this can take a while)

More info at: https://hasoffers.com/

## Usage

Require the hasoffers package: 

    var HasOffers = require('hasoffers')

Instantiate and provide required authentication details options. 

    var ho = new HasOffers({
      NETWORK_ID: "YOUR_NETWORK_ID", // EX. jimscandy
      NETWORK_TOKEN: "YOUR_NETWORK_TOKEN", // EX. FGHEWOTIWEHTE2352351336q7
      HOSTNAME: "YOUR_API_HOSTNAME" // EX. "https://jimscandy.api.hasoffers.com"
    });

From there you can do oh so many things. For example:

    ho.validate(function(err, result, data){
      console.log(data); // true
    });

will let you know that your credentials are valid and that your IP address has been whitelisted.

Other major parts of the API are wrapped for easy use, for example:

    ho.offers.findAll(function(err, result, data){
      console.log(data); // all of your offers
    });

Many calls have an optional 'options' parameter, where you can specify filters and pagination.

    ho.reports.getConversions(["Stat.affiliate_info","Stat.id"], { page: 1 }, function(err, result, data){
      console.log(data); // page one of your conversion stats
    });

If there's no explicit wrapper for the part of the API you want to use, you can either fork this repo and add it, or make your call the way grandpa used to do:

    var params = {
      Target: "Goal",
      Method: "findAll",
      page: 1
    };
    ho.sendRequest(params, function(err, result, data){
      console.log(data); // the data you were looking for
    });
