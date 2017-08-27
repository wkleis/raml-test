const raml2json = require('ramldt2jsonschema');
const join = require('path').join;
const fs = require('fs');
var Validator = require('jsonschema').Validator;
const val = new Validator();

const goodTestData= {
  bookId: "683880b4-8b24-11e7-bb31-be2e44b06b34",
  title: "Steppenwolf",
  publishedYear : "1974",
  authorId: "938146d4-8b24-11e7-bb31-be2e44b06b34",
  bookType: "paperback"
};
const badTestData= {
  bookId: "683880b4-8b24-11e7-bb31-be2e44b06b34",
  publishedYear : "1974",
  authorId: "938146d4-8b24-11e7-bb31-be2e44b06b34",
  bookType: "magazine"
};
let filePath = join(__dirname, '../api.raml');
let ramlData = fs.readFileSync(filePath,'utf8');

ramlToJs(ramlData,'bookType')
.then(schema =>{
  console.log('------Schema data ------');
  console.log(`Schema: + ${JSON.stringify(schema,null,2)}`);
  return Promise.resolve(schema);
})
.then(schema =>{
  let result = val.validate(goodTestData, schema);
  console.log('------Good data ------');
  console.log(`Errors:  ${JSON.stringify(result.errors,null,2)}`);
  return Promise.resolve(schema);
})
.then(schema =>{
  let result = val.validate(badTestData, schema);
  console.log('------Bad data ------');
  console.log(`Errors:  ${JSON.stringify(result.errors,null,2)}`);
  return Promise.resolve(schema);
})
.catch(err=> {
  console.error(`Catch: + ${JSON.stringify(err)}`);
});


function ramlToJs(raml,ramlType){
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
