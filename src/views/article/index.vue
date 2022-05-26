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
        <el-radio-group v-model="status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核成功</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已删除</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="频道：">
        <!-- 返回所有文章 -->
        <el-select v-model="channelId" placeholder="请选择频道">
          <el-option label="全部" :value="null"
          ></el-option>
          <!-- 按频道id渲染 -->
          <el-option :label="channel.name" :value="channel.id"
          v-for="channel in channels " :key="channel.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期：">
        <el-date-picker
        v-model="rangeDate"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
        >
      </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="loadArticles(1)"
        :disabled="loading"
        >筛选</el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>共找到{{totalCount}}条记录</span>
      </div>
    <!-- 数据表格 -->
    <el-table
      :data="articles"
      stripe
      style="width: 100% "
      class="list-table"
      v-loading="loading"
      element-loading-text="努力加载中……"
    >
      <el-table-column
        label="封面"
      >
      <template slot-scope="scope">
        <el-image
        style="width: 100px; height: 100px"
        :src="scope.row.cover.images[0]"
        :preview-src-list="scope.row.cover.images"
        fit="cover">
        </el-image>
<!--
        <img
          v-if="scope.row.cover.images[0]"
         :src="scope.row.cover.images[0]"
          class="cover-image"
        >
        <img v-else
         src="./no-cover.jpeg"
         class="cover-image"
        > -->
      </template>
      </el-table-column>
      <el-table-column
        prop="title"
        label="标题"
      >
      </el-table-column>
      <el-table-column
        label="状态"
      >
     <!-- 如果需要在自定义列模板中获取当前遍历项数据，那么就在 template 上声明 slot-scope="scope" -->
    <template slot-scope="scope">
      <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
    </template>
      </el-table-column>
      <el-table-column
        prop="pubdate"
        label="发布时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" circle
          @click="deleteArticle(scope.row.id)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
    background
    layout="sizes, prev, pager, next"
    :disabled="loading"
    :page-sizes="[10, 15, 20, 30]"
    :page-size="pageSize"
    :total="totalCount"
    :current-page.sync="page"
    @current-change="onCurrentPage"
    @size-change="onSizeChange"
    >
    </el-pagination>
  </el-card>
  </div>
</template>

<script>
import { getArticles, getArticlesChannels, deleteArticles } from '@/api/article'
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
      // 文章数据列表
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' }, // 0
        { status: 1, text: '待审核', type: '' }, // 1
        { status: 2, text: '审核通过', type: 'success' }, // 2
        { status: 3, text: '审核失败', type: 'warning' }, // 3
        { status: 4, text: '已删除', type: 'danger' } // 4
      ],
      totalCount: 0, // 总条数
      pageSize: 10, // 每页数据条数
      status: null, // 文章状态
      channels: [], // 文章频道
      channelId: null, // 频道id
      rangeDate: [], // 日期范围
      loading: true, // 加载
      page: 1 // 当前页码
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  mounted () {},
  methods: {
    // page=1 默认从第一页开始
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        // 接收传过的的页码
        page: page,
        per_page: this.pageSize,
        // 每页的文章数
        // 文章状态
        status: this.status,
        // 频道id
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        // 使用两个常量接收，由于只支持驼峰命名要给一个重命名total_count: totalCount
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        // 得到数据关闭加载
        this.loading = false
      })
    },
    // page为回传的值
    onCurrentPage (page) {
      this.loadArticles(page)
    },
    onSizeChange (perPage) {
      this.pageSize = perPage
      // 这里由于改变了每页条数对应的per_page，要再次回调接口
      this.loadArticles()
    },
    loadChannels () {
      getArticlesChannels().then(res => {
        this.channels = res.data.data.channels
        console.log(res)
      })
    },
    // 删除文章
    deleteArticle (articleId) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 这里要转化成字符串
        deleteArticles(articleId.toString()).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.loadArticles(this.page)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
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

.element-loading-background{
  background-color: rgba(100,128,200,0.8);
}
</style>
