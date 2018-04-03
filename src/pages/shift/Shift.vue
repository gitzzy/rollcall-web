<template>
    <div class="shift">
        <div class="nav-bar">
            <div class="add-btn" @click="showAlert()">
                <span>新增</span>
            </div>
            <div class="query-form f-right">
                <el-form ref="form" :inline="true" :model="reqData" label-width="80px">
                    <el-form-item label="班次">
                        <el-select v-model="reqData.id">
                            <el-option label="全部" value=""></el-option>
                            <el-option v-for="ss in shifts" :key="ss.id" :label="ss.shiftName" :value="ss.id"></el-option>
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
                <el-table-column label="班次" prop="shiftName"></el-table-column>
                <el-table-column label="时间" prop="timeStr"></el-table-column>
                <el-table-column label="任务描述" prop="shiftMemo"></el-table-column>
                <el-table-column label="上报省厅" prop="isReport">
                    <template slot-scope="scope">
                        <span v-if="scope.row.isReport === '0'">
                            不需要
                        </span>
                        <span v-else-if="scope.row.isReport === '1'">
                            需要
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text"
                                   @click="modifyHandle(scope.row.id)">
                            <img src="/static/icon/home/icon_modify.png"><p>修改</p>
                        </el-button>
                        <el-button type="text"
                                   @click="deleteHandle(scope.row.id)">
                            <img src="/static/icon/home/icon_delete.png"><p>删除</p>
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
                            <el-form-item prop="shiftName">
                                <p class="my-box-item-label"><i class="el-icon-edit"></i>班次名称</p>
                                <div class="my-box-item-control">
                                    <el-input v-model="addParams.shiftName" :clearable="true" placeholder="请输入班次名称"></el-input>
                                </div>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="my-box-row clearfix">
                        <div class="my-box-item full-row">
                            <el-form-item prop="isReport">
                                <p class="my-box-item-label"><i class="el-icon-upload2"></i>上报省厅</p>
                                <div class="my-box-item-control">
                                    <el-select v-model="addParams.isReport" placeholder="请选择是否上报省厅">
                                        <el-option label="不需要" value="0"></el-option>
                                        <el-option label="需要" value="1"></el-option>
                                    </el-select>
                                </div>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="my-box-row clearfix">
                        <div class="my-box-item full-row">
                            <el-form ref="form" :model="form">
                                <el-form-item style="padding-bottom: 100px">
                                    <p class="my-box-item-label"><i class="el-icon-time"></i>时间</p>
                                    <div class="my-box-item-control">
                                        <el-time-picker v-model="form.time" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="请选择时间"></el-time-picker>
                                    </div>
                                </el-form-item>
                            </el-form>
                        </div>
                        <el-button round icon="el-icon-circle-plus-outline" class="f-right add-time" @click="handleAddTime">添加</el-button>
                        <div class="times-area">
                            <ul>
                                <li v-for="(time, index) in showTime">{{time}}<button @click="handleDelTime(index)">删除</button></li>
                            </ul>
                        </div>
                    </div>
                    <div class="my-box-row clearfix">
                        <div class="my-box-item my-box-item-row">
                            <el-form-item prop="shiftMemo">
                                <p class="my-box-item-label"><i class="el-icon-tickets"></i>任务描述</p>
                                <div class="my-box-item-control overflow-scroll">
                                    <el-input type="textarea" v-model="addParams.shiftMemo" placeholder="请输入任务描述"></el-input>
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
    import Shift from './Shift.js'
    export default Shift
</script>

<style>
    @import "./Shift.css";
</style>

