export type LLMTypes = 'openai';

export interface GenerateBody {
  llm_type: LLMTypes;
  transcript: string;
  number_of_bullet_points: number;
}

// TODO adjust according to response format
export interface GenerateResponse {
  text: string;
}
