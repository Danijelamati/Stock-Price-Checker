/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
const {ObjectId} = require('mongodb');
const mongoose = require("mongoose");
const model = require("./model");

mongoose.set('useFindAndModify', false);

const CONNECTION_STRING = process.env.MONGO_DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {  
  
  mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true , useUnifiedTopology: true });  

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      const {project} = req.params;   
      const obj = req.query || {};
      const issue = mongoose.models[project] || model(project);   
            
      issue.find(obj, (err,db)=>{
        if(err) res.send(err);       
        res.json(db);                
      });
    
    })
    
    .post(function (req, res){
      const {project} = req.params;
      const {issue_title,issue_text,created_by} = req.body;        
      const status_text = req.body.status_text || "";
      const assigned_to = req.body.assigned_to || "";
      
      if(!issue_title || !issue_text || !created_by) return res.send("missing inputs");      
    
      const issue = mongoose.models[project] || model(project);
    
      const iss = new issue({        
        issue_title,
        issue_text,
        created_by,
        assigned_to,
        status_text,
        created_on: new Date,
        updated_on: new Date,
        open: true      
      });    
    
      iss.save(err =>{ if(err) console.log(err)});   
      
      res.json({_id: iss.id, issue_title: iss.issue_title, issue_text: iss.issue_text, created_on: iss.created_on, updated_on: iss.updated_on,created_by: iss.created_by,assigned_to: iss.assigned_to, open: iss.open,status_text: iss.status_text});
    })
    
    .put(function (req, res){
      const {project} = req.params;
      
      const {_id,issue_title,issue_text,created_by,assigned_to,status_text,open} = req.body;
      
      if(!_id) return res.send("id is required");
      if(!issue_title && !issue_text && !created_by && !assigned_to && !status_text && !open) return res.send("no updated field sent");
            
      const issue = mongoose.models[project] || model(project);
      
      const obj = {updated_on: new Date,issue_title,issue_text,created_by,assigned_to,status_text,open};    
          
      Object.keys(obj).forEach( x=> !obj[x] && delete obj[x]);      
      
      issue.findOneAndUpdate({_id: _id}, obj, (err,db)=>{     
        if (err) return res.send(`could not update ${_id}`);
        res.send("successfully updated");
      });      
      
    })
  
    .delete(function (req, res){
      const {project} = req.params;    
      const {_id} = req.body 
      const issue = mongoose.models[project] || model(project);
    
      if(!_id) return res.send("No id sent");
      
      issue.findOneAndDelete({_id}, (err,db)=>{        
        
        if(err) return res.send(`${_id} error`);
        if(db === null) return res.send(`could not delete ${_id}`);
        
        res.send(`deleted ${_id}`);
      });      
      
    });
    
};
