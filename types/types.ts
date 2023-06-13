export type LLMTypes = 'gpt-3.5-turbo';

// TODO adjust according to the api
export interface GenerateBody {
  inputLanguage: string;
  outputLanguage: string;
  inputCode: string;
  model: LLMTypes;
  apiKey: string;
}

export interface GenerateResponse {
  text: string;
}
