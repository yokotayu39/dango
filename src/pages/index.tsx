import {promises} from 'fs';
import { GetStaticProps, NextPage } from 'next';
import * as path from 'path';
import * as process from 'process';
import React, { ReactElement, useEffect, useState } from 'react';
import { Button } from '../components/Button';

type Country = {
  jpnName: string;
  engName: string;
  numeric: number;
  alpha3: string;
  alpha2: string;
  location: string;
  subDivision: string;
};

type RandomCat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

type Props = {
  countries: Array<Country>;
};


const IndexPage: NextPage<Props> = ({ countries }: Props): ReactElement => {
  const [count, setCount] = useState<number>(0);
  const [labourHours, setLabourHours] = useState<string>('0');
  const [catImage, setCatImage] = useState<null | RandomCat>(null);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search').then(async (res: Response) => {
      const json: Array<RandomCat> = await res.json();

      setCatImage(json[0]!);
    });
  }, []);

  return (
    <>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <div className="mx-auto">
          <div className="p-3 mb-3 border-2 rounded h-full w-full text-right">
            <span className="text-gray-700 select-none">{count}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(count);

                setCount(count + 1);
              }}>
              <span className="select-none text-xl">+</span>
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                console.log(count);

                setCount(count - 1);
              }}>
              <span className="select-none text-xl">-</span>
            </Button>
            <Button
              className="py-2 bg-cyan-600 text-white rounded border border-gray-200 cursor-pointer"
              onClick={() => {
                setCount(0);
              }}>
              <span className="select-none text-xl">C</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <div className="mx-auto">
          <div className="grid grid-cols-3 gap-2">
            <span className="text-gray-800 text-lg">勤務開始時間</span>
            <span className="text-gray-800 text-lg">勤務終了時間</span>
            <span className="text-gray-800 text-lg">労働時間</span>
            <input
              className="py-2 px-3 border-2 rounded border-gray-200 cursor-text"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value);

                setLabourHours(e.target.value);
              }}
            />
            <input
              className="py-2 px-3 border-2 rounded border-gray-200 cursor-text"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                console.log(e.target.value);

                setLabourHours(e.target.value);
              }}
            />
            <span className="select-none text-xl font-mono text-gray-700 text-right">{labourHours}</span>
          </div>
        </div>
      </div>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        <ul className="list-none">
        {countries.map((country: Country) => {
          return (
            <li className="text-gray-800 even:bg-teal-100 text-lg">
              <div className="my-1">{country.jpnName}</div>
              <div className="my-1">{country.engName}</div>
            </li>
          );
        })}
        </ul>
      </div>
      <div className="m-10 p-4 w-2/3 mx-auto shadow-lg border-2 rounded-2xl">
        {catImage === null ? null: <img src={catImage.url} height={catImage.height} width={catImage.width} alt="cat" className="w-full" />}
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const buffer = await promises.readFile(path.join(process.cwd(), 'json', 'countries.json'));
  const str  = buffer.toString();

  return {
    props: {
      countries: JSON.parse(str)
    }
  };
};

// eslint-disable-next-line import/no-default-export
export default IndexPage;
