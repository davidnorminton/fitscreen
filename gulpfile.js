//requires the gulp package
var gulp = require('gulp');
// Requires browser-sync so we can spin up a server
var browserSync = require('browser-sync');
// Requies useref which concats js files
var useref = require('gulp-useref');
// Require uglify to minify js
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
// Require del to clean directory
var del = require('del');

// Require run-sequence for tasks
var runSequence = require('run-sequence');

// Gulp watch files for saved changes
gulp.task('watch', ['browserSync'],function(){

    // reload browser on html changes
    gulp.watch('app/*.html', browserSync.reload);
    // reload on js changes
    gulp.watch('app/*.js', browserSync.reload);
});

// use browser-sync
gulp.task('browserSync', function(){
    browserSync.init({
        server : {
            baseDir : 'app'
        }
    })
});

// gulp task concat and minify js
gulp.task('useref', function(){
    return gulp.src('app/*.html')
    .pipe(useref())
    // minify if js file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('distro'))
});


// clean up distro directory
gulp.task('clean:distro', function(){
    return del.sync('distro');
});

// copy across un-minified copy of fitscreen to distro folder
gulp.task('origin', function(){
    return gulp.src('app/fitScreen.js').pipe(gulp.dest('distro/js'))
});
// sequence tasks
gulp.task('build', function(callback){
    runSequence('clean:distro', ['useref', 'origin'],
    callback
    )
});

