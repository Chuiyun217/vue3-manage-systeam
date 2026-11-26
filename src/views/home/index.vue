<script setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts/core'
import { PieChart, LineChart, MapChart } from 'echarts/charts' // 图表类型按需引入
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from 'echarts/components' // 图表功能
import { CanvasRenderer } from 'echarts/renderers'
import { LegendComponent } from 'echarts/components'
import chinaMapData from '@/assets/100000_full.json'

echarts.use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  CanvasRenderer,
  LegendComponent,
  PieChart,
  MapChart,
  VisualMapComponent,
])

const lineChartRef = ref(null)
const pieChartRef = ref(null)
const mapChartRef = ref(null)

onMounted(() => {
  // 地图注册
  echarts.registerMap('china', chinaMapData)

  const lineChart = echarts.init(lineChartRef.value)
  lineChart.setOption(testData_2.value.line)
  const pieChart = echarts.init(pieChartRef.value)
  pieChart.setOption(testData_2.value.pie)
  const mapChart = echarts.init(mapChartRef.value)
  mapChart.setOption(testData_3.value.map)
})

const testData_1 = ref([
  { name: '用户访问量', num: 1314, icon: 'yonghu' },
  { name: '系统消息', num: 233, icon: 'xiaoxi' },
  { name: '商品数量', num: 7878, icon: 'shangpin1' },
  { name: '今日订单数', num: 369, icon: 'dingdanyichenggong' },
])

const testData_2 = ref({
  line: {
    grid: {
      top: 40, // 稍微留多一点顶部空间，避免数据点贴着边缘
      bottom: 50,
      left: 20,
      right: 30, // 右侧留点空间，避免最后一个数据点被切掉
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis', // 鼠标悬浮时显示整条线的数据
    },
    xAxis: {
      type: 'category', // 折线图必须明确指定 x 轴为类目轴
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      boundaryGap: false, // 让折线从 y 轴边缘开始，不留白
    },
    yAxis: {
      type: 'value', // 明确 y 轴为数值轴
    },
    series: [
      {
        name: 'sales',
        type: 'line', // 👈 改为折线图
        data: [444, 223, 366, 551, 371, 512, 733],
        smooth: true, // 是否平滑曲线（true 为平滑，false 为折线）
        symbol: 'circle', // 数据点形状（circle 圆形，rect 方形，emptyCircle 空心圆等）
        symbolSize: 8, // 数据点大小
        itemStyle: {
          color: '#5470c6', // 线条颜色
        },
        lineStyle: {
          width: 3, // 线条宽度
        },
        areaStyle: {
          // 下方渐变阴影面积（可选，不想要可以删掉 areaStyle）
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(84, 112, 198, 0.5)' },
            { offset: 1, color: 'rgba(84, 112, 198, 0)' },
          ]),
        },
      },
    ],
  },
  pie: {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)', // 显示名称、数值、百分比
    },
    label: {
      show: true,
      formatter: '{b}\n{d}%',
    },
    legend: {
      orient: 'horizontal', // 水平排列
      bottom: 'bottom', // 靠底部（或者写数字如 10）
      left: 'center', // 水平居中
    },
    series: [
      {
        name: '商品分类',
        type: 'pie',
        radius: ['40%', '70%'], // 数组表示环形图，单个值表示实心饼图
        center: ['50%', '50%'], // 调整饼图位置
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 6, // 扇区圆角
          borderColor: '#fff', // 扇区边框颜色
          borderWidth: 2, // 扇区边框宽度
        },
        data: [
          { value: 565, name: '零食' },
          { value: 311, name: '饮品' },
          { value: 286, name: '水果' },
          { value: 122, name: '数码产品' },
          { value: 242, name: '玩具' },
        ],
      },
    ],
  },
})

const testData_3 = ref({
  timeline: [
    {
      state: '商品上架',
      content: '管理员上架了一份新商品',
      type: 'primary',
      time: '5分钟前',
    },
    {
      state: '订单提交',
      content: 'xxx提交了订单,请马上处理',
      type: 'success',
      time: '44分钟前',
    },
    {
      state: '收藏商品',
      content: 'xxx收藏了该商品',
      type: 'info',
      time: '45分钟前',
    },
    {
      state: '用户评价',
      content: 'xxx给商品xxx发布评价',
      type: 'info',
      time: '2小时前',
    },
    {
      state: '退款请求',
      content: 'xxx申请了退款,已处理',
      type: 'danger',
      time: '3天前',
    },
  ],
  map: {
    title: {
      text: '商品销售分布',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>数值: {c}',
    },
    layoutCenter: ['50%', '70%'], // 水平往右移一点（比如55%或60%），垂直往下移一点
    layoutSize: '130%', // 放大地图，填满容器（120%会更大，90%会更小）
    // 视觉映射组件（控制地图颜色渐变）
    visualMap: {
      min: 0,
      max: 1000,
      text: ['高', '低'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['#e0f3f8', '#4575b4'], // 颜色从浅蓝到深蓝
      },
      left: 'left',
      bottom: 'bottom',
    },
    series: [
      {
        name: '数据名称',
        type: 'map',
        map: 'china', // 必须和 registerMap 里的名字一致
        roam: true, // 开启鼠标缩放和平移漫游
        label: {
          show: true, // 显示省份名称
          fontSize: 10,
        },
        itemStyle: {
          areaColor: '#f3f3f3', // 默认区域颜色
          borderColor: '#999', // 边界线颜色
        },
        emphasis: {
          label: { color: '#fff' },
          itemStyle: {
            areaColor: '#ff7f50', // 鼠标悬浮时的颜色
          },
        },
        // 具体数据：按省份名称匹配（name 必须是 GeoJSON 里的省份全称，如 "北京市", "广东省"）
        data: [
          { name: '北京市', value: 800 },
          { name: '广东省', value: 1000 },
          { name: '浙江省', value: 600 },
          { name: '四川省', value: 400 },
          { name: '新疆维吾尔自治区', value: 200 },
          // 没有写进 data 的省份会显示默认的 areaColor
        ],
      },
    ],
  },
  ranking: [
    { title: '零食', num: 733, progress: 75 },
    { title: '饮品', num: 551, progress: 50 },
    { title: '水果', num: 512, progress: 40 },
    { title: '玩具', num: 444, progress: 30 },
    { title: '数码产品', num: 371, progress: 20 },
  ],
})
</script>
<template>
  <div class="body">
    <div class="data_1">
      <el-card v-for="(item, index) in testData_1" :key="index" class="custom-card">
        <div class="pic">
          <el-icon>
            <i :class="`iconfont icon-${item.icon}`" style="font-size: 70px"></i>
          </el-icon>
        </div>
        <div class="content">
          <div class="name">{{ item.name }}</div>
          <div class="num">{{ item.num }}</div>
        </div>
      </el-card>
    </div>
    <div class="data_2">
      <div class="box">
        <div class="line_chart custom-card">
          <div class="title">订单状态</div>
          <div class="tips">最近一周订单状态，包括订单成交量和订单退货量</div>
          <div class="lineChartRef" ref="lineChartRef"></div>
        </div>
      </div>
      <div class="box">
        <div class="pie_chart custom-card">
          <div class="title">订单状态</div>
          <div class="tips">最近一周订单状态，包括订单成交量和订单退货量</div>
          <div class="pieChartRef" ref="pieChartRef"></div>
        </div>
      </div>
    </div>
    <div class="data_3">
      <div class="box">
        <div class="timeline custom-card">
          <div class="top">
            <div class="title">时间线</div>
            <div class="tips">最新的销售动态</div>
          </div>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in testData_3.timeline"
              :key="index"
              :type="activity.type"
              :hollow="activity.hollow"
              size="large"
            >
              <div class="timeline-item">
                <div class="state">
                  {{ activity.state }}
                </div>
                <div class="text">
                  <div class="content">{{ activity.content }}</div>
                  <div class="time">{{ activity.time }}</div>
                </div>
              </div>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
      <div class="box">
        <div class="mapChars custom-card" ref="mapChartRef"></div>
      </div>
      <div class="box">
        <div class="title">排行榜</div>
        <div class="tips">热门商品销售Top5</div>
        <div class="ranking custom-card">
          <div class="ranking-item" v-for="(item, index) in testData_3.ranking" :key="index">
            <div class="left">{{ index + 1 }}</div>
            <div class="right">
              <div class="top">
                <div class="content">{{ item.title }}</div>
                <div class="num">销量：{{ item.num }}</div>
              </div>
              <div class="bottom">
                <el-progress
                  :percentage="item.progress"
                  :stroke-width="15"
                  striped
                  :show-text="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use './index.scss';
</style>
