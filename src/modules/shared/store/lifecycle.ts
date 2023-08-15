import { defineStore } from "pinia";
import { Lifecycle, Status, StatusTransition } from "../types";
import Services from "../services";
import { ref } from "vue";

export const useLifecyclesStore = defineStore({
  id: "lifecycle",
  state: () => ({
    lifecycle: ref(undefined as Lifecycle | undefined),
    lifecycles: ref(undefined as Array<Lifecycle> | undefined),
  }),
  getters: {
    transitions: (state): Array<StatusTransition> => {
      const transitions = [] as Array<StatusTransition>;
      if (state.lifecycle) {
        state.lifecycle.statuses.forEach((s) => {
          if (s.transitions) transitions.push(...s.transitions);
        });
      }
      return transitions;
    },
  },
  actions: {
    setNew(id: string) {
      this.lifecycle = {
        id,
        name: "",
        description: "",
        disabled: false,
        statuses: [],
      } as Lifecycle;
    },

    async fetchAll() {
      this.lifecycles = await Services.Lifecycle.getAll();
    },
    async fetchOne(id: string) {
      this.lifecycle = await Services.Lifecycle.getById(id);
    },
    async fetchOneByName(name: string) {
      this.lifecycle = await Services.Lifecycle.getByName(name);
    },
    async create(model: Lifecycle) {
      const result = await Services.Lifecycle.create(model);
      if (result) await this.fetchAll();
      return result;
    },
    async update(id: string, model: Lifecycle) {
      const result = await Services.Lifecycle.update(id, model);
      if (result) await this.fetchAll();
      return result;
    },
    async delete(id: string) {
      const result = await Services.Lifecycle.delete(id);
      if (result) await this.fetchAll();
      return result;
    },

    // Statuses
    async createStatus(model: Status) {
      const result = await Services.Lifecycle.createStatus(model);
      if (result) await this.fetchOne(this.lifecycle!.id);
      return result;
    },
    async updateStatus(id: string, model: Status) {
      const result = await Services.Lifecycle.updateStatus(model);
      if (result) await this.fetchOne(this.lifecycle!.id);
      return result;
    },
    async deleteStatus(id: string) {
      const result = await Services.Lifecycle.deleteStatus(id);
      if (result) await this.fetchOne(this.lifecycle!.id);
      return result;
    },

    // Transitions
    async createTransition(model: StatusTransition) {
      const result = await Services.Lifecycle.createTransition(model);
      if (result) await this.fetchOne(this.lifecycle!.id);
      return result;
    },
    async updateTransition(id: string, model: StatusTransition) {
      const result = await Services.Lifecycle.updateTransition(model);
      if (result) await this.fetchOne(this.lifecycle!.id);
      return result;
    },
    async deleteTransition(id: string) {
      const result = await Services.Lifecycle.deleteTransition(id);
      if (result) await this.fetchOne(this.lifecycle!.id);
      return result;
    },
  },
});
