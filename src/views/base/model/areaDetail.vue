<template>
  <div class="app-container">
    <div class="search-wrap">
      <div class="path-nav">路径：</div>
      <div v-for="(item, index) in pathList" :key="index" class="path-item">
        <div v-if="index === pathList.length - 1">
          {{ item.areaName }}
        </div>
        <div v-else>
          {{ item.areaName }} =》
        </div>
      </div>
    </div>
    <el-form ref="formDetail" class="form-inline" :model="postForm" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="postForm.name" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="create">确定</el-button>
        <el-button @click="console">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { create, pathList } from '@/api/base/areaInfo'

export default {
  name: 'AreaDetail',
  data() {
    return {
      pathList: [],
      postForm: {
        name: '',
        pId: this.$route.params.pId,
        listLoading: false
      }
    }
  },
  created() {
    this.getPathList()
  },
  methods: {
    getPathList() {
      pathList(this.postForm.pId).then(res => {
        this.pathList = res.data
      })
    },
    create() {
      this.listLoading = true
      const areaInfo = {
        areaName: this.postForm.name,
        parentCode: this.postForm.pId,
        orderBy: 0
      }
      create(areaInfo).then(response => {
        this.listLoading = false
        this.$message.success('操作成功!')
        this.$router.push({ path: '/base/subAreaList/' + this.postForm.pId })
      })
    },
    console() {
      this.$router.push({ path: '/base/subAreaList/' + this.postForm.pId })
    }
  }
}
</script>

<style scoped lang="scss">
  .form-inline{
    width: 35%;
    .el-input,.el-select{width:100%}
  }
  .line{
    text-align: center;
  }
  .search-wrap{
    display: flex;
    width: 50%;
    margin-bottom: 20px;
    .path-nav {
      margin-left: 80px;
      width: 60px;
    };
    .path-item {
      width: auto;
      margin-right: 10px;
      color: #222222;
    }
  }
</style>
