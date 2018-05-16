require('dotenv').load();

var express    = require('express');
var fs         = require('fs');
var ursa       = require('ursa');
var bodyParser = require('body-parser');

var port       = process.env.PORT;
var publickey  = process.env.PUBLIC_KEY;    

var app        = express();                
app.use(bodyParser.json());

var router = express.Router();             
router.get('/:msg', function(req, res) {
	var crt = ursa.createPublicKey(fs.readFileSync(publickey));
	var encrypted = crt.encrypt(req.params.msg, 'utf8', 'base64');
    res.json({ message: encrypted });   
});


router.post('/', function(req, res) {
	var crt = ursa.createPublicKey(fs.readFileSync(publickey));
	res.json( {
		cardName: crt.encrypt(req.body.cardName, 'utf8', 'base64'),
		cardNumber: crt.encrypt(req.body.cardNumber, 'utf8', 'base64'),
		cardValidity: crt.encrypt(req.body.cardValidity, 'utf8', 'base64'),
		cardCVNumber: crt.encrypt(req.body.cardCVNumber, 'utf8', 'base64'),
		email: crt.encrypt(req.body.email, 'utf8', 'base64'),
		cpf: crt.encrypt(req.body.cpf, 'utf8', 'base64')
	});
});


app.use('/encrypt', router);

app.listen(port);
console.log('Started in ' + port);