<template>
  <div class="publish-container">
    <el-card class="table-filter">
      <div slot="header">
          <!-- 面包屑导航路径 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="标题">
          <el-input v-model="articles.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="articles.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="form.region">
            <el-radio label="单图"></el-radio>
            <el-radio label="三图"></el-radio>
            <el-radio label="无图"></el-radio>
            <el-radio label="自动"></el-radio>
          </el-radio-group>
        </el-form-item>
         <el-form-item label="频道">
          <el-select v-model="articles.channel_id" placeholder="请选择频道">
            <el-option
            :label="channel.name"
            :value="channel.id"
            :key="channel.id"
            v-for="channel in channels"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
</el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticlesChannels } from '@/api/article'
export default {
  name: 'publishIndex',
  components: {},
  props: {},
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      articles: {
        title: '', // 文章标题
        content: '', // 文章内容
        cover: {
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [] // 图片地址
        },
        channel_id: null // 文章id
      },
      channels: [] // 文章频道
    }
  },
  computed: {},
  watch: {},
  created () {
    this.onLoadChannels()
  },
  mounted () {
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    onLoadChannels () {
      getArticlesChannels().then(res => {
        console.log(res)
        this.channels = res.data.data.channels
      })
    }
  }
}
</script>

<style scoped lang="less"></style>
