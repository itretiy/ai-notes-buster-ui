import { LLMTypes } from '@/types/types';
import { FC } from 'react';

interface Props {
  model: LLMTypes;
  onChange: (model: LLMTypes) => void;
}

export const ModelSelect: FC<Props> = ({ model, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as LLMTypes);
  };

  return (
    <select
      className="h-[40px] w-[140px] rounded-md bg-[#1F2937] px-4 py-2 text-neutral-200"
      value={model}
      onChange={handleChange}
    >
      <option value="gpt-3">GPT-3</option>
      <option value="falcon-40b">Falcon-40B</option>
    </select>
  );
};
