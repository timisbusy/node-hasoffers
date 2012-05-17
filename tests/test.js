require('mocha'),
require('should');
var util = require('util');

var HasOffers = require('../index');

var ho = new HasOffers({
  NETWORK_ID: "gochime", // EX. jimscandy
  NETWORK_TOKEN: "NETTtmSmUqlz0CmgJEwsBscgXFbyq7", // EX. FGHEWOTIWEHTE2352351336q7
  HOSTNAME: "https://gochime.api.hasoffers.com" // EX. "https://jimscandy.api.hasoffers.com"
});

describe('Has Offers API', function(){
  var results = {};
  describe('validate(callback)', function(){
    it('should validate without error', function(done){
      ho.validate(function(err, result, data){
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
      ho.offers.findById(22,function(err, result, data){
        results.offer_2 = data;
        console.log(util.inspect(data));
        done(err);
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('offer_2');
    });
  });
  describe('offerpixels.create(callback)', function() {
    var affiliateId = 1
      , offerId = 198
      , type = 'code'
      , code = '<iframe src="http://testlink" scrolling="no" frameborder="0" width="1" height="1"></iframe>'
      , status = 'active';

    it('should create offer pixel without error', function(done){
      ho.offerPixels.create(offerId, affiliateId, type, code, status, function(err, result, data){
        if(err) { throw err; }
        if(result.statusCode === 200) {
          console.log('created test offer pixel');
          console.log('data: ', data);
          results.offerPixelData = data;
          done();
        }else{
          throw new Error('Has offers error code found: ', result.statusCode);
        }
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('offerPixelData');

      describe('offerPixels.findById(callback)', function(){
        var offerPixelId = results.offerPixelData.OfferPixel.id;
        it('should find offer without error', function(done){
          ho.offerPixels.findById(offerPixelId,function(err, result, data){
            results.offerpixel_1 = data;
            console.log(util.inspect('data: '+ data));
            done(err);
          });
        });
        it('should have brought back a bit of data', function() {
          results.should.have.property('offerpixel_1');
        });
      });

      describe('offerpixels.update(callback)', function() {
        var offerPixelId = results.offerPixelData.OfferPixel.id
          , status = 'deleted';

        var inputData = {
          status: status
        };

        it('should create offer pixel without error', function(done){
          ho.offerPixels.udpate(offerPixelId, inputData, function(err, result, data){
            if(err) { throw err; }
            if(result.statusCode === 200){
              console.log('updated test offer pixel');
              console.log('data: ', data);
              results.offerPixelDataUpdated = data;
              done();
            }else{
              throw new Error('Has offers error code found: ', result.statusCode);
            }
          });
        });
        it('should have brought back a bit of data', function() {
          results.should.have.property('offerPixelDataUpdated');
        });
      });
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
        results.overviewStats = data;
        done(err);
      });
    });
    it('should have brought back a bit of data', function() {
      results.should.have.property('overviewStats');
    });
  });
});