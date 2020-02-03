const mongoose = require("mongoose");

const issue = (project) =>{
  
  const {Schema} = mongoose;
  const apiSchema = new Schema({
    issue_title: String,
    issue_text: String,
    created_by: String,
    assigned_to: String,
    status_text: String,
    created_on: Date,
    updated_on: Date,
    open: Boolean
  })
      
  const issue = mongoose.model(project, apiSchema);
  
  return issue;
}

module.exports = issue;