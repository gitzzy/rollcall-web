<template>
  <div class="manage">
    <div class="nav-bar">
      <div class="add-btn" @click="showAlert()">
        <span>新增</span>
      </div>
      <div class="query-form f-right">
        <el-form ref="form" :inline="true" :model="reqData" label-width="80px">
          <el-form-item label="监区">
            <el-select v-model="reqData.prisonAreaId" :clearable="true" @change="getChildRoom" placeholder="请选择监区">
              <el-option v-for="area in areaList" :key="area.id" :label="area.label" :value="area.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="监室">
            <el-select v-model="reqData.prisonRoomId" :clearable="true" placeholder="请选择监室">
              <el-option v-for="room in roomList" :key="room.id" :label="room.label" :value="room.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" round class="my-btn query-btn" icon="el-icon-search" @click="getApi(reqData)">查询</el-button>
            <el-button round class="my-btn re-home" icon="el-icon-refresh" @click="reHome">返回首页</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <div class="table-area">
      <el-table
        :data="shiftData.content"
        v-loading="loading"
        style="width: 100%;"
        stripe
        headerRowClassName="headerClass">

        <el-table-column label="序号" type="index" width="60x"></el-table-column>
        <el-table-column label="监区" prop="areaName" width="110"></el-table-column>
        <el-table-column label="监室" prop="roomName" width="110"></el-table-column>
        <el-table-column label="设备ID" prop="id" width="80"></el-table-column>
        <el-table-column label="设备类型" prop="equipmentType"></el-table-column>
        <el-table-column label="设备名称" prop="equipmentName"></el-table-column>
        <el-table-column label="设备IP" prop="equipmentIp" width="130"></el-table-column>
        <el-table-column label="设备端口" prop="equipmentPort" width="90"></el-table-column>
        <el-table-column label="配置人员" prop="name"></el-table-column>
        <el-table-column label="配置时间" prop="createTime"></el-table-column>
        <el-table-column label="设备状态" prop="equipmentStatus" width="90">
          <template slot-scope="scope">
            <span v-if="scope.row.equipmentStatus === '0'" class="text-warning"><i class="el-icon-warning"></i>异常</span>
            <span v-else-if="scope.row.equipmentStatus === '1'" class="text-success"><i class="el-icon-success"></i>正常</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template slot-scope="scope">
            <el-button type="text"
                       @click="modifyHandle(scope.row.id)">
              <img src="../../../../static/icon/home/icon_modify.png"><p>修改</p>
            </el-button>
            <el-button type="text"
                       @click="deleteHandle(scope.row.id)">
              <img src="../../../../static/icon/home/icon_delete.png"><p>删除</p>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pages-area">
        <el-pagination
          background
          layout="prev, pager, next, jumper"
          @current-change="handleCurrentChange"
          :page-size="reqData.size"
          :total="shiftData.totalElements"></el-pagination>
      </div>
    </div>


    <!-- 新增，修改，详情用同一个弹出层 -->
    <transition name="fade">
      <div class="my-message-box" v-show="msgBox" ref="messageBox">
        <el-form ref="ruleForm" :model="addParams" :rules="rules">
          <div class="my-message-head">{{showTitle}} <span class="el-icon-close" @click="closeAlert('ruleForm')"></span></div>
          <div class="my-box-row clearfix">
            <div class="my-box-item full-row">
              <el-form-item prop="equipmentName">
                <p class="my-box-item-label"><i class="el-icon-location-outline"></i>设备名称</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.equipmentName" placeholder="请输入设备名称"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="my-box-row clearfix">
            <div class="my-box-item">
              <el-form-item prop="prisonAreaId">
                <p class="my-box-item-label"><i class="el-icon-location-outline"></i>监区</p>
                <div class="my-box-item-control">
                  <el-select v-model="addParams.prisonAreaId" :clearable="true" @change="getChildRoom" placeholder="请选择监区">
                    <el-option v-for="area in areaList" :key="area.id" :label="area.label" :value="area.value"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item">
              <el-form-item prop="prisonRoomId">
                <p class="my-box-item-label"><i class="el-icon-location-outline"></i>监室</p>
                <div class="my-box-item-control">
                  <el-select v-model="addParams.prisonRoomId" :clearable="true" placeholder="请选择监室">
                    <el-option v-for="room in roomList" :key="room.id" :label="room.label" :value="room.value"></el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="my-box-row clearfix">
            <div class="my-box-item">
              <el-form-item prop="equipmentIp">
                <p class="my-box-item-label"><i class="el-icon-setting"></i>设备IP</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.equipmentIp" placeholder="请输入设备IP"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item">
              <el-form-item prop="equipmentPort">
                <p class="my-box-item-label"><i class="el-icon-setting"></i>设备端口</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.equipmentPort" placeholder="请输入设备端口"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="my-box-row clearfix">
            <div class="my-box-item">
              <el-form-item prop="equipmentUser">
                <p class="my-box-item-label"><i class="el-icon-setting"></i>账号</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.equipmentUser" placeholder="请输入账号"></el-input>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item">
              <el-form-item prop="equipmentPassword">
                <p class="my-box-item-label"><i class="el-icon-setting"></i>密码</p>
                <div class="my-box-item-control">
                  <el-input v-model="addParams.equipmentPassword" placeholder="请输入密码"></el-input>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="my-box-row clearfix">
            <div class="my-box-item my-box-item-row">
              <el-form-item prop="equipmentType">
                <p class="my-box-item-label"><i class="el-icon-menu"></i>设备类型</p>
                <div class="my-box-item-control overflow-scroll">
                  <el-radio-group v-model="addParams.equipmentType">
                    <el-radio v-for="type in typeList"
                              :key="type.dic_class_code"
                              :label="type.dic_class_code">{{type.class_name_cn}}</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item>
            </div>
            <div class="my-box-item"></div>
          </div>
          <div class="my-message-btns">
            <el-button class="my-btn" round @click="addHandle('ruleForm', singleId)" icon="el-icon-circle-check">确定</el-button>
            <el-button class="my-btn" round @click="closeAlert('ruleForm')" icon="el-icon-circle-close">取消</el-button>
          </div>
        </el-form>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import Device from './Device.js'
  export default Device
</script>

<style>
  .my-message-box .my-box-row .my-box-item.full-row .my-box-item-control .el-input .el-input__inner {
    width: 510px;
  }
  .manage .text-warning {
    color: #f00;
  }
  .manage .text-success {
    color: #097C25;
  }
  .manage .text-warning i, .manage .text-success i {
    margin-right: 4px;
  }
</style>

