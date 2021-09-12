import React from 'react'
import styles from '../styles/Card.module.css'
import FavButton from "./FavButton";

const Card = (props) => {
    return (
        <article className={styles.box}>
            <div className={styles.characterImage}>
                <img src={props.avatar} alt={props.name}/>
            </div>
            <div className={styles.characterContent}>
                <div className={styles.headSection}>
                    <div className={styles.section}>
                        <div className={styles.title}>{props.name}</div>
                    </div>
                    <FavButton fav={props.fav} name={props.name}/>
                </div>
                <div className={styles.section}>
                    <span className={styles.characterLabel}>Last known location:</span>
                    <div className={styles.characterInfo}>{props.location}</div>
                </div>
                <div className={styles.section}>
                    <span className={styles.characterLabel}>First seen in:</span>
                    <div className={styles.characterInfo}>{props.firstSeen}</div>
                </div>
            </div>
        </article>
    );
};

export default Card;
