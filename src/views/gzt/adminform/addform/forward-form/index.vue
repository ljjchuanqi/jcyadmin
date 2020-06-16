<template>
  <div>
    <!-- 预约表单 -->
    <el-dialog
      title="预约表单"
      :visible="isForwardFormVisble"
      width="900px"
      @close="handleToggleForwardForm"
    >
      <div class="content">
        <el-form
          :model="forwardForm"
          ref="forwardForm"
          :rules="rules"
          label-width="120px"
        >
          <el-form-item name="type" label="预约类型">
            <el-radio-group v-model="forwardForm.type">
              <el-radio
                v-for="item in forwardType"
                :key="item.value"
                :label="item.value"
                @change="handleChangeForwardFormType"
                >{{ item.label }}</el-radio
              >
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选择日期" v-if="forwardForm.type === 1">
            <el-date-picker
              v-model="forwardDate1"
              type="date"
              placeholder="选择日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-button class="m_l20" type="primary" @click="handleAddDateType1"
              >增加</el-button
            >
          </el-form-item>
          <el-form-item label="选择起止日期" v-if="forwardForm.type === 2">
            <el-date-picker
              v-model="forwardDateRange2"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="选择起止日期" v-if="forwardForm.type === 3">
            <el-date-picker
              v-model="forwardDateRange3"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            name="space_days"
            label="日期间隔"
            v-if="forwardForm.type == 2"
          >
            <el-input-number
              v-model="forwardForm.space_days"
              :min="1"
              :max="365"
            ></el-input-number>
            <el-button
              class="m_l20"
              type="primary"
              @click="handleConfirmSpaceDate"
              >确定</el-button
            >
          </el-form-item>
          <el-form-item
            name="select_weekday"
            label="选择星期"
            v-if="forwardForm.type == 3"
          >
            <el-checkbox-group v-model="forwardForm.select_weekday">
              <el-checkbox
                v-for="item in selectWeekdayList"
                :key="item.value"
                :label="item"
                @change=test()
              ></el-checkbox>
            </el-checkbox-group>
            <el-button class="" type="primary" @click="handleConfirmWeek"
              >确定</el-button
            >
          </el-form-item>
          <!-- 日期列表 -->
          <el-form-item label="日期列表">
            <el-table :data="forwardForm.rules" border stripe max-height="450">
              <el-table-column prop="date" label="日期" align="center">
              </el-table-column>
              <el-table-column label="对象" align="center">
                <template slot-scope="scope">
                  <el-input
                    v-model="scope.row.obj_name"
                    placeholder="请输入预约对象"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="时间段" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="handleToggleQuantumTimeEdit(scope.$index)"
                  >
                    <div>
                      已设置{{ scope.row.quantum_time_list.length }}个时间段
                    </div>
                    <div>(点击编辑)</div>
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="handleToggleDateRow(scope.$index)"
                    v-if="scope.row.status == 1"
                    >开启</el-button
                  >
                  <el-button
                    type="text"
                    @click="handleToggleDateRow(scope.$index)"
                    v-else
                    >关闭</el-button
                  >
                  <el-button
                    type="text"
                    style="color:#F56C6C"
                    @click="handleDelDateRow(scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <!-- /日期列表 -->
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleToggleForwardForm">取消</el-button>
        <el-button type="primary" @click="handleSubmit" :loading="isBtnLoading">保存</el-button>
      </span>
    </el-dialog>
    <!-- /预约表单 -->
    <!-- 时间段编辑 -->
    <quantum-time-edit
      :quantumTimeListData="cur_quantum_time_list"
      :setTimeRangeData="cur_set_time_range"
      :setSpaceMinutesData="cur_set_space_minutes"
      @submit="submitQuantumTime"
    ></quantum-time-edit>
    <!-- /时间段编辑 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
import _ from 'lodash'
import quantumTimeEdit from '../quantum-time-edit/index'

export default {
  components: {
    quantumTimeEdit
  },
  props: {
    openState: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      isBtnLoading: false,
      forwardType: [
        {
          label: '自定义预约',
          value: 1
        },
        {
          label: '按日期',
          value: 2
        },
        {
          label: '按周',
          value: 3
        }
      ],

      selectWeekdayList: [
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六',
        '周日'
      ],
      dateColumns: [
        {
          label: '日期',
          prop: 'time'
        },
        {
          label: '对象',
          prop: 'obj_name'
        },
        {
          label: '时间段',
          prop: 'quantum_time'
        },
        {
          label: '操作',
          prop: 'operate'
        }
      ],
      cur_quantum_time_list: [], // 当前的时间段表格数据
      cur_set_time_range: [], // 当前时间范围
      cur_set_space_minutes: 15, // 当前设置分钟间隔 默认15分钟
      curDateRowIndex: 0, // 当前日期列表选择编辑的索引
      curForwardDate: '',
      forwardDate1: '', // 自定义预约预约起止日期
      forwardDateRange2: [], // 按日期预约起止日期
      forwardDateRange3: [], // 按周预约起止日期
      rulesTable1: [], // 自定义预约
      rulesTable2: [], // 按日期
      rulesTable3: [], // 按周
      rules: {
        start_date: [{ required: true, message: '请选择日期', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState('ldyxb/gzt', [
      'isForwardFormVisble', // 预约日期开启/关闭状态
      'isQuantumTimeEditVisble', // 时间段编辑开启/关闭状态
      'forwardForm' // 预约表单
    ])
  },
  mounted() {},
  watch: {
    forwardForm: {
      handler(val, oldval) {
        this.forwardForm.select_weekday = val.select_weekday !== '' ? val.select_weekday : []
        let start_date = val.start_date
        let end_date = val.end_date
        let type = val.type
        let rules = val.rules
        if (type === 1) {
          this.curForwardDate = start_date
          this.forwardDate1 = this.curForwardDate

          this.rulesTable1 = rules
        } else if (type === 2) {
          let range = []
          range[0] = start_date
          range[1] = end_date
          this.forwardDateRange2 = range
          this.rulesTable2 = rules
        } else if (type === 3) {
          let range = []
          range[0] = start_date
          range[1] = end_date
          this.forwardDateRange3 = range
          this.rulesTable3 = rules
        }
      }
    }
  },
  methods: {
    test() {
    },
    // 切换预约设置对话框
    handleToggleForwardForm() {
      // let val = !this.isForwardFormVisble
      this.$store.commit('ldyxb/gzt/toggleForwardForm', false)
    },
    // 开启/关闭时间段编辑对话框
    handleToggleQuantumTimeEdit(index) {
      let val = !this.isQuantumTimeEditVisble
      this.curDateRowIndex = index // 当前日期列表选择编辑的索引
      this.cur_quantum_time_list = this.forwardForm.rules[index].quantum_time_list || [] // 当前的时间段表格数据
      this.$store.commit('ldyxb/gzt/toggleQuantumTimeEdit', val)
    },
    // 由星期的数字转换为星期的名称,date格式：2016-01-07，用"-"分割
    toWeekName(date) {
      var newDate = new Date(date.replace(/-/g, '/'))
      var weekday = new Array(7)
      weekday[0] = '周日'
      weekday[1] = '周一'
      weekday[2] = '周二'
      weekday[3] = '周三'
      weekday[4] = '周四'
      weekday[5] = '周五'
      weekday[6] = '周六'
      return weekday[newDate.getDay()]
    },
    // 增加开始日期
    handleAddDateType1() {
      if (this.forwardDate1 === '') {
        this.$message({
          message: '请先选择日期',
          type: 'error',
          duration: 2000
        })
        return false
      }

      this.curForwardDate = this.forwardDate1
      let weekday = this.toWeekName(this.curForwardDate)

      let rulesTable = this.forwardForm.rules

      // 验证日期选择是否重复
      var that = this
      let tmpArr = _.filter(rulesTable, function(o) {
        return o.date === that.curForwardDate
      })
      if (tmpArr.length !== 0) {
        this.$message({
          message: '日期选择重复',
          type: 'error',
          duration: 2000
        })
        return false
      }
      //   debugger
      let obj = {
        date: this.curForwardDate, // 开始日期
        weekday: weekday, // 星期
        obj_name: '', // 预约对象
        status: '1', // 1开启（默认），2关闭
        quantum_time: '', // 时间间隔
        quantum_time_list: [] // 时间段
      }
      this.forwardForm.rules.push(obj)
      this.forwardForm.rules = _.sortBy(this.forwardForm.rules, ['date']) // 根据日期升序排序
      this.forwardDate1 = this.curForwardDate
      this.rulesTable1 = this.forwardForm.rules // 缓存
      // debugger
    },
    // 开启/关闭该行日期状态
    handleToggleDateRow(index) {
      if (this.forwardForm.rules[index].status === '1') {
        this.forwardForm.rules[index].status = '0'
      } else {
        this.forwardForm.rules[index].status = '1'
      }

      //   debugger
    },
    // 删除该行日期
    handleDelDateRow(index) {
      this.$confirm('确定删除该行吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.forwardForm.rules.splice(index, 1)
        })
        .catch(() => {})
    },
    // 确定日期间隔
    handleConfirmSpaceDate() {
      let that = this
      this.$confirm('确定修改吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        let dateRange = that.forwardDateRange2
        let start_date = dateRange[0]
        let end_date = dateRange[1]
        let space_days = that.forwardForm.space_days // 间隔天数

        let space_day = dayjs(end_date).diff(dayjs(start_date), 'day') // 日期间相差的天数
        let start_date_stamp = dayjs(start_date).valueOf()
        let end_date_stamp = dayjs(end_date).valueOf()
        let days_mseconds = 24 * 60 * 60 * 1000 // 一天的毫秒数
        let result = [] // 符合的日期数组
        for (let i = 0; i <= space_day; i) {
          i = i + space_days
          let space_days_mseconds = days_mseconds * space_days // 间隔天数的毫秒数
          let computed_stamp = start_date_stamp + space_days_mseconds // 加上间隔天数后的时间戳
          if (computed_stamp <= end_date_stamp) {
            let computedDate = dayjs(computed_stamp).format('YYYY-MM-DD')
            let weekday = that.toWeekName(computedDate)
            start_date_stamp = computed_stamp
            let obj = {
              date: computedDate, // 开始日期
              weekday: weekday, // 星期
              obj_name: '', // 预约对象
              status: '1', // 1开启（默认），2关闭
              quantum_time: '', // 时间间隔
              quantum_time_list: [] // 时间段
            }
            result.push(obj)
          }
        }
        let start_weekday = that.toWeekName(start_date)
        let start_obj = {
          date: start_date, // 开始日期
          weekday: start_weekday, // 星期
          obj_name: '', // 预约对象
          status: '1', // 1开启（默认），2关闭
          quantum_time: '', // 时间间隔
          quantum_time_list: [] // 时间段
        }
        result.unshift(start_obj)
        that.forwardForm.rules = result
        that.rulesTable2 = result
      }).catch(() => {})
    },
    // 确定星期几符合的日期
    handleConfirmWeek() {
      let that = this
      this.$confirm('确定修改吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(() => {
        let dateRange = that.forwardDateRange3
        let start_date = dateRange[0]
        let end_date = dateRange[1]
        let space_day = dayjs(end_date).diff(dayjs(start_date), 'day') // 日期间相差的天数
        let result = [] // 符合的日期数组
        let select_weekday = that.forwardForm.select_weekday
        for (let i = 0; i <= space_day; i++) {
          let weekday = that.toWeekName(start_date)
          if (_.includes(select_weekday, weekday)) {
            let obj = {
              date: start_date, // 开始日期
              weekday: weekday, // 星期
              obj_name: '', // 预约对象
              status: '1', // 1开启（默认），2关闭
              quantum_time: '', // 时间间隔
              quantum_time_list: [] // 时间段
            }
            result.push(obj)
          }
          start_date = dayjs(start_date)
            .add(1, 'day')
            .format('YYYY-MM-DD')
        }

        that.forwardForm.rules = result
        that.rulesTable3 = result
      }).catch(() => {})
    },
    // 改变预约表单类型
    handleChangeForwardFormType() {
      let type = this.forwardForm.type
      this.forwardForm.rules = [] // 清空
      // 重新赋值
      if (type === 1) {
        this.forwardForm.rules = this.rulesTable1
      } else if (type === 2) {
        this.forwardForm.rules = this.rulesTable2
      } else if (type === 3) {
        this.forwardForm.rules = this.rulesTable3
      }
    },
    // 保存预约表单数据
    handleSubmit() {
      if (this.isBtnLoading) {
        return false
      }
      this.isBtnLoading = true
      let forwardForm = this.forwardForm
      // 开始和结束日期
      if (forwardForm.type === 1) {
        forwardForm.start_date = this.forwardDate1
      } else if (forwardForm.type === 2) {
        forwardForm.start_date = this.forwardDateRange2[0]
        forwardForm.end_date = this.forwardDateRange2[1]
      } else if (forwardForm.type === 3) {
        forwardForm.start_date = this.forwardDateRange3[0]
        forwardForm.end_date = this.forwardDateRange3[1]
      }
      debugger
      this.$store.commit('ldyxb/gzt/saveForwardForm', forwardForm)
      // debugger
      let that = this
      that.isBtnLoading = false
      that.$store.commit('ldyxb/gzt/toggleForwardForm', false)
      this.$message({
        message: '操作成功',
        type: 'success',
        duration: 2000
      })
    },
    submitQuantumTime(val) {
      let type = this.forwardForm.type
      this.forwardForm.rules[this.curDateRowIndex].quantum_time_list =
        val.quantum_time_list // 时间段赋值
      this.cur_set_time_range = val.set_time_range // 当前时间范围
      this.cur_set_space_minutes = val.set_space_minutes // 当前设置分钟间隔
      this.cur_isAllChoice = val.isAllChoice// 是否批量处理
      if (this.cur_isAllChoice === 1) {
        this.handleAllChoice(val.quantum_time_list)// 批量处理采用所有设置
      }
      // 缓存数据
      if (type === 1) {
        this.rulesTable1.rules[this.curDateRowIndex].quantum_time_list = this.forwardForm.rules[this.curDateRowIndex].quantum_time_list
      } else if (type === 2) {
        this.rulesTable2.rules[this.curDateRowIndex].quantum_time_list = this.forwardForm.rules[this.curDateRowIndex].quantum_time_list
      } else if (type === 3) {
        this.rulesTable3.rules[this.curDateRowIndex].quantum_time_list = this.forwardForm.rules[this.curDateRowIndex].quantum_time_list
      }
    },
    handleAllChoice(list) {
      let rules = this.forwardForm.rules
      for (let i = 0; i < rules.length; i++) {
        rules[i].quantum_time_list = _.cloneDeep(list)
      }
      debugger
    }
  }
}
</script>

<style lang="scss" scoped>
.m_l20 {
  margin-left: 20px;
}
</style>
