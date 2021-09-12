import React from 'react'
import styles from '../styles/Nav.module.css'
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";

const Nav = () => {
    const { isLogged, username }  = useSelector((state) => state.user);

    return (
        <div className={styles.box}>
            <div className={styles.containerLogo}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img
                            src="https://assets.website-files.com/591e6251f13786217f2e1ff8/591e6251f13786217f2e2062_16132_LO_Haufe_Group_RGB_pos_en.svg"
                            alt=""/>
                    </Link>
                </div>
            </div>
            {
                isLogged &&
                <div className={styles.menu}>
                    {username}
                </div>
            }
        </div>
    );
};

export default Nav
