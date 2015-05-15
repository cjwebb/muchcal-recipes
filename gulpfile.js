var gulp    = require('gulp'),
    nodemon = require('gulp-nodemon'),
    mocha   = require('gulp-mocha');

gulp.task('start', function (){
    nodemon({
        script: 'server.js',
        ext: 'js html',
    })
    .on('restart', function(){
        console.log('restarted');
    })
});

gulp.task('test', function () {
    return gulp.src('test/*', {read: false})
            .pipe(mocha({reporter: 'spec'}));
});

