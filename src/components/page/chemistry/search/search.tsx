import { ElementData } from "../element/element";

interface SearchProps {
    set: Function;
    elements: ElementData[]
}


export default function Search(props: SearchProps) {
    const elements = props.elements.concat();

    function onInputHandler(ev: React.FormEvent<HTMLInputElement>) {
        const target = ev.target as HTMLInputElement;
        const value = target.value.replace(/[ \n\r]{2,}/g, ' ');
        const params = value.trim().split(' ').filter(v => v !== '' && v);

        let res = [...elements];
        console.log(params, res);

        function includes(value: string|number, has: string|number) {
            value = value.toString();
            has = has.toString();

            return value.includes(has);
        }

        params.forEach((v, i) => {
            if (v === '0') {
                res = res.filter(el => includes(el.period, v));
            } else if (/^\d+$/.test(v)) {
                res = res.filter(el => includes(el.index, v) || includes(el.period, v) || includes(el.quality, v));
            } else if (/^\d+\.(\d+)?$/.test(v)) {
                res = res.filter(el => includes(el.quality, v));
            } else if (/^([IV] [AB])|0$/i.test(v)){
                res = res.filter(el => includes(el.period.toString().toLowerCase(), v.toLowerCase()));
            } else if (/^[A-Z][a-z]?$/i.test(v)){
                res = res.filter(el => includes(el.mark.toLowerCase(), v.toLowerCase()));
            } else if (/^[\u4e00-\u9fa5]{0,}$/.test(v)) {
                res = res.filter(el => includes(el.name, v));
            }
        });
        props.set(res);
    }

    return <div>
        <input type="text" onInput={onInputHandler}></input>
    </div>
}