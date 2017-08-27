const chai = require('chai');
chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const raml2json = require('ramldt2jsonschema');
const join = require('path').join;
const fs = require('fs');
var Validator = require('jsonschema').Validator;
const validator = new Validator();

let filePath = join(__dirname, '../../api.raml');

describe('RAML API Test',function(){
  before(function(){
    this.ramlData = fs.readFileSync(filePath,'utf8');
    return ramlToJs(this.ramlData,'booksResponseType')
      .then(schema=>{
        this.booksResponseSchema=schema;
      })
      .then(()=>ramlToJs(this.ramlData,'bookType'))
      .then(schema=>{
        this.bookSchema=schema;
      });
  });

  it('should be possible to request book list',function(){
    return chai.request('http://localhost:3000').get('/bookapi/books')
    .then(response => {
      this.response=response;
      response.should.have.status(200);
    });
  });

  it('Response should be json',function(){
    this.response.should.be.json;
  });

  it('Response should comply with books resonse schema',function(){
    let responseData = JSON.parse(this.response.text);
    let result = validator.validate(responseData,this.booksResponseSchema);
    result.errors.should.eql([]);
    this.bookId = responseData[0].bookId;
  });

  it('should be possible to request a single book',function(){
    return chai.request('http://localhost:3000').get(`/bookapi/books/${this.bookId}`)
    .then(response => {
      this.response=response;
      response.should.have.status(200);
    });
  });

  it('Response should be json',function(){
    this.response.should.be.json;
  });

  it('Response should comply with book schema',function(){
    let responseData = JSON.parse(this.response.text);
    let result = validator.validate(responseData,this.bookSchema);
    result.errors.should.eql([]);
  });


});

function ramlToJs(ramlData,ramlType){
  return new Promise((resolve, reject)=>{
    raml2json.dt2js(ramlData, ramlType, function (err, schema) {
      if (err) {
        reject(err);
      }else{
        resolve(schema);
      }
    });
  });
}
