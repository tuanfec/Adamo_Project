import { z } from "zod";

export const createCheckoutSchema = (t: (key: string) => string) =>
  z.object({
    paymentMethod: z.string().min(1, t("checkOut.zod.paymentMethod")),
    firstName: z.string().min(1, t("checkOut.zod.firstName")),
    lastName: z.string().min(1, t("checkOut.zod.lastName")),
    email: z.string().email(t("checkOut.zod.email")),
    phone: z.string().min(1, t("checkOut.zod.phone")),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string().optional(),
    specialRequirement: z.string().optional(),
  });

export type CheckoutFormValues = z.infer<
  ReturnType<typeof createCheckoutSchema>
>;
