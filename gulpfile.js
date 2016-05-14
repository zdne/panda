var gulp = require('gulp');
var browserSync = require('browser-sync');

function serve(done) {
    browserSync({
        online: false,
        open: false,
        port: 8080,
        server: {
            baseDir: ['./wwwroot']
        }
    }, done);
}

gulp.task('serve', serve);

gulp.task('watch', ['serve'], function (cb) {
    //log('Watching build sources...');
    gulp.watch(sources, ['build', 'bs-reload']);
});

gulp.task('default', ['serve']);
