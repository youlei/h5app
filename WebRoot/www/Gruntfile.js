module.exports = function(grunt) {

    grunt.initConfig({
 
       
        /**
         * step 4:
         * 压缩 这个 合并后的 文件
         */
        uglify: {
             build:{
				 src:'app/lib.js',
				 dest:'build/lib.min.js'
			 }
        },

        
    });
 
    grunt.loadNpmTasks('grunt-contrib-uglify');  
    grunt.registerTask('default', [ 'uglify']);
    
};