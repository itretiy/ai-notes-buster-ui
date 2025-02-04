import { useEffect, useState } from 'react';

interface Props {
  text: string;
  editable?: boolean;
  canCopy?: boolean;
  onChange?: (value: string) => void;
  isResult?: boolean;
}

export const TextBlock: React.FC<Props> = ({
  text,
  editable = false,
  canCopy = true,
  onChange = () => {},
  isResult = false,
}) => {
  const [copyText, setCopyText] = useState<string>('Copy');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopyText('Copy');
    }, 2000);

    return () => clearTimeout(timeout);
  }, [copyText]);

  return (
    <div className="relative">
      {canCopy && (
        <button
          className="absolute right-0 top-0 z-10 bg-[#1A1B26] p-1 text-xs text-white hover:bg-[#2D2E3A] active:bg-[#2D2E3A] border-solid border-2 border-neutral-200"
          onClick={() => {
            navigator.clipboard.writeText(text);
            setCopyText('Copied!');
          }}
        >
          {copyText}
        </button>
      )}

      <textarea
        className={`min-h-[500px] w-full bg-[#1A1B26] p-4 text-[15px] text-neutral-200 focus:outline-none border-solid border-2 border-neutral-200`}
        style={{ resize: 'none' }}
        value={text.replace(/^"|"$/g, '').replace(/\\n/g, '\n').trim()}
        onChange={(e) => onChange(e.target.value)}
        disabled={!editable}
      />
    </div>
  );
};
