import React from "react";
import {Link} from "react-router-dom";
import MIR from "../../assets/images/mir.svg";
import VISA from "../../assets/images/visa.svg";
import SPB from "../../assets/images/spb.svg";
import MASTERCARD from "../../assets/images/mastercard.svg";
import c from './Footer.module.scss'
import Container from "../Container/Container";
import bg from '../../assets/images/footer-background.jpg'
import {footerFirstRoutes, footerThirdRoutes} from "../../data/footerRoutes";

export default function Footer() {

    return (
        <div className={c.block}>
            <div className={c.bg} style={{ backgroundImage: `url(${bg})` }}></div>
            <Container style={{ padding: 0 }}>
                <div className={c['inner-block']}>

                    <div className={c.content}>
                        <div className={c.left}>
                            <ul className={c.list}>
                                {footerFirstRoutes.map((route, idx) => (
                                    <li key={idx} className={c.item}>
                                        <Link className={c.link} to={route.path}>{route.text}</Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className={c.list}>
                                {footerFirstRoutes.map((route, idx) => (
                                    <li key={idx} className={c.item}>
                                        <Link className={c.link} to={route.path}>{route.text}</Link>
                                    </li>
                                ))}
                            </ul>
                            <ul className={c.list}>
                                {footerThirdRoutes.map((route, idx) => (
                                    <li key={idx} className={c.item}>
                                        <Link className={c.link} to={route.path}>{route.text}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>


                        <div className={c.right}>
                            <ul className={`${c['default-bank-cards']} ${c['bank-cards']}`}>
                                <li className={c['bank-card']}><img src={MIR} alt="mir"/></li>
                                <li className={c['bank-card']}><img src={VISA} alt="visa"/></li>
                                <li className={c['bank-card']}><img src={SPB} alt="spb"/></li>
                                <li className={c['bank-card']}><img src={MASTERCARD} alt="mastercard"/></li>
                            </ul>
                            <p className={c.text}>UNC — the clothing brand has been in existence since 2021. Basing and
                                logistics managementin Russia, Cheboksary.</p>
                        </div>
                    </div>

                    <ul className={`${c['bank-cards']} ${c['responsive-bank-cards']}`}>
                        <li className={c['bank-card']}><img src={MIR} alt="mir"/></li>
                        <li className={c['bank-card']}><img src={VISA} alt="visa"/></li>
                        <li className={c['bank-card']}><img src={SPB} alt="spb"/></li>
                        <li className={c['bank-card']}><img src={MASTERCARD} alt="mastercard"/></li>
                    </ul>
                </div>
            </Container>
        </div>
    );
}
