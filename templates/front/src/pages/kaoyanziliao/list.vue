<template>
<div>
	<div :style='{"padding":"20px 20px 20px 15%","margin":"10px auto 0","borderRadius":"27px","background":"url(http://codegen.caihongy.cn/20240120/d40775f482fb4eaa8a715212bf1ab10f.png)","width":"80%","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat"}' class="breadcrumb-preview">
		<el-breadcrumb :separator="'Ξ'" :style='{"fontSize":"14px","lineHeight":"1"}'>
			<el-breadcrumb-item class="item1" to="/"><a>首页</a></el-breadcrumb-item>
			<el-breadcrumb-item class="item2" v-for="(item, index) in breadcrumbItem" :key="index"><a>{{item.name}}</a></el-breadcrumb-item>
		</el-breadcrumb>
	</div>
	<div v-if="centerType" :style='{"padding":"20px 20px 20px 15%","margin":"10px auto 0","borderRadius":"27px","background":"url(http://codegen.caihongy.cn/20240120/d40775f482fb4eaa8a715212bf1ab10f.png)","width":"80%","backgroundSize":"100% 100%","backgroundRepeat":"no-repeat"}'>
		<el-button size="mini" @click="backClick">返回</el-button>
	</div>
	<div class="list-preview" :style='{"width":"100%","padding":"0","margin":"10px auto","position":"relative","background":"none"}'>
		

	
    <el-form :inline="true" :model="formSearch" class="list-form-pv" :style='{"padding":"10px","boxShadow":"0 4px 10px rgba(0,0,0,.3)","margin":"10px auto","alignItems":"center","borderRadius":"30px","flexWrap":"wrap","background":"#fff","display":"flex","width":"83%","height":"auto"}'>
      <el-form-item :style='{"border":"1px solid #000","margin":"0","flex":"1","borderWidth":"0 1px 0 0"}'>
	    <div class="lable" v-if="false" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>资料编号：</div>
        <el-input v-model="formSearch.ziliaobianhao" placeholder="资料编号" @keydown.enter.native="getList(1, curFenlei)" clearable></el-input>
      </el-form-item>
      <el-form-item :style='{"border":"1px solid #000","margin":"0","flex":"1","borderWidth":"0 1px 0 0"}'>
	    <div class="lable" v-if="false" :style='{"width":"auto","padding":"0 10px","lineHeight":"42px","display":"inline-block"}'>资料名称：</div>
        <el-input v-model="formSearch.ziliaomingcheng" placeholder="资料名称" @keydown.enter.native="getList(1, curFenlei)" clearable></el-input>
      </el-form-item>
	  <el-button v-if=" true " :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"430px","background":"#FE6917","width":"100px","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="getList(1, curFenlei)"><i v-if="true" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-search"></i>查询</el-button>
	  <el-button v-if="btnAuth('kaoyanziliao','新增')" :style='{"cursor":"pointer","border":"0","padding":"0px 15px","margin":"0 10px 0 0","outline":"none","color":"#fff","borderRadius":"30px","background":"#3554A4","width":"100px","fontSize":"14px","lineHeight":"42px","height":"42px"}' type="primary" @click="add('/index/kaoyanziliaoAdd')"><i v-if="true" :style='{"color":"#fff","margin":"0 10px 0 0","fontSize":"14px"}' class="el-icon-circle-plus-outline"></i>添加</el-button>
    </el-form>
	<div class="select2" :style='{"width":"83%","padding":"20px","boxShadow":"0 4px 10px rgba(0,0,0,.3)","margin":"10px auto","background":"#fff","height":"auto"}'>
	  <div :style='{"width":"100%","padding":"0 0 0 20px","margin":"0 0 10px","position":"relative","background":"none","height":"auto"}' class="list" v-for="(item,index) in selectOptionsList" :key="item">
	    <div :style='{"padding":"0 5px","color":"#9e9e9e","textAlign":"right","display":"inline-block","width":"auto","lineHeight":"32px","fontSize":"14px"}' class="label">{{item.name}}：</div>
	    <div :style='{"width":"auto","display":"inline-block","height":"auto"}' class="item-body">
	      <div class="item" @click="selectClick2(item,-1)" :class="item.check ==-1 ? 'active' : ''">全部</div>
	      <div class="item" @click="selectClick2(item,index1)" :class="item.check == index1 ? 'active' : ''" v-for="item1,index1 in item.list" :key="item1">{{item1}}</div>
	    </div>
	  </div>
	</div>
	<div class="list" :style='{"width":"100%","padding":"60px 10% 220px","margin":"-60px 0 10px","background":"url(http://codegen.caihongy.cn/20240121/afe84ab1bbbe4cb38db48da7e76dff41.png) center center/100% 100% no-repeat"}'>
		
		<!-- 样式二 -->
		<div class="list2 index-pv1" :style='{"padding":"10px","flexWrap":"wrap","background":"none","display":"flex","width":"100%","justifyContent":"space-between","height":"auto"}'>
			<div :style='{"border":"2px solid #fff","padding":"20px","boxShadow":"0 4px 10px rgba(0,0,0,.3)","margin":"0 0 30px","alignItems":"center","color":"#000","background":"#fff","display":"flex","width":"49%","fontSize":"0","position":"relative","height":"auto"}' v-for="(item, index) in dataList" :key="index" @click.stop="toDetail(item)" class="list-item animation-box">
				<div :style='{"border":"0","width":"45%","padding":"0","overflow":"hidden","height":"240px"}'>
					<img @click.stop="imgPreView(item.ziliaofengmian)" :style='{"width":"100%","objectFit":"cover","display":"block","height":"100%"}' v-if="item.ziliaofengmian && item.ziliaofengmian.substr(0,4)=='http'" :src="item.ziliaofengmian.split(',')[0]" class="image" />
					<img @click.stop="imgPreView(baseUrl + (item.ziliaofengmian?item.ziliaofengmian.split(',')[0]:''))" :style='{"width":"100%","objectFit":"cover","display":"block","height":"100%"}' v-else :src="baseUrl + (item.ziliaofengmian?item.ziliaofengmian.split(',')[0]:'')" class="image" />
				</div>
				<div class="item-info" :style='{"padding":"10px","overflow":"hidden","flexWrap":"wrap","flex":"1","display":"flex","height":"auto"}'>
					<div :style='{"padding":"0 10px","color":"inherit","width":"100%","lineHeight":"50px","fontSize":"20px","fontWeight":"bold","order":"1"}' class="name ">{{item.ziliaomingcheng}}</div>
					<div v-if="item.price" :style='{"padding":"0 40px","margin":"20px 10px","color":"#fff","borderRadius":"5px","background":"#FE6917","lineHeight":"46px","fontSize":"18px","order":"7"}' class="price"><span :style='{"fontSize":"12px"}'>￥</span>{{item.price}}</div>
					<div :style='{"width":"100%","padding":"0 10px","order":"6"}'>
					  <span class="icon iconfont icon-shijian21" :style='{"margin":"0 5px 0 0","lineHeight":"40px","fontSize":"14px","color":"inherit"}'></span>
					  <span :style='{"color":"inherit","lineHeight":"40px","fontSize":"14px"}'>{{item.addtime}}</span>
					</div>
					<div :style='{"padding":"0 10px","order":"5"}'>
					  <span class="icon iconfont icon-geren16" :style='{"margin":"0 5px 0 0","lineHeight":"30px","fontSize":"14px","color":"inherit"}'></span>
					  <span :style='{"color":"inherit","lineHeight":"30px","fontSize":"14px"}'>{{item.jiaoshizhanghao}}</span>
					</div>
					<div :style='{"padding":"0 10px","order":"3"}'>
					  <span class="icon iconfont icon-shoucang10" :style='{"margin":"0 5px 0 0","lineHeight":"30px","fontSize":"14px","color":"inherit"}'></span>
					  <span :style='{"color":"inherit","lineHeight":"30px","fontSize":"14px"}'>{{item.storeupnum}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>

	
	<el-pagination
	  background
	  id="pagination"
	  class="pagination"
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
      @size-change="sizeChange"
	  @prev-click="prevClick"
	  @next-click="nextClick"
	></el-pagination>

  </div>
  <el-dialog title="预览图" :visible.sync="previewVisible" width="50%">
  	<img :src="previewImg" alt="" style="width: 100%;">
  </el-dialog>
</div>
</template>

<script>
  export default {
    //数据集合
    data() {
      return {
		selectIndex2: 0,
		selectOptionsList: [],
	    layouts: '',
		swiperIndex: -1,
        baseUrl: '',
        breadcrumbItem: [
          {
            name: '考研资料'
          }
        ],
        formSearch: {
          ziliaobianhao: '',
          ziliaomingcheng: '',
          ziliaofenlei: '',
        },
        fenlei: [],
		feileiColumn: '',
        dataList: [],
        total: 1,
        pageSize: 10,
		pageSizes: [10,20,30,50],
        totalPage: 1,
        curFenlei: '全部',
        isPlain: false,
        indexQueryCondition: '',
	      ziliaofenleiOptions: [],
        timeRange: [],
		centerType:false,
		previewImg: '',
		previewVisible: false,
		sortType: 'id',
		sortOrder: 'desc',
      }
    },
    created() {
		if(this.$route.query.centerType){
			this.centerType = true
		}
		this.baseUrl = this.$config.baseUrl;
		this.$http.get('option/ziliaofenlei/ziliaofenlei').then(res => {
			if (res.data.code == 0) {
				this.ziliaofenleiOptions = res.data.data;
				this.selectOptionsList.push({name:'资料分类',list:this.ziliaofenleiOptions,tableName: 'ziliaofenlei',check: -1})
			}
		});
      this.getFenlei();
      this.getList(1, '全部');
    },
    //方法集合
    methods: {
		selectClick2(row,index) {
			row.check = index
			if(index == -1){
				this.formSearch[row.tableName] = ''
			}else {
				this.formSearch[row.tableName] = row.list[index]
			}
			this.getList()
		},
		add(path) {
			let query = {}
			if(this.centerType){
				query.centerType = 1
			}
			this.$router.push({path: path,query:query});
		},
      getFenlei() {
      },
      getList(page, fenlei, ref = '') {
        let params = {page, limit: this.pageSize};
        let searchWhere = {};
        if (this.formSearch.ziliaobianhao != '') searchWhere.ziliaobianhao = '%' + this.formSearch.ziliaobianhao + '%';
        if (this.formSearch.ziliaomingcheng != '') searchWhere.ziliaomingcheng = '%' + this.formSearch.ziliaomingcheng + '%';
        if (this.formSearch.ziliaofenlei != '') searchWhere.ziliaofenlei = this.formSearch.ziliaofenlei;
		if (this.sortType) searchWhere.sort = this.sortType
		if (this.sortOrder) searchWhere.order = this.sortOrder
        this.$http.get(`kaoyanziliao/${this.centerType?'page':'list'}`, {params: Object.assign(params, searchWhere)}).then(res => {
          if (res.data.code == 0) {
            this.dataList = res.data.data.list;
            this.total = Number(res.data.data.total);
            this.pageSize = Number(res.data.data.pageSize);
            this.totalPage = res.data.data.totalPage;
			
			this.pageSizes = [this.pageSize, this.pageSize*2, this.pageSize*3, this.pageSize*5];
          }
        });
      },
      curChange(page) {
        this.getList(page);
      },
      prevClick(page) {
        this.getList(page);
      },
      sizeChange(size){
        this.pageSize = size
        this.getList(1);
      },
      nextClick(page) {
        this.getList(page);
      },
	  imgPreView(url){
		  this.previewImg = url
		  this.previewVisible = true
	  },
      toDetail(item) {
		  let params = {
			  id: item.id
		  }
		  if(this.centerType){
			  params.centerType = 1
		  }
        this.$router.push({path: '/index/kaoyanziliaoDetail', query: params});
      },
	btnAuth(tableName,key){
		if(this.centerType){
			return this.isBackAuth(tableName,key)
		}else{
			return this.isAuth(tableName,key)
		}
	},
	backClick() {
		this.$router.push({path: '/index/center'});
	},
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.list-preview .list-form-pv .el-input {
		width: auto;
	}

	.breadcrumb-preview .el-breadcrumb /deep/ .el-breadcrumb__separator {
		margin: 0 9px;
		color: #ccc;
		font-weight: 500;
	}
	
	.breadcrumb-preview .el-breadcrumb .item1 /deep/ .el-breadcrumb__inner a {
		color: #000;
		display: inline-block;
	}
	
	.breadcrumb-preview .el-breadcrumb .item2 /deep/ .el-breadcrumb__inner a {
		color: #000;
		display: inline-block;
	}
	
	.category-1 .item {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 10px 0 0;
		color: #999;
		background: #efefef;
		width: 72px;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-1 .item:hover {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 10px 0 0;
		color: #999;
		background: #000;
		width: 72px;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-1 .item.active {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 10px 0 0;
		color: #999;
		background: #000;
		width: 72px;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item:hover {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-2 .item.active {
		cursor: pointer;
		border-radius: 4px;
		margin: 0 0 10px 0;
		color: #999;
		background: #efefef;
		width: 100%;
		font-size: 14px;
		line-height: 36px;
		text-align: center;
	}
	
	.category-3 .item {
		cursor: pointer;
		border-radius: 4px;
		padding:  10px;
		margin: 0 10px 0 0;
		color: #3554A4;
		background: #fff;
		display: flex;
		width: auto;
		align-items: center;
	}
	
	.category-3 .item:hover {
		color: #fff;
		background: #3554A4;
		width: auto;
	}
	
	.category-3 .item.active {
		color: #fff;
		background: #3554A4;
		width: auto;
	}
	
	.list-form-pv .el-input /deep/ .el-input__inner {
		border: 0;
		border-radius: 8px;
		padding: 0 10px;
		margin: 0;
		outline: none;
		color: #000;
		width: 200px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list-form-pv .el-select /deep/ .el-input__inner {
	}
	
	.list-form-pv .el-date-editor /deep/ .el-input__inner {
		border: 0;
		border-radius: 8px;
		padding: 0 30px;
		margin: 0;
		outline: none;
		color: #333;
		width: 140px;
		font-size: 14px;
		line-height: 42px;
		height: 42px;
	}
	
	.list .index-pv1 .animation-box {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
		z-index: initial;
	}
	
	.list .index-pv1 .animation-box:hover {
		border: 2px solid #3554A4 !important;
		transform: rotate(0deg) scale(1.1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
		-webkit-perspective: 1000px;
		color: #3554A4 !important;
		perspective: 1000px;
		transition: 0.3s;
		z-index: 1;
	}
	
	.list .index-pv1 .animation-box img {
		transform: rotate(0deg) scale(1) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
	}
	
	.list .index-pv1 .animation-box img:hover {
		transform: rotate(0deg) scale(0.9) skew(0deg, 0deg) translate3d(0px, 0px, 0px);
		-webkit-perspective: 1000px;
		perspective: 1000px;
		transition: 0.3s;
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

	
	.select2 .list .item-body .item {
				border-radius: 4px;
				padding: 0 5px;
				margin: 0 10px 0 0;
				color: #333;
				background: #fff;
				display: inline-block;
				font-size: 14px;
				line-height: 32px;
			}
	.select2 .list .item-body .item:hover {
				color: #fff;
				background: #FE6917;
			}
	.select2 .list .item-body .item.active {
				color: #fff;
				background: #FE6917;
			}
</style>
