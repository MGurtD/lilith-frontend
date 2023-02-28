<template>
<div class="col-12 md:col-8">
      <Card style="width: 60rem; margin-bottom: 2em">
        <template #header> </template>
        <template #title> Imports i costs per ceco </template>
        <template #content>
          <Chart type="bar" :data="chartData2" :options="chartOplabelstions2" />
        </template>
        <template #footer> </template>
      </Card>
    </div>
</template>
<script lang="ts">
    import statisticsService from '../api/statistics.service';
    export default {
        name: "statistics",
        data() {
            return {
                importbyaccount: [],
                labels: [],
                costs: [],
                imports: [],
                chartData2: {
                    labels: this.labels,
                    datasets: [       
                    {
                        type: "bar",
                        label: "Costs",
                        backgroundColor: "#66BB6A",
                        data: this.costs,
                        borderColor: "white",
                        borderWidth: 2,
                    },
                    {
                        type: "bar",
                        label: "Imports amb descompte",
                        backgroundColor: "#FFA726",
                        data: this.imports,
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
                },
            }
        },
        computed:{

        },
        methods: {
            fetchData(){
                statisticsService.getImportByAccount()
                .then(response =>{
                    this.importbyaccount = response.data
                    for(const k in this.importbyaccount){
                        const v = this.importbyaccount[k]
                        this.labels.push(v.description)
                        this.costs.push(v.costprice)
                        this.imports.push(v.saleprice)
                    }
                    console.log(this.costs)
                })
            }
        },
        mounted(){
            this.fetchData()
        }
    }
</script>