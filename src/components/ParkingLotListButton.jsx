import React from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
import { IcList } from '../../public/assets/icons/index.js';
import { useNavigate, Link } from 'react-router-dom';

export default function ParkingLotListButton(props) {
  const navigate = useNavigate();
  const onClickListBtn = () => {
    navigate(`/search`);
  };
  const openList = () => {
    props.setListOpen(true);
  };

  return (
    <ParkingLotListButtonWrapper onClick={openList}>
      <IcList />
      목록보기
    </ParkingLotListButtonWrapper>
  );
}

const ParkingLotListButtonWrapper = styled.button`
  background-color: ${theme.colors.white};
  color: ${theme.colors.dark};
  border: 1px solid ${theme.colors.dark};
  border-radius: 999px;
  width: fit-content;
  z-index: 2;
  position: fixed;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: ${theme.calcRem(35)};
  padding: ${theme.calcRem(8)} ${theme.calcRem(14)};
  font-size: ${theme.fontSizes.subTitle1};

  & > svg {
    margin-right: ${theme.calcRem(8)};
  }
`;
