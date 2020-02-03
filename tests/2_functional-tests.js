/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*       (if additional are added, keep them at the very end!)
*/

var chaiHttp = require('chai-http');
var chai = require('chai');
var assert = chai.assert;
var server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  
    suite('POST /api/issues/{project} => object with issue data', function() {
      
      test('Every field filled in', function(done) {
       chai.request(server)
        .post('/api/issues/test')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in',
          assigned_to: 'Chai and Mocha',
          status_text: 'In QA'
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body);
         
          assert.property(res.body, '_id');
          assert.notEqual(res.body.id, "");
         
          assert.property(res.body, 'issue_title');
          assert.notEqual(res.body.issue_title, "");
         
          assert.property(res.body, 'issue_text');
          assert.notEqual(res.body.issue_text, "");
         
          assert.property(res.body, 'created_on');
          assert.notEqual(res.body.created_on, "");
         
          assert.property(res.body, 'updated_on');
          assert.notEqual(res.body.updated_on, "");
         
          assert.property(res.body, 'created_by');
          assert.notEqual(res.body.created_by, "");
         
          assert.property(res.body, 'assigned_to');
          assert.notEqual(res.body.assigned_to, "");
         
          assert.property(res.body, 'open');
          assert.notEqual(res.body.open, "");
         
          assert.property(res.body, 'status_text');
          assert.notEqual(res.body.status_text, "");
          
          done();
        });
      });
      
      test('Required fields filled in', function(done) {
        chai.request(server)
        .post('/api/issues/apitest')
        .send({
          issue_title: 'Title',
          issue_text: 'text',
          created_by: 'Functional Test - Every field filled in'          
        })
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.property(res.body, '_id');
          assert.notEqual(res.body.id, "");
          
          assert.property(res.body, 'issue_title');
          assert.notEqual(res.body.issue_title, "");
         
          assert.property(res.body, 'issue_text');
          assert.notEqual(res.body.issue_text, "");
         
          assert.property(res.body, 'created_on');
          assert.notEqual(res.body.created_on, "");
         
          assert.property(res.body, 'updated_on');
          assert.notEqual(res.body.updated_on, "");
         
          assert.property(res.body, 'created_by');
          assert.notEqual(res.body.created_by, "");
         
          assert.property(res.body, 'assigned_to');
          assert.equal(res.body.assigned_to, "");
         
          assert.property(res.body, 'open');
          assert.notEqual(res.body.open, "");
         
          assert.property(res.body, 'status_text');
          assert.equal(res.body.status_text, "");
          
          done();
        });
      });
      
      test('Missing required fields', function(done) {
        chai.request(server)
        .post('/api/issues/apitest')
        .send({
          issue_title: 'Title',
          issue_text: 'text'        
        })
        .end(function(err, res){
          assert.equal(res.status, 200);         
          assert.equal(res.text, "missing inputs");          
                       
          done();
        });
      });
      
    });
    
    suite('PUT /api/issues/{project} => text', function() {
      
      test('No body', function(done) {
        chai.request(server)
        .put('/api/issues/apitest')        
        .end(function(err, res){
          assert.equal(res.status, 200);      
          assert.equal(res.text, "id is required");          
                       
          done();
        });
      });
      
      test('One field to update', function(done) {
        
        chai.request(server)         
        .put('/api/issues/apitest')          
        .send({
          _id:"5e190a343c3cca5cf035fcba",
          issue_title: "aCACA"
        })          
        .end(function(err, res){          
          assert.equal(res.status, 200);  
          assert.equal(res.text, "successfully updated")    
                     
          done();
        });
     
    });
      
      test('Multiple fields to update', function(done) {
         chai.request(server)         
        .put('/api/issues/apitest')          
        .send({
          _id:"5e190a343c3cca5cf035fcba",
          issue_title: "aCACA",
          issue_text: "textext"
        })          
        .end(function(err, res){          
          assert.equal(res.status, 200);  
          assert.equal(res.text, "successfully updated")    
                     
          done();
        });
      });
      
    });
    
    suite('GET /api/issues/{project} => Array of objects with issue data', function() {
      
      test('No filter', function(done) {
        chai.request(server)
        .get('/api/issues/apitest')
        .query({})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('One filter', function(done) {
        chai.request(server)
        .get('/api/issues/apitest')
        .query({open:true})
        .end(function(err, res){         
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.property(res.body[0], 'open');
          assert.equal(res.body[0].open, true);
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
      test('Multiple filters (test for multiple fields you know will be in the db for a return)', function(done) {
        chai.request(server)
        .get('/api/issues/apitest')
        .query({open:true,assigned_to: "R"})
        .end(function(err, res){          
          assert.equal(res.status, 200);
          assert.isArray(res.body);
          assert.property(res.body[0], 'issue_title');
          assert.property(res.body[0], 'issue_text');
          assert.property(res.body[0], 'created_on');
          assert.property(res.body[0], 'updated_on');
          assert.property(res.body[0], 'created_by');
          assert.property(res.body[0], 'assigned_to');
          assert.equal(res.body[0].assigned_to, "R");
          assert.property(res.body[0], 'open');
          assert.equal(res.body[0].open, true);
          assert.property(res.body[0], 'status_text');
          assert.property(res.body[0], '_id');
          done();
        });
      });
      
    });
    
    suite('DELETE /api/issues/{project} => text', function() {
      
      test('No _id', function(done) {
        chai.request(server)
        .delete("/api/issues/apitest")        
        .end(function(err, res){
          assert.equal(res.status, 200);          
          assert.equal(res.text, "No id sent")
          done();
        });
      });
      
      test('Valid _id', function(done) {
        let id;
        
        chai.request(server)
        .get("/api/issues/test")
        .end(function(err,res){
          
          let id = res.body[0]._id;  
          
          chai.request(server)
          .delete("/api/issues/test")
          .send({_id: id})
          .end(function(err,res){
            assert.equal(res.status, 200);          
            assert.equal(res.text, "deleted " + id)
            done();
          });
        });
       
      });
      
    });

});
