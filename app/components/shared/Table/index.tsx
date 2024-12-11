import React, { ReactNode, useState } from 'react';
import styles from './index.module.scss';
import { TableColumn, TableHeaderColumn } from '@/interfaces';
import { RiStarSFill } from 'react-icons/ri';

interface Props {
  rowData?:  any [];
}

export function Table({ rowData }:Props) {

  return (
    <table className={styles['table']}>
      <TableHeader rowData={rowData}/>
      <TableBody rowData={rowData} />
    </table>
  );
}


function TableHeader({rowData}:Props) {

  const columns = Object.keys(rowData?.[0]);

  return (
    <thead className={styles['table-header']}>
      <tr>
      {columns.map((col) => (
            <th key={col} className={styles['header-col']}>{col}</th>
          ))}
      </tr>
    </thead>
  );
}

function TableBody({rowData}:Props) {

  const columns = Object.keys(rowData?.[0]);

  return (
    <tbody className={styles['body']}>
      {
        rowData?.map((row, rowIndex) => (
         <tr key={rowIndex}>
            {
              columns?.map((col)=>
                col === 'rate' ? (
                  <td key={`${rowIndex}-${col}`}>
                    {
                    [1,2,3,4,5].map((_, ind) =>(
                      <RiStarSFill className={ind < row[col] ? styles['dark']: styles['light']} />
                    ))
                    }
                  </td>
                ):(
                  <td key={`${rowIndex}-${col}`}>{row[col]}</td>
                )
              )
              
            }
         </tr> 
        ))
      }
    </tbody>
  );
}
