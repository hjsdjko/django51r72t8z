const base = {
    get() {
        return {
            url : "http://localhost:8080/django51r72t8z/",
            name: "django51r72t8z",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/front/dist/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "基于 Python 的考研学习系统的设计与实现"
        } 
    }
}
export default base
