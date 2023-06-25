import { ExerciseService } from "./exercise.service";
import { FileService } from "./file.service";
import { PaymentMethodService } from "./paymentmethod.service";
import { TaxService } from "./tax.service";

export default {
  File: new FileService(),
  PaymentMethod: new PaymentMethodService("/PaymentMethod"),
  Tax: new TaxService("/Tax"),
  Exercice: new ExerciseService("/Exercise"),
};
