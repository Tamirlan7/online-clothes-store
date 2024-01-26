import React from "react";
import { Link } from "react-router-dom";
import MIR from "../../assets/images/mir.svg";
import VISA from "../../assets/images/visa.svg";
import SPB from "../../assets/images/spb.svg";
import MASTERCARD from "../../assets/images/mastercard.svg";
import "./Footer.scss";

export default function Footer() {
  return (
    <section className='footer'>
      <div className='footer__container'>
        <div className='footer__links'>
          <ul>
            <li>
              <Link
                className='footer__link'
                to='/about'
              >
                О НАС
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='/contacts'
              >
                Контакты
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='/payment'
              >
                Оплата
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='/refund'
              >
                ВОЗВРАТ
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='/delivery'
              >
                Доставка
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link
                className='footer__link'
                to='/help'
              >
                Поддержка
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='/privacy'
              >
                Политика конфидициальности
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='/usage'
              >
                Условия Использования
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='/refund'
              >
                ВОзврат
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='/delivery'
              >
                Доставка
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link
                className='footer__link'
                to='https://vk.com/'
              >
                VKONTakte
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='https://instagram.com/'
              >
                INSTAGRAM
              </Link>
            </li>
            <li>
              <Link
                className='footer__link'
                to='https://web.telegram.org/a/'
              >
                TELEGRAM
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className='footer__payment-container'>
            <Link
              className='footer__payment'
              to='http://www.sberbank.ru/ru/person/dist_services/mirpay'
            >
              <img
                src={MIR}
                alt='mirpay'
              />
            </Link>
            <Link
              className='footer__payment'
              to='https://cis.visa.com/pay-with-visa/featured-technologies/wallet-pay.html'
            >
              <img
                src={VISA}
                alt='visa'
              />
            </Link>
            <Link
              className='footer__payment'
              to='https://sbp.nspk.ru/sbpay/'
            >
              <img
                src={SPB}
                alt='spb'
              />
            </Link>
            <Link
              className='footer__payment'
              to='https://www.mastercard.us/en-us/personal/ways-to-pay/click-to-pay.html'
            >
              <img
                src={MASTERCARD}
                alt='mastercard'
              />
            </Link>
          </div>
          <p className='footer__text'>
            UNC — the clothing brand has been in existence since 2021. Basing
            and logistics managementin Russia, Cheboksary.
          </p>
        </div>
      </div>
    </section>
  );
}
