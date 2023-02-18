import styles from './link-button.module.scss';

import Link from "next/link";
import { Url } from "url";


interface LinkButtonProps{
    name: string;
    href: Url|string;
}

export default function LinkButton(props: LinkButtonProps) {
    const { name, href } = props;

    return <span className={styles['link-button']}>
        <Link href={href}>{name}</Link>
    </span>
}