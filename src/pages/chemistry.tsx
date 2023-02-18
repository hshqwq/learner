import styles from '@/styles/Chemistry.module.scss';

import Head from "next/head";
import elementsJson from '@/json/chemistry/elements.json';
import Element, { ElementData } from '@/components/page/chemistry/element/element';
import { useState } from 'react';
import Search from '@/components/page/chemistry/search/search';
import { FCState } from '@/interface/fcstate';


enum chineseTypeName {
    index = '序号',
    name = '名称',
    mark = '符号',
    quality = '原子质量',
    family = '族',
    period = '组'
}

export default function Chemistry() {
    const [elements, setElements]: FCState<ElementData[]> = useState(elementsJson);
    const [sortType, setSortType]: FCState<keyof ElementData> = useState('quality') as FCState<keyof ElementData>;

    return <>
        <Head>
            <title>Learner - Chemistry</title>
        </Head>
        <div className={styles.main}>
            <Search elements={elementsJson} set={setElements}></Search>
            <select onChange={(ev) => {
                const value = ev.target.value;
                console.log(value);
                
                setSortType(value as keyof ElementData);
            }}>
                {Object.keys(elementsJson[0]).map(k => <option key={k} value={k} selected={k === sortType}>{chineseTypeName[k as keyof ElementData]}</option>)}
            </select>
            {elements.sort((a: ElementData, b: ElementData) => {
                let av = a[sortType];
                let bv = b[sortType];

                function toNumber<T extends string | number|(string|number)[]>(str: T) :number[]{
                    if(str instanceof Array) return str.map(v => toNumber(v)[0]);
                    if (typeof str === 'number')  return [str];
                    return [str.charCodeAt(0)];
                }

                [av, bv] = toNumber([av, bv]);

                return av - bv;
            }).map(el => <Element key={el.index} data={el}></Element>)}
        </div>
    </>
}