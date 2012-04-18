var request = require('request'),
    qs = require('qs'),
    _ = require('underscore');

function HasOffers(options){
  if(!options) { throw new Error('Options must be configured, including NETWORK_ID, NETWORK_TOKEN, & HOSTNAME'); }
  this.hasoffers_hostname = options.HOSTNAME;
  this.vars = {
      Format: "json"
    , Service: "HasOffers"
    , Version: 2
    , NetworkId: options.NETWORK_ID
    , NetworkToken: options.NETWORK_TOKEN
    , api_key: options.NETWORK_TOKEN
  }

  this.offers.sendRequest = this.sendRequest;
  this.offers.vars = this.vars;
  this.offers.hasoffers_hostname = this.hasoffers_hostname;

  this.affiliates.sendRequest = this.sendRequest;
  this.affiliates.vars = this.vars;
  this.affiliates.hasoffers_hostname = this.hasoffers_hostname;

  this.reports.sendRequest = this.sendRequest;
  this.reports.vars = this.vars;
  this.reports.hasoffers_hostname = this.hasoffers_hostname;
};

HasOffers.prototype.validate = function validate(callback){
  var addParams = {
    Target: "Application"
    , Method: "validNetworkApiKey"
  }
  this.sendRequest(addParams, callback);
};

HasOffers.prototype.offers = {
  targetParams: {
    Target: "Offer"
  },
  create: function create(data, callback){
    var addParams = {
      Method: "create",
      data: data
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findAll: function findAll(callback){
    var addParams = {
      Method: "findAll"
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findById: function findById(id, callback){
    var addParams = {
      Method: "findById",
      id: id
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findAllByIds: function findAllByIds(ids, callback){
    var addParams = {
      Method: "findAllByIds",
      ids: ids
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  generateTrackingLink: function generateTrackingLink(offer_id, affiliate_id, callback){
    var addParams = {
      Method: "generateTrackingLink",
      offer_id: offer_id,
      affiliate_id: affiliate_id
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  generateTrackingPixel: function generateTrackingPixel(offer_id, callback){
    var addParams = {
      Method: "generateTrackingPixel",
      offer_id: offer_id
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  getOverview: function getOverview(offer_id, callback){
    var addParams = {
      Method: "getOverview",
      offer_id: offer_id
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  update: function update(id, data, callback){
    var addParams = {
      Method: "update",
      id: id,
      data: data
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  }
};

HasOffers.prototype.affiliates = {
  targetParams: {
    Target: "Affiliate"
  },
  create: function create(data, callback){
    var addParams = {
      Method: "create",
      data: data
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findAll: function findAll(callback){
    var addParams = {
      Method: "findAll"
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findById: function findById(id, callback){
    var addParams = {
      Method: "findById",
      id: id
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  }
};

HasOffers.prototype.reports = {
  targetParams: {
    Target: "Report"
  },

  // Hasoffers API reference for Stat Fields:
  // http://www.hasoffers.com/wiki/Api_Model:Stat#Stat_Report_Fields
  getAffiliateCommissions: function getAffiliateCommissions(fields, page, callback){
    var addParams = {
      Method: "getAffiliateCommissions",
      fields: fields
    }
    if(typeof page === 'function'){
      callback = page;
    }else{
      addParams.page = page;
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  getConversions: function getConversions(fields, page, callback){
    var addParams = {
      Method: "getConversions",
      fields: fields
    }
    if(typeof page === 'function'){
      callback = page;
    }else{
      addParams.page = page;
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  getOverview: function getOverview(callback){
    var addParams = {
      Method: "getOverview"
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  getReferrals: function getReferrals(fields, page, callback){
    var addParams = {
      Method: "getReferrals",
      fields: fields
    }
    if(typeof page === 'function'){
      callback = page;
    }else{
      addParams.page = page;
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  getStats: function getStats(fields, page, callback){
    var addParams = {
      Method: "getStats",
      fields: fields
    }
    if(typeof page === 'function'){
      callback = page;
    }else{
      addParams.page = page;
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  }
};


HasOffers.prototype.sendRequest = function sendRequest(params, callback){
  var params = _.extend(this.vars, params); 
  console.log(this.hasoffers_hostname);
  console.log(params);
  request.post({
    headers: { 
      'content-type': 'application/x-www-form-urlencoded' 
    },
    url: this.hasoffers_hostname + "/Api?"+ qs.stringify(params),
    body: qs.stringify(params),
    form: true
  }, function(err, res, data){
    if (err) { 
      callback(err);
    } else {
      data = JSON.parse(data);
      console.log(data);
      console.log('response status: ', data.response.status);
      if (data.response.status === -1) {
        callback(new Error('Error code: '+ data.response.data.error_code + ' \nError name: ' + data.response.data.error_name + ' \nPublic Message: ' + data.response.data.public_message ));
      } else {
        callback(null, res, data.response.data);
      }
    }
  });
}

module.exports = HasOffers;