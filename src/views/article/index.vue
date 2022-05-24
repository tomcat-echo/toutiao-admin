<template>
  <div class='article-container'>
    <el-card class="table-filter">
      <div slot="header" class="clearfix">
          <!-- 面包屑导航路径 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    <!-- 数据筛选面板 -->
    <el-form ref="form" :model="form" label-width="60px" size='small'>
      <el-form-item label="状态：">
        <el-radio-group v-model="form.resource">
          <el-radio label="全部"></el-radio>
          <el-radio label="草稿"></el-radio>
          <el-radio label="待审核"></el-radio>
          <el-radio label="审核通过"></el-radio>
          <el-radio label="审核失败"></el-radio>
          <el-radio label="已删除"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：">
        <el-select v-model="form.region" placeholder="请选择频道">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
        v-model="form.value1"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期">
      </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" >筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到46151条记录</span>
      </div>
    <!-- 数据表格 -->
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      class="list-table"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    <el-pagination
    background
    layout="prev, pager, next"
    :total="1000">
    </el-pagination>
  </el-card>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
export default {
  name: 'ArticleIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        value1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      // 文章数据列表
      articles: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
  },
  mounted () {},
  methods: {
    loadArticles () {
      getArticles().then(res => {
        this.articles = res.data.data.results
        console.log(res)
      })
    }
  }
}
</script>

<style scoped lang="less">
.table-filter{
  margin: -10px 0 20px;
}
.list-table{
  margin-bottom: 20px;
}
</style>
