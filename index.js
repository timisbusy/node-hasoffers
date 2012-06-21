var request = require('request'),
    qs = require('qs'),
    util = require('util'),
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

  this.offerPixels.sendRequest = this.sendRequest;
  this.offerPixels.vars = this.vars;
  this.offerPixels.hasoffers_hostname = this.hasoffers_hostname;

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
  create: function create(data, options, callback) {
    var addParams = {
      Method: "create",
      data: data
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findAll: function findAll(options, callback){
    var addParams = {
      Method: "findAll"
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findById: function findById(id, options, callback){
    var addParams = {
      Method: "findById",
      id: id
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findAllByIds: function findAllByIds(ids, options, callback){
    var addParams = {
      Method: "findAllByIds",
      ids: ids
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  generateTrackingLink: function generateTrackingLink(offer_id, affiliate_id, options, callback){
    var addParams = {
      Method: "generateTrackingLink",
      offer_id: offer_id,
      affiliate_id: affiliate_id
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  generateTrackingPixel: function generateTrackingPixel(offer_id, options, callback){
    var addParams = {
      Method: "generateTrackingPixel",
      offer_id: offer_id
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  getOverview: function getOverview(offer_id, options, callback){
    var addParams = {
      Method: "getOverview",
      offer_id: offer_id
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  update: function update(id, data, options, callback){
    var addParams = {
      Method: "update",
      id: id,
      data: data
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  }
};

HasOffers.prototype.affiliates = {
  targetParams: {
    Target: "Affiliate"
  },
  create: function create(data, options, callback){
    var addParams = {
      Method: "create",
      data: data
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findAll: function findAll(options, callback){
    var addParams = {
      Method: "findAll"
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findById: function findById(id, options, callback){
    var addParams = {
      Method: "findById",
      id: id
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  }
};

HasOffers.prototype.offerPixels = {
  targetParams: {
    Target: "OfferPixel"
  },
  create: function create (offer_id, affiliate_id, type, code, status, options, callback) {
    if(type !== 'code' && type !== 'image' && type !== 'url') {
      throw new Error('type must be \'code\', \'image\', or \'url\'.');
    }
    var addParams = {
      Method: "create"
      , data: {
        offer_id: offer_id
        , affiliate_id: affiliate_id
        , type: type
        , code: code
        , status: status
      }
    };
    if (typeof options === 'function') {
      callback = options;
    } else {
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  findById: function findById (id, options, callback) {
    var addParams = {
      Method: "findById",
      id: id
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  update: function update (id, data, options, callback) {
    var addParams = {
      Method: "update",
      id: id,
      data: data
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  }
}

HasOffers.prototype.reports = {
  targetParams: {
    Target: "Report"
  },

  // Hasoffers API reference for Stat Fields:
  // http://www.hasoffers.com/wiki/Api_Model:Stat#Stat_Report_Fields
  getAffiliateCommissions: function getAffiliateCommissions(fields, options, callback){
    var addParams = {
      Method: "getAffiliateCommissions",
      fields: fields
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  getConversions: function getConversions(fields, options, callback){
    var addParams = {
      Method: "getConversions",
      fields: fields
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
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
  getReferrals: function getReferrals(fields, options, callback){
    var addParams = {
      Method: "getReferrals",
      fields: fields
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  },
  getStats: function getStats(fields, options, callback){
    var addParams = {
      Method: "getStats",
      fields: fields
    }
    if(typeof options === 'function'){
      callback = options;
    }else{
      addParams = _.extend(addParams, options);
    }
    var params = _.extend(this.targetParams, addParams);
    this.sendRequest(params, callback);
  }
};


HasOffers.prototype.sendRequest = function sendRequest(params, callback){
  var params = _.extend(this.vars, params); 
  request.post({
    headers: { 
      'content-type': 'application/x-www-form-urlencoded' 
    },
    url: this.hasoffers_hostname + "/Api?"+ qs.stringify(params),
    body: JSON.stringify(params)
  }, function(err, res, data){
    if (err) { 
      console.log('error here');
      callback(err);
    } else {
      data = JSON.parse(data);
      if (data.response.status === -1) {
        if(data.response.errors){
          console.log('err data = ' + util.inspect(data));
          callback(new HasOffersError(data.response.errors));
        }
        else callback(new Error('Error code: '+ data.response.data.error_code + ' \nError name: ' + data.response.data.error_name + ' \nPublic Message: ' + data.response.data.public_message ));
      } else {
        callback(null, res, data.response.data);
      }
    }
  });
};

function HasOffersError (errors) {
  Error.captureStackTrace(this, HasOffersError); 
  this.errors = errors;
}

util.inherits(HasOffersError, Error); 

HasOffersError.prototype.toString = function toString (){
  var arr = [];
  _.each(this.errors, function (error) {
    arr.push(util.inspect(error));
  });
  return "HasOffersError: " + arr.join('\n');
}

module.exports = HasOffers;
