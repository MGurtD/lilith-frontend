<template>
    <div class="grid p-fluid">
        <div class="col-12 md:col-4">
            <Card style="width: 25rem; margin-bottom: 2em">
                <template #header>
                </template>
                <template #title>
                Grafo 1
                </template>
                <template #content>
                    <Chart type="polarArea" :data="chartData" :options="chartOptions" />
                </template>
                <template #footer>
                    
                </template>
            </Card>
        </div>
        <div class="col-12 md:col-8">
            <Card style="width: 60rem; margin-bottom: 2em">
                <template #header>
                </template>
                <template #title>
                Grafo 2
                </template>
                <template #content>
                    <Chart type="bar" :data="chartData2" :options="chartOptions2" />
                </template>
                <template #footer>
                    
                </template>                
            </Card>
        </div>
        </div>
<div class="container"></div>
    
</template>
<script>
export default {
    name: "item-list",

    data() {
        return {
            url: process.env.VUE_APP_API_URL,
            chartData: {
                datasets: [{
                    data: [11,16,7,3,14],
                    backgroundColor: ["#42A5F5","#66BB6A","#FFA726","#26C6DA","#7E57C2"],
                    label: 'My dataset'
                }],
                labels: ["Pendents","Confirmats","Facturats","Cancelats","Impagats"]
            },
            chartOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    r: {
                        grid: {
                            color: '#ebedef'
                        }
                    }
                }
            },
            chartData2: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                datasets: [{
                    type: 'line',
                    label: 'Dataset 1',
                    borderColor: '#42A5F5',
                    borderWidth: 2,
                    fill: false,
                    data: [50,25,12,48,56,76,42]
                }, {
                    type: 'bar',
                    label: 'Dataset 2',
                    backgroundColor: '#66BB6A',
                    data: [21,84,24,75,37,65,34],
                    borderColor: 'white',
                    borderWidth: 2
                }, {
                    type: 'bar',
                    label: 'Dataset 3',
                    backgroundColor: '#FFA726',
                    data: [41,52,24,74,23,21,32]
                }, {
                    type: 'bar',
                    label: 'Dataset 4',
                    backgroundColor: '#BBA273',
                    data: [21,33,74,37,45,12,67]
                }
            ]
            },
            chartOptions2: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        }
                    }
                }
            },
           
        }
    },
    onMounted(){
        console.log(this.url)
        
    }
}
</script>