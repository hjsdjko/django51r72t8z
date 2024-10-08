<template>
<div :style='{"width":"80%","padding":"20px","margin":"10px auto","position":"relative","background":"#fff"}'>
    <el-button :style='{"border":"0","cursor":"pointer","padding":"0 10px","margin":"0 auto 10px","outline":"none","color":"#fff","borderRadius":"10px","background":"#FE6917","width":"40%","lineHeight":"40px","fontSize":"14px","height":"40px"}' type="warning" size="mini" @click="backClick" class="el-icon-back">返回</el-button>
    <div class="section-title" :style='{"margin":"0 auto","color":"#fff","textAlign":"center","background":"url(http://codegen.caihongy.cn/20240120/777684ebe3104d3cb040057bea6e001c.png) center center/100% 100% no-repeat","width":"100%","fontSize":"20px","lineHeight":"54px"}'>考试</div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        label="试题测试名称"
        prop="papername">
      </el-table-column>
      <el-table-column
        label="考试得分">
        <template slot-scope="scope">
            <el-tag v-if="scope.row.myscore==0&&scope.row.ismark==0" type="danger">{{scope.row.myscore}}</el-tag>
            <el-tag v-else-if="scope.row.myscore>0&&scope.row.ismark==0" type="success">{{scope.row.myscore}}</el-tag>
            <el-tag v-else-if="scope.row.ismark>0" type="warning">批阅中</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="准确率">
        <template slot-scope="scope">
           <el-tag type="success" v-if="scope.row.ismark==0">{{(scope.row.accuracy * 100).toFixed(0)}}%</el-tag>
           <el-tag type="warning" v-if="scope.row.ismark>0">/</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="错误率">
        <template slot-scope="scope">
            <el-tag type="danger" v-if="scope.row.ismark==0">{{((1 - Number(scope.row.accuracy)) * 100).toFixed(0)}}%</el-tag>
            <el-tag type="warning" v-if="scope.row.ismark>0">/</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
			<el-button
				type="danger"
				size="mini"
				@click="handleView(scope.$index, scope.row)">查看</el-button>
			<el-button v-if="isAuth('examrecord','批卷')&&scope.row.ismark>0" type="primary" size="mini" @click="gradeClick(scope.row)">
				批卷
			</el-button>
        </template>
      </el-table-column>
    </el-table>
	
	<el-pagination
		background
		id="pagination" class="pagination"
		:pager-count="7"
		:page-size="pageSize"
		:page-sizes="pageSizes"
		prev-text="<"
		next-text=">"
		:hide-on-single-page="false"
		:layout='["prev","pager","next"].join()'
		:total="total"
		:style='{"padding":"0","margin":"10px auto","whiteSpace":"nowrap","color":"#333","textAlign":"center","width":"1200px","fontWeight":"500"}'
		@current-change="curChange"
		@prev-click="prevClick"
		@next-click="nextClick"
		></el-pagination>
	<el-dialog title="批卷" :visible.sync="gradeVisible" fullscreen>
		<el-card v-for="(item,index) in gradeList" :key="index" style="width: 90%;margin: 10px auto">
			<div style="padding: 20px;box-sizing:border-box;border-bottom:1px solid #eee">
				{{index + 1}}、{{item.questionname}} （ {{item.score}} ） 				<el-tag type="success" v-if="item.type==0">单选题</el-tag>
				<el-tag type="warning" v-if="item.type==1">多选题</el-tag>
				<el-tag type="info" v-if="item.type==2">判断题</el-tag>
				<el-tag type="primary" v-if="item.type==3">填空题</el-tag>
				<el-tag type="danger" v-if="item.type==4">主观题</el-tag>
			</div>
			<div style="padding: 10px;box-sizing:border-box">
				考生答案：{{item.myanswer}}
			</div>
			<div style="padding: 10px;box-sizing:border-box" v-if="item.type!=4">
				正确答案：{{item.answer}}
			</div>
			<div style="padding: 20px;box-sizing:border-box">
				解析：{{item.analysis}}
			</div>
			<div style="padding: 20px;box-sizing:border-box;display:flex;align-items:center" v-if="item.type==4">
				评分：<el-input-number v-model="item.myscore" :min="0" :max="item.score"></el-input-number>
			</div>
		</el-card>
		<span slot="footer" class="dialog-footer">
			<el-button @click="gradeVisible=false">取 消</el-button>
			<el-button type="primary" @click="gradeSave">确 定</el-button>
		</span>
	</el-dialog>
</div>
</template>

<script>
  export default {
    data() {
      return {
		  layouts: '',
        tableData: [],
        total: 1,
        pageSize: 10,
		pageSizes: [10,20,30,50],
        totalPage: 1,
		gradeList: [],
		gradeVisible: false
      }
    },
    created() {
      this.getExamList(1);
    },
    methods: {
      backClick() {
          this.$router.push('/index/center')
      },
      getExamList(page) {
        this.$http.get('examrecord/groupby', {params: {page, limit: this.pageSize, userid: localStorage.getItem('userid')}}).then(res => {
          if (res.data.code == 0) {
            this.tableData = res.data.data.list;
            this.total = res.data.data.total;
            this.pageSize = res.data.data.pageSize;
            this.totalPage = res.data.data.totalPage;
			this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
          }
        });
      },
      curChange(page) {
        this.getExamList(page);
      },
      prevClick(page) {
        this.getExamList(page);
      },
      nextClick(page) {
        this.getExamList(page);
      },
      handleView(index, row) {
        this.$router.push({path: '/index/examRecord/1', query: {paperid: row.paperid}})
      },
	  
		// 批卷
		gradeClick(row) {
			this.$http.get('examrecord/page',{params:{page:1,limit:100,paperid:row.paperid,userid:row.userid}}).then(res=>{
				if (res.data.code == 0) {
					for(let x in res.data.data.list){
						if(res.data.data.list[x].type==4){
							res.data.data.list[x].myscore = 0
						}
					}
					this.gradeList = res.data.data.list
					this.gradeVisible = true
				}
			})
		},
		gradeSave(){
			for(let i in this.gradeList){
				this.updaterecord(this.gradeList[i])
			}
			this.$message({
				message: "批卷成功",
				type: "success",
				duration: 1500,
				onClose: () => {
					this.getDataList()
					this.gradeVisible = false
				}
			});
		},
		updaterecord(item) {
			item.ismark = 1
			this.$http.post('examrecord/update',item).then(res=>{})
		},
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .section {
    width: 900px;
    margin: 0 auto;
  }
  
  #pagination.el-pagination /deep/ .el-pagination__total {
  	  	margin: 0 10px 0 0;
  	  	color: #666;
  	  	font-weight: 400;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .btn-prev {
  	  	border: none;
  	  	border-radius: 30px;
  	  	padding: 0;
  	  	margin: 0 5px;
  	  	color: #fff;
  	  	background: #3554A4;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	min-width: 35px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .btn-next {
  	  	border: none;
  	  	border-radius: 30px;
  	  	padding: 0;
  	  	margin: 0 5px;
  	  	color: #fff;
  	  	background: #3554A4;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	min-width: 35px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .btn-prev:disabled {
  	  	border: none;
  	  	cursor: not-allowed;
  	  	border-radius: 30px;
  	  	padding: 0;
  	  	margin: 0 5px;
  	  	color: #C0C4CC;
  	  	background: #666;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .btn-next:disabled {
  	  	border: none;
  	  	cursor: not-allowed;
  	  	border-radius: 30px;
  	  	padding: 0;
  	  	margin: 0 5px;
  	  	color: #C0C4CC;
  	  	background: #666;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .el-pager {
  	  	padding: 0;
  	  	margin: 0;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  }
  
  #pagination.el-pagination /deep/ .el-pager .number {
  	  	cursor: pointer;
  	  	padding: 0 4px;
  	  	margin: 0 5px;
  	  	color: #000;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	border-radius: 30px;
  	  	background: #CBCBCB;
  	  	text-align: center;
  	  	min-width: 30px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .el-pager .number:hover {
  	  	cursor: pointer;
  	  	padding: 0 4px;
  	  	margin: 0 5px;
  	  	color: #fff;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	border-radius: 30px;
  	  	background: #FE6917;
  	  	text-align: center;
  	  	min-width: 30px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .el-pager .number.active {
  	  	cursor: default;
  	  	padding: 0 4px;
  	  	margin: 0 5px;
  	  	color: #FFF;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	border-radius: 30px;
  	  	background: #FE6917;
  	  	text-align: center;
  	  	min-width: 30px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .el-pagination__sizes {
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .el-pagination__sizes .el-input {
  	  	margin: 0 5px;
  	  	width: 100px;
  	  	position: relative;
  	  }
  
  #pagination.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__inner {
  	  	border: 1px solid #DCDFE6;
  	  	cursor: pointer;
  	  	padding: 0 25px 0 8px;
  	  	color: #606266;
  	  	display: inline-block;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	border-radius: 3px;
  	  	outline: 0;
  	  	background: #FFF;
  	  	width: 100%;
  	  	text-align: center;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .el-pagination__sizes .el-input span.el-input__suffix {
  	  	top: 0;
  	  	position: absolute;
  	  	right: 0;
  	  	height: 100%;
  	  }
  
  #pagination.el-pagination /deep/ .el-pagination__sizes .el-input .el-input__suffix .el-select__caret {
  	  	cursor: pointer;
  	  	color: #C0C4CC;
  	  	width: 25px;
  	  	font-size: 14px;
  	  	line-height: 28px;
  	  	text-align: center;
  	  }
  
  #pagination.el-pagination /deep/ .el-pagination__jump {
  	  	margin: 0 0 0 24px;
  	  	color: #606266;
  	  	display: inline-block;
  	  	vertical-align: top;
  	  	font-size: 13px;
  	  	line-height: 28px;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .el-pagination__jump .el-input {
  	  	border-radius: 3px;
  	  	padding: 0 2px;
  	  	margin: 0 2px;
  	  	display: inline-block;
  	  	width: 50px;
  	  	font-size: 14px;
  	  	line-height: 18px;
  	  	position: relative;
  	  	text-align: center;
  	  	height: 28px;
  	  }
  
  #pagination.el-pagination /deep/ .el-pagination__jump .el-input .el-input__inner {
  	  	border: 1px solid #DCDFE6;
  	  	cursor: pointer;
  	  	padding: 0 3px;
  	  	color: #606266;
  	  	display: inline-block;
  	  	font-size: 14px;
  	  	line-height: 28px;
  	  	border-radius: 3px;
  	  	outline: 0;
  	  	background: #FFF;
  	  	width: 100%;
  	  	text-align: center;
  	  	height: 28px;
  	  }
</style>
