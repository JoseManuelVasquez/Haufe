import React from 'react'
import styles from '../styles/CharactersList.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { listCharacters, increasePage } from '../slices/characterSlice'
import Card from "../components/Card";

const CharactersList = () => {
    const { characters, currentPage } = useSelector(state => state.character);
    const dispatch = useDispatch();

    const handleClick = async () => {
        try {
            await dispatch(listCharacters(currentPage));
            dispatch(increasePage());
        } catch (rejectedValueOrSerializedError) {
            console.error(rejectedValueOrSerializedError);
        }
    };

    return (
        <div className={styles.box}>
            <div className={styles.cards}>
                {
                    characters.map((character, index) => {
                        return <Card key={index} {...character}/>
                    })
                }
            </div>
            <div className={styles.buttonBox}>
                <button className={styles.buttonLoad} onClick={handleClick}>Load More</button>
            </div>
        </div>
    )
};

export default CharactersList