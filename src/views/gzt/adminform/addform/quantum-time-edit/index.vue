<template>
  <div>
    <el-dialog
      title="时间段编辑"
      :visible="isQuantumTimeEditVisble"
      @close="handleToggleQuantumTimeEdit"
      width="700px"
    >
      <div class="content">
        <el-form ref="form" label-width="130px">
          <el-form-item label="选择起止时间">
            <el-time-picker
              is-range
              v-model="time"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </el-form-item>
          <el-form-item label="时间间隔">
            <el-input v-model.number="set_space_minutes" size="medium" class="w_100 m_r10"></el-input
            ><span>分钟</span>
            <el-button class="m_l20" type="primary" @click="handleConfirmMinutes">确定</el-button>
          </el-form-item>
          <el-form-item label="批量">
            <el-checkbox v-model="allchoice" label="选中" @change="handleChangeAllChoice"
              >将当前设定的时间段批量应用到所有已设定的日期</el-checkbox
            >
          </el-form-item>
          <!-- 时间段表格 -->
          <el-form-item label="时间段">
            <el-table :data="quantum_time_list" border stripe max-height="450">
              <el-table-column prop="time" label="时间" align="center">
              </el-table-column>
              <el-table-column label="次数" align="center">
                <template slot-scope="scope">
                  <el-input
                    size="medium"
                    class="w_100"
                    v-model="scope.row.count"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="备注" align="center">
                <template slot-scope="scope">
                  <el-input
                    size="medium"
                    class="w_100"
                    v-model="scope.row.desc"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="handleToggleQuantumTimeRow(scope.$index)" v-if="scope.row.status == 1"
                    >开启</el-button
                  >
                  <el-button
                    type="text"
                    @click="handleToggleQuantumTimeRow(scope.$index)"
                    v-else
                    >关闭</el-button
                  >
                  <el-button style="color:#F56C6C" type="text" @click="handleDelQuantumTimeRow(scope.$index)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <!-- /时间段表格 -->
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleToggleQuantumTimeEdit">取消</el-button>
        <el-button type="primary" @click="handleSubmitQuantumTime">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import dayjs from 'dayjs'
export default {
  props: {
    quantumTimeListData: {
      type: Array,
      default: () => []
    },
    setTimeRangeData: {
      type: Array,
      default: () => []
    },
    setSpaceMinutesData: {
      type: Number,
      default: () => 15
    }
  },
  data() {
    return {
      time: [new Date(2020, 5, 10, 8, 30), new Date(2020, 5, 10, 18, 30)],
      set_space_minutes: 15, // 间隔分钟
      allchoice: [],
      isAllChoice: 0,
      quantumTimeVis: false,
      quantum_time_list: []
    }
  },
  computed: {
    ...mapState('ldyxb/gzt', ['isQuantumTimeEditVisble'])
  },
  watch: {
    quantumTimeListData: {
      handler() {
        this.quantum_time_list = this.quantumTimeListData
      }
    },
    setTimeRangeData: {
      handler() {
        this.time = this.setTimeRangeData
      }
    },
    setSpaceMinutesData: {
      handler() {
        this.set_space_minutes = this.setSpaceMinutesData
      }
    }
  },
  methods: {
    // 切换时间段编辑对话框
    handleToggleQuantumTimeEdit() {
      // let val = !this.isQuantumTimeEditVisble
      //   debugger
      this.$store.commit('ldyxb/gzt/toggleQuantumTimeEdit', false)
    },
    handleConfirmMinutes() {
      let start_time = this.time[0]// 开始的时间
      let end_time = this.time[1]// 结束的时间
      let start_time_mm = dayjs(start_time).format('HH:mm')// 开始的时间 格式mm:ss
      let start_time_stamp = dayjs(start_time).valueOf()// 开始时间的时间戳
      let end_time_stamp = dayjs(end_time).valueOf()// 结束时间的时间戳
      let space_time_stamp = end_time_stamp - start_time_stamp // 两个时间间隔的时间戳
      let space_minutes = space_time_stamp / (1000 * 60)// 时间间隔的总分钟数
      // debugger
      let set_space_minutes = this.set_space_minutes// 设置的时间间隔
      let set_minutes_stamp = set_space_minutes * 60 * 1000// 设置的时间间隔戳
      let start_minutes = 0// 开始间隔的分钟

      var result = []// 时间段数组
      while (start_minutes <= space_minutes) {
        if (start_time_stamp + set_minutes_stamp <= end_time_stamp) {
          let quantum_time_stamp = start_time_stamp + set_minutes_stamp// 时间段
          start_time_stamp = quantum_time_stamp
          let quantum_time = dayjs(quantum_time_stamp).format('HH:mm')
          result.push(quantum_time)
        }
        start_minutes = start_minutes + set_space_minutes// step
      }
      result.unshift(start_time_mm)
      let endResult = []
      for (let i = 0; i < result.length; i++) {
        if (result[i + 1]) {
          let tmp = `${result[i]}-${result[i + 1]}`
          endResult.push(tmp)
        }
      }
      // debugger
      this.createQuantumTimeTable(endResult)// 创建时间段表
    },
    // 创建时间段表格
    createQuantumTimeTable(time_arr) {
      let result = []
      for (let i = 0; i < time_arr.length; i++) {
        let obj = {
          time: time_arr[i],
          count: '10',
          desc: '',
          status: '1' // 1开启（默认），2关闭
        }
        result.push(obj)
      }
      this.quantum_time_list = result
      // debugger
    },
    // 删除该行时间段
    handleDelQuantumTimeRow(index) {
      this.$confirm('确定删除该行吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      })
        .then(() => {
          this.quantum_time_list.splice(index, 1)
        })
        .catch(() => {})
    },
    // 开启/关闭该行时间段状态
    handleToggleQuantumTimeRow(index) {
      if (this.quantum_time_list[index].status === '1') {
        this.quantum_time_list[index].status = '0'
      } else {
        this.quantum_time_list[index].status = '1'
      }

      //   debugger
    },
    // 保存时间段编辑内容
    handleSubmitQuantumTime() {
      let val = {
        isAllChoice: this.isAllChoice,
        quantum_time_list: this.quantum_time_list,
        set_time_range: this.time, // 设置时间范围
        set_space_minutes: this.set_space_minutes// 设置分钟间隔
      }
      this.$emit('submit', val)
      this.$store.commit('ldyxb/gzt/toggleQuantumTimeEdit', false)
      this.$message({
        message: '操作成功',
        type: 'success',
        duration: 2000
      })
      // debugger
    },
    handleChangeAllChoice() {
      let allchoice = this.allchoice
      if (allchoice[0] === '选中') {
        this.isAllChoice = 1
      } else {
        allchoice = []
        this.isAllChoice = 0
      }
      debugger
    }

  }
}
</script>
<style lang="scss" scoped>
.w_100 {
  width: 100px !important;
}
.m_r10 {
  margin-right: 10px;
}
.m_l20 {
  margin-left: 20px;
}
</style>
