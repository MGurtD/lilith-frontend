<template>
  <div class="grid p-fluid">
    <!--<div class="col-12 md:col-4">
      <Card style="width: 25rem; margin-bottom: 2em">
        <template #header> </template>
        <template #title> Grafo 1 </template>
        <template #content>
          <Chart type="polarArea" :data="chartData" :options="chartOptions" />
        </template>
        <template #footer> </template>
      </Card>
    </div>
    <div class="col-12 md:col-8">
      <Card style="width: 60rem; margin-bottom: 2em">
        <template #header> </template>
        <template #title> Grafo 2 </template>
        <template #content>
          <Chart type="bar" :data="chartData2" :options="chartOptions2" />
        </template>
        <template #footer> </template>
      </Card>
    </div>-->
  </div>
  <div class="container"></div>
</template>
<script lang="ts">
import eventService from '../api/event.service';
import statisticsService from '../api/statistics.service';

export default {

  name: "statistics",    
  data() {
    return {
      importbyaccount: [],
      labelsimportbyaccount: [],
      costsimportsbyaccount: [],
      salesimportsbyaccount: [],
      //url: import.meta.env.apiBaseUrl,
     /* chartData: {
        datasets: [
          {
            data: [11, 16, 7, 3, 14],
            backgroundColor: [
              "#42A5F5",
              "#66BB6A",
              "#FFA726",
              "#26C6DA",
              "#7E57C2",
            ],
            label: "My dataset",
          },
        ],
        labels: [
          "Pendents",
          "Confirmats",
          "Facturats",
          "Cancelats",
          "Impagats",
        ],
      },
      chartOptions: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          r: {
            grid: {
              color: "#ebedef",
            },
          },
        },
      },
      chartData2: {
        labels: this.labelsimportbyaccount,
        datasets: [       
          {
            type: "bar",
            label: "Costs",
            backgroundColor: "#66BB6A",
            data: this.costsimportsbyaccount,
            borderColor: "white",
            borderWidth: 2,
          },
          {
            type: "bar",
            label: "Imports amb descompte",
            backgroundColor: "#FFA726",
            data: this.salesimportsbyaccount,
          },          
        ],
      },
      chartOptions2: {
        plugins: {
          legend: {
            labels: {
              color: "#495057",
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
          y: {
            ticks: {
              color: "#495057",
            },
            grid: {
              color: "#ebedef",
            },
          },
        },
      },*/
    };
  },
  methods: {
    fetchData(){
      //statisticsService.getImportByAccount()
      eventService.getAll()
      .then(response =>{
        this.importbyaccount = response.data
        /*(Object.keys(this.importbyaccount) as (keyof typeof this.importbyaccount)[]).array.forEach(element => {
          console.log(element)
        });*/
        console.log(this.importbyaccount)
      })
    }
  },
  onMounted() {
    console.log("patata")
    this.fetchData();
    //console.log(this.url);
  },
  onBeforeMount(){
    console.log("before")
  },
};
</script>
