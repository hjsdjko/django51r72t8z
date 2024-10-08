<template>
  <div>
		<div class="top-content">
			<div class="top-content-left">{{paper.name}} （ 共 <el-tag type="danger">{{questionList.length}}</el-tag> 题 ）
			</div>
			<div class="top-content-center" v-cloak>距离考试结束还有 <el-tag type="danger">{{this.hour}}</el-tag> 时 <el-tag
					type="danger">{{this.minute}}</el-tag> 分 <el-tag type="danger">{{this.second}}</el-tag> 秒</div>
			<div class="top-content-right">
				<el-button type="danger" @click="doneExam(0)">结束考试</el-button>
			</div>
		</div>
		<el-card v-if="end" style="width: 90%;margin: 10px auto;">
			<div style="width: 100%;display: flex;flex-direction: column;align-items: center;">
				<div>
					<div class="question-title">考试成绩：<el-tag type="danger">{{scoreChange()}}</el-tag> 分</div>
				</div>
				<div class="question-btn">
					<el-button v-if="!isSubmit" type="primary" @click="isSubmit=true">查看解析</el-button>
					<el-button type="success" @click="doneExam(1)">结束考试</el-button>
				</div>
			</div>
		</el-card>
		<el-card style="width: 90%;margin: 10px auto;" v-if="!end||isSubmit">
			<div class="question-content" v-for="(item, index) in questionList" :key="item.id">
				<div class="question-title">
					{{index + 1}} 、({{item.score}}分)：{{item.questionname}}
					<el-tag type="success" v-if="item.type==0">{{questionType(item)}}</el-tag>
					<el-tag type="warning" v-if="item.type==1">{{questionType(item)}}</el-tag>
					<el-tag type="info" v-if="item.type==2">{{questionType(item)}}</el-tag>
					<el-tag type="primary" v-if="item.type==3">{{questionType(item)}}</el-tag>
					<el-tag type="danger" v-if="item.type==4">{{questionType(item)}}</el-tag>
				</div>
				<div class="question-answer">
					<div v-if="!isSubmit && !end">
						作答：
						<el-select v-model="item.myanswer" placeholder="请选择您的答案"
							v-if="item.type == 0  || item.type == 2 ">
							<el-option v-for="(option, idx) in JSON.parse(item.options)" :key="idx" :label="option.text"
								:value="option.code">
							</el-option>
						</el-select>
						<el-select v-model="item.myanswer" multiple placeholder="请选择您的答案" v-if="item.type == 1">
							<el-option v-for="(option, idx) in JSON.parse(item.options)" :key="idx" :label="option.text"
								:value="option.code">
							</el-option>
						</el-select>
						<el-input style="width: 400px;" v-if="item.type == 3" v-model="item.myanswer"
							placeholder="请输入答案"></el-input>
						<el-input style="width: 400px;" v-if="item.type == 4" v-model="item.myanswer" type="textarea"
							placeholder="请输入答案"></el-input>
					</div>
					<div v-if="isSubmit">
						<div class="question-title">填写答案：
							{{item.myanswer}}
						</div>
						<div class="question-title">
							<el-tag v-if="(item.answer == item.myanswer)&&item.type!=4" type="success">正确</el-tag>
							<el-tag v-if="(item.answer != item.myanswer)&&item.type!=4" type="danger">错误</el-tag>
							解析：{{item.answer}}, {{item.analysis}}
						</div>
					</div>
				</div>
			</div>
			<div class="question-btn">
				<el-button v-if="!isSubmit && !end" type="primary" @click="submitAnswer">提交答案</el-button>
			</div>
		</el-card>
	</div>
</template>

<script>
	export default {
    //数据集合
		data() {
			return {
				questionList: [],
				isSubmit: false,
				end: false,
				maxtime: 0,
				timer: null,
				hour: '',
				minute: '',
				second: '',
				user: {},
				hassubject:false,
				paper:{}
			}
		},
		created() {
			this.$http.get(`exampaper/info/${this.$route.query.id}`, {}).then(res => {
				if (res.data.code == 0) {
					this.paper = res.data.data
					this.maxtime = this.paper.time * 60;
					this.deleteRecords(this.paper.id);
					this.getQuestion(this.paper.id);
					this.hour = Math.floor(this.maxtime / 60 / 60);
					this.minute = Math.floor(this.maxtime / 60 % 60);
					this.second = Math.floor(this.maxtime % 60);
					this.timer = setInterval(this.countDown, 1000);
				}
			})
			this.$http.get(localStorage.getItem('UserTableName') + '/session', {
				emulateJSON: true
			}).then(res => {
				if (res.data.code == 0) {
					this.user = res.data.data;
				}
			});
		},
		//方法集合
		methods: {
			questionType(item) {
				switch (item.type) {
					case 0:
						return '单选题';
					case 1:
						return '多选题';
					case 2:
						return '判断题';
					case 3:
						return '填空题';
					case 4:
						return '主观题';
				}
			},
			deleteRecords(paperid) {
				this.$http.post(`examrecord/deleteRecords?userid=${localStorage.getItem('frontUserid')}&paperid=${paperid}`).then(res => {});
			},
			getQuestion(paperid) {
				this.$http.get('examquestion/list', {params: {page: 1, limit: 1000, paperid}}).then(res => {
					if (res.data.code == 0) {
						for(let x in res.data.data.list){
							if(res.data.data.list[x].type==4){
								this.hassubject = true
							}
						}
						res.data.data.list.sort(function (a, b) {
							return (b.sequence - a.sequence)
						});
						this.questionList = res.data.data.list;
					}
				});
			},
			submitAnswer() {
				for (let x in this.questionList) {
					if (this.questionList[x].type == 1) {
						this.questionList[x].myanswer = this.questionList[x].myanswer.sort().join(',')
					}
					if (this.questionList[x].type != 4) {
						if (this.questionList[x].answer == this.questionList[x].myanswer) {
							this.questionList[x].myscore = this.questionList[x].score
						} else {
							this.questionList[x].myscore = 0
						}
					} else {
						this.questionList[x].myscore = 0
					}
					this.saverecord(this.questionList[x])
				}
				this.end = true;
			},
			scoreChange() {
				let score = 0
				for (let x in this.questionList) {
					if (this.questionList[x].myscore) {
						score += Number(this.questionList[x].myscore)
					}
				}
				return score
			},
			saverecord(row) {
				let record = {
					userid: this.user.id,
					username: this.user.xueshengxingming,
					paperid: this.paper.id,
					papername: this.paper.name,
					questionid: row.id,
					questionname: row.questionname,
					options: row.options,
					score: row.score,
					answer: row.answer,
					analysis: row.analysis,
					myscore: row.myscore,
					myanswer: row.myanswer,
					type: row.type,
					ismark: this.hassubject ? 0 : 1
				}
				this.$http.post('examrecord/add', record).then(res => {})
			},
			doneExam(type) {
				if (type == 0) {
					this.$confirm('确定离开考试?未答题目按0分计', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.end = true;
						if (this.questionList.length == 0) {
							this.$router.push('/index/examPaper');
						}
					});
				} else {
					this.$router.push('/index/examPaper');
				}
			},
			countDown() {
				if (this.maxtime > 0) {
					this.hour = Math.floor((this.maxtime - 1) / 60 / 60);
					this.minute = Math.floor((this.maxtime - 1) / 60 % 60);
					this.second = Math.floor((this.maxtime - 1) % 60);
					--this.maxtime;
				} else {
					clearInterval(this.timer);
					this.end = true;
				}
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.top-content {
		height: 80px;
		width: 100%;
		background-color: #409EFF;
		display: flex;
		justify-content: space-between;
	}
	.top-content-left, .top-content-center, .top-content-right {
		font-size: 18px;
		line-height: 80px;
		color: #fff;
	}
	.top-content-left {
		padding-left: 20px;
	}
	.top-content-right {
		padding-right: 20px;
	}
	.question-content {
		width: 90%;
		margin: 0 auto;
		margin-top: 30px;
		border-bottom: 1px solid #eee;
	}
	.question-content:last-of-type {
		border: none;
	}
	.question-title, .question-answer, .question-btn {
		padding: 20px 0;
	}
</style>
