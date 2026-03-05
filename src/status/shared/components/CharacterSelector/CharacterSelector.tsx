import { useMvuDataStore, usePlayerStore } from '@/status/core/stores';
import { PlayerKey } from '@/status/core/types';
import { FC, useMemo } from 'react';
import styles from './CharacterSelector.module.scss';

export const CharacterSelector: FC = () => {
    const { data } = useMvuDataStore();
    const { activePlayerKey, setActivePlayerKey } = usePlayerStore();

    const availablePlayers = useMemo(() => {
        if (!data) return [];
        // 找出所有以'主角'开头的键名，过滤掉未被激活（全默认）的备用主角数据
        const keys = Object.keys(data).filter(k => {
            if (!k.startsWith('主角')) return false;
            if (k === '主角') return true; // '主角' 作为主位永远保留
            const p = (data as any)[k] as any;
            if (!p) return false;
            // 判定是否为实质性激活：有种族、等级大于1、有经验值、或者有金钱、或者是有了背包物品等
            const isActive = !!p.种族 || p.等级 > 1 || p.累计经验值 > 0 || p.金钱 > 0 || Object.keys(p.背包 || {}).length > 0 || (p.冒险者等级 && p.冒险者等级 !== '未评级');
            return isActive;
        }) as PlayerKey[];

        return keys.sort((a, b) => {
            // 保持'主角'在第一位，其他按字典序排列
            if (a === '主角') return -1;
            if (b === '主角') return 1;
            return a.localeCompare(b);
        });
    }, [data]);

    // 如果只有一个主角，就不显示切换分页了
    if (availablePlayers.length <= 1) {
        return null;
    }

    return (
        <div className={styles.characterTabs}>
            {availablePlayers.map(key => {
                // 如果数据里有具体名字/称呼，可以替换这里
                // 默认显示：主角, 角色 1, 角色 2...
                const displayName = key === '主角' ? '主角' : `角色 ${key.replace('主角', '')}`;
                const isActive = activePlayerKey === key;

                return (
                    <button
                        key={key}
                        className={`${styles.tabBtn} ${isActive ? styles.active : ''}`}
                        onClick={() => setActivePlayerKey(key)}
                    >
                        {displayName}
                    </button>
                );
            })}
        </div>
    );
};
