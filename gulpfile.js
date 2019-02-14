var gulp = require("gulp");

//监听任务
gulp.task("watch-all",async ()=>{
	//复制文件
	gulp.watch("./**/*",async ()=>{
		gulp.src("./**/*")
		.pipe(gulp.dest("D:\\phpStudy\\WWW\\xiaoguantea"));
	});
});	