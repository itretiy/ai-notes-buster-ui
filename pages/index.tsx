import { ModelSelect } from '@/components/ModelSelect';
import { TextBlock } from '@/components/TextBlock';
import { LLMTypes, GenerateBody } from '@/types/types';
import Head from 'next/head';
import { useState } from 'react';

export default function Home() {
  const [transcript, setTranscript] = useState<string>('');
  const [meetingNotes, setMeetingNotes] = useState<string>('');
  const [model, setModel] = useState<LLMTypes>('gpt-3.5-turbo');
  const [loading, setLoading] = useState<boolean>(false);
  const [isGenerated, setHasGenerated] = useState<boolean>(false);

  const handleTranslate = async () => {
    // TODO implement
    alert('TODO implement');
    setMeetingNotes(transcript);
    copyToClipboard(transcript);
    setHasGenerated(true);
    // const maxCodeLength = model === 'gpt-3.5-turbo' ? 6000 : 12000;

    // if (!apiKey) {
    //   alert('Please enter an API key.');
    //   return;
    // }

    // if (inputLanguage === outputLanguage) {
    //   alert('Please select different languages.');
    //   return;
    // }

    // if (!inputCode) {
    //   alert('Please enter some code.');
    //   return;
    // }

    // if (inputCode.length > maxCodeLength) {
    //   alert(
    //     `Please enter code less than ${maxCodeLength} characters. You are currently at ${inputCode.length} characters.`,
    //   );
    //   return;
    // }

    // setLoading(true);
    // setOutputCode('');

    // const controller = new AbortController();

    // const body: TranslateBody = {
    //   inputLanguage,
    //   outputLanguage,
    //   inputCode,
    //   model,
    //   apiKey,
    // };

    // const response = await fetch('/api/translate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   signal: controller.signal,
    //   body: JSON.stringify(body),
    // });

    // if (!response.ok) {
    //   setLoading(false);
    //   alert('Something went wrong.');
    //   return;
    // }

    // const data = response.body;

    // if (!data) {
    //   setLoading(false);
    //   alert('Something went wrong.');
    //   return;
    // }

    // const reader = data.getReader();
    // const decoder = new TextDecoder();
    // let done = false;
    // let code = '';

    // while (!done) {
    //   const { value, done: doneReading } = await reader.read();
    //   done = doneReading;
    //   const chunkValue = decoder.decode(value);

    //   code += chunkValue;

    //   setOutputCode((prevCode) => prevCode + chunkValue);
    // }

    // setLoading(false);
    // setHasTranslated(true);
    // copyToClipboard(code);
  };

  const copyToClipboard = (text: string) => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  return (
    <>
      <Head>
        <title>Code Translator</title>
        <meta
          name="description"
          content="Use AI to translate code from one language to another."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10">
        <div className="mt-10 flex flex-col items-center justify-center sm:mt-20">
          <div className="text-4xl font-bold">AI Notes Busters</div>
        </div>

        <div className="mt-2 flex items-center space-x-2">
          <ModelSelect model={model} onChange={(value) => setModel(value)} />

          <button
            className="w-[140px] cursor-pointer rounded-md bg-violet-500 px-4 py-2 font-bold hover:bg-violet-600 active:bg-violet-700"
            onClick={() => handleTranslate()}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-2 text-center text-xs">
          {loading
            ? 'Generating...'
            : isGenerated
            ? 'Meeting Notes copied to clipboard (edit as needed)!'
            : 'Place Transcript to the left panel and click "Generate"'}
        </div>

        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Transcript</div>

            <TextBlock
              text={transcript}
              editable={!loading}
              onChange={(value) => {
                setTranscript(value);
                // TODO check whether it is ok to clear on change here
                setMeetingNotes('');
                setHasGenerated(false);
              }}
            />
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">Meeting Notes</div>

            <TextBlock
              text={meetingNotes}
              editable={isGenerated}
              onChange={(value) => {
                setMeetingNotes(value);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
