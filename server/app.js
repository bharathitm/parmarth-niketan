import path from 'path';
import app from './config/express';
import routes from './routes/index.route';

// enable webpack hot module replacement in development mode
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack/webpack.config.dev';

// const passport = require('passport'),
//     cookieParser = require('cookie-parser'),
//     cookieSession = require('cookie-session');


if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: webpackConfig.output.publicPath}));
    app.use(webpackHotMiddleware(compiler));
}

// Router
app.use('/api', [function(req, res, next){

    const authorizationHeader = req.headers['authorization'];
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    }

    if (token != 'null') {
        next();
    }
    else{
        res.status(403).json({
                        error: 'No token provided'
                    });
        return res.send();
    }
}], routes);

 app.use('/', routes);

app.listen(app.get('port'), app.get('host'), () => {
    console.log(`Server running at http://${app.get('host')}:${app.get('port')}`);
});



export default app;