import app from './app';
import './configDB';



// Server
app.listen(app.get('port'));
console.log('Server up in port: ', app.get('port') );