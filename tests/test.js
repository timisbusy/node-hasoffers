require('mocha'),
require('should');

var HasOffers = require('../index');

var ho = new HasOffers({
  NETWORK_ID: "YOUR_NETWORK_ID", // EX. jimscandy
  NETWORK_TOKEN: "YOUR_NETWORK_TOKEN", // EX. FGHEWOTIWEHTE2352351336q7
  HOSTNAME: "YOUR_API_HOSTNAME" // EX. "https://jimscandy.api.hasoffers.com"
});

describe('Has Offers API', function(){
  var results = {};
  describe('validate(callback)', function(){
    it('should validate without error', function(done){
      ho.validate(function(err, result, data){
        console.log(data);
        results.validation_data = data;
        done(err);
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('validation_data');
    });
    it('should have returned true', function() {
      results.should.have.property('validation_data').equal(true);
    });
  });
  describe('offers.findAll(callback)', function(){
    it('should find offers without error', function(done){
      ho.offers.findAll(function(err, result, data){
        console.log(data);
        results.all_offers = data;
        done(err);
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('all_offers');
    });
  });
  describe('offers.findById(callback)', function(){
    it('should find offer without error', function(done){
      ho.offers.findById(2,function(err, result, data){
        console.log(data);
        results.offer_2 = data;
        done(err);
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('offer_2');
    });
  });
  // describe('offers.create(callback)', function(){
  //   var testData = {
  //       name: "Hello, there"
  //     , preview_url: 'http://www.petfinder.com/blog/cross-eyed-cat-photo-id%3D14972801.jpg'
  //     , offer_url: 'http://www.petfinder.com/blog/cross-eyed-cat-photo-id%3D14972801.jpg'
  //     , expiration_date: '2015-01-01'
  //   };
  //   it('should create offer without error', function(done){
  //     ho.offers.create(testData, function(err, result, data){
  //       if(err) { throw err; }
  //       if(result.statusCode === 200){
  //         console.log('created test offer');
  //         console.log('data: ', data);
  //         results.offerData = data;
  //         done();
  //       }else{
  //         throw new Error('Has offers error code found: ', result.statusCode);
  //       }
  //     });
  //   });
  //   it('should have brought back a bit of data', function() {
  //     results.should.have.property('offerData');
  //   });
  // });
  describe('offers.findAll(callback)', function(){
    it('should find offers without error', function(done){
      ho.offers.findAll(function(err, result, data){
        console.log(data);
        results.all_offers = data;
        done(err);
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('all_offers');
    });
  });
  describe('reports.getAffiliateCommissions(["Stat.amount","Affiliate.company"],callback)', function(){
    it('should get affiliate stats without error', function(done){
      ho.reports.getAffiliateCommissions(["Stat.amount","Affiliate.company"],function(err, result, data){
        console.log(data);
        results.affiliateStats = data;
        done(err);
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('affiliateStats');
    });
  });
  describe('reports.getConversions(["Stat.affiliate_info","Stat.id"], { page: 1 },callback)', function(){
    it('should get conversion stats without error', function(done){
      ho.reports.getConversions(["Stat.affiliate_info","Stat.id"], { page: 1 }, function(err, result, data){
        console.log(data);
        results.conversionStats = data;
        done(err);
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('conversionStats');
    });
  });
  describe('reports.getOverview(callback)', function(){
    it('should get overview stats without error', function(done){
      ho.reports.getOverview(function(err, result, data){
        console.log(data);
        results.overviewStats = data;
        done(err);
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('overviewStats');
    });
  });
});