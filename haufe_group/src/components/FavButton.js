import React, {useState} from 'react'
import styles from '../styles/FavButton.module.css'
import { useDispatch } from 'react-redux'
import {updateFav} from "../slices/characterSlice";

const FavButton = (props) => {
    const [added, setAdded] = useState(false);
    const dispatch = useDispatch();

    const handleFavButton = async () => {
        try {
            setAdded(!added);
            const name = props.name;
            console.log(name, added);
            await dispatch(updateFav({name, added}));
        } catch (rejectedValueOrSerializedError) {
            console.error(rejectedValueOrSerializedError);
        }

    };

    return (
        <div className={styles.box}>
            <button onClick={handleFavButton} className={added ? styles.added : styles.favButton}/>
        </div>
    );
};

export default FavButton;
