import React from "react";
import * as S from "./ProgressInputStyles"

export const ProgresInput = ({duration, value}) => {
  return (
    <S.ProgressInput
      type="range"
      min={0}
      max={duration}
      value={value}
      step={0.01}
      onChange={(a) => {value = a.target.value }}
    />)
}
