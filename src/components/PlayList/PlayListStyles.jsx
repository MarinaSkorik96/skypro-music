import styled from 'styled-components'
import { keyframes } from "styled-components";

const SkeletonAnim = keyframes`
    0%   {
        background-color: transparent;
    }
    50%  {
        background-color: #fff;
    }
    100%  {
        background-color: transparent;
    }
`;

export const SidebarItem = styled.div`
  width: 250px;
  height: 150px;
  &:not(:last-child) {
    margin-bottom: 30px;
  }
`

export const SidebarLink = styled.a`
  width: 100%;
  height: 100%;
`
export const SidebarImg = styled.img`
  width: 100%;
  height: auto;
`
export const SidebarList = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`

export const SidebarItemSkeleton = styled.div`
  width: 250px;
  height: 150px;
  border-radius: 2px;
  background-color: aquamarine;
  animation: ${SkeletonAnim} pulsate-fwd 3s linear infinite both;
  &:not(:last-child) {
    margin-bottom: 30px;
  } 
`
