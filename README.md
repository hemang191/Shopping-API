Issues storage strategy not working properly of multer .

This code is copied from product.js file 


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '.uploads/');
    },
    filename: function(req, file, cb) {
      const  name = new Date().toISOString() + file.fieldname ; 
      cb(null, name);
    }
  });
*/

//const upload = multer ({storage: storage})

Error : 
path storage related