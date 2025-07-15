import { z } from "zod";
import { requestSchema } from "./schemas";

export type Request = z.infer<typeof requestSchema> & { id: string; timestamp: string };
