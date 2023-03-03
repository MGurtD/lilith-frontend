<template>
  <div class="grid p-fluid">
    <div class="col-12 md:col-4">
      <Card style="width: 25rem; margin-bottom: 2em">
        <template #header> </template>
        <template #title> Events pendets de facturar </template>
        <template #content>
          <i class="pi pi-circle" style="font-size: 2rem"></i>&nbsp;
          <Badge :value="pendent" size="xlarge" severity="success"></Badge>
        </template>
        <template #footer> </template>
      </Card>
    </div>
    <div class="col-12 md:col-4">
      <Card style="width: 25rem; margin-bottom: 2em">
        <template #header> </template>
        <template #title> Events facturats </template>
        <template #content>
          <i class="pi pi-check-circle" style="font-size: 2rem"></i>&nbsp;
          <Badge :value="billed" size="xlarge" severity="success"></Badge>
        </template>
        <template #footer> </template>
      </Card>
    </div>
    <div class="col-12 md:col-4"></div>
    <div class="col-12 md:col-4">
      <Card style="width: 25rem; margin-bottom: 2em">
        <template #header> </template>
        <template #title> Cost total </template>
        <template #content>
          <i class="pi pi-tags" style="font-size: 2rem"></i>&nbsp;
          <Badge :value="cost" size="xlarge" severity="success"></Badge>
        </template>
        <template #footer> </template>
      </Card>
    </div>
    <div class="col-12 md:col-4">
      <Card style="width: 25rem; margin-bottom: 2em">
        <template #header> </template>
        <template #title> Import facturat total </template>
        <template #content>
          <i class="pi pi-shopping-bag" style="font-size: 2rem"></i>&nbsp;
          <Badge :value="billedimport" size="xlarge" severity="success"></Badge>
        </template>
        <template #footer> </template>
      </Card>
    </div>
    <div class="col-12 md:col-4">
      <Card style="width: 25rem; margin-bottom: 2em">
        <template #header> </template>
        <template #title> Volum ventes </template>
        <template #content>
          <i class="pi pi-shopping-bag" style="font-size: 2rem"></i>&nbsp;
          <Badge :value="saleprice" size="xlarge" severity="success"></Badge>
        </template>
        <template #footer> </template>
      </Card>
    </div>
    <div class="col-12 md:col-8">
      <Card style="width: 60rem; margin-bottom: 2em">
        <template #header> </template>
        <template #title> Estadístiques per CeCo </template>
        <template #content>
          <DataTable
            :value="statisticslist"
            datakey="id"
            stripedRows
            responsiveLayout="scroll"
            :paginator="true"
            showGridlines
            :rows="5"            
          >
          <Column field="account" header="CeCo" :sortable="true" > </Column>
          <Column field="description" header="Descripció" :sortable="true"> </Column>
          <Column field="totalcost" header="Cost" :sortable="true">
            <template #body="slotProps">
              {{formatCurrency(slotProps.data.totalcost)}}
            </template>
          </Column>
          <Column field="totalgrossimport" header="Import" :sortable="true">
            <template #body="slotProps">
              {{formatCurrency(slotProps.data.totalgrossimport)}}
            </template>
          </Column>
          <Column field="totalnetimport" header="Import net" :sortable="true">
            <template #body="slotProps">
              {{formatCurrency(slotProps.data.totalnetimport)}}
            </template>
          </Column>
          </DataTable>
        </template>
        <template #footer> </template>
      </Card>
    </div>
  </div>
  <div class="container"></div>
</template>
<script lang="ts">
import statisticsService from '../api/statistics.service';

export default {

  name: "statistics",    
  data() {
    return {
      pendent:0,
      billed:0,
      cost:0,
      saleprice:0,
      billedimport:0,
      statistics: [],
      statisticslist:[]

      //url: import.meta.env.apiBaseUrl,
     
    };
  },
  methods: {
    fetchData(){
      statisticsService.getBasicStatistics()
      .then((response) =>{
        this.statistics = response.data
        this.pendent = response.data[0]
        this.billed = response.data[1]
        this.cost = response.data[2]
        this.saleprice = response.data[3]
        this.billedimport = response.data[4]
        console.log(response)
      })
      .catch((e) => {
        console.log(e);
      })
      statisticsService.getStatisticsList()
      .then((response) => {
        this.statisticslist = response.data
      })
      .catch((e) => {
        console.log(e);
      })
    },
    formatCurrency(value: any) {
            return value.toLocaleString('es-ES', {style: 'currency', currency: 'EUR'});
        },
  },
  mounted() {
    this.fetchData();
    //console.log(this.url);
    console.log(this.statisticslist)
  },
};
</script>
