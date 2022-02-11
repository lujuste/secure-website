import styles from './styles.module.scss';
import React, { useState } from 'react';
import IconInstitucional from './IconInstitucional';
import { Flex } from '@chakra-ui/react';
import IconPoupaTempo from '../CardPoupaTempo/IconPoupaTempo';

export default function CardInstitucional({ title, description }) {
  const [hovered, setHovered] = useState(false);
  const toggleHover = () => setHovered(!hovered);
  return (
    <div className={styles.wrapper}>
      <div className={styles.cols}>
        <div
          className={styles.col}
          onMouseEnter={toggleHover}
          onMouseLeave={toggleHover}
        >
          <div className={styles.container}>
            <div className={styles.front}>
              <div className={styles.inner}>
                <div className={styles.forceIcon}>
                  <IconPoupaTempo />
                </div>

                <p> {title} </p>
              </div>
            </div>
            <div className={styles.back}>
              <div className={styles.inner}>
                <p> {description} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
