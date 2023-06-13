import { defineStore } from "pinia";
import { ExerciseService } from "../api/services/exercise.service";
import { Exercise } from "../types";

const service = new ExerciseService("/Exercise")

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

        async fetchAll(){
            this.exercises = await service.getAll();
        },
        async fetchOne(id: string){
            this.exercise = await service.getById(id);
        },
        async create(model: Exercise){
            const result = await service.create(model);
            if (result) await this.fetchAll();
            return result;
        },
        async update(id: string, model: Exercise){
            const result = await service.update(id, model);
            if (result) await this.fetchAll();
            return result;
        },
        async delete(id: string){
            const result = await service.delete(id);
            if (result) await this.fetchAll();
            return result;
        },
    },
});

