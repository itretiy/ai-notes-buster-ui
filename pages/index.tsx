import { ModelSelect } from '@/components/ModelSelect';
import { TextBlock } from '@/components/TextBlock';
import { LLMTypes, GenerateBody } from '@/types/types';
import Head from 'next/head';
import { useState } from 'react';
import { Bars } from 'react-loader-spinner'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function Home() {
  const [transcript, setTranscript] = useState<string>('');
  const [meetingNotes, setMeetingNotes] = useState<string>('');
  const [model, setModel] = useState<LLMTypes>('gpt-3');
  const [bulletPointsCount, setBulletPointsCount] = useState<number>(3);
  const [loading, setLoading] = useState<boolean>(false);
  const [isGenerated, setHasGenerated] = useState<boolean>(false);
  const [isDraggingBullets, setDraggingBullets] = useState<boolean>(false);
  const [hasCopyText, setHasCopyText] = useState<boolean>(false);

  const handleTranslate = async () => {
    if (!transcript) {
      alert('Please place Transcript into the left panel!');
      return;
    }
    setLoading(true);
    setHasGenerated(false);
    setHasCopyText(false);
    setMeetingNotes('');
    try {
      const body: GenerateBody = {
        llm_type: model,
        transcript,
        num_bullet_points: bulletPointsCount,
      }; 
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/summarize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        setLoading(false);
        alert('Something went wrong.');
        return;
      }
  
      const responseText = await response.text();
  
      if (!responseText) {
        setLoading(false);
        alert('Something went wrong!');
        return;
      }
  
      setMeetingNotes(responseText);
      copyToClipboard(responseText);
      setHasGenerated(true);
      setHasCopyText(true);
      setTimeout(() => {
        setHasCopyText(false);
      }, 2000);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert('Something went wrong!');
    }
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
        <title>AI Notes Busters</title>
        <meta
          name="description"
          content="Use AI to generate meeting notes from transcript."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex h-full min-h-screen flex-col items-center bg-[#0E1117] px-4 pb-20 text-neutral-200 sm:px-10" style={{ background: 'url(https://www.fluxon.com/static/images/ContactBg.png) center center / cover no-repeat #0E1117'}}>
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

        <div className="mt-3 pl-[45px] w-[200px]">
          <Slider
            startPoint={1}
            min={3}
            max={10}
            defaultValue={bulletPointsCount}
            value={bulletPointsCount}
            onChange={(value) => {
              setBulletPointsCount(value as number);
            }}
            onBeforeChange={() => {
              setDraggingBullets(true);
            }}
            onAfterChange={() => {
              setDraggingBullets(false);
            }}
            trackStyle={{ backgroundColor: 'rgb(139 92 246 / 0.8)', height: 5 }}
            railStyle={{ backgroundColor: '#E5E5E5', height: 5 }}
            handleStyle={{ backgroundColor: '#E5E5E5', borderWidth: '3px', borderColor: 'rgb(139 92 246)', opacity: 1, boxShadow: isDraggingBullets ? '0 0 0 5px rgb(139 92 246 / 0.6)' : 'none' }}
          />
        </div>

        <div className="mt-2 text-center text-xs h-[40px]">
          {loading && (
            <Bars
              height="40"
              width="80"
              color="#8b5cf6"
              ariaLabel="bars-loading"
              wrapperStyle={{ 'justify-content': 'center' }}
              wrapperClass=""
              visible={true}
            />
          )}
          {!loading
            ? hasCopyText
            ? 'Meeting Notes copied to clipboard (edit as needed)!'
            : 'Place Transcript into the left panel, adjust bullet points count and click "Generate"'
            : ''}
        </div>

        <div className="mt-6 flex w-full max-w-[1200px] flex-col justify-between sm:flex-row sm:space-x-4">
          <div className="h-100 flex flex-col justify-center space-y-2 sm:w-2/4">
            <div className="text-center text-xl font-bold">Transcript</div>

            <TextBlock
              text={transcript}
              editable={!loading}
              onChange={(value) => {
                setTranscript(value);
                setHasGenerated(false);
              }}
              canCopy={false}
            />
          </div>
          <div className="mt-8 flex h-full flex-col justify-center space-y-2 sm:mt-0 sm:w-2/4">
            <div className="text-center text-xl font-bold">
              Meeting Notes
              <span className="text-violet-500"> with {bulletPointsCount} bullet points</span>
            </div>

            <TextBlock
              text={meetingNotes}
              editable={isGenerated}
              onChange={(value) => {
                setMeetingNotes(value);
              }}
              canCopy={isGenerated}
              isResult
            />
          </div>
        </div>
      </div>
    </>
  );
}
