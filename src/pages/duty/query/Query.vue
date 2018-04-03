<template>
  <div class="duty-list">
    <div class="operating-area">
      <div class="query-form">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="时间">
            <el-time-picker v-model="form.time" :picker-options="{
                selectableRange: '00:00:00 - 23:59:59'
            }" placeholder="请选择时间" @change="formatDate"></el-time-picker>
          </el-form-item>
          <el-form-item>
            <el-button round class="my-btn-duty" icon="el-icon-search" @click="getData(reqData)">查询</el-button>
            <div class="other-btn">
              <el-button round class="my-btn-duty add" icon="el-icon-plus" @click="handleAdd">新增</el-button>
              <el-button round class="my-btn-duty import" icon="el-icon-upload2" @click="handleImport">导入</el-button>
            </div>
          </el-form-item>
        </el-form>
        <el-button round class="my-btn-duty rehome" icon="el-icon-refresh" @click="reHome">返回首页</el-button>
      </div>
    </div>
    <div class="table-area">
      <el-table :data="dutyData.content" v-loading="loading" style="width: 100%;" stripe>
        <el-table-column label="时间" prop="time"></el-table-column>
        <el-table-column label="范围" prop="ranges">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.ranges" placement="top">
              <div class="cell">{{scope.row.ranges}}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="备注" prop="memo">
          <template slot-scope="scope">
            <el-tooltip effect="dark" :content="scope.row.memo" placement="top">
              <div class="cell">{{scope.row.memo}}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="">
          <template slot-scope="scope">
            <el-button type="text" @click="skipRoute('single-duty', scope.row.id)"><img src="../../../../static/icon/home/icon_details_duty.png"><p>详情</p></el-button>
            <el-button type="text" @click="skipRoute('duty-modify', scope.row.id)"><img src="../../../../static/icon/home/icon_modify.png"><p>修改</p></el-button>
            <el-button type="text" @click="handleDelete(scope.row.id)"><img src="../../../../static/icon/home/icon_delete.png"><p>删除</p></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pages-area">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-size="reqData.size"
          :total="dutyData.totalElements"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Query from './Query.js'

  export default Query
</script>

<style>
  @import "../Duty.css";
</style>
