import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import theme from '../styles/theme';
import Header from '../components/ZipDetail/Header';

export default function FeeCalculator() {
  const { basicTime, basicCharge, addUnitTime, addUnitCharge } = useLocation().state;
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [totalFee, setTotalFee] = useState('0원');

  function handleHour(e) {
    if (+e.target.value >= 0) {
      setHours(+e.target.value);
    } else {
      e.target.value = '';
    }
  }

  function handleMinutes(e) {
    if (+e.target.value >= 0) {
      setMinutes(+e.target.value);
    } else {
      e.target.value = '';
    }
  }

  function calculatorFee() {
    if (!(+addUnitTime && +addUnitCharge)) {
      setTotalFee(`${(+basicCharge).toLocaleString()}원 이상`);
    } else if (minutes >= +basicTime || hours >= 1) {
      setTotalFee(
        (
          +basicCharge +
          Math.ceil((hours * 60 + minutes - +basicTime) / +addUnitTime) * +addUnitCharge
        ).toLocaleString() + '원'
      );
    } else if (minutes > 0) {
      setTotalFee(basicCharge.toLocaleString() + '원');
    }
  }

  useEffect(() => {
    calculatorFee();
  }, [hours]);
  useEffect(() => {
    calculatorFee();
  }, [minutes]);

  return (
    <FeeCalculatorWrapper>
      <Header title="주차비 미리보기" />
      <ParkingTime>
        <h2>주차시간</h2>
        <form>
          <InputWrapper>
            <label htmlFor="hour">시간</label>
            <input type="number" onChange={handleHour} />
            <span>시간</span>
          </InputWrapper>
          <InputWrapper>
            <label htmlFor="hour">분</label>
            <input type="number" onChange={handleMinutes} />
            <span>분</span>
          </InputWrapper>
        </form>
      </ParkingTime>
      <ParkingFee>
        <h2>주차비</h2>
        <p>
          최초 {(+basicTime).toLocaleString()}분 <span>{(+basicCharge).toLocaleString()}원</span> /{' '}
          {addUnitTime
            ? `추가 
        ${(+addUnitTime).toLocaleString()}분당 ${(+addUnitCharge).toLocaleString()}원`
            : '정보없음'}
        </p>
      </ParkingFee>
      <ResultFee>
        <h3>예상 결제 금액</h3>
        <p>{totalFee}</p>
        {!addUnitTime ? (
          <span>
            해당 주차장의 추가요금 정보가 없어 정확한 계산이 불가합니다.
            <br />
          </span>
        ) : (
          ''
        )}
        <span>할인 감면 대상에 따라 결제 금액이 달라질 수 있으니 참고용으로만 사용하시길 바랍니다.</span>
      </ResultFee>
    </FeeCalculatorWrapper>
  );
}

const FeeCalculatorWrapper = styled.section`
  color: ${theme.colors.black};

  & section {
    margin-left: 20px;
    margin-right: 20px;
  }

  & h2 {
    margin-bottom: 20px;
    font-size: ${theme.fontSizes.subTitle2};
    font-weight: 700;
  }

  & h3 {
    margin-top: 20px;
    margin-bottom: 10px;
    font-size: ${theme.fontSizes.title};
    font-weight: 700;
  }
`;

const ParkingTime = styled.section`
  margin-top: 40px;

  & form {
    display: flex;
  }

  & label {
    ${theme.a11yHidden}
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 50%;
  gap: 8px;

  &:last-child {
    padding-left: 12px;
  }

  & input {
    width: 100%;
    padding: 8px 0;
    border: 1px solid ${theme.colors.grey};
    border-radius: 4px;
    font-size: ${theme.fontSizes.paragraph2};
    color: inherit;
    text-align: center;
  }

  & span {
    font-weight: 700;
    word-break: keep-all;
  }
`;

const ParkingFee = styled.section`
  margin-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid ${theme.colors.orangeMain};
`;

const ResultFee = styled.section`
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;

  & p {
    margin-bottom: 12px;
    color: ${theme.colors.orangeMain};
    font-size: ${theme.fontSizes.headLint};
    font-weight: 700;
  }

  & span {
    color: #767676;
    line-height: 1.25;
    word-break: keep-all;
  }
`;
