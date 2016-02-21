/**
 * Video.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

//only saves to db the fields that are set
  schema: true,

  attributes: {
       
      title:{
          type: 'string',
          required: true
      },
      description:{
          type:'string',
          required: true          
      },
      URL:{
          type:'string',
          required: true
      },
      //prevent data to reach client
      /*toJSON: function(){
          var obj = this.toObject();
          delete obj._csrf;
          return obj;
      }*/
      
  }
};

