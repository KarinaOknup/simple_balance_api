import { z } from "zod";

const schema = z.object({
  userId: z.number().min(1),
  amount: z.number().int(),
});

export default schema;
