import React from 'react';
import c from './AdminCard.module.scss'

function AdminCard({ user, me, }) {
    if (me) {
        return (
            <div className={c.block}>
                <div className={c.inner}>
                    <div className={`${c.header}`}>
                        <span className={`${c.text} ${c.username}`}>VAIPLI</span>
                        <div className={c.status}>
                            <span className={c.circle}/>
                            <span className={c['status-text']}>Вы</span>
                        </div>
                    </div>
                    <span className={`${c.text} ${c.role}`}>Супер Администратор</span>
                    <span className={`${c.text} ${c.id}`}>ID: 51908512985021</span>
                </div>
            </div>
        )
    }

    return (
        <div className={c.block}>
            <div className={c.inner}>
                <span className={`${c.text} ${c.username}`}>nick</span>
                <span className={`${c.text} ${c.id}`}>ID: 51908512985021</span>
                <button className={c.btn}>Удалить</button>
            </div>
        </div>
    );
}

export default AdminCard;