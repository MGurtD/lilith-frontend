<template>
    <div class="card">
        <DataTable :value="users" removableSort tableStyle="min-width: 50rem">
            <Column field="id" header="Id" sortable style="width: 20%"></Column>
            <Column field="username" header="Username" sortable style="width: 20%"></Column>
            <Column field="firstName" header="Firstname" sortable style="width: 20%"></Column>
            <Column field="lastName" header="Lastname" sortable style="width: 20%"></Column>
            <Column field="disabled" header="Disabled" sortable style="width: 20%"></Column>
        </DataTable>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { User, UserService } from '../api/services/user.service';

export default defineComponent({
    data() {
        return {
            users: undefined as Array<User> | undefined,
            userService: new UserService(),
        };
    },
    async created() {        
        this.users = await this.userService.GetAll();
    },
});

</script>
  