import React, {useEffect, useRef, useState} from 'react';
import {StaffProp} from '../types';
import {CLEF_G} from '../symbols';
import * as d3 from 'd3'
/** 
 * one music staff contains 3+4+3 gapps, and one gap is 20px now  
 * so one staff takes 200px 
 * - - - - -
 * - - - - -
 * - - - - -
 * ---------
 * ---------
 * ---------
 * ---------
 * ---------
 * - - - - -
 * - - - - -
 * - - - - -
 */

export const Staff = ({count}: StaffProp) => {
  const divRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    divRef.current.style.height = `${count*200}px`;
    const divWidth = divRef.current.offsetWidth;
    const rawStaffs = new Array(count);
    d3.select('.staff-container-svg').selectAll('.d3-staff')
    .data(rawStaffs)
    .join('g')
    .attr('class', 'd3-staff')
    .attr('id', (_, idx) => {
      return `staff-${idx}`
    })
    .attr('transform', (_, idx) => {
      return `translate(0,${200 * idx})`;
    });

    const line = d3.line().context(null)
    const staffs = d3.selectAll('.d3-staff');
    staffs.selectAll('.staff-line')
    .data([1,1,1,1,1])
    .join('path')
    .attr('class', 'staff-line')
    .attr('d', (_, idx) => {
      return line([[0, idx*20+60], [divWidth, idx*20+60]]);
    })
    .style('stroke', 'black')
    .style('stroke-width', 1);

    staffs.selectAll('.staff-side-line')
    .data([0,1])
    .join('path')
    .attr('class', 'staff-side-line')
    .attr('d', d => {
      return line([[d*divWidth, 60], [d*divWidth, 140]]);
    })
    .style('stroke', 'black')
    .style('stroke-width', 1);

    staffs.selectAll('.staff-clef')
    .data([0])
    .join('text')
    .text(CLEF_G)
    .attr('transform', 'translate(2, 125)')
    .style('font-size', '96px');
    
  }, []);
  return <div className='d3-staff-container' ref={divRef} style={{width:'99.8%'}}>
    <svg className='staff-container-svg' style={{width:'100%', height:'100%'}}></svg>
  </div>
}