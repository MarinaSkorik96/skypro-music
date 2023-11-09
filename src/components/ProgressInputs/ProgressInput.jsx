import React from "react";
import * as S from "./ProgressInputStyles"
import { forwardRef } from 'react';

export const ProgresInputTrack = forwardRef((props, aRef) => {
  return (
    <S.ProgressInput
      type="range"
      min={0}
      max={aRef.current.duration}
      value={aRef.current.currentTime}
      step={0.01}
      onChange={(a) => { aRef.current.currentTime = a.target.value }}
    />)
});

export const ProgresInputVolume = forwardRef((props, aRef) => {
  return (
    <S.ProgressInput
      type="range"
      min={0}
      max={1}
      value={aRef.current.volume}
      step={0.01}
      onChange={(a) => { aRef.current.volume = a.target.value }}
    />)
});