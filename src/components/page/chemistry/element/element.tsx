import styles from './element.module.scss';


export interface ElementData {
    index: number;
    mark: string;
    name: string;
    quality: number;
    family: string;
    period: number;
}

interface ElementProps{
    data: ElementData;
}

export default function Element(props: ElementProps) {
    const {data} = props;

    return <div className={styles.element}>
        <span>{data.index}</span>
        <span>{data.mark}</span>
        <span>{data.name}</span>
        <span>{data.quality}</span>
        <span>{data.family}</span>
        <span>{data.period}</span>
    </div>
}