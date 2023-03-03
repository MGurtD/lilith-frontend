<!--<template>
    <div class="container">
      <Bar v-if="loaded" :data="chartData" />
    </div>
  </template>
  
  <script lang="ts">
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  import statisticsService from '../api/statistics.service';
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    name: 'BarChart',
    components: { Bar },
    data: () => ({
      loaded: false,
      chartData: null
    }),
    async mounted () {
      this.loaded = false
  
      try {
        statisticsService.getStatistics()
        .then(response => {
            this.chartData = response.data
            console.log(this.chartData.labels)
            console.log(this.chartData.datasets)
        })
        
  
        this.loaded = true
      } catch (e) {
        console.error(e)
      }
    }
  }
  </script>-->