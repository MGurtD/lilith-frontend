<template>
    <div class="card">
        <DataTable :value="users" removableSort tableStyle="min-width: 50rem">
            <Column field="code" header="Code" sortable style="width: 25%"></Column>
            <Column field="name" header="Name" sortable style="width: 25%"></Column>
            <Column field="category" header="Category" sortable style="width: 25%"></Column>
            <Column field="quantity" header="Quantity" sortable style="width: 25%"></Column>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { UserService } from '../api/services/user.service';

onMounted(() => {
    UserService
});

const products = ref();

</script>
  