import { ExerciseService } from "./exercise.service";
import { FileService } from "./file.service";
import { PaymentMethodService } from "./paymentmethod.service";
import { TaxService } from "./tax.service";

export default {
  file: new FileService(),
  paymentMethod: new PaymentMethodService("/PaymentMethod"),
  tax: new TaxService("/Tax"),
  exercice: new ExerciseService("/Exercise"),
};
