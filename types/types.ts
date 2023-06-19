export type LLMTypes = 'gpt-3' | 'anthropic' | 'cohere' | 'a-21' | 'falcon-40b';

export interface GenerateBody {
  llm_type: LLMTypes;
  transcript: string;
  num_bullet_points: number;
}
