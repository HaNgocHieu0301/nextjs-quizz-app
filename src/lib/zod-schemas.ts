import {z} from 'zod';

export const flashcardSchema = z.object({
    id: z.string().optional(),
    term: z.string().min(1, {message: "Term is required"}),
    definition: z.string().min(1, {message: "Definition is required"}),
});

export const createSetSchema = z.object({
    title: z.string().min(1, {message: "Title is required"}),
    description: z.string().optional(),
    cards: z.array(flashcardSchema).min(2, {message: "At least two flashcards are required"}),
});

export const importSchema = z.object({
  sourceText: z.string().optional(),
  contentType: z.enum(["vocabulary", "knowledge"]),
  cardCount: z.coerce.number<number>().min(1, "Số lượng phải lớn hơn 0").max(50, "Số lượng tối đa là 50"),
});

export type CreateSetSchemaType = z.infer<typeof createSetSchema>;
export type ImportSchemaType = z.infer<typeof importSchema>;