<template>
    <Card style="width: 25rem; margin-bottom: 2em">
        <template #header>
        </template>
        <template #title>
           {{ this.url }}
        </template>
        <template #content>
            <Chart type="polarArea" :data="chartData" :options="chartOptions" />
        </template>
        <template #footer>
            <Button icon="pi pi-check" label="Save" />
            <Button icon="pi pi-times" label="Cancel" class="p-button-secondary sm" style="margin-left: .5em" />
        </template>
    </Card>
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
            }
        }
    },
    onMounted(){
        console.log(this.url)
        
    }
}
</script>