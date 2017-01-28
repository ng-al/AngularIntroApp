module.exports = function(grunt) {

    grunt.initConfig({
        exec: {
            transpile: 'for filename in test/*/*.es6; do babel "${filename}" --out-file "${filename}-transpiled.js"; done'
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        }
    });

    grunt.registerTask("babel", "exec:transpile");
    grunt.registerTask("run-tests", ["babel", "karma"]);

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-karma');
};