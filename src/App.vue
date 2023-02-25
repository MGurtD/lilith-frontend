<template>
<Toolbar>
    <template #start>
      <img src="./images/uvas.png" class="logo"/>
        <h3>Bacchus</h3>
    </template>

    <template #end>
        <i class="pi pi-user" /> &nbsp;&nbsp; Nom usuari &nbsp;&nbsp;        
        <Button icon="pi pi-times" class="p-button-danger" />
    </template>
</Toolbar>
  <MenuBar :model="items" class="navbar"/>  

  <RouterView />
<<<<<<< HEAD

=======
>>>>>>> e4ec87adf3aa975ac29516ec72be54ba3ade938d
</template>

<script>
import "primeflex/primeflex.css"; 
import 'primeicons/primeicons.css';


//import HelloWorld from './components/HelloWorld.vue'
import MenuBar from "primevue/menubar"
import Toolbar from 'primevue/toolbar';
import Button from 'primevue/button'


export default {
  name: 'App',
  components: {
    MenuBar,
    Toolbar,
    Button

  },
  data() {
    return {
      items:[
        {
          label:'Inici',
          icon:'pi pi-home',
          to: '/'
        },
        {
          label:'Articles',
          items: [
            {
              label:'Articles',
              to:'/config/item'
            },
            {
              label:'Categories d\'article',
              to: '/config/category'
            },
          ]
        },
        {
          label: 'Operaris',
          items: [
            {
              label:'Categories d\'operari',
              to: '/config/employeecategory'
            }
          ]
        },
        {
          label: 'Events',
          items:[
            {
            label:'Estats',
            to:'/config/eventstatus'
            },
            {
              label:'Events',
              to:'/data/event'
            }
          ]
        },
      ]
    }
  }
}
</script>

<style lang="scss">
@import "~primevue/resources/primevue.min.css";
@import "~primevue/resources/themes/lara-light-purple/theme.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.navbar {
  margin-bottom: 10px;
}
.logo {
  max-width: 50px;
}
</style>
