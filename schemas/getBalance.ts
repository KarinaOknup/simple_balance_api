import { z } from "zod";

const schema = z.object({
  userId: z.coerce.number().min(1),
});

export default schema;
