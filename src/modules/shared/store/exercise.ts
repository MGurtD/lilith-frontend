import { defineStore } from "pinia";
import { Exercise } from "../types";
import Services from "../services";

export const useExerciseStore = defineStore({
  id: "exercise",
  state: () => ({
    exercise: undefined as Exercise | undefined,
    exercises: undefined as Array<Exercise> | undefined,
  }),
  getters: {},
  actions: {
    setNew(id: string) {
      this.exercise = {
        id: id,
        name: "",
        description: "",
        startDate: new Date(),
        endDate: new Date(),
        disabled: false,
      } as Exercise;
    },

    async fetchAll() {
      this.exercises = await Services.Exercice.getAll();
    },
    async fetchActive() {
      this.exercises = await Services.Exercice.getAll();
      this.exercises = this.exercises?.filter((e) => !e.disabled);
    },
    async fetchOne(id: string) {
      this.exercise = await Services.Exercice.getById(id);
    },
    async create(model: Exercise) {
      const result = await Services.Exercice.create(model);
      if (result) await this.fetchAll();
      return result;
    },
    async update(id: string, model: Exercise) {
      const result = await Services.Exercice.update(id, model);
      if (result) await this.fetchAll();
      return result;
    },
    async delete(id: string) {
      const result = await Services.Exercice.delete(id);
      if (result) await this.fetchAll();
      return result;
    },
    
  },
});
