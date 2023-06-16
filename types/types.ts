export type LLMTypes = 'openai';

export interface GenerateBody {
  llm_type: LLMTypes;
  transcript: string;
  num_bullet_points: number;
}
